import { Component, Vue } from 'vue-property-decorator';
import { Tabs, Icon } from 'ant-design-vue';
import icons from './icons';

import './index.less';

@Component({
  components: {
    'a-tabs': Tabs,
    'a-icon': Icon,
    'a-tab-pane': Tabs.TabPane,
  },
})
export default class IconSelector extends Vue {
  selectedIcon = ''

  icons = icons

  handleSelectedIcon(icon) {
    this.selectedIcon = icon;
    this.$emit('change', icon);
  }

  render() {
    const { handleSelectedIcon } = this;
    return (
      <div>
        <a-tabs>
          {icons.map((category, index) => <a-tab-pane key={index} tab={category.title}>
            <ul class='icon-list'>
              {category.icons.map((icon, key) => (
                  <li key={`${category.title}-${key}`}>
                    <a-icon type={icon} style="font-size: 36px; color: blue" on-click={() => handleSelectedIcon(icon)} />
                  </li>
              ))}
            </ul>
            </a-tab-pane>)}
        </a-tabs>
    </div>
    );
  }
}
