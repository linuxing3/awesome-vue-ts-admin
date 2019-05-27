import {
  Component, Prop, Emit, Vue,
} from 'vue-property-decorator';
import {
  Input, Select, Form, TimePicker, DatePicker, Cascader, Row, Col, Button, Modal, Checkbox, Radio,
} from 'ant-design-vue';
import { FilterFormList } from '@/interface';
import lfService from '@/utils/request.localforage';

import './MForm.less';

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
class MFormClass extends Vue {
  @Prop({ default: 'member' })
  private modelName!: string;

  // 筛选表单生成参数
  @Prop({ default: [] })
  private itemList!: FilterFormList[];

  // 筛选表单存储数据参数
  @Prop({ default: {} }) private formParams!: any;

  // 是否展示新增按钮
  @Prop({ default: false }) private saveBtn!: boolean;

  // 是否展示导出按钮
  @Prop({ default: false }) private resetBtn!: boolean;

  // 导出按钮回调事件
  @Prop({ default: () => { } }) private exportFun!: Function;

  // data
  params: any = JSON.parse(JSON.stringify(this.formParams));

  // 初始化表格筛选参数
  initParams: any = JSON.parse(JSON.stringify(this.formParams));

  btnXl: number = 24 - (this.itemList.length * 3);

  btnlg: number = 24 - (this.itemList.length * 3);

  btnmd: number = 24 - (this.itemList.length * 4);

  // 弹出窗开关
  setModel: boolean = false;

  // 高级筛选高度
  formMarginTop: number = 0;

  get id() {
    return this.$route.params.id || -1;
  }

  mounted() {
    this.$nextTick(() => {
      this.handleGetInfo();
    });
  }

  created() {}

  submit(e: HTMLFormElement) {
    e.preventDefault();
    this.Form.validateFields((err: any, values: object) => {
      if (!err) {
        Modal.info({
          title: '表单数据',
          content: JSON.stringify(values),
          onOk: () => {
            this.handleAddOrEdit(values);
            this.saveFun();
          },
          onCancel: () => {
            this.reset();
          },
        });
      }
    });
  }

  handleAddOrEdit(data) {
    if (this.id === -1) {
      console.log('Creating...');
      lfService.request({
        url: `/${this.modelName}`,
        method: 'post',
        data,
      });
    } else {
      console.log('updating...');
      lfService.request({
        url: `/${this.modelName}`,
        method: 'patch',
        data,
      });
    }
  }

  async handleGetInfo() {
    console.log('getting form info...');
    // For add new record
    if (this.id === -1) {
      const { config } = await lfService.request({
        url: `/${this.modelName}`,
        method: 'get',
      });
      this.itemList = config.params.columns;
      // this.Form.setFieldsValue();
    } else {
      // for edit a exiting record
      const { config, data: { entity } } = await lfService.request({
        url: `/${this.modelName}`,
        method: 'get',
        data: { id: this.id },
      });
      this.itemList = config.params.columns;
      console.log('Get Data:', entity);
      this.loadEditInfo(entity);
    }
  }

  loadEditInfo(data) {
    console.log(`编辑记录 ${this.id}`);
    new Promise((resolve) => {
      setTimeout(resolve, 500);
    }).then(() => {
      console.log('formData:', data);
      this.Form.setFieldsValue(data);
    });
  }

  // methods
  @Emit()
  reset(): void {
    this.Form.resetFields();
    this.$emit('clearOut');
    this.params = JSON.parse(JSON.stringify(this.initParams));
    this.$emit('reset', this.Form.resetFields());
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
  saveFun(): void {
    this.$emit('saveFun', Object.assign({}, this.Form.getFieldsValue()));
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
          format="YYYY-MM-DD HH:mm:ss"
          placeholder={item.placeholder}>
        </a-date-picker>;
        break;
      case 'date':
        itemDom = <a-date-picker
          id={item.key}
          format="YYYY-MM-DD"
          placeholder={item.placeholder}>
        </a-date-picker>;
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
        itemDom = <el-radio-group
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
        </el-radio-group>;
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

  setForm() {
    this.$emit('setForm', this.itemList);
    this.setModel = false;
  }

  btnElement(isNormal: boolean): JSX.Element {
    return (
      <div>
        <div class="right-btn">
          {
            this.saveBtn ? <a-button on-click={this.saveFun} id={isNormal ? 'formAdd' : 'formAdd2'} icon="plus">Add</a-button> : null
          }
          {
            this.resetBtn ? <a-button on-click={this.reset} id={isNormal ? 'formExport' : 'formExport2'} icon="refresh"></a-button> : null
          }
          <a-button on-click={this.openSetting} id="formSetting" icon="setting" shape="circle"></a-button>
        </div>
      </div>
    );
  }

  render() {
    const { getFieldDecorator } = this.Form as any;
    return (
      <div class="base-form-wrap">
        <a-card
          title="Form"
        >
          <a-form on-submit={this.submit}>
            <a-row gutter={20}>
              {
                this.itemList.map((item, index) => this.formItem(getFieldDecorator, item, index))
              }
              <a-col class="btn-wrap" xl={this.btnXl} lg={this.btnlg} md={this.btnmd ? this.btnmd : 24} sm={24} xs={24}>
                {this.btnElement(true)}
              </a-col>
            </a-row>
          </a-form>
        </a-card>
        <a-modal id="tableSet" width="500px" title="Table Setting" visible={this.setModel} on-ok={this.setForm} on-cancel={this.closeModal}>
          <a-checkbox-group class="checkbox-list">
            {
              this.itemList.map((item, index) => <a-checkbox key={index} value={item.dataIndex}>
                {item.title}</a-checkbox>)
            }
          </a-checkbox-group>
        </a-modal>
      </div>
    );
  }
}
const MForm = Form.create({
  props: {
    itemList: Array,
    formParams: Object,
    saveBtn: Boolean,
    resetBtn: Boolean,
    exportFun: Function,
    labelWidth: String,
  },
})(MFormClass);
export default MForm;
