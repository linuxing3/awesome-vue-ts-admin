<template>
  <div class="filter-form">
    <m-form
      ref="MForm"
      :item-list="itemList"
      :edit-data="editData"
      :form-params="formParams"
      :back-params="backParams"
      :out-params="outParams"
      :model-name="modelName"
      :save-btn="saveBtn"
      :reset-btn="resetBtn"
      @reset="resetFun"
      @setForm="setForm"
    />
  </div>
</template>

<script lang="ts">
import {
  Prop, Emit, Vue, Component,
} from 'vue-property-decorator';
import { FilterFormList, tableList, operate } from '@/interface/index';
import MForm from './MForm';

@Component({
  components: {
    'm-form': MForm,
  },
})
export default class FilterForm extends Vue {
  @Prop({ default: 'member' })
  private modelName!: string;

  @Prop({ default: {} })
  private editData!: any;

  // 筛选表单生成参数
  @Prop({ default: [] }) private itemList!: FilterFormList[];

  // 筛选表单存储数据参数
  @Prop({ default: {} })
  private formParams!: any;

  // 筛选表单存储数据参数
  @Prop({ default: {} })
  private backParams!: any;

  // 外部参数
  @Prop({ default: {} })
  private outParams!: any;

  // 是否展示save按钮
  @Prop({ default: false }) private saveBtn!: boolean;

  // 是否展示reset按钮
  @Prop({ default: false }) private resetBtn!: boolean;

  // 请求数据地址
  @Prop({ default: '' }) private url!: string;

  // 请求数据类型
  @Prop({ default: 'formData' })
  private dataType!: string;

  // ID
  @Prop({ default: 'id' }) private recordId!: string;

  // 操作参数
  @Prop() private operate!: operate[];

  // 操作栏width
  @Prop({ default: '100px' }) private operateWidth!: string;

  // 本地存储字段名
  @Prop({ default: 'MForm' }) private localName!: string;

  // 请求错误回调事件
  @Prop() private fetchError!: string;

  // 默认分页数量
  @Prop({ default: 50 }) private defaultPageSize!: number;

  // 请求数据方法
  @Prop({ default: 'json' }) private fetchType!: string;

  @Prop({ default: false }) private highlightCurrentRow!: boolean;

  @Prop({ default: null }) private scroll!: {x: number, y: number};

  // 初始化请求参数
  defaultFormParams: any = Object.assign(this.formParams, this.outParams);

  changeFormList: FilterFormList[];

  constructor(props: any) {
    super(props);
    const self = this;
    this.changeFormList = this.itemList;
  }

  reloadForm() {
    const form: any = this.$refs.MForm;
    // 延迟100ms加载数据
    setTimeout(() => {
      form.resetFields();
    }, 100);
  }

  @Emit()
  resetFun(params: any) {
    this.$log.suc('Emit reset from MForm...');
    this.$emit('reset', params);
    this.formParams = params;
    const form: any = this.$refs.MForm;
    // 延迟100ms加载数据
    setTimeout(() => {
      form.resetFields();
    }, 100);
  }

  @Emit()
  setForm(list: Array<string>) {
    this.$log.suc('Filter form items...');
    const filterList = this.itemList.filter((item, index) => list.indexOf(item.key) > -1);
    this.$emit('setForm', filterList);
  }

  @Emit()
  formClick(key: string, row: any) {
    this.$emit('menuClick', key, row);
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
