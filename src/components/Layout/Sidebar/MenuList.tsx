import {
  Component, Emit, Vue, Prop, Watch,
} from 'vue-property-decorator';
import { Menu, Icon } from 'ant-design-vue';
import { routerItem } from '@/interface';
import { routeToArray } from '@/utils/index';
import './MenuList.less';

@Component({
  components: {
    'a-menu': Menu,
    'a-submenu': Menu.SubMenu,
    'a-menu-item-group': Menu.ItemGroup,
    'a-menu-item': Menu.Item,
    'a-icon': Icon,
  },
})
export default class MenuList extends Vue {
  @Prop({ default: '#010101' }) private bgColor!: string;

  @Prop({ default: '#fff' }) private txtColor!: string;

  keys: string[] = []

  openKeys: string[] = []

  @Watch('$route', { immediate: true, deep: true })
  routeChange(to: any, from: any) {
    this.keys = routeToArray(to.path).routeArr;
    const open = this.keys.concat();
    open.pop();
    this.openKeys = open || [];
  }

  openChange(openKeys: string[]) {
    this.openKeys = openKeys;
  }

  render() {
    const { menuData, sidebar: { opened } } = this.$store.state.app;
    return (
      <a-menu
        inlineCollapsed={!opened}
        theme='dark'
        mode="inline"
        class="left-menu"
        openKeys={this.openKeys}
        on-openChange={this.openChange}
        selectedKeys={this.keys}
        on-click={(params: {item: any, key: string, keyPath: string[]}) => {
          const keyPath = params.keyPath.reverse();
          this.openPage(keyPath.join('/'));
        }}
      >
        {menuData ? this.renderMenu(menuData) : null}
      </a-menu>
    );
  }

  /**
   * 用路由表自动生成菜单
   * @param menuData array with dynamic routerItems
   * @param parentPath posible path
   */
  renderMenu(menuData: routerItem[], parentPath?: string): (JSX.Element | null)[] {
    return menuData.map((item: routerItem) => {
      if (item.children) {
        // 如果具有[子项目]属性，显示子项目
        let isEmpty = true;
        item.children.forEach((items: routerItem) => {
          if (!items.hidden) {
            isEmpty = false;
          }
        });
        if (isEmpty) {
          // 如果没有子菜单，只显示本级菜单
          return <a-menu-item
            id={item.path}
            key={`${item.path}`}>
            <a-icon type={item.icon}></a-icon>
            <span>{item.name}</span>
          </a-menu-item>;
        }
        // 如果有子菜单，循环显示子菜单
        return <a-submenu
          id={item.path}
          key={item.path}>
          <template slot="title">
          <a-icon type={item.icon}></a-icon>
            <span>{item.name}</span>
          </template>
          {/* 循环显示子菜单 */}
          {this.renderMenu(item.children, parentPath ? `${parentPath}/${item.path}` : item.path)}
        </a-submenu>;
      } if (item.hidden) {
        // 如果具有[隐藏]属性，不显示
        return null;
      }
      // 默认返回一个菜单项
      return <a-menu-item
        id={item.path}
        key={`${item.path}`}>
        <a-icon type={item.icon}></a-icon>
        <span>{item.name}</span>
      </a-menu-item>;
    });
  }

  openPage(path: string) {
    this.$router.push(path);
  }
}
