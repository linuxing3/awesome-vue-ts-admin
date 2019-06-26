import { Component, Vue } from 'vue-property-decorator';
import {
  Form, Input, Select, Radio, Card, Icon, Button, Col, Row, Avatar, Tag, List, Divider,
} from 'ant-design-vue';
import models from '@/models';

import './index.less';

const Article: any = models.article;

@Component({
  name: 'UserArticleList',
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-card': Card,
    'a-divider': Divider,
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
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
export default class UserArticleList extends Vue {
  data = []

  loading = true

  layout = 'horizontal'

  loadingMore = false

  pageParams: {
    pageSize: number,
    pageNum: number,
    page: boolean,
  } = {
    pageSize: 100,
    pageNum: 1,
    page: true,
  }

  fullLayout = {
    gutter: 16, xs: 24, sm: 24, md: 16, lg: 16, xl: 16, xxl: 16,
  }

  gridLayout = {
    gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 4,
  }

  mounted() {
    this.getList();
  }

  getList() {
    this.$log.info('Fetching ...');
    Article.$fetch().then(() => {
      this.data = Article.all();
      this.loading = false;
    });
  }

  loadMore() {
    this.loadingMore = true;
    Article.$fetch().then(() => {
      this.data = Article.all();
      this.loading = false;
    });
  }

  renderContent(item) {
    const {
      title, description, owner, href, updateAt, avatar,
    } = item;
    return <a-col>
      <div class="article-content-title">
        <h2>
          { title }
        </h2>
      </div>
      <div class="article-content-description">
        <p>
          { description }
        </p>
      </div>
      <div class="article-content-extra">
        <a-avatar style="margin-right: 20px;" src={avatar} size="large" />
        <a href={href}>{ owner }</a> 发布在 <a href={href}>{ href }</a>
        <em>{ updateAt }</em>
      </div>
    </a-col>;
  }

  renderFooter() {
    return <a-button on-click={this.loadMore} loading={this.loadingMore}>加载更多</a-button>;
  }

  renderActions(item) {
    return (
      <div class="article-list-actions">
        <span>
          <a-icon
            class="text-icon"
            type="star-o"
            color={item.star > 0 ? 'red' : 'grey'}
          />
          {item.star}
        </span>
        <span>
          <a-icon
            class="text-icon"
            type="like-o"
            color={item.star > 0 ? 'red' : 'grey'}
          />
          {item.like}
        </span>
        <span>
          <a-icon class="text-icon" type="message" />
          {item.message}
        </span>
      </div>
    );
  }

  renderItemMeta(item) {
    const tags = [
      ' Ant Design ',
      ' MEB DIP ',
      ' VE CN ',
    ] || item.tags;
    const title = 'Ant Design Vue ' || item.title;
    return (
      <a-list-item-meta>
        <a slot="title" href="https://vue.ant.design/">
          <h2>{title}</h2>
        </a>
        <div slot="description">
          <span>
            {tags.map(tag => <a-tag>{tag}</a-tag>)}
            <a-tag>Ant Design</a-tag>
            <a-tag>MEB DIP</a-tag>
            <a-tag>VE CN</a-tag>
          </span>
        </div>
      </a-list-item-meta>
    );
  }

  renderItem(item, index) {
    return (
      <a-row justify={'center'}>
        <a-col>
          <a-list-item key={item.id} index={index}>
            {this.renderItemMeta(item)}
            {this.renderContent(item)}
          </a-list-item>
          <div slot="footer">
            {this.renderActions(item)}
          </div>
        <a-divider />
        </a-col>
      </a-row>
    );
  }

  render() {
    const {
      loading, data, renderItem, gridLayout,
    } = this;
    return (
      <a-row justify={'center'}>
        <a-col>
          <a-card class="article-card">
            <a-list
              size="large"
              rowKey={'id'}
              loading={loading}
              dataSource={data}
              renderItem={renderItem}
              >
              <div
                slot="footer"
                style="text-align: center; margin-top: 16px;"
                >
                {this.renderFooter()}
              </div>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    );
  }
}
