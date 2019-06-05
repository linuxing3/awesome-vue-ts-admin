import {
  Component, Mixins, Emit,
} from 'vue-property-decorator';
import {
  Tag, Icon, Card, Row, Col, Button, Modal, Select, List, Upload, Table, Tree,
} from 'ant-design-vue';
import exportMixin from '@/utils/exportMixin';
import { getFilesByExtentionInDir } from '@/utils/helper';
import './index.less';

@Component({
  name: 'ExportHelper',
  components: {
    'a-table': Table,
    'a-tree': Tree,
    'a-directory-tree': Tree.DirectoryTree,
    'a-tree-node': Tree.TreeNode,
    'a-icon': Icon,
    'a-row': Row,
    'a-col': Col,
    'a-button': Button,
    'a-modal': Modal,
    'a-select': Select,
    'a-tag': Tag,
    'a-card': Card,
    'a-upload-dragger': Upload,
    'a-list': List,
    'a-list-item': List.Item,
  },
})
export default class ExportHelper extends Mixins(exportMixin) {
  normalLayout = {
    span: 24,
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  }

  halfLayout = {
    span: 12,
    xl: 12,
    lg: 12,
    md: 12,
    sm: 12,
    xs: 24,
  }

  quarterLayout = {
    span: 6,
    xl: 6,
    lg: 6,
    md: 6,
    sm: 12,
    xs: 24,
  }

  content = [
    '导出流程：',
    '第一步：将数据导出为Excel文件',
    '第二步：将Excel文件数据合并到Word',
    '',
    '导入流程：',
    '第一步：将数据输入到Excel文件的Sheet1，确认英文列标题',
    '第二步：将Excel文件导出到系统',
  ]

  import(e: Event) {
    Modal.confirm({
      title: 'Import',
      okText: 'Import from Excel xls/xlsx',
      cancelText: 'Import from csv',
      onOk: () => {
        this.fileFormat = 'xlsx';
        this.getImportFile(e).then((path) => {
          this.attemptImport(path);
        });
      },
      onCancel: () => {
        this.fileFormat = 'csv';
        this.getImportFile(e).then((path) => {
          this.attemptImport(path);
        });
      },
    });
  }

  export() {
    Modal.confirm({
      title: 'Export',
      okText: 'Export To Excel/CSV',
      cancelText: 'Export To Word',
      onOk: () => {
        this.fileFormat = 'xlsx';
        this.attemptExport(this.data);
      },
      onCancel: () => {
        this.fileFormat = 'docx';
        this.attemptExport(this.data);
      },
    });
  }

  upload(info) {
    const { uid, name } = info.file;
    this.$log.info(name);
    return Promise.resolve(info.file);
  }

  uploadChange(info) {
    this.$log.info(name);
    return Promise.resolve(info.file);
  }

  @Emit()
  setData(data) {
    this.$log.info('Setting export data: ', data);
  }

  renderActionBtn(): JSX.Element {
    return (
      <div style="{ margin: '16px' }">
        <a-row>
          <a-col {...{ props: this.quarterLayout }}>
            <a-button on-click={this.import} id={'import'} icon="cloud" type="primary">
              Import
            </a-button>
          </a-col>
          <a-col {...{ props: this.quarterLayout }}>
            <a-button on-click={this.export} id={'export'} icon="download">
              Export
            </a-button>
          </a-col>
          <a-col {...{ props: this.quarterLayout }}>
            <a-button type="ghost" on-click={this.resetData} id={'reset'} icon="refresh">
              Destroy
            </a-button>
          </a-col>
        </a-row>
      </div>
    );
  }

  renderUpload(): JSX.Element {
    return (
      <div>
        <a-upload-dragger
          name="file"
          multiple={false}
          action={this.upload}
          change={this.uploadChange}
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">点击或拖拽上次</p>
          <p class="ant-upload-hint">请确保文件格式和数据列标题的一致性</p>
        </a-upload-dragger>
      </div>
    );
  }

  renderContent(): JSX.Element {
    return (
      <div>
        <a-list size="large" bordered>
          {this.content.map(item => (
            <a-list-item>{item}</a-list-item>
          ))}
          <div slot="header">
            <h3 style="{ margin: '16px' }">操作说明</h3>
            {this.renderActionBtn()}
          </div>
        </a-list>
      </div>
    );
  }

  renderSampleData(): JSX.Element {
    const dataSource = this.data.slice(0, 3);
    const columns = this.itemList.slice(0, 6).reduce((list, item) => {
      list.push({
        title: this.$t(item.key),
        dateIndex: item.key,
      });
      return list;
    }, []);
    this.$log.info('Sample data:', dataSource);
    return (
      <div style="{ margin: '16px' }">
        <a-table bordered rowKey={'id'} dataSource={dataSource} columns={columns} />
      </div>
    );
  }

  renderSelect(): JSX.Element {
    const files = getFilesByExtentionInDir({
      path: this.templateDir,
      ext: 'docx',
    });
    const { modelName } = this;
    return (
      <a-select style="width: 100%;" id={modelName} label={modelName} change={this.setOutputfile}>
        {files.map((file: string, indexs: number) => (
          <a-option key={indexs} value={file}>
            {file}
          </a-option>
        ))}
      </a-select>
    );
  }

  renderFileTree(): JSX.Element {
    const files = getFilesByExtentionInDir({
      path: this.templateDir,
      ext: 'docx',
    });
    const selectFile = (files) => {
      this.outputDocFile = files[0];
      this.$log.info('Current Template file: ', this.modelTemplate);
    };
    return (
      <a-directory-tree on-select={selectFile}>
        <a-tree-node title={this.templateDir} key="template">
          {files.map(file => <a-tree-node title={file} key={file} isLeaf />)}
        </a-tree-node>
      </a-directory-tree>
    );
  }

  setOutputfile(e) {
    this.outputDocFile = e.target.value;
  }

  render() {
    const { modelName } = this;
    return (
      <div style="width: 100%;" class="helper-wrap">
        <a-card title={`Import and Export [${modelName}]`}>
          <a-row>
            <a-col {...{ props: this.halfLayout }}>{this.renderContent()}</a-col>
            <a-col {...{ props: this.halfLayout }}>
              <div style="{ margin: '16px' }">
                <h3 style="{ color: 'blue' }">选择word模板: {this.modelTemplate}</h3>
              </div>
              {this.renderFileTree()}
            </a-col>
          </a-row>
          <a-row>
            <a-col {...{ props: this.normalLayout }}>{this.renderSampleData()}</a-col>
          </a-row>
        </a-card>
      </div>
    );
  }
}
