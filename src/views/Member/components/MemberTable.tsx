import { Component, Vue, Emit } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import { tableList, FilterFormList, operate } from '@/interface';
import lfService from '@/utils/request.localforage';
import { etnia, gender } from '@/utils/constant';

import './index.less';

@Component({
  name: 'MemberTable',
  components: {
    'a-tag': Tag,
  },
})
export default class MemberTable extends Vue {
  modelName: string = 'member'

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

  BackParams: any = {
    code: 'data.result.resultCode',
    codeOK: 0,
    message: 'data.result.resultMessage',
    data: 'data.entity',
    columns: 'config.params.columns',
    total: 'config.params.pageParams.total',
  }

  outParams: any = {}

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: 'name',
      type: 'input',
      placeholder: 'Seach Name',
    },
    {
      key: 'gender',
      label: 'gender',
      type: 'checkboxButton',
      placeholder: 'male',
      options: [...gender],
    },
    {
      key: 'arrivingDate',
      label: 'arriving Date',
      type: 'date',
      placeholder: '2019-01-01',
    },
  ]

  tableList: tableList[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      customRender: this.genderRender,
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'From Entity',
      dataIndex: 'fromEntity',
    },
    {
      title: 'Arriving Date',
      dataIndex: 'arrivingDate',
    },
  ]

  operate: operate[] = [
    {
      key: 'edit',
      rowKey: 'id',
      color: 'blue',
      text: '编辑',
      roles: true,
    },
    {
      key: 'delete',
      rowKey: 'id',
      color: 'red',
      text: '删除',
      roles: true,
      msg: '确定删除？',
    },
    {
      key: 'export',
      rowKey: 'id',
      color: 'orange',
      text: '导出',
      roles: true,
    },
  ]

  title: string = 'Add Member'

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
      name: 'MemberForm',
    });
  }

  @Emit()
  export(ids) {
    this.$log.suc('Exporting from MemberTable ... ');
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
      name: 'MemberForm',
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
        this.handleDelete(row).then(() => this.success);
        break;
    }
  }

  @Emit()
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
          url={'/member/fetch'}
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
