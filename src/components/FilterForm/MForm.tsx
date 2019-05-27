import {
  Component, Prop, Emit, Vue,
} from 'vue-property-decorator';
import {
  Input, Select, Form, TimePicker, DatePicker, Cascader, Row, Col, Button, Modal, Checkbox, Radio, Card,
} from 'ant-design-vue';
import { FilterFormList } from '@/interface';

import './MForm.less';

@Component({
  components: {
    'a-card': Card,
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
  private modelName!: string

  @Prop({ default: {} })
  private editData!: any

  // 筛选表单生成参数
  @Prop({ default: [] })
  private itemList!: FilterFormList[]

  // 筛选表单存储数据参数
  @Prop({ default: {} }) private formParams!: any

  // 是否展示新增按钮
  @Prop({ default: false }) private saveBtn!: boolean

  // 是否展示导出按钮
  @Prop({ default: false }) private resetBtn!: boolean

  // 导出按钮回调事件
  @Prop({ default: () => {} }) private exportFun!: Function

  get id() {
    return this.$route.params.id || -1;
  }

  // data
  params: any = JSON.parse(JSON.stringify(this.formParams))

  // 初始化表格筛选参数
  initParams: any = JSON.parse(JSON.stringify(this.formParams))

  btnXl: number = 24 - this.itemList.length * 3

  btnlg: number = 24 - this.itemList.length * 3

  btnmd: number = 24 - this.itemList.length * 4

  // 表单显示的项目
  checkList: Array<string> = []

  // 高级搜索开关
  showGrade: boolean = false

  // 高级筛选高度
  tableMarginTop: number = 0

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

  gradeLayout = {
    span: 8,
    xl: 8,
    lg: 8,
    md: 12,
    sm: 12,
    xs: 12,
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
      this.handleGetInfo();
    });
  }

  created() {
    if (!this.checkList.length) {
      this.itemList.map((item) => {
        if (item.key) {
          this.checkList.push(item.key);
        }
        return false;
      });
    }
  }

  saveFun(e: HTMLFormElement) {
    e.preventDefault();
    this.Form.validateFields((err: any, values: object) => {
      if (!err) {
        Modal.info({
          title: '表单数据',
          content: JSON.stringify(values),
          onOk: () => {
            this.handleAddOrEdit(values);
          },
          onCancel: () => {
            this.reset();
          },
        });
      }
    });
  }

  handleAddOrEdit(data) {
    if (this.editData.id === -1) {
      this.$log.suc('Creating...');
      window.ajax.request({
        url: `/${this.modelName}`,
        method: 'post',
        data,
      });
    } else {
      this.$log.suc('updating...');
      window.ajax.request({
        url: `/${this.modelName}`,
        method: 'patch',
        data,
      });
    }
  }

  handleGetInfo() {
    this.$log.suc('getting edit info...');
    if (this.id === -1) return;
    window.api.request({
      url: `/${this.modelName}`,
      method: 'get',
      data: { id: this.id },
    }).then(({ data }) => {
      this.$log.suc('Get Data:', data.entity);
      this.loadEditInfo(data.entity);
    });
  }

  loadEditInfo(data) {
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
  reset(): void {
    this.Form.resetFields();
    this.$emit('reset');
    this.params = JSON.parse(JSON.stringify(this.initParams));
  }

  @Emit()
  setForm() {
    this.$log.suc('Set form items with filterlist...');
    if (this.checkList.length > 0) {
      this.$emit('setForm', this.checkList);
      this.setModal = false;
    } else {
      this.$message.error('At least one field');
    }
  }

  @Emit()
  levelcodeChange(val: any, key: string): void {
    const value = JSON.parse(JSON.stringify(val));
    this.params.levelCode = value.pop();
  }

  @Emit()
  openModal(): void {
    this.setModal = true;
  }

  @Emit()
  closeModal(): void {
    this.setModal = false;
  }

  @Emit()
  gradeSwitch(val: boolean): void {
    this.showGrade = val;
    this.tableMarginTop = val
      ? (this.$refs.filterGrade as Element).clientHeight
      : (this.$refs.filterNormal as Element).clientHeight;
    this.$emit('tableHeight', this.tableMarginTop);
  }

  renderFormItem(getFieldDecorator: any, item: FilterFormList, index: number, grade?: boolean) {
    let itemDom = null;
    switch (item.type) {
      case 'input':
        itemDom = <a-input id={item.key} label={item.label} placeholder={item.placeholder} />;
        break;
      case 'select':
        itemDom = (
          <a-select
            style="width: 100%;"
            id={item.key}
            label={item.label}
            placeholder={item.placeholder}
          >
            {item.options
              && item.options.map((items: any, indexs: number) => (
                <a-option key={indexs} value={items.value}>
                  {items.label}
                </a-option>
              ))}
          </a-select>
        );
        break;
      case 'cascader':
        itemDom = (
          <a-cascader
            style="width: 100%;"
            label={item.label}
            id={item.key}
            allowClear
            changeOnSelect
            fieldNames={item.fieldNames}
            options={item.options}
            placeholder={item.placeholder}
            on-change={item.change}
          />
        );
        break;
      case 'levelcode':
        itemDom = (
          <a-cascader
            style="width: 100%;"
            id={item.key}
            label={item.label}
            allowClear
            changeOnSelect
            fieldNames={item.fieldNames}
            options={item.options}
            placeholder={item.placeholder}
            on-change={(e: Array<string>) => this.levelcodeChange(e, item.key)}
          />
        );
        break;
      case 'datetime':
        itemDom = (
          <a-date-picker
            id={item.key}
            label={item.label}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={item.placeholder}
          />
        );
        break;
      case 'date':
        itemDom = (
          <a-date-picker
            id={item.key}
            label={item.label}
            format="YYYY-MM-DD"
            placeholder={item.placeholder}
          />
        );
        break;
      case 'datetimerange':
        itemDom = (
          <a-range-picker
            style="width: 100%"
            id={item.key}
            label={item.label}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            disabledTime={item.disabledTime}
            on-change={(e: Array<Date>) => this.rangeChange(e, item.value ? item.value : [])}
            placeholder={item.placeholder}
          />
        );
        break;
      case 'checkboxButton':
        itemDom = (
          <el-radio-group on-change={item.change} label={item.label} size="small">
            {item.options
              && item.options.map((items, indexs: number) => (
                <a-radio-button value={items.value} key={indexs}>
                  {items.label}
                </a-radio-button>
              ))}
          </el-radio-group>
        );
        break;
      default:
        break;
    }
    if (grade) {
      return (
        <a-col {...{ props: this.gradeLayout }} key={index}>
          <a-form-item {...{ props: this.formItrenderFmLayout }} label={item.label}>
            {getFieldDecorator(item.key)(itemDom)}
          </a-form-item>
        </a-col>
      );
    }
    return (
      <a-col {...{ props: this.nomalLayout }} key={index}>
        <a-form-item label={item.label}>{getFieldDecorator(item.key)(itemDom)}</a-form-item>
      </a-col>
    );
  }

  // 时间区间赋值操作
  rangeChange(data: any, value: string[]) {
    this.params[value[0]] = data[0].format('YYYY-MM-DD hh:mm:ss');
    this.params[value[1]] = data[1].format('YYYY-MM-DD hh:mm:ss');
  }

  renderActionBtn(isNormal: boolean): JSX.Element {
    return (
      <div>
        <div class="right-btn">
          {this.saveBtn ? (
            <a-button
              on-click={this.saveFun}
              id={isNormal ? 'formAdd' : 'formAdd2'}
              icon="plus"
              class="primary"
            >
              Save
            </a-button>
          ) : null}
          {this.resetBtn ? (
            <a-button
              on-click={this.reset}
              id={isNormal ? 'formExport' : 'formExport2'}
              icon="cloud"
            >
              Reset
            </a-button>
          ) : null}
          <a-button on-click={this.openModal} id="formSetting" icon="setting" shape="circle" />
        </div>
      </div>
    );
  }

  render() {
    const { getFieldDecorator } = this.Form as any;
    return (
      <div class="base-form-wrap">
        <a-card title={`Edited Item :${this.editData.id}`}>
          <a-form>
            {/* Render action buttons */}
            <a-row gutter={20}>
              <a-col
                class="btn-wrap"
                xl={this.btnXl}
                lg={this.btnlg}
                md={this.btnmd ? this.btnmd : 24}
                sm={24}
                xs={24}
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
        {/* Setting modal */}
        <a-modal
          id="tableSet"
          width="500px"
          title="Form Item Setting"
          visible={this.setModal}
          on-ok={this.setForm}
          on-cancel={this.closeModal}
        >
          <a-checkbox-group class="checkbox-list" v-model={this.checkList}>
            {this.itemList.map((item, index) => (
              <a-checkbox key={index} value={item.key}>
                {item.label}
              </a-checkbox>
            ))}
          </a-checkbox-group>
        </a-modal>
      </div>
    );
  }
}
const MForm = Form.create({
  props: {
    modelName: String,
    itemList: Array,
    formParams: Object,
    saveBtn: Boolean,
    resetBtn: Boolean,
    exportFun: Function,
  },
})(MFormClass);
export default MForm;
