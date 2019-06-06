import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadViserVue } from '@/utils/index';

import dv from './dataset';

import './index.less';

@Component({
  name: 'Area',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
  },
})
export default class Area extends Vue {
  itemLayout = {
    xxl: 12,
    xl: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  basicAreaChart: any = null;

  splineAreaChart: any = null;

  areaChartDatetimeChart: any = null;

  areaChartNegativeChart: any = null;

  areaChartGithubChart: any = null;

  areaChartGithub2Chart: any = null;

  stackedAreaChart: any = null;

  areaTimeSeriesChart: any = null;

  areaChartNullvaluesChart: any = null;

  mounted() {
    loadViserVue().then(() => {
      const container = document.querySelector('#basic-area');
      this.basicAreaChart = new window.ViserVue.Chart();
    });
  }

  render() {
    return (
      <div class="area-wrap">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">basic-area</h2>
              <div id="basic-area"></div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
