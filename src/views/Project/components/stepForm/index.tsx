import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  Form, Input, Select, Radio, Card, Icon, Button, Col, Row, Avatar, Tag, Modal, DatePicker, Steps,
} from 'ant-design-vue';
import { pick } from 'lodash';
import { FieldDecoratorOptions, WrappedFormUtils } from 'ant-design-vue/types/form/form';

const defaultStepForms = [
  ['title', 'time', 'frequency'],
  ['entity'],
  ['authorizationDate', 'authorizer'],
];

@Component({
  name: 'ProjectStepForm',
  components: {
    'a-modal': Modal,
    'a-date-picker': DatePicker,
    'a-steps': Steps,
    'a-step': Steps.Step,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-card': Card,
    'a-row': Row,
    'a-col': Col,
    'a-input': Input,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-icon': Icon,
    'a-button': Button,
    'a-avatar': Avatar,
    'a-tag': Tag,
  },
  props: {
    Form,
  },
})
class ProjectStepForm extends Vue {
  @Prop({ default: defaultStepForms }) stepForms!: string[][]

  @Prop({ default: false }) visible!: boolean;

  labelCol = {
    xs: { span: 24 },
    sm: { span: 7 },
  };

  wrapperCol = {
    xs: { span: 24 },
    sm: { span: 13 },
  };

  confirmLoading = false;

  currentStep = 0;

  mdl = {};

  inputOptions: FieldDecoratorOptions = {
    rules: [
      {
        required: false,
      },
    ],
  }

  dateOptions: FieldDecoratorOptions = {
    rules: [
      {
        type: 'object',
        required: false,
        message: '请选择时间!',
      },
    ],
  }

  selectOptions: FieldDecoratorOptions = {
    initialValue: 'month',
    rules: [{ required: false }],
  }

  // form是一个包裹了工具函数的表单对象
  form: WrappedFormUtils = this.$form.createForm(this, {
    onFieldsChange(props: any, fields: any) {
      this.$log.info('form props:', props);
      this.$log.info('form fields names:', fields);
      return {};
    },
    onValuesChange(props: any, fields: any) {
      this.$log.info('form props:', props);
      this.$log.info('form fields values:', fields);
    },
  });

  edit(record) {
    this.visible = true;
    const {
      form: { setFieldsValue },
    } = this;
    this.$nextTick(() => {
      setFieldsValue(pick(record, []));
    });
  }

  handleNext(step: number) {
    const {
      stepForms,
      form: { validateFields },
    } = this;
    const currentStep = step + 1;
    if (currentStep <= 2) {
      // 逐步确认
      const pendingValues = stepForms[this.currentStep];
      this.$log.info('当前表单信息：', pendingValues);
      validateFields(pendingValues, (errors, values) => {
        if (!errors) {
          this.currentStep = currentStep;
        }
      });
      return;
    }
    // 最后一步时发送事件
    this.confirmLoading = true;
    validateFields((errors, values) => {
      if (!errors) {
        this.$log.info('值:', values);
        setTimeout(() => {
          this.confirmLoading = false;
          this.currentStep = 0;
          // 向父组件发送事件
          this.$emit('authorizationDone', values);
        }, 1500);
      } else {
        this.$log.error('错误:', errors);
        this.confirmLoading = false;
      }
    });
  }

  handleBackWard() {
    this.currentStep = this.currentStep - 1;
  }

  handleCancel() {
    this.currentStep = 0;
    this.$emit('toggleModal');
    // this.visible = false;
  }

  render() {
    const {
      form, visible, currentStep, confirmLoading, handleCancel, handleNext, handleBackWard,
    } = this;
    return (
      <a-modal
        title="审批流程"
        okType='primary'
        width={640}
        centered={true}
        visible={visible}
        confirmLoading={confirmLoading}
        on-cancel={handleCancel}
      >
        <a-spin loading={confirmLoading}>
          <a-steps current={currentStep} style="marginBottom: 28px" size="small">
            <a-step title="审核基本信息" />
            <a-step title="确认授权" />
            <a-step title="进行审批" />
          </a-steps>
          <a-form form={form}>
            {this.renderFirstStep()}
            {this.renderSecondStep()}
            {this.renderThirdStep()}
          </a-form>
        </a-spin>
        <div slot="footer">
          <a-button key="back" show={currentStep > 0} on-click={handleBackWard} style="float: left" >上一步</a-button>
          <a-button key="cancel" on-click={handleCancel}>取消</a-button>
          <a-button key="forward" on-click={() => handleNext(currentStep)} loading={confirmLoading} type="primary">{ currentStep === 2 ? '完成' : '下一步' }</a-button>
        </div>
      </a-modal>
    );
  }

  renderItem(item?: any) {
    const {
      form: { getFieldDecorator },
    } = this;
    return (
      <a-form-item label="currentKey" labelCol={this.labelCol} wrapperCol={this.wrapperCol}>
      {getFieldDecorator('currentKey', {})(<a-input></a-input>)}
      </a-form-item>
    );
  }

  renderFirstStep() {
    const {
      currentStep,
      form: { getFieldDecorator },
    } = this;
    return (
      <div show={currentStep === 0}>
        <a-form-item label="任务" labelCol={this.labelCol} wrapperCol={this.wrapperCol}>
          {getFieldDecorator('title', {})(<a-input style="width: 100%" />)}
        </a-form-item>
        <a-form-item label="开始时间" labelCol={this.labelCol} wrapperCol={this.wrapperCol}>
          {getFieldDecorator('startTime', {})(<a-date-picker style="width: 100%" />)}
        </a-form-item>
        <a-form-item label="任务周期" labelCol={this.labelCol} wrapperCol={this.wrapperCol}>
          {getFieldDecorator('frequency', {})(
            <a-select style="width: 100%">
              <a-select-option value="week">周</a-select-option>
              <a-select-option value="month">月</a-select-option>
              <a-select-option value="semester">季</a-select-option>
              <a-select-option value="halfyear">半年</a-select-option>
              <a-select-option value="year">年</a-select-option>
            </a-select>,
          )}
        </a-form-item>
      </div>
    );
  }

  renderSecondStep() {
    const {
      currentStep,
      form: { getFieldDecorator },
    } = this;
    return (
      <div show={currentStep === 1}>
        <a-form-item label="审批权限" labelCol={this.labelCol} wrapperCol={this.wrapperCol}>
          {getFieldDecorator('entity', {})(
            <a-select style="width: 100%">
              <a-select-option value="department">部门</a-select-option>
              <a-select-option value="entity">单位</a-select-option>
              <a-select-option value="out">国内</a-select-option>
            </a-select>,
          )}
        </a-form-item>
      </div>
    );
  }

  renderThirdStep() {
    const {
      currentStep,
      form: { getFieldDecorator },
    } = this;
    return (
      <div show={currentStep === 2}>
        <a-form-item label="审批时间" labelCol={this.labelCol} wrapperCol={this.wrapperCol}>
          {getFieldDecorator('authorizationDate', {})(<a-date-picker style="width: 100%" />)}
        </a-form-item>
        <a-form-item label="审批人" labelCol={this.labelCol} wrapperCol={this.wrapperCol}>
          {getFieldDecorator('authorizer', {})(
            <a-select style="width: 100%">
              <a-select-option value="head">单位负责人</a-select-option>
              <a-select-option value="director">部门主任</a-select-option>
            </a-select>,
          )}
        </a-form-item>
      </div>
    );
  }
}

export default ProjectStepForm;
