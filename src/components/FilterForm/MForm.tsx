/// <reference path="../../../node_modules/ant-design-vue/types/form/form.d.ts" />
import {
  Component, Prop, Emit, Vue,
} from 'vue-property-decorator';
import {
  Input, Select, Form, TimePicker, DatePicker, Cascader, Row, Col, Button, Modal, Checkbox, Radio, Card, Divider,
} from 'ant-design-vue';
import { Get, Sync, Call } from 'vuex-pathify';
import titleCase from 'title-case';
import { FilterFormList } from '@/interface';
import { api } from '@/api';
import { convertDate } from '@/utils/datetime';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import './MForm.less';

@Component({
  components: {
    'a-divider': Divider,
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
  @Prop({ default: 'member'}) modelName!: string;

  @Prop({ default: false }) isNormal!: boolean;

  // 筛选表单生成参数
  @Prop() itemList!: FilterFormList[];

  // 是否展示新增按钮
  @Prop({ default: true }) saveBtn!: boolean;

  // 是否展示导出按钮
  @Prop({ default: true }) resetBtn!: boolean;

  // 是否展示导出按钮
  @Prop({ default: true }) filterBtn!: boolean;

  // 导出按钮回调事件
  @Prop({ default: () => {} }) exportFun!: Function;

  @Sync('app.locale') synclocale: string;

  @Get('app.locale') locale: string;

  @Call('app.setLocale') setLocal: Function;

  filterItemList: string[] = [];

  get id() {
    return this.$route.params.id || -1;
  }

  // 弹出窗开关
  setModal: boolean = false;

  nomalLayout = {
    span: 8,
    xl: 8,
    lg: 8,
    md: 12,
    sm: 12,
    xs: 24,
  };

  fullLayout = {
    span: 24,
    xl: 24,
    lg: 24,
    md: 24,
    sm: 24,
    xs: 24,
  };

  formInpuRenderFmLayout = {
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
  };

  created() {
    this.$log.info('Current Locale', this.locale);
    this.setFilterItemListToLocalstorage();
  }

  mounted() {
    this.$nextTick(() => {
      this.getInfo();
    });
  }

  setFilterItemListToLocalstorage() {
    this.filterItemList = [];
    this.itemList.map((item) => {
      if (item.key) {
        this.filterItemList.push(item.key);
      }
      return false;
    });
    window.localStorage.setItem(
      this.modelName,
      JSON.stringify(this.filterItemList),
    );
  }

  @Emit()
  save(e: HTMLFormElement) {
    e.preventDefault();
    const { validateFields } = this.Form as WrappedFormUtils;
    validateFields((err: any, values: object) => {
      if (!err) {
        this.$log.info('Form Values:', values);
        const data = convertDate(this.itemList, values)[0];
        this.$log.info('Converted Form Values:', data);
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
      } else {
        this.$log.info('Error', err)
      }
    });
  }

  @Emit()
  addOrEdit(data) {
    if (this.id === -1) {
      this.$log.suc('[表单] ---> 添加新数据...');
      api.request({
        url: `/${this.modelName}`,
        method: 'post',
        data,
      });
    } else {
      this.$log.suc('[表单] ---> 更新数据...');
      api.request({
        url: `/${this.modelName}`,
        method: 'patch',
        data,
      });
    }
  }

  @Emit()
  getInfo() {
    this.$log.info('[表单] ---> 获取编辑信息...');
    if (this.id === -1) {
      // this.setForm();
      return;
    }
    api
      .request({
        url: `/${this.modelName}`,
        method: 'get',
        data: { id: this.id },
      })
      .then(({ data, config }) => {
        this.$log.info('[表单] ---> 提取实际信息:', data.entity);
        this.loadEditInfo(convertDate(this.itemList, data.entity, false)[0]);
      });
  }

  @Emit()
  loadEditInfo(data) {
    const { setFieldsValue } = this.Form as WrappedFormUtils;
    this.$log.suc(`编辑记录 ${this.id}`);
    // 更新父组件的编辑信息
    this.$emit('loadEditInfo', data);
    new Promise((resolve) => {
      setTimeout(resolve, 500);
    }).then(() => {
      this.$log.suc('formData:', data);
      setFieldsValue(data);
    });
  }

  // methods
  @Emit()
  setForm(): void {
    this.$emit('setForm', this.filterItemList);
    this.closeModal();
  }

  @Emit()
  toggleNormal(): void {
    this.$emit('toggleNormal');
  }

  @Emit()
  reset(event?): void {
    // 恢复本地存储的全部字段，并重设表单字段
    this.setFilterItemListToLocalstorage();
    this.$emit('setForm', this.filterItemList);
    // 重设表单值为空
    (this.Form as WrappedFormUtils).resetFields();
    // 开放跳转
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

  @Emit()
  fieldClick(key: string, item: any) {
    this.$emit('fieldClick', key, item);
  }

  renderModal() {
    const itemList = JSON.parse(window.localStorage.getItem(this.modelName));
    const title = `Choose Form Fields [${this.locale}]`;
    return (
      <a-modal
        id="formSetting"
        width="500px"
        title={title}
        visible={this.setModal}
        on-ok={this.setForm}
        on-cancel={this.closeModal}
      >
        <a-checkbox-group class="checkbox-list" v-model={this.filterItemList}>
          {itemList.map(item => (
            <a-checkbox key={item} value={item}>
              {item}
            </a-checkbox>
          ))}
        </a-checkbox-group>
      </a-modal>
    );
  }

  renderFormInput(
    getFieldDecorator: WrappedFormUtils['getFieldDecorator'],
    item: FilterFormList,
    index: number,
  ) {
    const key = item.key;
    const label = `${this.$t(item.key)} / ${item.key}`;
    const placeholder = `Input ${titleCase(item.key)}`;
    const itemDom = <a-input id={key} label={label} placeholder={placeholder} />;
    return (
      <a-col {...{ props: this.nomalLayout }} key={index}>
        <a-form-item label={label} on-dbclick={() => this.fieldClick(key, item)}>
          {getFieldDecorator(key, {})(itemDom)}
        </a-form-item>
      </a-col>
    );
  }

  renderFormItem(
    getFieldDecorator: WrappedFormUtils['getFieldDecorator'],
    item: FilterFormList,
    index: number,
  ) {
    let itemDom = null;
    const {
      key, value, options, change, fieldNames, disabledTime,
    } = item;
    /**
     * 翻译标签和占位符
     */
    // const label = `${this.$t(item.key)} / ${titleCase(item.key)}`;
    const label = () => (
      <span class="form-label">
        {this.$t(item.key)}
      </span>
    );
    // const label = this.$t(item.key);
    // const placeholder = `Input ${titleCase(item.key)}`;
    const placeholder = item.placeholder || titleCase(item.key);
    /**
     * 根据项目类型，动态生成不同的表单控件
     */
    switch (item.type) {
      // 文本框
      case 'input':
        itemDom = (
          <a-input
            style="width: 100%;"
            id={key}
            placeholder={placeholder}
            disabled={key === 'id'}
          />
        );
        break;
      // 段落框
      case 'textarea':
        itemDom = (
          <a-textarea
            style="width: 100%; min-height: 300px;"
            id={key}
            placeholder={'请输入正文。。。'}
          />
        );
        break;
      // 选择器
      case 'select':
        itemDom = (
          <a-select style="width: 100%;" id={key} placeholder={placeholder}>
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
          <a-time-picker style="width: 100%;" id={key} format="HH:mm" placeholder={placeholder} />
        );
        break;
      // 日期
      case 'date':
        itemDom = (
          <a-date-picker
            style="width: 100%;"
            id={key}
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
          <a-radio-group on-change={change} size="small">
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
    if (item.type === 'textarea') {
      return (
        <a-col {...{ props: this.fullLayout }} key={index}>
          <a-form-item class="form-item" colon={false} lable={label}>
            {getFieldDecorator(key, {})(itemDom)}
          </a-form-item>
        </a-col>
      );
    }
    return (
      <a-col {...{ props: this.nomalLayout }} key={index}>
        <a-form-item class="form-item" colon={false} label={label}>
          {getFieldDecorator(key, {})(itemDom)}
        </a-form-item>
      </a-col>
    );
  }

  renderActionBtn(isNormal: boolean): JSX.Element {
    return (
        <div class="right-btn">
          {this.saveBtn ? (
            <a-button
              on-click={this.save}
              id={isNormal ? 'formAdd' : 'formAdd2'}
              icon="plus"
              type="primary"
            >
              保存
            </a-button>
          ) : null}
          {this.resetBtn ? (
            <a-button
              on-click={() => this.reset('clear')}
              id={isNormal ? 'formReset' : 'formReset2'}
              icon="stop"
              type="danger"
            >
              重置
            </a-button>
          ) : null}
          {this.filterBtn ? (
            <a-button
              on-click={this.openModal}
              id={isNormal ? 'formFilter' : 'formFilter2'}
              icon="pushpin"
              type="default"
            >
              筛选
            </a-button>
          ) : null}
        </div>
    );
  }

  render() {
    const { getFieldDecorator } = this.Form as WrappedFormUtils;
    return (
      <div class="form-wrap">
        {/* reander modal */}
        {this.renderModal()}
        <a-card class="form-card">
          <a-form>
            {/* Render action buttons */}
            <a-row gutter={20}>
              <a-col push={16} xl={8} lg={8} md={8} sm={12} xs={12}>
                {this.renderActionBtn(this.isNormal)}
              </a-col>
            </a-row>
            <a-divider dashed={true} />
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

/**
 *  在Vue组件上创建表单.
 *  1.1.9前 Form.create(options)(组件)
 *  1.1.9后 组件.$form.createForm(组件)
 *  在定义文件中，将Form已挂载到原型链。
 *  declare module 'vue/types/vue' {
 *     interface Vue {
 *       $form: Form;
 *     }
 *   }
 */
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
