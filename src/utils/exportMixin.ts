
import {
  Component, Vue, Emit,
} from 'vue-property-decorator';
import { Modal } from 'ant-design-vue';
import { join } from 'path';
import {
  pick, keys, last, uniqueId,
} from 'lodash';
import {
  copyFileSync, existsSync, writeFileSync, mkdirSync, unlinkSync,
} from 'fs';
import { remote, shell } from 'electron';
import XLSX from 'xlsx';
import {
  Document, Paragraph, Packer,
} from 'docx';
import createReport from 'docx-template';

import models from '@/models';
import keysDef from '@/locales/cn.json';

import {
  getFilesByExtentionInDir,
  GenerateCSV,
  ImportCSV,
  changeHeaderOfCSV,
} from '@/utils/helper';
import { FilterFormList } from '@/interface';

interface IExportHelper {
  importFileMeta?: any;
  outputDocFile?: string;
  workbook?: any;
  document?: any;
  attachFile?: string | object;
  fileFormat?: string;
  needChangeCSVHeader?: boolean;
  keepOriginalHeader?: boolean;
  reverseTranslate?: boolean;
  onlyKeepStringValue?: boolean;
  needMergeWord?: boolean;
}

interface ReportOptions {
  template: string
  output: string
  data: any
}

@Component({})
export default class exportMixin extends Vue {
  data: any[] = []

  importFileMeta: any = {}

  fileFormat: string = 'xlsx'

  outputDocFile: string = 'template'

  workbook: any = null

  document: any = null

  attachFile: string = ''

  needChangeCSVHeader: boolean = false

  keepOriginalHeader: boolean = true

  reverseTranslate: boolean = false

  onlyKeepStringValue: boolean = true

  needMergeWord: boolean = false

  loading: boolean = true

  resolvePath(fileName, fileExt): string {
    return join(this.templateDir, `${fileName}.${fileExt}`);
  }

  get modelName() {
    return this.$route.params.modelName || 'member';
  }

  get recordIds() {
    const { ids } = JSON.parse(this.$route.params.data);
    return ids;
  }

  get itemList(): FilterFormList[] {
    const { itemList } = JSON.parse(this.$route.params.data);
    return itemList;
  }

  get Entity(): any {
    return models[this.modelName];
  }

  // 用户模板目录
  get userHomeDir(): string {
    return remote.app.getPath('home');
  }

  // 用户模板目录
  get userDataDir(): string {
    return remote.app.getPath('userData');
  }

  // 用户数据目录
  get templateDir(): string {
    return join(this.userHomeDir, '/Documents/template'); // 用户模板目录
  }

  get attachDir(): string {
    return join(this.userHomeDir, '/Documents/attach'); // 用户模板目录
  }

  get realDataDir(): string {
    return join(this.userDataDir, 'data'); // 用户数据目录
  }

  // 获取模板目录下的doc文件
  get templateDocs(): string[] {
    return getFilesByExtentionInDir({ path: this.templateDir, ext: 'doc' });
  }

  // 获取模板目录下的当前模型对应csv文件
  get modelDatasource(): string {
    return this.resolvePath(this.modelName, 'xlsx');
  }

  // 获取模板目录下的默认csv文件
  get defaultDatasource(): string {
    return this.resolvePath('db', 'csv');
  }

  // 获取模板目录下默认Word模板
  get defaultTemplate(): string {
    return this.resolvePath('template', 'doc');
  }

  // 获取模板目录下自选Word模板
  get modelTemplate(): string {
    return this.resolvePath(this.outputDocFile, 'doc');
  }

  mounted() {
    if (!existsSync(this.templateDir)) {
      mkdirSync(this.templateDir);
    }
    if (!existsSync(this.attachDir)) {
      mkdirSync(this.attachDir);
    }
    if (!existsSync(this.realDataDir)) {
      mkdirSync(this.realDataDir);
    }
    // get Data
    this.getData();
  }

  /**--------------------------------------------------------------------
  | 主要接口
  |--------------------------------------------------------------------*/

  /**
   * 根据文件扩展名，导入数据
   */
  attemptImport(path: string) {
    if (this.fileFormat === 'csv') {
      this.importCSV();
    } else if (this.fileFormat === 'xlsx' || this.fileFormat === 'xls') {
      this.importExcel(path, this.modelName);
    }
  }

  /**
   * 根据文件格式，尝试导出数据
   */
  attemptExport(items) {
    // 准备数据
    const data = Array.isArray(items)? items : [items];
    // 插入标题翻译定义
    const translateObj = pick(keysDef, keys(items[0]));
    data.unshift(translateObj);
    // 导出数据
    if (this.fileFormat === 'csv') {
      this.exportCSV(data);
    } else if (this.fileFormat === 'xlsx' || this.fileFormat === 'xls') {
      this.exportExcel(data);
    } else if (this.fileFormat === 'docx') {
      this.exportDocx(data);
    }
  }

