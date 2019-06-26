import { Component, Vue } from 'vue-property-decorator';
import {
  List, Input, Select, Radio, Card, Icon, Button, Col, Row, Avatar, Tag, Menu,
} from 'ant-design-vue';
import UserArticleList from '@/views/profile/information/userArticleList';
import UserRoleTable from '@/views/profile/information/userRoleTable';
import UserBaseForm from '@/views/profile/information/baseForm';
import UserSecuritySetting from '@/views/profile/settings/security';

import './index.less';
import { format } from 'ssf/types';

@Component({
  name: 'UserSettingMenu',
  components: {
    'user-article-list': UserArticleList,
    'user-role-table': UserRoleTable,
    'user-base-form': UserBaseForm,
    'user-security-setting': UserSecuritySetting,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-list': List,
    'a-list-item': List.Item,
    'a-card': Card,
    'a-row': Row,
    'a-col': Col,
    'a-input': Input,
    'a-select': Select,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-icon': Icon,
    'a-button': Button,
    'a-avatar': Avatar,
    'a-tag': Tag,
  },
})
export default class UserSettingMenu extends Vue {
  mode = 'inline'

  openKeys = []

  currentKey = '1'

  defaultSelectedKeys = []

  // cropper
  preview = {}

  option = {
    img: '/avatar/man_2.jpg',
    info: true,
    size: 1,
    outputType: 'jpeg',
    canScale: false,
    autoCrop: true,
    // 只有自动截图开启 宽度高度才生效
    autoCropWidth: 180,
    autoCropHeight: 180,
    fixedBox: true,
    // 开启宽度和高度比例
    fixed: true,
    fixedNumber: [1, 1],
  }

  pageTitle = ''

  onOpenChange(openKeys) {
    this.openKeys = openKeys;
    this.$log.info(this.openKeys);
  }

  onCurrentChange(key) {
    this.currentKey = key;
    this.$nextTick(() => {
      this.$log.info(`切换到第${key}键`);
    });
  }

  updateMenu() {
    const routes = this.$route.matched.concat();
    this.defaultSelectedKeys = [routes.pop().path];
  }

  renderLeft() {
    const {
      mode, defaultSelectedKeys, onOpenChange, onCurrentChange,
    } = this;
    return (
      <div class="account-settings-info-left">
      <a-menu
        mode={mode}
        style="border: '0', width: 'auto'"
        defaultSelectedKeys={defaultSelectedKeys}
        type="inner"
        on-openChange={onOpenChange}
      >
        <a-menu-item key="/profile/baseSettings" on-click={onCurrentChange('1')}>
            基本设置
        </a-menu-item>
        <a-menu-item key="/profile/securitySettings" on-click={onCurrentChange('2')}>
            安全设置
        </a-menu-item>
        <a-menu-item key="/profile/userRoleTable" on-click={onCurrentChange('3')}>
            个性化
        </a-menu-item>
      </a-menu>
    </div>
    );
  }

  render() {
    const { currentKey } = this;
    return (<div class="page-header-index-wide">
      <a-card bordered={false} bodyStyle={{ padding: '16px 0', height: '100%' }} style="height: '100%'">
        <div class="account-settings-info-main device">
          <div class="account-settings-info-left">
            {this.renderLeft()}
          </div>
          <div class="account-settings-info-right">
            {currentKey === '1' ? (<user-base-form />): (null)}
            {currentKey === '2' ? (<user-security-setting />): (null)}
            {currentKey === '3' ? (<user-role-table />): (null)}
          </div>
        </div>
      </a-card>
    </div>);
  }
}
