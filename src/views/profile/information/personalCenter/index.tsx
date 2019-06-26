import { Component, Vue, Emit } from 'vue-property-decorator';
import {
  Form, Input, Select, Radio, Card, Dropdown, Menu, Icon, DatePicker, Button, Col, Row, Modal, Avatar,
} from 'ant-design-vue';
import { api } from '@/api';
import UserArticleList from '@/views/profile/information/userArticleList';
import UserRoleTable from '@/views/profile/information/userRoleTable';
import UserBaseForm from '@/views/profile/information/baseForm';

import './index.less';

@Component({
  name: 'personalCenter',
  components: {
    'user-article-list': UserArticleList,
    'user-role-table': UserRoleTable,
    'user-base-form': UserBaseForm,
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

  coverUrl: string[] = [
    '/bg/1.jpg',
    '/bg/2.jpg',
    '/bg/3.jpg',
    '/bg/4.jpg',
    '/bg/5.jpg',
    '/bg/6.jpg',
    '/bg/7.jpg',
  ]

  showModal: boolean = false

  activeTabKey = '1'

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
  ]

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

  async handleGetInfo() {
    this.$log.suc('getting edit info...');
    if (this.id === -1) return;
    const {
      data: { entity },
    } = await api.request({
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
      <div on-click={this.toggleModal}>
        <a-avatar size={256} src={this.avatarUrl} />
      </div>
    );
  }

  renderCover() {
    const { coverUrl } = this;
    return (
      <div slot="cover" class="cover-wrapper">
      {this.activeTabKey === '1' ? <img src={coverUrl[0]}></img>: null}
      {this.activeTabKey === '2' ? <img src={coverUrl[1]}></img>: null}
      {this.activeTabKey === '3' ? <img src={coverUrl[2]}></img>: null}
    </div>
    );
  }

  render() {
    return (
      <div class="base-card-wrap">
        <a-card
          class="base-card"
          title="用户中心"
          tabList={this.tabList}
          activeTabKey={this.activeTabKey}
          on-tabChange={this.handleChangeTab}
        >
          {/* content */}
          <a-row gutter={20} justify={'center'}>
            {this.activeTabKey === '1' ? (
              <a-col>
                <user-article-list />
              </a-col>
            ) : (
              <a-col />
            )}
            {this.activeTabKey === '2' ? (
              <a-col>
                <user-role-table />
              </a-col>
            ) : (
              <a-col />
            )}
            {this.activeTabKey === '3' ? (
              <a-col>
                <user-base-form />
              </a-col>
            ) : (
              <a-col />
            )}
          </a-row>
        </a-card>
      </div>
    );
  }
}

export default Form.create({})(BaseForm);
