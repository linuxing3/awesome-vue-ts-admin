# 封装`vue component`

## Table of contents

<!-- toc -->

- [封装`vue component`](#%E5%B0%81%E8%A3%85vue-component)
  - [Table of contents](#Table-of-contents)
  - [将`vue`封装为`tsx`组件的方法](#%E5%B0%86vue%E5%B0%81%E8%A3%85%E4%B8%BAtsx%E7%BB%84%E4%BB%B6%E7%9A%84%E6%96%B9%E6%B3%95)
  - [封装`filter-table`](#%E5%B0%81%E8%A3%85filter-table)
    - [在`main.ts`中，进行全局引用](#%E5%9C%A8maints%E4%B8%AD%E8%BF%9B%E8%A1%8C%E5%85%A8%E5%B1%80%E5%BC%95%E7%94%A8)
    - [封装主要组件](#%E5%B0%81%E8%A3%85%E4%B8%BB%E8%A6%81%E7%BB%84%E4%BB%B6)
      - [`components/FilterTable/index.vue`](#componentsFilterTableindexvue)
    - [封装子组件](#%E5%B0%81%E8%A3%85%E5%AD%90%E7%BB%84%E4%BB%B6)
      - [`MFilter`组件](#MFilter%E7%BB%84%E4%BB%B6)
      - [`MTable`组件](#MTable%E7%BB%84%E4%BB%B6)
  - [使用`vue-tsx-support`](#%E4%BD%BF%E7%94%A8vue-tsx-support)
- [vue-tsx-support](#vue-tsx-support)
  - [BREAKING CHANGES](#BREAKING-CHANGES)
  - [Install and enable](#Install-and-enable)
  - [Using intrinsic elements](#Using-intrinsic-elements)
  - [Using custom component](#Using-custom-component)
    - [available APIs to add type information](#available-APIs-to-add-type-information)
      - [componentFactory](#componentFactory)
      - [component](#component)
      - [extendFrom](#extendFrom)
      - [mixin](#mixin)
      - [componentFactoryOf](#componentFactoryOf)
      - [Component](#Component)
      - [ofType](#ofType)
    - [Other attributes](#Other-attributes)
      - [Native event listeners and dom properties](#Native-event-listeners-and-dom-properties)
      - [HTML attributes attached to the root element](#HTML-attributes-attached-to-the-root-element)
  - [Options](#Options)
    - [allow-element-unknown-attrs](#allow-element-unknown-attrs)
    - [allow-unknown-props](#allow-unknown-props)
    - [enable-html-attrs](#enable-html-attrs)
    - [enable-nativeon](#enable-nativeon)
    - [enable-vue-router](#enable-vue-router)
  - [Utility](#Utility)
    - [modifiers](#modifiers)
      - [Available modifiers](#Available-modifiers)


其实vue 写 component 相当简单和方便。

但很多第三方封装的组件参数配置项其实是有缺损的。如一些富文本或者图表组件，配置项远比你想想中的多得多，第三方封装组件很难覆盖全部所有配置。第三方组件的更新频率很难保证。
灵活性和针对性。需要很多针对业务的特殊需求，使用第三方包装的组件不合适，一般基于第三方封装的组件是很难拓展的。大部分组件还是自己封装来的更为方便和灵活一些。

## 将`vue`封装为`tsx`组件的方法

1. 改属性

```javascript
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    'a-card': Card
  }
})
class Component extends Vue {
  @Prop({ default: 'ant admin' }) name: string;
}
```

2. 改变量
```javascript
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    'a-card': Card
  }
})
class Component extends Vue {
  @Prop({ default: 'ant admin' }) name: string;
  age: number = 10;
}
```
3. 改方法
```javascript
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    'a-card': Card
  }
})
class Component extends Vue {
  @Prop({ default: 'ant admin' }) name: string;
  age: number = 10;
  render() {
    return <span></span>
  }
}
```
4. 改模板

使用`render`函数

```javascript
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    'a-card': Card
  }
})
class Component extends Vue {
  @Prop({ default: 'ant admin' }) name: string;
  age: number = 10;
  render() {
    return <span>Component here</span>
  }
}
```

5. 调用方法

```javascript
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    'a-card': Card
  }
})
class Component extends Vue {
  // 属性
  @Prop({ default: 'ant admin' }) name: string;
  // 数据
  age: number = 10;
  // 方法
  onClick() {
    this.name = 'vue admin';
  }
  // 渲染函数
  render() {
    return <span on-click={this.onClick}>{this.name}</span>
  }
}
```

> 如果需要调用参数，写成`() => this.onClick(name)`

## 封装`filter-table`

### 在`main.ts`中，进行全局引用

```javascript
// 自定义全局组件
import Vue from 'vue';
import FilterTable from '@/components/FilterTable/index.vue';
import MTable from '@/components/FilterTable/MTable';
import MFilter from '@/components/FilterTable/MFilter';

Vue.component('filter-table', FilterTable);
Vue.component('m-table', MTable);
Vue.component('m-filter', MFilter);
```

### 封装主要组件

#### `components/FilterTable/index.vue`

模板部分

```html
  <div class="filter-table">
    <m-filter
      ref="MFilter"
      :filter-list="filterList"
      :filter-grade="filterGrade"
      :filter-params="filterParams"
      :table-list="defaultTableList"
      :add-btn="addBtn"
      :export-btn="exportBtn"
      :export-fun="exportBack"
      :local-name="localName"
      @search="searchFun"
      @addFun="addBack"
      @clearOut="clearFun"
      @setTable="setTable"
      @tableHeight="tableHeight"
    />
    <m-table
      ref="MTable"
      :table-list="changeTableList"
      :url="url"
      :data-type="dataType"
      :row-key="rowKey"
      :operate="operate"
      :out-params="outParams"
      :operate-width="operateWidth"
      :back-params="backParams"
      :local-name="localName"
      :fetch-type="fetchType"
      :fetch-error="fetchError"
      :table-params="tableParams"
      :default-page-size="defaultPageSize"
      :highlight-current-row="highlightCurrentRow"
      :scroll="scroll"
      @tableClick="tableClick"
      @selectChange="selectChange"
      @currentChange="currentChange"
    />
  </div>
```

脚本部分

```javascript
import {
  Prop, Emit, Vue, Component,
} from 'vue-property-decorator';
import { FilterFormList, tableList, operate } from '@/interface/index';
import MFilter from './MFilter';
import MTable from './MTable';

@Component({
  components: {
    'm-filter': MFilter,
    'm-table': MTable,
  },
})
export default class FilterTable extends Vue {
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
  @Prop({ default: [] }) private operate!: operate[];

  // 操作栏width
  @Prop({ default: '150px' }) private operateWidth!: string;

  // 本地存储字段名
  @Prop({ default: 'filterTable' }) private localName!: string;

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

  defaultTableList: tableList[] = this.tableList.filter(item => true);

  changeTableList: tableList[];

  constructor(props: any) {
    super(props);
    const self = this;
    const saveList = window.localStorage.getItem(this.localName);
    if (saveList) {
      const checkList = saveList.split(',');
      const filterList = this.defaultTableList.filter((item, index) => checkList.indexOf(item.dataIndex) > -1);
      this.changeTableList = filterList;
    } else {
      this.changeTableList = this.tableList.filter(item => true);
    }
  }

  reloadTable() {
    const table: any = this.$refs.MTable;
    // 延迟500ms加载数据
    setTimeout(() => {
      this.$log.suc('Reloading...');
      table.reload();
    }, 1000);
  }

  @Emit()
  clearFun() {
    this.$emit('clearOutParams');
    this.reloadTable();
  }

  @Emit()
  searchFun(params: any) {
    this.$log.suc('Emit searching from FilterTable...');
    // tableParams is filter
    this.tableParams = params;
    this.reloadTable();
  }

  @Emit()
  addBack() {
    this.$log.suc('Emit adding from FilterTable...');
    this.$emit('add');
  }

  @Emit()
  tableHeight(params: any) {
    const table: any = this.$refs.MTable;
    table.$el.style.marginTop = `${params - 48}px`;
  }

  @Emit()
  exportBack() {
    this.$log.suc('Emit exporting from FilterTable...');
    const table: any = this.$refs.MTable;
    this.$emit('export', table.ids);
  }

  @Emit()
  setTable(list: Array<string>) {
    const filterList = this.defaultTableList.filter((item, index) => list.indexOf(item.dataIndex) > -1);
    this.changeTableList = filterList;
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
```

### 封装子组件

#### `MFilter`组件

```javascript
import {
  Component, Prop, Emit, Vue,
} from 'vue-property-decorator';
import {
  Input, Select, Form, TimePicker, DatePicker, Cascader, Row, Col, Button, Modal, Checkbox, Radio,
} from 'ant-design-vue';
import { FilterFormList, tableList } from '@/interface';

import './MFilter.less';

@Component({
  components: {
    'a-input': Input,
    'a-option': Select.Option,
    'a-select': Select,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-time-picker': TimePicker,
    'a-date-picker': DatePicker,
    'a-range-picker': DatePicker.RangePicker,
    'a-cascader': Cascader,
    'a-row': Row,
    'a-col': Col,
    'a-button': Button,
    'a-modal': Modal,
    'a-radio-group': Radio.Group,
    'a-radio-button': Radio.Button,
    'a-checkbox-group': Checkbox.Group,
    'a-checkbox': Checkbox,
  },
  props: {
    Form,
  },
})

class MFilterClass extends Vue {
  // 筛选表单生成参数
  @Prop({ default: [] })
  private filterList!: FilterFormList[];

  // 筛选表单高级生成参数
  @Prop({ default: [] })
  private filterGrade!: FilterFormList[];

  // 筛选表单存储数据参数
  @Prop({ default: {} }) private filterParams!: any;

  // 是否展示新增按钮
  @Prop({ default: false }) private addBtn!: boolean;

  // 是否展示导出按钮
  @Prop({ default: false }) private exportBtn!: boolean;

  // 导出按钮回调事件
  @Prop({ default: () => { } }) private exportFun!: Function;

  // tablelist 参数
  @Prop({ default: [] }) private tableList!: tableList[];

  @Prop({ default: '100px' }) private labelWidth!: string;

  @Prop({ default: 'filterTable' }) private localName!: string;

  // data
  params: any = JSON.parse(JSON.stringify(this.filterParams));

  // 初始化表格筛选参数
  initParams: any = JSON.parse(JSON.stringify(this.filterParams));

  btnXl: number = 24 - (this.filterList.length * 3);

  btnlg: number = 24 - (this.filterList.length * 3);

  btnmd: number = 24 - (this.filterList.length * 4);

  // 弹出窗开关
  setModel: boolean = false;

  // 表格显示的列表
  checkList: Array<string> = [];

  // 高级搜索开关
  showGrade: boolean = false;

  // 高级筛选高度
  tableMarginTop: number = 0;

  constructor(props: any) {
    super(props);
    const self = this;
    const saveList = window.localStorage.getItem(this.localName);
    if (saveList) {
      this.checkList = saveList.split(',');
    }
  }

  created() {
    if (!this.checkList.length) {
      this.tableList.map((item) => {
        if (item.dataIndex) {
          this.checkList.push(item.dataIndex);
        }
        return false;
      });
    }
  }

  // methods
  @Emit()
  onSearch(): void {
    this.$emit('search', Object.assign(this.params, this.Form.getFieldsValue()));
  }

  @Emit()
  reset(): void {
    this.Form.resetFields();
    this.$emit('clearOut');
  }

  @Emit()
  levelcodeChange(val: any, key: string): void {
    const value = JSON.parse(JSON.stringify(val));
    this.params.levelCode = value.pop();
  }

  @Emit()
  openSetting(): void {
    this.setModel = true;
  }

  @Emit()
  closeModal(): void {
    this.setModel = false;
  }

  @Emit()
  gradeSwitch(val: boolean): void {
    this.showGrade = val;
    this.tableMarginTop = val
      ? (this.$refs.filterGrade as Element).clientHeight
      : (this.$refs.filterNormal as Element).clientHeight;
    this.$emit('tableHeight', this.tableMarginTop);
  }

  @Emit()
  addFun(): void {
    this.$emit('addFun');
  }

  formItem(getFieldDecorator: any, item: FilterFormList, index: number, grade?: boolean) {
    let itemDom = null;
    switch (item.type) {
      case 'input':
        itemDom = <a-input id={item.key}
          placeholder={item.placeholder}></a-input>;
        break;
      case 'select':
        itemDom = <a-select
          style="width: 100%;"
          id={item.key}
          placeholder={item.placeholder}>
          {
            item.options && item.options.map((items: any, indexs: number) => <a-option
              key={indexs} value={items.value}>{ items.label }</a-option>)
          }
        </a-select>;
        break;
      case 'cascader':
        itemDom = <a-cascader style="width: 100%;"
          id={item.key}
          allowClear
          changeOnSelect
          fieldNames={item.fieldNames}
          options={item.options}
          placeholder={item.placeholder}
          on-change={item.change}></a-cascader>;
        break;
      case 'levelcode':
        itemDom = <a-cascader style="width: 100%;"
          id={item.key}
          allowClear
          changeOnSelect
          fieldNames={item.fieldNames}
          options={item.options}
          placeholder={item.placeholder}
          on-change={(e: Array<string>) => this.levelcodeChange(e, item.key)}></a-cascader>;
        break;
      case 'datetime':
        itemDom = <a-date-picker
          id={item.key}
          showTime
          format="HH:mm:ss"
          placeholder={item.placeholder}>
        </a-date-picker>;
        break;
      case 'date':
        itemDom = (
          <a-date-picker
            id={item.key}
            format="YYYY-MM-DD"
            placeholder={item.placeholder}
          />
        );
        break;
      case 'datetimerange':
        itemDom = <a-range-picker
          style="width: 100%"
          id={item.key}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          disabledTime={item.disabledTime}
          on-change={(e: Array<Date>) => this.rangeChange(e, item.value ? item.value : [])}
          placeholder={item.placeholder}>
        </a-range-picker>;
        break;
      case 'checkboxButton':
        itemDom = <a-radio-group
          on-change={item.change}
          size="small">
          {
            item.options && item.options.map((
              items,
              indexs: number,
            ) => <a-radio-button
              value={items.value}
              key={indexs}>
                {items.label}
              </a-radio-button>)
          }
        </a-radio-group>;
        break;
      default: break;
    }
    if (grade) {
      return (
        <a-col {...{ props: this.gradeLayout }} key={index}>
          <a-form-item {...{ props: this.formItemLayout }} label={item.label}>
            {getFieldDecorator(item.key)(itemDom)}
          </a-form-item>
        </a-col>
      );
    }
    return (
      <a-col {...{ props: this.nomalLayout }} key={index}>
        <a-form-item>
          {
            getFieldDecorator(item.key)(itemDom)
          }
        </a-form-item>
      </a-col>
    );
  }

  nomalLayout = {
    span: 4,
    xl: 3,
    lg: 3,
    md: 4,
    sm: 8,
    xs: 12,
  }

  gradeLayout = {
    span: 8,
    xl: 8,
    lg: 8,
    md: 12,
    sm: 12,
    xs: 12,
  }

  formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 6 },
      xl: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 16 },
      lg: { span: 18 },
      xl: { span: 18 },
    },
  }

  // 时间区间赋值操作
  rangeChange(data: any, value: string[]) {
    this.params[value[0]] = data[0].format('YYYY-MM-DD hh:mm:ss');
    this.params[value[1]] = data[1].format('YYYY-MM-DD hh:mm:ss');
  }

  render() {
    const { getFieldDecorator } = this.Form as any;
    const { isMobile } = this.$store.state.app;
    return (
      <div class={`filter-wrap ${this.showGrade ? 'showGrade' : ''}`}>
        <div class="filter-mormal" ref="filterNormal">
          <a-form layout="inline">
            <a-row gutter={20}>
              {
                this.filterList.map((item, index) => this.formItem(getFieldDecorator, item, index))
              }
              <a-col class="btn-wrap" xl={this.btnXl} lg={this.btnlg} md={this.btnmd ? this.btnmd : 24} sm={24} xs={24}>
                {this.renderButtons(true)}
              </a-col>
            </a-row>
          </a-form>
        </div>
        {
          this.filterGrade.length
            ? <div class="filter-grade" ref="filterGrade" id="filter-grade">
              <a-form>
                <a-row gutter={20}>
                  {
                    this.filterGrade.map((item, index) => this.formItem(getFieldDecorator, item, index, true))
                  }
                  <a-col class="btn-wrap" span={24} sm={24} xs={24}>
                    {this.renderButtons(false)}
                  </a-col>
                </a-row>
              </a-form>
            </div> : null
        }
        <a-modal id="tableSet" width="500px" title="Table Setting" visible={this.setModel} on-ok={this.setTable} on-cancel={this.closeModal}>
          <a-checkbox-group class="checkbox-list" v-model={this.checkList}>
            {
              this.tableList.map((item, index) => <a-checkbox key={index} value={item.dataIndex}>
                {item.title}</a-checkbox>)
            }
          </a-checkbox-group>
        </a-modal>
      </div>
    );
  }

  setTable() {
    if (this.checkList.length > 0) {
      window.localStorage.setItem(this.localName, this.checkList.join(','));
      this.$emit('setTable', this.checkList);
      this.setModel = false;
    } else {
      this.$message.error('At least one column！');
    }
  }

  renderButtons(isNormal: boolean): JSX.Element {
    return (
      <div>
        <a-button on-click={this.onSearch} id="tableSearch" icon="search">Search</a-button>
        <a-button type="danger" on-click={this.reset} id="tableReset" icon="reload">Refresh</a-button>
        {
          this.filterGrade.length ? <a on-click={() => this.gradeSwitch(isNormal)} class="grade-btn">{isNormal ? 'Common' : 'Senior'} Search{isNormal ? <i class="iconfont-down"></i> : <i class="iconfont-up"></i>}</a> : null
        }
        <div class="right-btn">
          {
            this.addBtn ? <a-button type="primary" on-click={this.addFun} id={isNormal ? 'tableAdd' : 'tableAdd2'} icon="plus">Add</a-button> : null
          }
          {
            this.exportBtn ? <a-button on-click={this.exportFun} id={isNormal ? 'tableExport' : 'tableExport2'} icon="download" shape="circle"></a-button> : null
          }
          <a-button on-click={this.openSetting} id="tableSet" icon="setting" shape="circle"></a-button>
        </div>
      </div>
    );
  }
}
const MFilter = Form.create({
  props: {
    filterList: Array,
    filterGrade: Array,
    filterParams: Object,
    addBtn: Boolean,
    exportBtn: Boolean,
    exportFun: Function,
    tableList: Array,
    labelWidth: String,
  },
})(MFilterClass);
export default MFilter;
```

#### `MTable`组件

```javascript
import {
  Component, Prop, Emit, Vue,
} from 'vue-property-decorator';
import {
  Input, Select, Form, TimePicker, DatePicker, Cascader, Row, Col, Button, Modal, Checkbox, Radio, Card,
} from 'ant-design-vue';
import titleCase from 'title-case';
import { FilterFormList } from '@/interface';
import { api } from '@/api';
import { convertDate } from '@/utils/datetime';

import './MForm.less';

@Component({
  components: {
    'a-card': Card,
    'a-input': Input,
    'a-textarea': Input.TextArea,
    'a-option': Select.Option,
    'a-select': Select,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-time-picker': TimePicker,
    'a-date-picker': DatePicker,
    'a-range-picker': DatePicker.RangePicker,
    'a-cascader': Cascader,
    'a-row': Row,
    'a-col': Col,
    'a-button': Button,
    'a-modal': Modal,
    'a-radio-group': Radio.Group,
    'a-radio-button': Radio.Button,
    'a-checkbox-group': Checkbox.Group,
    'a-checkbox': Checkbox,
  },
  props: {
    Form,
  },
})
class MFormClass extends Vue {
  @Prop()
  private modelName!: string

  // 筛选表单生成参数
  @Prop({ default: [] })
  private itemList!: FilterFormList[]

  // 是否展示新增按钮
  @Prop({ default: false }) private saveBtn!: boolean

  // 是否展示导出按钮
  @Prop({ default: false }) private resetBtn!: boolean

  // 导出按钮回调事件
  @Prop({ default: () => {} }) private exportFun!: Function

  get id() {
    return this.$route.params.id || -1;
  }

  // 弹出窗开关
  setModal: boolean = false

  nomalLayout = {
    span: 8,
    xl: 8,
    lg: 8,
    md: 12,
    sm: 12,
    xs: 24,
  }

  formItrenderFmLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 6 },
      xl: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
      md: { span: 16 },
      lg: { span: 18 },
      xl: { span: 18 },
    },
  }

  mounted() {
    this.$nextTick(() => {
      this.getInfo();
    });
  }

  @Emit()
  save(e: HTMLFormElement) {
    e.preventDefault();
    this.Form.validateFields((err: any, values: object) => {
      if (!err) {
        console.log('Form Values:', values);
        const data = convertDate(this.itemList, values)[0];
        console.log('Converted Form Values:', data);
        Modal.confirm({
          title: '表单数据',
          okText: 'Next Record',
          cancelText: 'Data Table',
          maskClosable: true,
          onOk: () => {
            this.addOrEdit(data);
            new Promise((resolve) => {
              setTimeout(resolve, 500);
            }).then(() => {
              this.reset();
            });
          },
          onCancel: () => {
            this.addOrEdit(data);
            new Promise((resolve) => {
              setTimeout(resolve, 500);
            }).then(() => {
              this.reset('showDataTable');
            });
          },
        });
      }
    });
  }

  @Emit()
  addOrEdit(data) {
    if (this.id === -1) {
      this.$log.suc('Creating...');
      api.request({
        url: `/${this.modelName}`,
        method: 'post',
        data,
      });
    } else {
      this.$log.suc('updating...');
      api.request({
        url: `/${this.modelName}`,
        method: 'patch',
        data,
      });
    }
  }

  @Emit()
  getInfo() {
    this.$log.info('getting edit info...');
    if (this.id === -1) {
      // this.setForm();
      return;
    }
    api.request({
        url: `/${this.modelName}`,
        method: 'get',
        data: { id: this.id },
      })
      .then(({ data, config }) => {
        this.$log.info('Get Data:', data.entity);
        this.loadEditInfo(convertDate(this.itemList, data.entity, false)[0]);
      });
  }

  @Emit()
  loadEditInfo(data) {
    this.$emit('loadEditInfo', data);
    this.$log.suc(`编辑记录 ${this.id}`);
    new Promise((resolve) => {
      setTimeout(resolve, 500);
    }).then(() => {
      this.$log.suc('formData:', data);
      this.Form.setFieldsValue(data);
    });
  }

  // methods
  @Emit()
  setForm(): void {
    const { params } = api.validateUrl({
      url: `/${this.modelName}`,
      method: 'get',
      data: { id: this.id },
    });
    this.$emit('setForm', params.columns);
  }

  @Emit()
  reset(event?): void {
    this.Form.resetFields();
    if (event) this.$emit(event);
  }

  @Emit()
  levelcodeChange(val: any, key: string): void {
    const value = JSON.parse(JSON.stringify(val));
  }

  @Emit()
  openModal(): void {
    this.setModal = true;
  }

  @Emit()
  closeModal(): void {
    this.setModal = false;
  }

  renderFormInput(getFieldDecorator: any, item: FilterFormList, index: number) {
    const key = item.key;
    const label = `${this.$t(item.key)} / ${item.key}`;
    const placeholder = `Input ${titleCase(item.key)}`;
    const itemDom = <a-input id={key} label={label} placeholder={placeholder} />;
    return (
      <a-col {...{ props: this.nomalLayout }} key={index}>
        <a-form-item label={label}>{getFieldDecorator(key)(itemDom)}</a-form-item>
      </a-col>
    );
  }

  renderFormItem(getFieldDecorator: any, item: FilterFormList, index: number) {
    let itemDom = null;
    const {
      key, value, options, change, fieldNames, disabledTime,
    } = item;
    /**
     * 翻译标签和占位符
     */
    const label = `${this.$t(item.key)} / ${titleCase(item.key)}`;
    const placeholder = `Input ${titleCase(item.key)}`;
    /**
     * 根据项目类型，动态生成不同的表单控件
     */
    switch (item.type) {
      // 文本框
      case 'input':
        itemDom = <a-input style="width: 100%;" id={key} label={label} placeholder={placeholder} disabled={key === 'id'} />;
        break;
      // 段落框
      case 'textarea':
        itemDom = <a-textarea style="width: 100%;" id={key} label={label} placeholder={placeholder} />;
        break;
      // 选择器
      case 'select':
        itemDom = (
          <a-select
            style="width: 100%;"
            id={key}
            label={label}
            placeholder={placeholder}
          >
            {options
              && options.map((items: any, indexs: number) => (
                <a-option key={items.label} value={items.value}>
                  {items.label}
                </a-option>
              ))}
          </a-select>
        );
        break;
      // 级联选择器
      case 'cascader':
        itemDom = (
          <a-cascader
            allowClear
            changeOnSelect
            style="width: 100%;"
            label={label}
            id={key}
            options={options}
            placeholder={placeholder}
            fieldNames={fieldNames}
            on-change={change}
          />
        );
        break;
      // 级别类的级联选择器
      case 'levelcode':
        itemDom = (
          <a-cascader
            style="width: 100%;"
            id={key}
            label={label}
            allowClear
            changeOnSelect
            fieldNames={fieldNames}
            options={options}
            placeholder={placeholder}
            on-change={(e: Array<string>) => this.levelcodeChange(e, key)}
          />
        );
        break;
      // 日期时间
      case 'datetime':
        itemDom = (
          <a-time-picker
            style="width: 100%;"
            id={key}
            label={label}
            format="HH:mm"
            placeholder={placeholder}
          />
        );
        break;
      // 日期
      case 'date':
        itemDom = (
          <a-date-picker
            style="width: 100%;"
            id={key}
            label={label}
            format="YYYY/M/D"
            placeholder={placeholder}
          />
        );
        break;
      // 日期区间
      case 'datetimerange':
        itemDom = (
          <a-range-picker
            style="width: 100%"
            id={key}
            label={label}
            showTime
            format="YYYY/M/D HH:mm:ss"
            disabledTime={disabledTime}
            placeholder={placeholder}
          />
        );
        break;
      // 选择按钮
      case 'checkboxButton':
        itemDom = (
          <a-radio-group on-change={change} label={label} size="small">
            {options
              && options.map((items, indexs: number) => (
                <a-radio-button value={value} key={indexs}>
                  {label}
                </a-radio-button>
              ))}
          </a-radio-group>
        );
        break;
      default:
        break;
    }
    return (
      <a-col {...{ props: this.nomalLayout }} key={index}>
        <a-form-item label={label}>{getFieldDecorator(key)(itemDom)}</a-form-item>
      </a-col>
    );
  }

  renderActionBtn(isNormal: boolean): JSX.Element {
    return (
      <div>
        <div class="right-btn">
          {this.saveBtn ? (
            <a-button
              on-click={this.save}
              id={isNormal ? 'formAdd' : 'formAdd2'}
              icon="plus"
              type="primary"
            >
              Save
            </a-button>
          ) : null}
          {this.resetBtn ? (
            <a-button
              on-click={this.reset}
              id={isNormal ? 'formExport' : 'formExport2'}
              icon="stop"
              type="danger"
            >
              Reset
            </a-button>
          ) : null}
        </div>
      </div>
    );
  }

  render() {
    const { getFieldDecorator } = this.Form as any;
    return (
      <div>
        <a-card>
          <a-form>
            {/* Render action buttons */}
            <a-row gutter={20}>
              <a-col
                push={20}
                xl={4}
                lg={4}
                md={6}
                sm={12}
                xs={12}
              >
                {this.renderActionBtn(true)}
              </a-col>
            </a-row>
            {/* render form items with label and input */}
            <a-row gutter={20}>
              {this.itemList.map((item, index) => this.renderFormItem(getFieldDecorator, item, index))}
            </a-row>
          </a-form>
        </a-card>
      </div>
    );
  }
}
const MForm = Form.create({
  props: {
    modelName: String,
    itemList: Array,
    saveBtn: Boolean,
    resetBtn: Boolean,
    exportFun: Function,
    Form: Object,
  },
})(MFormClass);
export default MForm;
```

## 使用`vue-tsx-support`

[![Build Status](https://travis-ci.org/wonderful-panda/vue-tsx-support.svg?branch=master)](https://travis-ci.org/wonderful-panda/vue-tsx-support)

# vue-tsx-support
TSX (JSX for TypeScript) support library for Vue

- [封装`vue component`](#%E5%B0%81%E8%A3%85vue-component)
  - [Table of contents](#Table-of-contents)
  - [将`vue`封装为`tsx`组件的方法](#%E5%B0%86vue%E5%B0%81%E8%A3%85%E4%B8%BAtsx%E7%BB%84%E4%BB%B6%E7%9A%84%E6%96%B9%E6%B3%95)
  - [封装`filter-table`](#%E5%B0%81%E8%A3%85filter-table)
    - [在`main.ts`中，进行全局引用](#%E5%9C%A8maints%E4%B8%AD%E8%BF%9B%E8%A1%8C%E5%85%A8%E5%B1%80%E5%BC%95%E7%94%A8)
    - [封装主要组件](#%E5%B0%81%E8%A3%85%E4%B8%BB%E8%A6%81%E7%BB%84%E4%BB%B6)
      - [`components/FilterTable/index.vue`](#componentsFilterTableindexvue)
    - [封装子组件](#%E5%B0%81%E8%A3%85%E5%AD%90%E7%BB%84%E4%BB%B6)
      - [`MFilter`组件](#MFilter%E7%BB%84%E4%BB%B6)
      - [`MTable`组件](#MTable%E7%BB%84%E4%BB%B6)
  - [使用`vue-tsx-support`](#%E4%BD%BF%E7%94%A8vue-tsx-support)
- [vue-tsx-support](#vue-tsx-support)
  - [BREAKING CHANGES](#BREAKING-CHANGES)
  - [Install and enable](#Install-and-enable)
  - [Using intrinsic elements](#Using-intrinsic-elements)
  - [Using custom component](#Using-custom-component)
    - [available APIs to add type information](#available-APIs-to-add-type-information)
      - [componentFactory](#componentFactory)
      - [component](#component)
      - [extendFrom](#extendFrom)
      - [mixin](#mixin)
      - [componentFactoryOf](#componentFactoryOf)
      - [Component](#Component)
      - [ofType](#ofType)
    - [Other attributes](#Other-attributes)
      - [Native event listeners and dom properties](#Native-event-listeners-and-dom-properties)
      - [HTML attributes attached to the root element](#HTML-attributes-attached-to-the-root-element)
  - [Options](#Options)
    - [allow-element-unknown-attrs](#allow-element-unknown-attrs)
    - [allow-unknown-props](#allow-unknown-props)
    - [enable-html-attrs](#enable-html-attrs)
    - [enable-nativeon](#enable-nativeon)
    - [enable-vue-router](#enable-vue-router)
  - [Utility](#Utility)
    - [modifiers](#modifiers)
      - [Available modifiers](#Available-modifiers)

<!-- tocstop -->

## BREAKING CHANGES
- V2.2.0
  - Disallow meaningless combination of modifiers(undocumented api).

    ```typescript
    import { modifiers as m } from "vue-tsx-support";

    /*
     * Below combinations are all disallowed
     */

    // repeating same modifier
    <div onClick={m.enter.enter(/* snip */)} />;
    <div onClick={m.prevent.prevent(/* snip */)} />;
    <div onClick={m.enter.ctrl.enter(/* snip */)} />;

    // multiple key names.
    // # what you want may be `m.keys("enter", "asc")`
    <div onKeydown={m.enter.esc(/* snip */)} />;

    // multiple buttons
    <div onMousedown={m.left.middle(/* snip */)} />

    // using key name and button togetter
    <div onKeydown={m.enter.middle(/* snip */)} />

    // xxx and noxxx
    <div onClick={m.ctrl.noctrl(/* snip */)} />
    ```

- V2.1.0
  - When event type is function, vue-tsx-support treat it as event handler itself (to support events with multiple parameters).
    ```typescript
    type Events = {
        onOk: string,   // equivalent to `(arg: string) => void`
        onError: (target: any, detail: string) => void
    };
    ```

    if you want to use function as a parameter, you must fix code like below.

    ```typescript
    type Wrong = {
        onOk: () => void
    };
    type Right = {
        onOk: (callback: (() => void)) => void
    }
    ```
- V2.0.0
  - Support Vue >= 2.5.13 only
  - Support TypeScript >= 2.8 only

- v1.0.0
  - Support Vue >= 2.5 only.
  - `createComponent` is deprecated. use [componentFactory](#componentfactory) or [component](#component) instead.

- v0.5.0:
  - Rename `extend` to `extendFrom` (undocumented api)

- v0.4.0:
  - The way to enable compiler check has changed. See [Install and enable](#Install-and-enable)

## Install and enable

Install from npm:

```
npm install vue-tsx-support -S
```

And refer `vue-tsx-support/enable-check.d.ts` from somewhere to enable compiler check. (**CHANGED since v0.4.0**)

```typescript
///<reference path="node_modules/vue-tsx-support/enable-check.d.ts" />
// or
import "vue-tsx-support/enable-check"
```

or in `tsconfig.json`

```json
{
  "compilerOptions": {
    "...snip...": "...snip..."
  },
  "include": [
    "node_modules/vue-tsx-support/enable-check.d.ts",
    "...snip..."
  ]
}
```

## Using intrinsic elements

Standard HTML elements are defined as intrinsic elements.
So, compiler can check attribute names and attribute types of them:

```jsx
// OK
<div id="title" />;
// OK
<input type="number" min={ 0 } max={ 100 } />;
// OK
<a href={ SOME_LINK } />;
// NG: because `href` is not a valid attribute of `div`
<div href={ SOME_LINK } />;
// NG: because `id` must be a number
<div id={ 1 } />;
```

## Using custom component

By default, `vue-tsx-support` does not allow unknown props.

For example, if you have this component :

```typescript
import Vue from "vue";

const MyComponent = Vue.extend({
    props: {
        text: { type: String, required: true },
        important: Boolean,
    },
    computed: {
        className() {
            return this.important ? "label-important" : "label-normal";
        }
    },
    methods: {
        onClick(event) { this.$emit("ok", event); }
    },
    template: "<span :class='className' @click='onClick'>{{ text }}</span>"
});
```

Below code will cause compilation error because compiler does not know
`MyComponent` has prop `text`.

```jsx
// Compilation error(TS2339): Property `text` does not exist on type '...'
<MyComponent text="foo" />;
```

You must add types to the component by apis memtions below, or enable `allow-unknown-props` option.

### available APIs to add type information

#### componentFactory

Create tsx-supported component from component options. (Partially compatible with `Vue.extend`)

```jsx
import * as tsx from "vue-tsx-support";
const MyComponent = tsx.componentFactory.create({
    props: {
        text: { type: String, required: true },
        important: Boolean,
    },
    computed: {
        className(): string {
            return this.important ? "label-important" : "label-normal";
        }
    },
    methods: {
        onClick(event) { this.$emit("ok", event); }
    },
    render(): VNode {
        return <span class={this.className} onClick={this.onClick}>{this.text}</span>;
    }
});
```

`componentFactory.create` can infer types of props from component options same as `Vue.extend`.
In the above example, props type will be `{ text?: string, important?: boolean }`.

:warning: all props are regarded as optional even if `required: true` specified.

```jsx
// both `text` and `important` are regarded as optional
// So below 3 cases are all valid.
<MyComponent />;
<MyComponent text="foo" />;
<MyComponent important={true} />;
```

But `text` is required actually, you may think compilation should be failed when text is not specified.
There are sevaral ways to achieve it.

1. Instead of `required: true`, specify `required: true as true`.
 This turns type of `required` boolean to 'true',
 and vue-tsx-support can know it is required in compile time.

```typescript
import * as tsx from "vue-tsx-support";
const MyComponent = tsx.componentFactory.create({
    props: {
        text: { type: String, required: true as true },
        important: Boolean,
    },
    /* snip */
});
```

FYI, [vue-strict-prop](https://github.com/wonderful-panda/vue-strict-prop) make this easy.

```typescript
import * as tsx from "vue-tsx-support";
import p from "vue-strict-prop";
const MyComponent = tsx.componentFactory.create({
    props: {
        text: p(String).required,
        important: Boolean,
    },
    /* snip */
});
```

2. Specify required prop names as second argument

```typescript
import * as tsx from "vue-tsx-support";
const MyComponent = tsx.componentFactory.create({
    props: {
        text: { type: String, required: true },
        important: Boolean,
    },
    /* snip */
}, ["text"]);
```

In above examples, props type will be `{ text: string, important?: boolean }`.

```jsx
// NG: `text` is required
<MyComponent />;
<MyComponent important={true} />;
```

:warning: shorthand props definition(like `props: ["foo", "bar"]`) is currently not supported.

```typescript
// Does not work
import * as tsx from "vue-tsx-support";
const MyComponent = tsx.componentFactory.create({
    props: ["text", "important"],
    /* snip */
});
```

#### component
Shorthand of `componentFactory.create`

```typescript
import * as tsx from "vue-tsx-support";
const MyComponent = tsx.component({
    props: {
        text: { type: String, required: true },
        important: Boolean,
    },
    /* snip */
});
```

#### extendFrom
When you want to extend your component from other than `Vue`, you can use `extendFrom`

```jsx
import * as tsx from "vue-tsx-support";

// This is equivalent to `const MyComponent = Base.extend({ /* snip */ });`
const MyComponent = tsx.extendFrom(Base).create({
    /* snip */
});
```

#### mixin
You can use `mixin` to add mixin type-safely.

```jsx
import * as tsx from "vue-tsx-support";

const StorageMixin = {
    methods: {
        getItem(string name): string {
            return localStorage.getItem(name);
        },
        setItem(string name, string value): void {
            localStorage.setItem(name, value);
        }
    }
}

const MyComponent = tsx.componentFactory.mixin(StorageMixin).create(
    // You can use this.getItem and this.setItem here
    {
        props: {
            name: String
        },
        data() {
            return { value: "" }
        },
        mounted() {
            this.value = this.getItem(this.name);
        },
        render(): VNode {
            return (
                <button onClick={() => this.setItem(this.name, this.value)}>
                    SAVE
                </button>
            );
        }
    }
);

// You can add 2 or more mixins by method chain
const tsx.componentFactory.mixin(FirstMixin).mixin(SecondMixin).create({
    /* snip */
})
```

#### componentFactoryOf
Return componentFactory with additional types (events and scoped slots)

If your component has custom events, you may want to specify event listener.
But below example does not work.

```jsx
import * as tsx from "vue-tsx-support";

const MyComponent = tsx.component({
    render(): VNode {
        return <button onClick={this.$emit("ok")}>OK</button>;
    }
});

// Compilation error: 'onOK' is not a property of MyComponent
<MyComponent onOk={() => console.log("ok")} />;
```

In such situations, you must specify event types by `componentFactoryOf`

```typescript
import * as tsx from "vue-tsx-support";

interface Events {
    // all memebers must be prefixed by 'on'
    onOk: () => void;
    // If event handler has only one parameter, you can specify parameter type as a shorthand.
    // For example, this is equivalent to `onError: (arg: { code: number, detail: string }) => void`
    onError: { code: number, detail: string };
}

const MyComponent = tsx.componentFactoryOf<Events>().create({
    render(): VNode {
        return (
            <div>
              <button onClick={() => this.$emit("ok")}>OK</button>
              <button onClick={() => this.$emit("error", { code: 9, detail: "unknown" })}>Raise Error</button>
            </div>
        );
    }
});

// OK
<MyComponent onOk={() => console.log("ok")} />;
<MyComponent onError={p => console.log("ng", p.code, p.detail)} />;
```

You can also specify types of scoped slots if your component uses it.

```typescript
import * as tsx from "vue-tsx-support";

interface ScopedSlots {
    default: { text: string };
}

const MyComponent = tsx.componentFactoryOf<{}, ScopedSlots>().create({
    props: {
        text: String
    },
    render(): VNode {
        // type of `$scopedSlots` is checked statically
        return <div>
                 { this.$scopedSlots.default({ text: this.text || "default text" }) }
               </div>;
    }
});

// type of `scopedSlots` is checked statically, too
<MyComponent scopedSlots={{
        default: p => [<span>p.text</span>]
    }}
/>;

// NG: 'default' is missing in scopedSlots
<MyComponent scopedSlots={{
        default: p => [<span>p.text</span>]
    }}
/>;
```

#### Component
Base class of class base component

If you write your component with `vue-class-component`,
you can it tsx-supported by extending from this class.

```typescript
import component from "vue-class-component";
import * as tsx from "vue-tsx-support";

interface MyComponentProps {
    text: string;
    important?: boolean;
}

@component({
    props: {
        text: { type: String, required: true },
        important: Boolean
    },
    /* snip */
})
class MyComponent extends tsx.Component<MyComponentProps> {
    /* snip */
}
```

Unfortunately, you must write props interface and props definition separately.

If you want, you can specify event types and scoped slot types as 2nd and 3rd type parameter

```typescript
import component from "vue-class-component";
import * as tsx from "vue-tsx-support";

interface MyComponentProps {
    text: string;
    important?: boolean;
}

interface Events {
    onOk: void;
    onError: { code: number, detail: string };
}

interface ScopedSlots {
    default: { text: string };
}


@component({
    props: {
        text: { type: String, required: true },
        important: Boolean
    },
    /* snip */
})
class MyComponent extends tsx.Component<MyComponentProps, Events, ScopedSlots> {
    /* snip */
}
```

#### ofType

Make existing component tsx-supported.

If you can't modify existing component definition, wrap it by `ofType` and `convert`

```typescript
import ThirdPartyComponent from "third-party-library";
import * as tsx from "vue-tsx-support";

interface MyComponentProps { /* ... */ }

const MyComponent = tsx.ofType<MyComponentProps>().convert(ThirdPartyComponent);
```

Of course you can specify event types and scoped slot types if you want.

```typescript
const MyComponent = tsx.ofType<MyComponentProps, Events, ScopedSlots>().convert(ThirdPartyComponent);
```

### Other attributes

#### Native event listeners and dom properties

Sometimes you may want to specify native event listener or dom property to the component like below.
But unfortunately, `vue-tsx-support` does not support this.

```jsx
// NG: because `nativeOnClick` is not a prop of MyComponent
<MyComponent text="foo" nativeOnClick={ ... } />
// NG: because `domPropInnerHTML` is not a prop of MyComponent
<MyComponent text="foo" domPropInnerHTML={ ... } />
```

To avoid compilation error, you must use kebab-case attribute name.

```jsx
// OK
<Component nativeOn-click={ ... } />
// OK
<Component domProp-innerHTML={ ... } />
```

Or use JSX-spread style.

```jsx
// OK
<Component { ...{ nativeOn: { click: ... } } } />
// OK
<Component { ...{ domProps: { innerHTML: ... } } } />
```

For native events, there is an another solution. See `enable-nativeon` option.

#### HTML attributes attached to the root element

And sometimes, you may want to specify HTML attributes to the component like below.
But unfortunately, `vue-tsx-support` does not support this, too.

```jsx
// NG: because `min` and `max` are not props of SomeInputComponent
<SomeInputComponent min={ 0 } max={ 100 } />
```

To avoid compilation error, you must use JSX-spread style.

```jsx
// OK
<SomeInputComponent { ...{ attrs: { min: 0, max: 100 } } } />
```

Or enable `enable-html-attributes` option.

## Options

`vue-tsx-support` has some options which change behaviour globally.
See under the `options` directory.

To enable each options, import them somewhere

```typescript
// enable `allow-unknown-props` option
import "vue-tsx-support/options/allow-unknown-props";
```

:warning: Scope of option is whole project, not a file.

### allow-element-unknown-attrs

Make enabled to specify unknown attributes to intrinsic elements

```jsx
// OK:`foo` is unknown attribute, but can be compiled
<div foo="foo" />;
```

### allow-unknown-props

Make enabled to specify unknown props to Vue component.

```jsx
const MyComponent = vuetsx.createComponent<{ foo: string }>({ /* ... */ });
// OK: `bar` is unknown prop, but can be compiled
<MyComponent foo="foo" bar="bar" />;
```

### enable-html-attrs

Make enabled to specify HTML attributes to Vue component.

```jsx
const MyComponent = vuetsx.createComponent<{ foo: string }>({ /* ... */ });
// OK: `min` and `max` are valid HTML attributes
<MyComponent foo="foo" min={ 0 } max={ 100 } />;
// NG: compiler checks type of `min` (`min` must be number)
<MyComponent foo="foo" min="a" />;
```

### enable-nativeon

Make enabled to specify native event listeners to Vue component.

```jsx
const MyComponent = vuetsx.createComponent<{ foo: string }>({ /* ... */ });
// OK
<MyComponent foo="foo" nativeOnClick={ e => ... } />; // and `e` is infered as MouseEvent
```

### enable-vue-router

Add definitions of `router-link` and `router-view`

## Utility

### modifiers

Event handler wrappers which work like some event modifiers available in template

```typescript
import { modifiers as m } from "vue-tsx-support";

// Basic usage:
//  Equivalent to `<div @keydown.enter="onEnter" />`
<div onKeydown={m.enter(this.onEnter)} />;

// Use multiple modifiers:
//  Equivalent to `<div @keydown.enter.prevent="onEnter" />`
<div onKeydown={m.enter.prevent(this.onEnter)} />;

// Use without event handler:
//  Equivalent to `<div @keydown.esc.prevent />`
<div onKeydown={m.esc.prevent} />;

// Use multiple keys:
//  Equivalent to `<div @keydown.enter.esc="onEnterOrEsc" />`
<div onKeydown={m.keys("enter", "esc")(this.onEnterOrEsc)} />;

// Use exact modkey combination:
//  Equivalent to `<div @keydown.65.ctrl.alt.exact="onCtrlAltA" />`
<div onKeydown={m.keys(65).exact("ctrl", "alt")(this.onCtrlAltA)} />;
```

#### Available modifiers

* `esc`, `tab`, `enter`, `space`, `up`, `down`, `del`, `left`, `right`

  Execute event handler only when specified key is pressed.  
  :warning: `del` allows not only DELETE, but also BACKSPACE.  
  :warning: `left` and `right` have another behavior when specified to mouse event  
  :warning: combination of key modifiers (e.g. `m.enter.esc`) does not work. See [keys](#keys)  

* `left`, `right`, `middle`

  Execute event handler only when specified mouse button is pressed.  
  :warning: `left` and `right` have another behavior when specified to keyboard event  

* `ctrl`, `shift`, `alt`, `meta`

  Execute event handler only when specified system modifier key is pressed.  

* `noctrl`, `noshift`, `noalt`, `nometa`

  Execute event handler only when specified system modifier key is not pressed.  

* `self`

  Execute event handler only when event.target is the element itself (not from children).  

* `prevent`, `stop`

  Call `preventDefault` or `stopPropagation` of event object before executing event handler.  

<a name="keys"></a>
* `keys(...args)`

  Execute event handler only when one of specified key is pressed.  
  Known key name("esc", "tab", "enter", ...) or number can be specified.  

  ```typescript
  // when enter or esc pressed
  <div onKeydown={m.keys("enter", "esc")(handler)} />;
  // when 'a' pressed
  <div onKeydown={m.keys(65)(handler)} />;
  ```

* `exact(...args)`

  Execute event handler only when specified system modifier keys are all pressed, and others are not pressed.  

  ```typescript
  // when CTRL, SHIFT are both pressed, and ALT, META are both not pressed
  <div onClick={m.exact("ctrl", "shift")(handler)} />;
  ```