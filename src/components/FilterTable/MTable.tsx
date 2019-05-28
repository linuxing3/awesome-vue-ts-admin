import {
  Component, Prop, Emit, Vue, Inject, Provide,
} from 'vue-property-decorator';
import {
  Popconfirm, Table, Dropdown, Menu, Button, Icon,
} from 'ant-design-vue';
import { tableList, Opreat, Directives } from '@/interface';
import Spin from '@/components/Spin';
import './MTable.less';
import { createNamespacedHelpers } from 'vuex';
import { getValue } from '@/utils/helper';

@Component({
  components: {
    'a-table': Table,
    'a-popconfirm': Popconfirm,
    'm-spin': Spin,
    'a-dropdown': Dropdown,
    'a-menu-item': Menu.Item,
    'a-menu': Menu,
    'a-button': Button,
    'a-icon': Icon,
  },
})
export default class MTable extends Vue {
  @Prop() private tableList!: tableList[];

  @Prop() private url!: string;

  @Prop() private dataType!: string;

  @Prop({
    default: () => ({
      code: 'data.result.resultCode',
      codeOK: '0',
      message: 'data.result.resultMessage',
      data: 'data.entity',
      columns: 'config.params.columns',
      total: 'config.params.pageParams.total',
    }),
  }) private backParams!: {
    code: string,
    message: string,
    data: string,
    columns: string,
    codeOK: string | number,
    total: string
  };

  // 外部参数
  @Prop({ default: {} })
  private outParams!: any;

  // 行ID
  @Prop({ default: 'id' }) private rowKey!: string;

  // 操作栏数据
  @Prop({ default: () => [] }) private opreat!: Opreat[];

  // 操作栏width
  @Prop({ default: '100px' }) private opreatWidth!: string;

  // 本地存储名称
  @Prop({ default: 'filter-table' }) private localName!: string;

  // 请求报错回调
  @Prop() private fetchError!: Function;

  // 表格列数据
  @Prop() private tableParams!: any;

  // 请求类型
  @Prop({ default: 'get' }) private fetchType!: string;

  // 表格分页大小参数
  @Prop({ default: () => ['5', '10', '15', '20', '50', '100'] }) private pageSizeList!: number[];

  @Prop({ default: 50 }) private defaultPageSize!: number;

  @Prop() private highlightCurrentRow!: boolean;

  @Prop({ default: null }) private scroll!: {x: number, y: number};

  // data
  tableData: any = [];

  pageParams: {
    pageSize: number,
    pageNum: number,
    page: boolean,
  } = {
    pageSize: this.defaultPageSize,
    pageNum: 1,
    page: true,
  };

  loading: boolean = false;

  // 数据总数
  dataTotal: number = 0;

  constructor(props: any) {
    super(props);
    const self = this;
  }

  created() {
    this.getData();
  }

  reload() {
    this.pageParams.pageNum = 1;
    this.getData();
  }

  /**
   * @method 获取表格数据
   */
  getData() {
    this.$log.suc('Fetching ...');
    this.loading = true;
    const params = {
      pageParams: { ...this.pageParams },
      filter: { ...this.tableParams },
      out: { ...this.outParams },
    };
    this.$log.suc('Mtable get Data Params:', params);
    window.ajax.request({
      url: this.url,
      method: this.fetchType,
      params,
    }).then((res: any) => {
      this.$log.suc('Table Fetch response:', res);
      this.loading = false;
      const code = getValue(this.backParams.code, res);
      if (code === this.backParams.codeOK) {
        this.tableData = getValue(this.backParams.data, res);
        this.$log.suc('MTable table data:', this.tableData);
        // table list and columns
        // this.tableList = getValue(this.backParams.columns, res);
        // table total
        this.dataTotal = getValue(this.backParams.total, res)
          ? getValue(this.backParams.total, res) : 0;
      } else {
        this.$message.error(getValue(this.backParams.message, res));
      }
    });
  }

