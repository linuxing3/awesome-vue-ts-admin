
import { Component, Vue } from 'vue-property-decorator';
import {
  Form, Input, Select, Radio, Card, Dropdown, Menu, Icon, DatePicker, Button, Modal,
} from 'ant-design-vue';
import lfService from '@/utils/request.localforage';

import './index.less';

@Component({
  name: 'MemberForm',
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-select': Select,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-card': Card,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-icon': Icon,
    'a-date-picker': DatePicker,
    'a-button': Button,
    'a-modal': Modal,
  },
  props: {
    Form,
  },
})
class MemberForm extends Vue {
  modelName: string = 'member'

  itemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 12 },
      sm: { span: 6 },
    },
  }

  get id() {
    return this.$route.params.id || -1;
  }

  mounted() {
    this.$nextTick(() => {
      this.handleGetInfo();
    });
  }

  submit(e: HTMLFormElement) {
    e.preventDefault();
    this.Form.validateFields((err: any, values: object) => {
      if (!err) {
        Modal.info({
          title: '表单数据',
          content: JSON.stringify(values),
          onOk: () => {
            this.handleAddOrEdit(values);
            setTimeout(() => {
              this.$router.replace({
                name: 'MemberTable',
              });
            }, 1000);
          },
          onCancel: () => {
            this.handleReset();
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
    console.log('getting edit info...');
    if (this.id === -1) return;
    const { data: { entity } } = await lfService.request({
      url: `/${this.modelName}`,
      method: 'get',
      data: { id: this.id },
    });
    console.log('Get Data:', entity);
    this.loadEditInfo(entity);
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

  handleReset() {
    this.Form.setFieldsValue({});
    this.$router.replace({
      name: 'MemberList',
    });
  }

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <div class="base-form-wrap">
        <a-card
          title="Member Form"
        >
          <a-dropdown slot="extra">
            <a class="ant-dropdown-link">
              <a-icon type="ellipsis" style="font-size: 22px" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a>Import</a>
              </a-menu-item>
              <a-menu-item>
                <a>Export</a>
              </a-menu-item>
              <a-menu-item>
                <a>Validate</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a-form on-submit={this.submit}>
            <a-form-item {...{ props: this.itemLayout }} label="编号">
              {getFieldDecorator('id', {
                rules: [{ required: false, message: '编号' }],
              })(<a-input placeholder="自动编号" disabled />)}
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="姓名">
              {
                getFieldDecorator('name', {
                  rules: [
                    { required: true, message: '请输入姓名' },
                  ],
                })(<a-input placeholder="请输入姓名"></a-input>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="手机号">
              {
                getFieldDecorator('loginName', {
                  rules: [
                    { required: false, message: '请输入手机号' },
                    {
                      pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
                      message: '请输入正确的手机号',
                    },
                  ],
                })(<a-input placeholder="请输入手机号"></a-input>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="出生日期">
              {
                getFieldDecorator('birthDate', {
                  rules: [
                    { required: false, message: '请选择出生日期' },
                  ],
                })(<a-date-picker placeholder="请选择出生日期"></a-date-picker>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="性别">
              {
                getFieldDecorator('isMale', {
                  rules: [
                    { required: false, message: '请选择性别' },
                  ],
                })(<a-radio-group>
                <a-radio value={0}>男</a-radio>
                <a-radio value={1}>女</a-radio>
                <a-radio value={2}>火星人</a-radio>
              </a-radio-group>)
              }
            </a-form-item>
            <a-form-item {...{ props: this.itemLayout }} label="备注">
              {getFieldDecorator('note', {
                rules: [{ required: false, message: '请输入备注信息' }],
              })(<a-input placeholder="任何备注信息" />)}
              <div class="form-btn-wrap">
                <a-button type="primary" htmlType="submit">
                  提交
                </a-button>
                <a-button on-click={this.handleReset}>重置</a-button>
              </div>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
    );
  }
}

export default Form.create({})(MemberForm);
