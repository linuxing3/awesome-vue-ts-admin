import { Component, Vue } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import { tableList, FilterFormList, Opreat } from '@/interface';
import lfService from '@/utils/request.localforage';

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
    address: [],
    createtime: [],
    startTime: '',
    endTime: '',
  }

  BackParams: any = {
    code: 'data.result.resultCode',
    codeOK: 0,
    message: 'data.result.resultMessage',
    data: 'data.entity',
    columns: 'config.params.columns',
    total: 'config.params.pagination.total',
  }

  outParams: any = {}

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: 'name',
      type: 'input',
      placeholder: 'Seach Name',
    },
  ]

  tableList: tableList[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
  ]

  opreat: Opreat[] = [
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
  ]

  title: string = 'Add Member'

  visible: boolean = false

  modelType: string = 'add'

  editData: object = {}

  async handleDelete(row) {
    console.log('Deleting ... ');
    await lfService.request({
      url: `/${this.modelName}`,
      method: 'delete',
      data: row.id,
    });
    setTimeout(() => this.success(), 1000);
  }

  handleEdit(row) {
    console.log('Editing ... ');
    this.$router.replace({
      name: 'MemberForm',
      params: {
        id: row.id,
      },
    });
  }

  handleCreate() {
    console.log('Creating ... ');
    this.$router.replace({
      name: 'MemberForm',
    });
  }

  handleRemove(row) {
    this.$confirm({
      title: '警告',
      content: `真的要删除 ${row.id} 吗?`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('OK');
        this.handleDelete(row);
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }

  genderRender(text: any) {
    return <a-tag color={text ? 'blue' : 'purple'}>{text ? 'Male' : 'Female'}</a-tag>;
  }

  tableClick(key: string, row: any) {
    switch (key) {
      case 'edit':
        this.handleEdit(row);
        break;
      default:
        this.handleDelete(row);
        break;
    }
  }

  addWithModal() {
    this.title = 'Add Member';
    this.modelType = 'add';
    this.visible = true;
    this.editData = {};
    this.$router.replace({
      name: 'MemberForm',
    });
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  success() {
    this.visible = false;
    const Table: any = this.$refs.MemberInfoTable;
    this.editData = {};
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
          exportBtn={false}
          dataType={'json'}
          rowKey={'id'}
          opreat={this.opreat}
          fetchType={'get'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.handleCreate}
        />
      </div>
    );
  }
}
