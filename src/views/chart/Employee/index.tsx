import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';
import { countByCategory, DVHelper } from '@/utils/datetime';
import models from '@/models';
import { employeeBasicAreaOptions } from './dataset';

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

  options: any = employeeBasicAreaOptions

  employeeSerie: DVHelper = null

  basicAreaChart: any = null

  mounted() {
    this.getData();
  }

  activated() {
    this.getData();
  }

  getData() {
    Entity.$fetch().then(async () => {
      const employees = await Entity.all();
      console.log('Entity Data:', employees);
      this.employeeSerie = countByCategory(employees, {
        field: 'birthday',
        as: 'month',
        operate: 'count',
      });
      console.log('Chart Data:', this.employeeSerie);
      this.options.labels = this.employeeSerie.labels;
      this.options.series[0].data = this.employeeSerie.data;
      // loading charts
      loadApexCharts().then(() => {
        this.basicAreaChart = new window.ApexCharts(
          document.querySelector('#basic-area'),
          this.options,
        );
        this.basicAreaChart.render();
      });
    });
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
