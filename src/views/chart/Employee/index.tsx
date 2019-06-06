import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';
import { keys, values } from 'lodash';
import { months } from 'moment';
import { dvCountAllByMonth, fillAllMonth } from '@/utils/datetime';
import { basicAreaOptions } from '@/views/chart/apexCharts/area/params';
import models from '@/models';
import dv from './dataset';

import './index.less';

const Entity: any = models.employee;

@Component({
  name: 'Area',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
  },
})
export default class Area extends Vue {
  monthlyCount: any []

  itemLayout = {
    xxl: 12,
    xl: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  basicAreaChart: any = null

  splineAreaChart: any = null

  areaChartDatetimeChart: any = null

  areaChartNegativeChart: any = null

  areaChartGithubChart: any = null

  areaChartGithub2Chart: any = null

  stackedAreaChart: any = null

  areaTimeSeriesChart: any = null

  areaChartNullvaluesChart: any = null

  activated() {
    this.getData();
  }

  mounted() {
    this.getData();
    const options = {
      ...basicAreaOptions,
      series: [
        {
          name: 'employee',
          data: this.monthlyCount
        }
      ],
      labels: months(),
      xaxis: {
        type: 'string'
      }
    }
    loadApexCharts().then(() => {
      this.basicAreaChart = new window.ApexCharts(
        document.querySelector('#basic-area'),
        options,
      );
      this.basicAreaChart.render();
    });
  }

  getData() {
    const data = dvCountAllByMonth({ name: 'employee' }, Entity.all(), {
      field: 'joiningDate',
      as: 'month',
      operate: ['count'],
    }).rows;
    // const data = Entity.countByMonth('joiningDate', true)
    this.$log.info('Chart Series from @antv/data-set: ', data);
    this.monthlyCount = fillAllMonth(data, 10);
    this.$log.info('Chart Series filledRows: ', this.monthlyCount);
  }

  render() {
    return (
      <div class="area-wrap">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">employee-area</h2>
              <div id="basic-area" />
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
