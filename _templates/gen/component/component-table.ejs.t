---
to: 'src/views/<%= h.changeCase.pascal(model) %>/components/<%= h.changeCase.pascal(model) %>Table.tsx'
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelTableName = ModelName + 'Table'
const modelFormName = ModelName + 'Form'
%>import { Component, Vue } from 'vue-property-decorator';
import { Tag } from 'ant-design-vue';
import moment from 'moment';
import { tableList, FilterFormList, Opreat } from '@/interface';
import city from '@/utils/city';
import lfService from '@/utils/request.localforage';

import './index.less';

@Component({
  name: '<%= modelTableName %>',
  components: {
    'a-tag': Tag,
  },
})
export default class <%= modelTableName %> extends Vue {
  modelName: string = '<%= EntityName %>'

  data: any[] = []

  pagination: object = {
    pageNo: 1,
    pageSize: 10
  }

  filterParams: any = {
    name: '',
    address: [],
    createtime: [],
    startTime: '',
    endTime: '',
  };

  BackParams: any = {
    code: 'data.result.resultCode',
    codeOK: 0,
    message: 'data.result.resultMessage',
    data: 'data.entity.data',
    total: 'data.entity.total',
  };

  outParams: any = {};

  filterList: FilterFormList[] = [
    {
      key: 'name',
      label: 'name',
      type: 'input',
      placeholder: 'Seach Name',
    },
    {
      key: 'address',
      label: 'address',
      type: 'cascader',
      placeholder: 'Seach address',
      options: city,
    },
    {
      key: 'createtime',
      label: 'Createtime',
      type: 'datetimerange',
      placeholder: ['start date', 'end date'],
      value: ['startTime', 'endTime'],
    },
  ];

  tableList: tableList[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Nickname',
      dataIndex: 'nickName',
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
    },
    {
      title: 'Birth date',
      dataIndex: 'birthDate',
    },
    {
      title: 'Gender',
      dataIndex: 'isMale',
      customRender: this.genderRender,
    },
    {
      title: 'ID number',
      dataIndex: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

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
  ];

  title: string = 'add <%= ModelName %>';

  visible: boolean = false;

  modelType: string = 'add';

  editData: object = {};

  async mounted () {
    await this.handleFetch()
  }

  async handleFetch () {
    const { pagination } = this
    const { result: { data } } = await lfService.request({
      url: `/${this.modelName}`,
      method: 'get',
      pagination
    })
    console.log(data)
    this.data = data
  }

  async handleDelete (row) {
    console.log('Deleting ... ')
    await lfService.request({
      url: `/${this.modelName}`,
      method: 'delete',
      data: row.id
    })
    setTimeout(() => this.handleFetch(), 1000)
  }

  handleEdit (row) {
    console.log('Editing ... ')
    this.$router.push({
      name: '<%= modelFormName %>',
      params: {
        id: row.id
      }
    })
  }

  handleCreate () {
    console.log('Creating ... ')
    this.$router.push({
      name: '<%= modelFormName %>'
    })
  }

  handleRemove (row) {
    this.$confirm({
      title: '警告',
      content: `真的要删除 ${row.id} 吗?`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('OK')
        this.handleDelete(row)
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel: () => {
        console.log('Cancel')
      }
    })
  }

  genderRender(text: any) {
    return <a-tag color={text ? 'blue' : 'purple'}>{text ? 'Male' : 'Female'}</a-tag>;
  }

  tableClick(key: string, row: any) {
    const data = JSON.parse(JSON.stringify(row));
    data.address = data.address.split(' ');
    data.birthDate = moment(data.birthDate, 'YYYY-MM-DD HH:mm:ss');
    switch (key) {
      case 'edit':
        this.editData = data;
        this.visible = true;
        this.modelType = 'edit';
        break;
      default:
        break;
    }
  }

  add() {
    this.title = 'Add customer';
    this.modelType = 'add';
    this.visible = true;
    this.editData = {};
  }

  closeModal() {
    this.visible = false;
    this.editData = {};
  }

  success() {
    this.visible = false;
    const Table: any = this.$refs.baseInfoTable;
    this.editData = {};
    Table.reloadTable();
  }

  render() {
    return (
      <div class="baseInfo-wrap">
        <filter-table
          ref="baseInfoTable"
          tableList={this.tableList}
          filterList={this.filterList}
          filterGrade={[]}
          scroll={{ x: 900 }}
          url={'/customers/baseInfoList'}
          filterParams={this.filterParams}
          outParams={this.outParams}
          addBtn={true}
          exportBtn={false}
          dataType={'json'}
          rowKey={'id'}
          opreat={this.opreat}
          fetchType={'post'}
          backParams={this.BackParams}
          on-menuClick={this.tableClick}
          on-add={this.add}
        />
      </div>
    );
  }
}