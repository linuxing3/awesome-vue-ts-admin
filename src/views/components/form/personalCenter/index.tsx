import { Component, Vue, Emit } from 'vue-property-decorator';
import {
  Form, Input, Select, Radio, Card, Dropdown, Menu, Icon, DatePicker, Button, Col, Row, Modal, Avatar,
} from 'ant-design-vue';
import lfService from '@/utils/request.localforage';
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
  },
  props: {
    Form,
  },
})
class BaseForm extends Vue {
  modelName: string = 'user'

  avatarUrl: string = '/avatar/man_1.jpg'

  showModal: boolean = false;

  activeTabKey = '文章'

  tabList: any[] = [
    {
      key: '1',
      tab: '文章',
    },
    {
      key: '2',
      tab: '应用',
    },
    {
      key: '3',
      tab: '项目',
    },
  ];

  get id() {
    return this.$route.params.id || -1;
  }

  itemLayout = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 16 },
    },
  }

  mounted() {
    this.$nextTick(() => {
      this.handleGetInfo();
    });
  }

  handleChangeTab(key) {
    this.activeTabKey = key;
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
        <a-card title="用户设置" tabList={this.tabList} activeTabKey={this.activeTabKey} on-tabChange={this.handleChangeTab}>
          {/* content */}
          <a-row gutter={20}>
            {this.activeTabKey === '1' ? <a-col xl={16} lg={16} md={16} sm={16} xs={24}>1</a-col> : <a-col></a-col>
            }
            {this.activeTabKey === '2' ? <a-col xl={16} lg={16} md={16} sm={16} xs={24}>2</a-col> : <a-col></a-col>
            }
            {this.activeTabKey === '3' ? <a-col xl={16} lg={16} md={16} sm={16} xs={24}>3</a-col> : <a-col></a-col>
            }
          </a-row>
        </a-card>
      </div>
    );
  }
}

export default Form.create({})(BaseForm);