  /**--------------------------------------------------------------------
  | 辅助函数
  |--------------------------------------------------------------------*/
  /**
   * 获取导入文件的宏信息，设置当前文件格式
   * @param e 事件
   */
  getImportFile(e) {
    if (e.target && e.target.files) {
      this.importFileMeta = e.target.files[0];
    } else {
      const openedFiles = remote.dialog.showOpenDialog({ properties: ['openFile'] });
      // 文件对象
      this.importFileMeta.path = openedFiles[0];
    }
    // 文件格式，csv， xls， docx
    this.fileFormat = last(this.importFileMeta.path.split('.'));
    this.$forceUpdate();
    if (this.importFileMeta.path) {
      return Promise.resolve(this.importFileMeta.path);
    }
    return Promise.reject('No file Selected');
  }

  @Emit()
  getData() {
    this.Entity.$fetch().then(() => {
      this.data = this.Entity.query()
        .whereIdIn(this.recordIds)
        .get();
    });
  }

  /**
   * 将数据持久化，这里是存到本地indexDb中
   * @param data 需要持久化的数据
   */
  persistData(data) {
    if (!Array.isArray(data)) return;
    if (this.modelName === '') return;
    try {
      console.log(`保存${this.modelName}...`);
      // 逐个插入数据到数据存储文件
      data.forEach((item) => {
        this.Entity.$create({ data: item });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 根据数据集，删除持久化内容
   * @param data 数据集
   */
  resetData(data) {
    // Delete all data
    if (!Array.isArray(data)) return;
    try {
      console.log(`删除${this.modelName}全部数据`);
      let count = 0;
      // 逐个插入数据到数据存储文件
      data.forEach((item) => {
        const id = item.id;
        this.Entity.$delete(id);
        count += 1;
      });
      console.log(`共删除数据数: ${count}`);
    } catch (error) {
      throw new Error(error);
    }
  }

  ensureAttachFile() {
    const uuid = uniqueId(`${this.modelName}_attach_`);

    const fileIdRef = uniqueId().toString();
    const moduleAttachDir = join(this.attachDir, this.modelName);
    const moduleAttachDirWithId = join(this.attachDir, this.modelName, fileIdRef);
    if (!existsSync(moduleAttachDir)) {
      mkdirSync(moduleAttachDir);
    }
    if (!existsSync(moduleAttachDirWithId)) {
      mkdirSync(moduleAttachDirWithId);
    }

    if (this.importFileMeta.path !== undefined) {
      this.attachFile = this.importFileMeta.path;
    } else {
      this.attachFile = join(moduleAttachDir, `${uuid}.docx`);
    }
    console.log(this.attachFile);
  }

  /**--------------------------------------------------------------------
  | 主要Excel工具函数
  |--------------------------------------------------------------------*/
  /**
   * 导入Excel文件，从用户选取的文件中
   */
  importExcel(path: string, sheetName?: string) {
    // 电子表对象
    try {
      this.workbook = XLSX.readFile(path);
      const worksheet = this.workbook.Sheets[sheetName || 'Sheet1' || this.modelName];
      this.data = XLSX.utils.sheet_to_json(worksheet);
      this.$log.info('worksheet data:', this.data);
      this.$emit('setData', this.data);
      if (this.data.length > 0) this.persistData(this.data);
    } catch (error) {
      throw new Error(error);
    }
    console.log('打开Excel文件，已读取数据');
  }

  /**
   * 将数据项目导出到Excel文件
   */
  exportExcel(data) {
    const { modelName, modelDatasource } = this;
    if (existsSync(modelDatasource)) {
      unlinkSync(modelDatasource);
    }
    this.workbook = XLSX.utils.book_new();
    this.loading = true;
    this.writeExcelFile({
      workbook: this.workbook,
      filename: modelDatasource,
      name: modelName,
      data,
      options: {
        bookType: 'xlsx',
        // sheet: this.modelName // single sheet format
      },
    });
    this.loading = false;
    // 打开文件所在目录并定位到文件
    Modal.confirm({
      title: '是否打开导出文件？',
      onOk: () => {
        setTimeout(() => {
          shell.showItemInFolder(modelDatasource);
          console.log(`导出${modelDatasource}文件成功`);
        }, 2000);
      },
    });
  }

  /**
   * 写入Excel文件
   * @param param0 Excel文件的参数
   */
  writeExcelFile({
    workbook, filename, data, options, name = 'Sheet1',
  }) {
    // 创建新的电子表格
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    // 添加电子表格到文件中
    XLSX.utils.book_append_sheet(workbook, worksheet, name);
    // 写入文件
    XLSX.writeFile(workbook, filename, options);
  }

  /**
   * 保存Excel文件为csv, txt, html
   * @param worksheet 电子试算表
   * @param type 文件类型
   */
  saveExcelAs(worksheet: XLSX.WorkSheet, type = 'csv') {
    let output;
    if (type === 'csv') {
      output = XLSX.utils.sheet_to_csv(worksheet, {
        FS: ',',
        blankrows: false,
      });
      writeFileSync(`${this.modelDatasource}.csv`, output);
    }
    if (type === 'txt') {
      output = XLSX.utils.sheet_to_txt(worksheet, {
        FS: ',',
        blankrows: false,
      });
      writeFileSync(`${this.modelDatasource}.txt`, output);
    }
    if (type === 'html') {
      output = XLSX.utils.sheet_to_html(worksheet);
      writeFileSync(`${this.modelDatasource}.html`, output);
    }
  }

  /**--------------------------------------------------------------------
  | 主要word工具函数
  |--------------------------------------------------------------------*/

  /**
   * 使用word自动生成报告附件
   * @param data string 写入附件的内容
   */
  exportDocx(content) {
    this.ensureAttachFile();

    try {
      // 创建新的文档或使用默认文档
      this.document = new Document({
        creator: 'cnve',
        description: `Attachment of model ${this.modelName}`,
        title: this.modelName,
      });

      // 添加数据到正文
      Object.keys(content).map((key) => {
        this.document.addParagraph(new Paragraph(key).heading3());
        this.document.addParagraph(new Paragraph(content[key]).heading3());
      });

      console.log(this.document);
      // 写入文件
      const packer = new Packer();
      packer
        .toBuffer(this.document)
        .then((buffer) => {
          writeFileSync(this.attachFile, buffer);
          this.attachFile = '';
          this.document = null;
        })
        .catch((error) => {
          throw new Error(error);
        });
      shell.showItemInFolder(this.attachFile);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 使用word模板功能，自动生成报告
   * @param data string 写入附件的内容
   */
  exportDocTemplate(data: any[], template: string) {
    this.ensureAttachFile();
    const options: ReportOptions = {
      template,
      data,
      output: this.attachFile,
    };
    createReport(options);
  }

  /**
   * 导出文件到Word，打印合并
   */
  async mergeWordApp() {
    this.copyModelNameCSV();
    if (existsSync(this.modelTemplate)) {
      shell.showItemInFolder(this.modelTemplate);
      // shell.openItem(this.modelTemplate)
    } else {
      throw new Error('无法找到Word模板文件，请查看手册。');
    }
  }

  /**--------------------------------------------------------------------
  | 主要csv工具函数
  |--------------------------------------------------------------------*/

  /**
   * 导入csv文件的数据，并执行持久化
   */
  async importCSV() {
    console.log(`导入${this.modelName}.csv文件...`);
    const data: any[] = await ImportCSV({
      file: this.importFileMeta,
      keysDef,
    });
    console.table(data);
    if (data.length) this.persistData(data);
  }

  /**
   * 导出数据项目，可以选择是否保留原来的标题行，或者需要翻译
   * @param item 数据项目
   */
  exportCSV(item) {
    console.log(`导出到${this.modelDatasource}文件...`);
    try {
      this.loading = true;
      GenerateCSV({
        data: item,
        targetFilePath: this.modelDatasource,
        keysDef,
        needTranslateHeader: this.needChangeCSVHeader, // 这里不转换，待生成CSV文件后，更改CSV文件
        onlyKeepStringValue: this.onlyKeepStringValue, // 这里转换[对象类]键值为[字符串类]键值
      });
      this.loading = false;
      // 选择是否保留原有标题
      if (this.keepOriginalHeader) {
        Modal.confirm({
          title: '',
          content:
            '请选择是否保留原有标题。\n因为数据标题行为外文，需要添加中文对应标题。\n你可以随意删除无用标题',
          onOk: () => {
            setTimeout(() => this.changeCSVHeader(), 3000);
            // 打开文件所在目录并定位到文件
            setTimeout(() => shell.showItemInFolder(this.modelDatasource), 5000);
          },
        });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * 修改导出csv文件的标题，插入或不插入标题翻译行
   */
  changeCSVHeader() {
    console.log(`更新${this.modelDatasource}文件的列标题...`);
    if (existsSync(this.modelDatasource)) {
      try {
        changeHeaderOfCSV({
          targetFilePath: this.modelDatasource,
          keysDef,
          reverse: this.reverseTranslate,
          keepOriginalHeader: this.keepOriginalHeader,
        });
        alert('完成标题对应，可以使用了');
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  /**
   * 将导出的csv文件备份为db文件
   */
  copyModelNameCSV() {
    console.log('备份为db.csv文件...');
    if (existsSync(this.modelDatasource)) {
      try {
        copyFileSync(this.modelDatasource, this.defaultDatasource);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
}
