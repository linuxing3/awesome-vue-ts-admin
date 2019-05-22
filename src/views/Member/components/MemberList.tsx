import { Component, Vue } from 'vue-property-decorator';

import {
  Card, Dropdown, List, Icon, Button, Modal, Menu,
} from 'ant-design-vue';
import lfService from '@/utils/request.localforage';

import './index.less';

@Component({
  name: 'MemberList',
  components: {
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
    'a-card': Card,
    'a-dropdown': Dropdown,
    'a-icon': Icon,
    'a-button': Button,
    'a-modal': Modal,
    'a-menu': Menu,
  },
})
export default class ProjectList extends Vue {
  modelName: string = 'member'

  data: any[] = []

  pagination: object = {
    pageNo: 1,
    pageSize: 10,
  }

  async mounted() {
    await this.handleFetch();
  }

  async handleFetch() {
    const { pagination } = this;
    const { data } = await lfService.request({
      url: `/${this.modelName}`,
      method: 'get',
      pagination,
    });
    console.log(data);
    this.data = data;
  }

  async handleDelete(row) {
    console.log('Deleting ... ');
    await lfService.request({
      url: `/${this.modelName}`,
      method: 'delete',
      data: row.id,
    });
    setTimeout(() => this.handleFetch(), 1000);
  }

  handleEdit(row) {
    console.log('Editing ... ');
    this.$router.push({
      name: 'MemberForm',
      params: {
        id: row.id,
      },
    });
  }

  handleCreate() {
    console.log('Creating ... ');
    this.$router.push({
      name: 'MemberForm',
    });
  }

  handleRemove(row) {
    this.$confirm({
      title: '警告',
      content: `真的要删除 ${row.id} 吗?`,
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        console.log('OK');
        this.handleDelete(row);
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  }

  render() {
    return (
      <div>
        <a-card
          style="margin-top: 24px"
          title="列表">
          <div class="operate">
            <a-button type="dashed" style="width: 100%" icon="plus"
            click="() => handleCreate()"
            >添加</a-button>
          </div>
        </a-card>
      </div>
    );
  }
}
