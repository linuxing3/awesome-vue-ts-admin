import { Component, Vue } from 'vue-property-decorator';
import { Switch } from 'ant-design-vue';
import config from '@/utils/config';
import MenuList from '@/components/Layout/Sidebar/MenuList';
import './Sidebar.less';

@Component({
  components: {
    'a-switch': Switch,
  },
})
export default class SiderBar extends Vue {
  sideBarStyle = {
    backgroundColor: '#010101',
  }

  changeTheme() {
    this.$log.info('Change theme of menu list...');
    const { sidebar: { theme } } = this.$store.state.app;
    switch (theme) {
      case 'dark':
        this.$store.dispatch('ToggleTheme', 'light');
        this.sideBarStyle.backgroundColor = '#fff';
        break;
      case 'light':
        this.$store.dispatch('ToggleTheme', 'dark');
        this.sideBarStyle.backgroundColor = '#010101';
        break;
      default:
        this.$store.dispatch('ToggleTheme', 'dark');
        break;
    }
  }

  render() {
    return (
      <div class="side-bar" style={{ 'background-color': this.sideBarStyle.backgroundColor }}>
        <div class="logo-wrap">
          <img src={config.logo} alt="logo" />
          <h1 className="txt">{config.name}</h1>
        </div>
        <div class="switch-wrap">
          <a-switch unCheckedChildren={'暗黑'} checkedChildren={'炫白'} on-change={this.changeTheme} />
        </div>
        <MenuList />
      </div>
    );
  }
}
