<template>
  <div class="filter-form">
    <m-form
      ref="MForm"
      :filter-list="filterList"
      :filter-grade="filterGrade"
      :filter-params="filterParams"
      :form-list="defalutFormList"
      :add-btn="addBtn"
      :export-btn="exportBtn"
      :export-fun="exportBack"
      :local-name="localName"
      @search="searchFun"
      @addFun="addBack"
      @clearOut="clearFun"
      @setForm="setForm"
      @tableHeight="tableHeight"
    />
  </div>
</template>

<script lang="ts">
import {
  Prop, Emit, Vue, Component,
} from 'vue-property-decorator';
import { FilterFormList, tableList, Opreat } from '@/interface/index';
import MForm from './MForm';

@Component({
  components: {
    'm-form': MForm,
  },
})
export default class FilterForm extends Vue {
  // 筛选表单生成参数
  @Prop({ default: [] }) private filterList!: FilterFormList[];

  // 筛选表单高级生成参数
  @Prop({ default: [] }) private filterGrade!: FilterFormList[];

  // 筛选表单存储数据参数
  @Prop({ default: {} })
  private filterParams!: any;

  // 外部参数
  @Prop({ default: {} })
  private outParams!: any;

  // 是否展示新增按钮
  @Prop({ default: false }) private addBtn!: boolean;

  // 是否展示导出按钮
  @Prop({ default: false }) private exportBtn!: boolean;

  // 表格参数
  @Prop({ default: [] }) private tableList!: tableList[];

  // 请求数据地址
  @Prop({ default: '' }) private url!: string;

  // 请求数据类型
  @Prop({ default: 'formData' })
  private dataType!: string;

  // 表格行ID
  @Prop({ default: 'id' }) private rowKey!: string;

  // 操作参数
  @Prop({ default: [] }) private opreat!: Opreat[];

  // 操作栏width
  @Prop({ default: '100px' }) private opreatWidth!: string;

  // 本地存储字段名
  @Prop({ default: 'filterForm' }) private localName!: string;

  // 请求错误回调事件
  @Prop() private fetchError!: string;

  // 默认分页数量
  @Prop({ default: 50 }) private defaultPageSize!: number;

  // 数据返回格式
  @Prop() private backParams!: object;

  // 请求数据方法
  @Prop({ default: 'json' }) private fetchType!: string;

  @Prop({ default: false }) private highlightCurrentRow!: boolean;

  @Prop({ default: null }) private scroll!: {x: number, y: number};

  // 初始化请求参数
  tableParams: any = Object.assign(this.filterParams, this.outParams);

  defalutFormList: tableList[] = this.tableList.filter(item => true);

  changeFormList: tableList[];

  constructor(props: any) {
    super(props);
    const self = this;
    const saveList = window.localStorage.getItem(this.localName);
    if (saveList) {
      const checkList = saveList.split(',');
      const filterList = this.defalutFormList.filter((item, index) => checkList.indexOf(item.dataIndex) > -1);
      this.changeFormList = filterList;
    } else {
      this.changeFormList = this.tableList.filter(item => true);
    }
  }

  @Emit()
  clearFun() {
    this.$emit('clearOutParams');
  }

  reloadForm() {
    const form: any = this.$refs.MForm;
    // 延迟100ms加载数据
    setTimeout(() => {
      form.reload();
    }, 100);
  }

  @Emit()
  searchFun(params: any) {
    console.log('Emit searching from FilterForm...');
    this.$emit('search', params);
    this.tableParams = params;
    const form: any = this.$refs.MForm;
    // 延迟100ms加载数据
    setTimeout(() => {
      form.reload();
    }, 100);
  }

  @Emit()
  addBack() {
    console.log('Emit adding from FilterForm...');
    this.$emit('add');
  }

  @Emit()
  tableHeight(params: any) {
    const form: any = this.$refs.MForm;
    form.$el.style.marginTop = `${params - 48}px`;
  }

  @Emit()
  exportBack() {
    console.log('Emit exporting from FilterForm...');
    this.$emit('export');
  }

  @Emit()
  setForm(list: Array<string>) {
    const filterList = this.defalutFormList.filter((item, index) => list.indexOf(item.dataIndex) > -1);
    this.changeFormList = filterList;
  }

  @Emit()
  tableClick(key: string, row: any) {
    this.$emit('menuClick', key, row);
  }

  @Emit()
  selectChange(val: any) {
    this.$emit('selectChange', val);
  }

  @Emit()
  currentChange(val: any) {
    this.$emit('currentChange', val);
  }
}
</script>

<style lang="less" scoped>
.filter-form {
  overflow: hidden;
  min-height: e("calc(100vh - 100px)");
}
</style>
