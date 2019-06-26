import { Component, Vue } from 'vue-property-decorator';
import {
  List, Input, Select, Radio, Card, Icon, Button, Col, Row, Avatar, Tag, Divider,
} from 'ant-design-vue';

import './index.less';

@Component({
  name: 'UserSecuritySetting',
  components: {
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
    'a-divider': Divider,
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
export default class UserSecuritySetting extends Vue {
  data = [
    {
      title: '账户密码', description: '当前密码强度', value: '强', actions: { title: '修改', callback: () => { this.$message.info('This is a normal message'); } },
    },
    {
      title: '密保手机', description: '已绑定手机', value: '138****8293', actions: { title: '修改', callback: () => { this.$message.success('This is a message of success'); } },
    },
    {
      title: '密保问题', description: '未设置密保问题，密保问题可有效保护账户安全', value: '', actions: { title: '设置', callback: () => { this.$message.error('This is a message of error'); } },
    },
    {
      title: '备用邮箱', description: '已绑定邮箱', value: 'ant***sign.com', actions: { title: '修改', callback: () => { this.$message.warning('This is message of warning'); } },
    },
    {
      title: 'MFA 设备', description: '未绑定 MFA 设备，绑定后，可以进行二次确认', value: '', actions: { title: '绑定', callback: () => { this.$message.info('This is a normal message'); } },
    },
  ]

  renderItem(item, index) {
    return (
      <a-list-item key={index}>
        <a-list-item-meta>
          <a slot="title">{ item.title }</a>
          <span slot="description">
            <span class="security-list-description">{ item.description }</span>
            <span class="security-list-value">{ item.value }</span>
          </span>
        </a-list-item-meta>
        {item.actions ? <a slot="actions" on-click={item.actions.callback}>{ item.actions.title }</a> : null }
        <a-divider />
      </a-list-item>
    );
  }

  render() {
    return (<div class="account-settings-info-right">
    <div class="account-settings-info-title">
      <span>安全设置</span>
    </div>
    <a-list
      itemLayout="horizontal"
      dataSource={this.data}
      renderItem={this.renderItem}
      >
    </a-list>
    </div>);
  }
}
