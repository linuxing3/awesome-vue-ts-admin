import { Component, Vue, Emit } from 'vue-property-decorator';
import {
  Form, Input, Select, Radio, Card, Dropdown, Menu, Icon, DatePicker, Button, Col, Row, Modal, Avatar,
} from 'ant-design-vue';
import lfService from '@/utils/request.localforage';
import AvatarModal from './AvatarModal';
import './index.less';

@Component({
  name: 'baseForm',
  components: {
    'a-form': Form,
    'a-row': Row,
    'a-col': Col,
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
    'a-avatar': Avatar,
    'avatar-modal': AvatarModal,
  },
  props: {
    Form,
  },
})
class BaseForm extends Vue {
  modelName: string = 'user'

  avatarUrl: string = '/avatar/man_1.jpg'

  showModal: boolean = false;

  get id() {
    return this.$route.params.id || -1;
  }

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

  async handleGetInfo() {
    this.$log.suc('getting edit info...');
    if (this.id === -1) return;
    const {
      data: { entity },
    } = await lfService.request({
      url: `/${this.modelName}`,
      method: 'get',
      data: { id: this.id },
    });
    this.$log.suc('Get Data:', entity);
    this.loadEditInfo(entity);
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

  handleReset() {
    this.Form.setFieldsValue({});
    this.$router.push({
      name: '/',
    });
  }

  @Emit()
  changeAvatar(avatarUrl) {
    this.avatarUrl = avatarUrl;
    this.toggleModal();
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  renderAvatar(): JSX.Element {
    return (
      <div on-click={this.toggleModal} >
        <a-avatar size={256} src={this.avatarUrl}></a-avatar>
      </div>
    );
  }

  render() {
    const { getFieldDecorator } = this.Form;
    return (
      <div class="base-form-wrap">
        <a-card title="用户设置">
          {/* extra slot button */}
          <a-dropdown slot="extra">
            <a class="ant-dropdown-link">
              <a-icon type="ellipsis" style="font-size: 22px" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a>Export</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          {/* content */}
          <a-row gutter={20}>
            <a-col xl={8} lg={8} md={8} sm={12} xs={24}>
              {this.renderAvatar()}
            </a-col>
            <a-col xl={16} lg={16} md={16} sm={12} xs={24}>
              <a-form on-submit={this.submit}>
                <a-form-item {...{ props: this.itemLayout }} label="编号">
                  {getFieldDecorator('id', {
                    rules: [{ required: false, message: '编号' }],
                  })(<a-input placeholder="自动编号" disabled />)}
                </a-form-item>
                <a-form-item {...{ props: this.itemLayout }} label="姓名">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名' }],
                  })(<a-input placeholder="请输入姓名" />)}
                </a-form-item>
                <a-form-item {...{ props: this.itemLayout }} label="密码">
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                  })(
                    <a-input
                      prefix-icon="iconfont-lock"
                      type="password"
                      placeholder="Please enter a user name"
                    >
                      <a-icon slot="prefix" type="lock" />
                    </a-input>,
                  )}
                </a-form-item>
                <a-form-item {...{ props: this.itemLayout }} label="用户名">
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名' }],
                  })(<a-input placeholder="请输入客户名" />)}
                </a-form-item>
                <a-form-item {...{ props: this.itemLayout }} label="Email">
                  {getFieldDecorator('email', {
                    rules: [{ required: false, message: '请输入Email' }],
                  })(<a-input placeholder="请输入Email" />)}
                </a-form-item>
                <a-form-item
                  {...{ props: this.itemLayout }}
                  label="Telephone"
                >
                  {getFieldDecorator('telephone', {
                    rules: [{ required: false, message: '请输入电话' }],
                  })(<a-input placeholder="请输入电话" />)}
                </a-form-item>
                <a-form-item {...{ props: this.itemLayout }} label="证书">
                  {getFieldDecorator('token', {
                    rules: [{ required: false, message: '请输入证书' }],
                  })(<a-input placeholder="请输入证书" />)}
                </a-form-item>
                <a-form-item
                  {...{ props: this.itemLayout }}
                  label="联系地址"
                >
                  {getFieldDecorator('address', {
                    rules: [{ required: false, message: '请输入联系地址' }],
                  })(<a-input placeholder="请输入联系地址" />)}
                  <div class="form-btn-wrap">
                    <a-button type="primary" htmlType="submit">
                      提交
                    </a-button>
                    <a-button on-click={this.handleReset}>重置</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-col>
          </a-row>
        </a-card>
        <avatar-modal visible={this.showModal} />
      </div>
    );
  }
}

export default Form.create({})(BaseForm);
