import {
  Component, Vue,
} from 'vue-property-decorator';
import { LocaleProvider, Card } from 'ant-design-vue';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

import '@/App.less';

@Component({
  components: {
    'a-card': Card,
    'a-locale-provider': LocaleProvider,
  },
})
export default class App extends Vue {
  render() {
    return (
      <div id="play">
        <a-locale-provider locale={zh_CN}>
          playground
        </a-locale-provider>
      </div>
    );
  }
}