  /**
   * @method 获取表格数据
   */
  getAjaxData() {
    this.loading = true;
    window.ajax.request({
      url: this.url,
      method: this.fetchType,
      fetchType: this.dataType,
      data: Object.assign(
        this.tableParams ? this.tableParams : {},
        this.pageParams,
        this.outParams,
      ),
    }).then((res: any) => {
      this.loading = false;
      const code = getValue(this.backParams.code, res);
      if (code === this.backParams.codeOK) {
        this.tableData = getValue(this.backParams.data, res);
        this.dataTotal = getValue(this.backParams.total, res)
          ? getValue(this.backParams.total, res) : 0;
      } else {
        this.$message.error(getValue(this.backParams.message, res));
      }
    });
  }

  // 选择变化
  selectChange(val: any) {
    this.$emit('selectChange', val);
  }

  // 单选
  currentChange(val: any) {
    this.$emit('currentChange', val);
  }

  render() {
    // Generate table list/ columns
    if (this.opreat.length && this.tableList[this.tableList.length -1].title !== '操作') {
      this.tableList.push({
        title: '操作',
        dataIndex: 'action',
        width: this.opreatWidth,
        customRender: this.opreatJSX,
      });
    }
    return (
      <div class="m-table" >
        <a-table
          bordered
          loading={this.loading}
          rowKey={this.rowKey}
          dataSource={this.tableData}
          scroll={this.scroll}
          pagination={{
            current: this.pageParams.pageNum,
            defaultPageSize: this.defaultPageSize,
            pageSize: this.pageParams.pageSize,
            pageSizeOptions: this.pageSizeList,
            showQuickJumper: true,
            showSizeChanger: true,
            total: this.dataTotal,
          }}
          columns={this.tableList}
          on-change={this.tableChange}
        >
        </a-table>
      </div>
    );
  }

  /**
   * @method 操作栏的渲染函数，参数对应antd的Columns>customRender的参数
   * @param {any} text 当前列的值
   * @param {object} record 当前行的值
   * @param {number} index 当前列的序列号
   */
  opreatJSX(text: any, record: any, index: number) {
    // 操作超过4个，就用下拉菜单方式
    if (this.opreat.length > 4) {
      return <a-dropdown on-command={(command: string) => this.menuClick(command, record)}>
        <a-button type="dashed" size="small" style="margin-left: 8px">
          操作栏 <a-icon type="down" />
        </a-button>
        <a-menu slot="overlay">
          {
            this.opreat.map((item, indexs) => <a-menu-item
              key={indexs}
              command={item.key}
              disabled={item.disabled && item.disabled(record)}
            >
              {typeof item.text === 'function' ? item.text(record) : item.text}
            </a-menu-item>)
          }
        </a-menu>
      </a-dropdown>;
    }
    // 普通模式
    return <div class="table-opreat">
      {
        this.opreat.map((item, indexs) => {
          const whiteList = ['red', 'orange'];
          if (item.disabled && item.disabled(record)) {
            return <a id={`${item.key}-${record[item.rowKey]}`} key={indexs} class="btn disabled">
              { typeof item.text === 'function' ? item.text(record) : item.text }
            </a>;
          } if (whiteList.indexOf(typeof item.color === 'function' ? item.color(record) : item.color) >= 0) {
            return <a-popconfirm
              on-confirm={() => this.menuClick(item.key, record)}
              title={typeof item.msg === 'function' ? item.msg(record) : item.msg}>
              <a id={`${item.key}-${record[item.rowKey]}`} key={indexs} class={`link-${typeof item.color === 'function' ? item.color(record) : item.color}`}>
                { typeof item.text === 'function' ? item.text(record) : item.text }
              </a>
            </a-popconfirm>;
          }
          return <a id={`${item.key}-${record[item.rowKey]}`} class={`link-${typeof item.color === 'function' ? item.color(record) : item.color}`} key={indexs} on-click={() => this.menuClick(item.key, record)}>{typeof item.text === 'function' ? item.text(record) : item.text}</a>;
        })
      }
    </div>;
  }

  tableChange(pagination: any, filters: any, sorter: any) {
    this.pageParams.pageSize = pagination.pageSize;
    this.pageParams.pageNum = pagination.current;
    this.getData();
  }

  menuClick(key: string, row: any) {
    this.$emit('tableClick', key, row);
  }
}
