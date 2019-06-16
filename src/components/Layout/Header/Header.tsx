import {
  Component, Prop, Emit, Vue, Watch,
} from 'vue-property-decorator';
import moment from 'moment';
import {
  Badge, Dropdown, Breadcrumb, Popover, Icon, Menu, Timeline, Card, Input, Tag,
} from 'ant-design-vue';
import { routerItem } from '@/interface';
import { routeToArray } from '@/utils';
import MenuList from '@/components/Layout/Sidebar/MenuList';
import models from '@/models';
import './Header.less';
import { lazyFilter, checkStringMatch } from '@/utils/helper';
import { title } from 'change-case';

const Event = models.event;

interface breadItem {
  url: string,
  text: string,
}

@Component({
  components: {
    'menu-list': MenuList,
    'a-input': Input,
    'a-tag': Tag,
    'a-badge': Badge,
    'a-dropdown': Dropdown,
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
    'a-menu-divider': Menu.Divider,
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
    'a-popover': Popover,
    'a-timeline': Timeline,
    'a-timeline-item': Timeline.Item,
    'a-icon': Icon,
    'a-card': Card,
  },
})
export default class Header extends Vue {
  // @Prop() private username!: string;
  // data
  username: string = 'admin'

  get menuData(): routerItem[] {
    return this.$store.state.app.menuData;
  }

  get routerData() {
    this.$log.info(this.menuData);
    return this.menuData.reduce((routes, menu) => {
      if (menu.children) {
        menu.children.forEach((child) => {
          routes.push({
            name: child.name,
          });
        });
      }
      return routes;
    }, []);
  }

  filteredRouter: any[] = []

  breadList: breadItem[] = []

  onIndex: number = 0

  showNotification = false;

  get notifications(): any[] {
    const today = moment().format('l');
    return Event.query()
      .where('date', today)
      .orderBy('startTime')
      .get();
  }

  get id() {
    return this.$store.getters.currentUser.id;
  }

  @Watch('$route', { immediate: true, deep: true })
  routeChange(to: any, from: any) {
    const toDepth = routeToArray(to.path);
    this.onIndex = 0;
    this.breadList = [];
    this.routerBread(this.menuData, toDepth.routeArr);
  }

  @Watch('menuData')
  initRouteBread() {
    const toDepth = routeToArray(this.$route.path);
    this.routerBread(this.menuData, toDepth.routeArr);
  }

  @Emit()
  routerBread(data: routerItem[], toDepth: string[]) {
    data.map((item: routerItem) => {
      if (item.path === toDepth[this.onIndex]) {
        this.breadList.push({
          url: item.path,
          text: item.name ? item.name : '',
        });
        if (item.children && toDepth.length - 1 >= this.onIndex) {
          this.onIndex += 1;
          this.routerBread(item.children, toDepth);
        }
      }
      return true;
    });
  }

  @Emit()
  menuClick(params: { item: any; key: string; keyPath: string[] }): void {
    const self = this;
    switch (params.key) {
      case '1':
        this.$router.push({
          name: 'PersonalCenter',
          params: {
            id: self.id,
          },
        });
        break;
      case '2':
        this.$router.push({
          name: 'ProfileBaseForm',
          params: {
            id: self.id,
          },
        });
        break;
      case '3':
        this.$router.push({ name: 'IconHelper' });
        break;
      case '4':
        // Cookies.remove('token');
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login');
        });
        break;
      default:
        break;
    }
  }

  @Emit()
  search(e): void {
    e.preventDefault();
    // do search logic
    const filter = e.target.value;
    this.filteredRouter = lazyFilter(filter)(this.routerData);
  }

  @Emit()
  notificationClick(params: { item: any; key: string; keyPath: string[] }): void {
    this.showNotification = !this.showNotification;
    // this.showEvent(params.item);
  }

  @Emit()
  showEvent(item): void {
    const today = moment().format('l');
    const event: any = Event.query().where('title', item.title).where('date', today).get()[0];
    this.$router.push({
      name: 'EventForm',
      params: {
        id: event.id,
      },
    });
  }

  @Emit()
  showRouter(router: {name: string}): void {
    this.$log.info('Go to router ', router.name);
    this.$router.push({
      name: router.name,
    });
  }

  @Emit()
  switchSidebar(): void {
    this.$store.dispatch('ToggleSideBar');
  }

  render() {
    this.username = this.$store.getters.currentUser.username;
    const {
      sidebar: { opened },
      isMobile,
    } = this.$store.state.app;
    return (
      <header class="header-wrap">
        <div class="header-left">
          {isMobile ? (
            <a-popover
              placement="bottom"
              title=""
              width="300"
              trigger="click"
            >
              <menu-list slot="content" bgColor="#fff" txtColor="#898989" />
              <i class="menu-btn iconfont-listMenu" />
            </a-popover>
          ) : (
            <i
              class={`menu-btn iconfont-${opened ? 'indent' : 'outdent'}`}
              on-click={this.switchSidebar}
            />
          )}
          {isMobile ? null : (
            <a-breadcrumb class="header-bread" separator="/">
              {this.breadList.map((item: breadItem) => (
                <a-breadcrumb-item to={item.url ? { path: '/' } : null}>
                  {item.text}
                </a-breadcrumb-item>
              ))}
            </a-breadcrumb>
          )}
        </div>
        <ul class="header-menu">
          <li style="width: 200px;">
            <a-dropdown>
              <span>
                <a-input prefix-icon="iconfont-search" on-change={this.search}></a-input>
              </span>
              <a-menu slot="overlay">
              {this.filteredRouter.map((router) => {
                const name = title(router.name);
                return (
                  <a-menu-item key={name} title={name} on-click={() => this.showRouter(router)}>
                    <a-tag>{name}</a-tag>
                  </a-menu-item>
                );
              })}
              </a-menu>
            </a-dropdown>
          </li>
          <li>
            <a-dropdown>
              <span class="ant-dropdown-link">
                <a-badge count={this.notifications.length} class="item">
                  <a-icon
                    type="inbox"
                    size="large"
                  />
                </a-badge>
              </span>
              <a-card slot="overlay" style="width: 300px;">
                <a-timeline style="margin: 10px 10px;">
                  {this.notifications.map((event, index) => (
                    <a-timeline-item
                      color="orange"
                      style="margin-top: 5px;"
                      index={index}
                      key={index}
                      on-click={() => this.showEvent(event)}
                    >
                      <font color="grey">{event.title}</font>
                      <a-tag color="blue" style="margin-left: 10px;">{event.startTime}</a-tag>
                    </a-timeline-item>
                  ))}
                </a-timeline>
              </a-card>
            </a-dropdown>
          </li>
          <li>
            <a
              href="https://github.com/linuxing3/awesome-vue-ts-admin"
              target="_blank"
            >
              <a-icon type="github" />
            </a>
          </li>
          <li class="user">
            <a-dropdown>
              <span class="ant-dropdown-link">
                <a-icon type="user" />
                <span class="name">{this.username}</span>
              </span>
              <a-menu slot="overlay" on-click={this.menuClick}>
                <a-menu-item key="1">个人中心</a-menu-item>
                <a-menu-item key="2">修改密码</a-menu-item>
                <a-menu-item key="3">测试中心</a-menu-item>
                <a-menu-divider />
                <a-menu-item key="4">
                  <font color="red">退出登录</font>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </li>
        </ul>
      </header>
    );
  }
}
