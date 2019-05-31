import {
  Component, Prop, Emit, Vue,
} from 'vue-property-decorator';
import {
  Input, Select, Form, TimePicker, DatePicker, Cascader, Row, Col, Button, Modal, Checkbox, Radio, Card,
} from 'ant-design-vue';
import { FilterFormList } from '@/interface';
import lfService from '@/utils/request.localforage';
import './MForm.less';
import titleCase from 'title-case';

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
  @Prop({ default: 'member' })
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

  btnXl: number = 24 - this.itemList.length * 3

  btnlg: number = 24 - this.itemList.length * 3

  btnmd: number = 24 - this.itemList.length * 4

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
        Modal.confirm({
          title: '表单数据',
          okText: 'Next Record',
          cancelText: 'Data Table',
          maskClosable: true,
          onOk: () => {
            this.addOrEdit(values);
            setTimeout(() => {
              this.Form.setFieldsValue({});
            }, 500);
          },
          onCancel: () => {
            setTimeout(() => {
              this.reset();
            }, 500);
          },
        });
      }
    });
  }

  @Emit()
  addOrEdit(data) {
    if (this.id === -1) {
      this.$log.suc('Creating...');
      lfService.request({
        url: `/${this.modelName}`,
        method: 'post',
        data,
      });
    } else {
      this.$log.suc('updating...');
      lfService.request({
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
    lfService
      .request({
        url: `/${this.modelName}`,
        method: 'get',
        data: { id: this.id },
      })
      .then(({ data, config }) => {
        this.$log.info('Get Data:', data.entity);
        // config.params.columns && this.$emit('setForm', config.params.columns);
        this.loadEditInfo(data.entity);
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
    const { params } = lfService.validateUrl({
      url: `/${this.modelName}`,
      method: 'get',
      data: { id: this.id },
    });
    this.$emit('setForm', params.columns);
  }

  @Emit()
  reset(): void {
    this.Form.setFieldsValue({});
    this.$emit('showDataTable');
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
    const label = this.$t(item.key);
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
    const label = this.$t(item.key);
    const placeholder = `Input ${titleCase(item.key)}`;
    switch (item.type) {
      case 'input':
        itemDom = <a-input id={key} label={label} placeholder={placeholder} />;
        break;
      case 'textarea':
        itemDom = <a-textarea id={key} label={label} placeholder={placeholder} />;
        break;
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
      case 'datetime':
        itemDom = (
          <a-date-picker
            id={key}
            label={label}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder={placeholder}
          />
        );
        break;
      case 'date':
        itemDom = (
          <a-date-picker
            id={key}
            label={label}
            format="YYYY-MM-DD"
            placeholder={placeholder}
          />
        );
        break;
      case 'datetimerange':
        itemDom = (
          <a-range-picker
            style="width: 100%"
            id={key}
            label={label}
            showTime
            format="YYYY-MM-DD"
            disabledTime={disabledTime}
            placeholder={placeholder}
          />
        );
        break;
      case 'checkboxButton':
        itemDom = (
          <el-radio-group on-change={change} label={label} size="small">
            {options
              && options.map((items, indexs: number) => (
                <a-radio-button value={value} key={indexs}>
                  {label}
                </a-radio-button>
              ))}
          </el-radio-group>
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
              icon="cloud"
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
      <div class="base-form-wrap">
        <a-card title={`Edited Item :${this.id}`}>
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
