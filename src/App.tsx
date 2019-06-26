import {
  Component, Prop, Emit, Vue, Inject, Provide, Watch,
} from 'vue-property-decorator';
import { LocaleProvider } from 'ant-design-vue';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import en_US from 'ant-design-vue/lib/locale-provider/en_US';
import es_ES from 'ant-design-vue/lib/locale-provider/es_ES';
import 'moment/locale/zh-cn';
// import 'moment/locale/en-us';
import AppMain from '@/components/Layout/AppMain';
import Loader from '@/components/Loader/index.vue';
import './App.less';

@Component({
  components: {
    loader: Loader,
    'a-locale-provider': LocaleProvider,
  },
})
export default class App extends Vue {
  locales = {
    zh_CN,
    en_US,
    es_ES,
  }

  locale = zh_CN

  get localeName() {
    return this.$store.state.app.locale;
  }

  @Watch('localeName', { immediate: true, deep: true })
  localeChange(to: any, from: any) {
    this.locale = this.locales[to];
  }

  created() {
    this.isMobile();
    window.onresize = () => {
      this.isMobile();
    };
  }

  // 屏幕width 是否 < 768
  isMobile() {
    const { isMobile } = this.$store.state.app;
    const body = document.querySelector('body');
    const bodyWidth = body ? body.offsetWidth : 0;
    if (isMobile && bodyWidth > 768) {
      this.$store.dispatch('ChangeMobile', false);
    } else if (!isMobile && bodyWidth <= 768) {
      this.$store.dispatch('ChangeMobile', true);
    }
  }

  render() {
    const self = this;
    return (
      <div id="app">
        <loader spinning={self.$store.getters.spinning} fullScreen></loader>
        <a-locale-provider locale={this.locale}>
          <AppMain />
        </a-locale-provider>
      </div>
    );
  }
}
