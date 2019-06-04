import { Component, Vue, Emit } from 'vue-property-decorator';
import { tableList, FilterFormList, operate } from '@/interface';
import lfService from '@/utils/request.localforage';
import { upperCaseFirst } from 'change-case';

@Component({})
export default class TableMixin extends Vue {
  modelName: string = ''

  data: any[] = []

  pageParams: object = {
    pageNum: 1,
    pageSize: 100,
    page: true,
  }

  filterParams: any = {
    id: '',
  }

  BackParams: any = {}

  outParams: any = {
    itemList: [],
  }

  filterList: FilterFormList[] = []

  tableList: tableList[] = []

  operate: operate[] = []

  title: string = `Add ${this.modelName}`

  visible: boolean = false

  modelType: string = 'add'

  editData: object = {}

  /*------------------------------------------------------------------------
  | Method shared
  | ----------------------------------------------------------------------*/
  mounted() {
    this.customRender();
    this.success();
  }

  activated() {
    this.customRender();
    this.success();
  }

  @Emit()
  add() {
    this.$log.suc('Creating ... ');
    const name = `${upperCaseFirst(this.modelName)}Form`;
    this.$router.replace({
      name,
    });
  }

  @Emit()
  export(ids) {
    const name = `${upperCaseFirst(this.modelName)}Form`;
    const {
      outParams: { itemList },
    } = this;
    this.$log.suc(`Exporting from ${name}Table ... `);
    this.$router.replace({
      name: 'ExportHelper',
      params: {
        modelName: this.modelName,
        data: JSON.stringify({ ids, itemList }),
      },
    });
  }

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
    const name = `${upperCaseFirst(this.modelName)}Form`;
    this.$log.suc('Editing ... ');
    this.$router.replace({
      name,
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
    const Table: any = this.$refs.InfoTable;
    Table.reloadTable();
  }

  /*------------------------------------------------------------------------
  | Method should be overrode
  | ----------------------------------------------------------------------*/
  customRender() {}

  genderRender(text: any) {}

  dateRender(value: string) {}

  @Emit()
  selectChange() {}

  @Emit()
  currentChange() {}

  @Emit()
  clearOutParams() {}
}
