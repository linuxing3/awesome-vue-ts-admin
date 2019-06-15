import { Vue, Component } from 'vue-property-decorator';
import {
  Card, Dropdown, Menu, Icon, List, Avatar, Row, Col, Button,
} from 'ant-design-vue';
import models from '@/models';
import lfService from '@/utils/request.localforage';
import { upperCaseFirst } from 'change-case';

import './card.less';

const Entity: any = models.member;

@Component({
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-button': Button,
    'a-card': Card,
    'a-card-meta': Card.Meta,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-icon': Icon,
    'a-avatar': Avatar,
    'a-list': List,
    'a-list-item': List.Item,
  },
})
export default class MemberCartList extends Vue {
  modelName = 'member'

  description = '提供跨越设计与开发的体验解决方案。'

  linkList = [
    { icon: 'rocket', href: '#', title: '快速开始' },
    { icon: 'info-circle-o', href: '#', title: '产品简介' },
    { icon: 'file-text', href: '#', title: '产品文档' },
  ]

  extraImage = '/avatar/dragon.jpg'

  avatars = [
    '/avatar/dragon.jpg',
    '/avatar/man_1.jpg',
    '/avatar/man_2.jpg',
    '/avatar/man_3.jpg',
    '/avatar/man_1.jpg',
    '/avatar/man_2.jpg',
    '/avatar/man_3.jpg',
    '/avatar/man_1.jpg',
    '/avatar/man_2.jpg',
    '/avatar/man_3.jpg',
  ]

  get dataSource() {
    return Entity.all();
  }

  quarterLayout = {
    gutter: 20,
    span: 6,
    xl: 6,
    lg: 6,
    md: 6,
    sm: 12,
    xs: 24,
  }

  mounted() {
    this.$log.info('Card Grid List: ', this.dataSource);
  }

  async handleDelete(row) {
    this.$log.suc('Deleting ... ');
    const response = await lfService.request({
      url: `/${this.modelName}`,
      method: 'delete',
      data: row.id,
    });
    Promise.resolve(response);
  }

  handleCreate() {
    const name = `${upperCaseFirst(this.modelName)}Form`;
    this.$router.replace({
      name,
    });
  }

  handleEdit(row) {
    const name = `${upperCaseFirst(this.modelName)}Form`;
    this.$log.suc('Editing ... ');
    this.$router.replace({
      name,
      params: {
        id: row.id,
      },
    });
  }

  render() {
    return (
      <a-card title="Member Card List">
        <div slot="extra">
          <a-button type="primary" icon="add" on-click={this.handleCreate}>New Member</a-button>
        </div>
        <a-row>
          {/* start row */}
          {this.dataSource.map((item, index) => (
              <a-col {...{ props: this.quarterLayout }}>
                <a-card hoverable={true} {...{ props: this.quarterLayout }}>
                  <a-card-meta>
                    <div slot="title" style="margin-bottom: 3px">{item.name}</div>
                    <a-avatar slot="avatar" class="card-avatar" src={this.avatars[index]} size={128}/>
                    <div slot="description" class="meta-content">{item.academicBackground}</div>
                  </a-card-meta>
                  <div slot="actions" class="ant-card-actions">
                    <a style="color: blue;" on-click={() => this.handleEdit(item)}>查看</a>
                    <a style="color: orange;" on-click={() => this.handleDelete(item)}>删除</a>
                  </div>
                </a-card>
              </a-col>
          ))}
        {/* end row */}
      </a-row>
    </a-card>
    );
  }
}
