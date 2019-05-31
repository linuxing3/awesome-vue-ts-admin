import { Component, Vue, Emit } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import { tableList, FilterFormList, operate } from '@/interface';
import lfService from '@/utils/request.localforage';

import {
  BackParams, operateBtn, tableFieldsList, filterFormItemList,
} from './config';
import './index.less';

@Component({
  name: 'DocumentTable',
  components: {
    'a-tag': Tag,
  },
})
export default class DocumentTable extends Vue {
  modelName: string = 'document'

  data: any[] = []

  pageParams: object = {
    pageNum: 1,
    pageSize: 100,
    page: true,
  }

  filterParams: any = {
    name: '',
    gender: '',
    department: '',
    fromEntity: '',
    arrivingDate: '',
  }

  BackParams: any = BackParams

  outParams: any = {}

  filterList: FilterFormList[] = filterFormItemList

  tableList: tableList[] = tableFieldsList

  operate: operate[] = operateBtn

  title: string = 'Add Document'

  visible: boolean = false

  modelType: string = 'add'

  editData: object = {}

  activated() {
    this.success();
  }

  @Emit()
  add() {
    this.$log.suc('Creating ... ');
    this.$router.replace({
      name: 'DocumentForm',
    });
  }

  @Emit()
  export(ids) {
    this.$log.suc('Exporting from DocumentTable ... ');
    this.$router.replace({
      name: 'ExportHelper',
      params: {
        modelName: this.modelName,
        data: JSON.stringify({ ids }),
      },
    });
  }

  genderRender(text: any) {
    return <a-tag color={text ? 'blue' : 'purple'}>{text ? '男' : '女'}</a-tag>;
  }

  @Emit()
  selectChange() {}

  @Emit()
  currentChange() {}

  @Emit()
  clearOutParams() {}

  @Emit()
  async handleDelete(row) {
    this.$log.suc('Deleting ... ');
    const response = await lfService.request({
      url: `/${this.modelName}`,
      method: 'delete',
      data: row.id,
    });
    Promise.resolve(response);
  }

  @Emit()
  handleEdit(row) {
    this.$log.suc('Editing ... ');
    this.$router.replace({
      name: 'DocumentForm',
      params: {
        id: row.id,
      },
    });
  }

  @Emit()
  tableClick(key: string, row: any) {
    switch (key) {
      case 'edit':
        this.handleEdit(row);
        break;
      case 'export':
        this.export([row.id]);
        break;
      default:
        this.handleDelete(row).then(() => this.success());
        break;
    }
  }

  success() {
    const Table: any = this.$refs.MemberInfoTable;
    Table.reloadTable();
  }

  render() {
    return (
      <div class="baseInfo-wrap">
        <filter-table
          ref="MemberInfoTable"
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={[]}
          scroll={{ x: 900 }}
          url={'/document/fetch'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          exportBtn={true}
          dataType={'json'}
          rowKey={'id'}
          operate={this.operate}
          fetchType={'get'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
          on-export={this.export}
        />
      </div>
    );
  }
}
