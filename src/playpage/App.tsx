import {
  Component, Vue,
} from 'vue-property-decorator';
import {
  LocaleProvider, Card, Row, Col,
} from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

import '@/App.less';

import {
  basicBarOptions,
  groupedBarOptions,
  stackedBarOptions,
  fullStackedBarOptions,
  negativeBarOptions,
  patternBarOptions,
  imageFillBarOptions,
} from './params';

@Component({
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
    'a-locale-provider': LocaleProvider,
  },
})
export default class App extends Vue {
  itemLayout = {
    xxl: 24,
    xl: 24,
    md: 24,
    sm: 24,
    xs: 24,
  }

  imageFillBarChart: any = null

  mounted() {
    this.getData();
  }

  getData() {
    loadApexCharts().then(() => {
      this.imageFillBarChart = new window.ApexCharts(
        document.querySelector('#image-fill-bar'),
        imageFillBarOptions,
      );
      this.imageFillBarChart.render();
    });
  }

  render() {
    return (
      <div id="play">
        <a-locale-provider locale={zh_CN}>
          <div class="bar-wrap">
            <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
              <a-col {...{ props: this.itemLayout }}>
                <a-card>
                  <h2 class="item-title">统计文件</h2>
                  <div id="image-fill-bar" />
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-locale-provider>
      </div>
    );
  }
}
