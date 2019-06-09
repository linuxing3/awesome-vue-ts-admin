import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';

import {
  countByCategory, DVHelper, initData, typeTransformer,
} from '@/utils/datetime';
import models from '@/models';

import {
  basicAreaOptions,
  splineAreaOptions,
  areaChartDatetimeOptions,
  areaChartNegativeOptions,
  areaChartGithubOptions,
  areaChartGithub2Options,
  stackedAreaOptions,
  areaTimeSeriesOptions,
  areaChartNullvaluesOptions,
} from './params';

import './index.less';

const Document: any = models.document;
const Event: any = models.event;
const Leave: any = models.leave;
const Member: any = models.member;

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

  basicAreaChart: any = null

  basicAreaSerieData: DVHelper = null

  basicAreaOption: any = basicAreaOptions

  splineAreaChart: any = null

  splineAreaSerieData: DVHelper = null

  splineAreaOption: any = splineAreaOptions

  areaChartDatetimeChart: any = null

  areaChartDatetimeOption: any = areaChartDatetimeOptions

  areaChartDateTimeData: DVHelper = null

  areaChartNegativeChart: any = null

  areaChartGithubChart: any = null

  areaChartGithub2Chart: any = null

  stackedAreaChart: any = null

  areaTimeSeriesChart: any = null

  areaChartNullvaluesChart: any = null

  // activated() {
  //   this.getData();
  // }

  mounted() {
    this.getData();
  }

  getData() {
    loadApexCharts().then(() => {
      // Basic Area
      Document.$fetch().then(async () => {
        const documents = await Document.all();
        console.log('Document Data:', documents);
        this.basicAreaSerieData = countByCategory(
          documents,
          {
            field: 'inOrOut',
            operate: 'count',
            x: 'x',
            y: 'y',
          },
          ['收', '发'],
          initData,
          typeTransformer,
        );
        console.log('Basic Chart Data:', this.basicAreaSerieData);
        this.basicAreaOption.xaxis.categories = this.basicAreaSerieData.labels;
        this.basicAreaOption.series[0].data = this.basicAreaSerieData.data;
        this.basicAreaChart = new window.ApexCharts(
          document.querySelector('#basic-area'),
          this.basicAreaOption,
        );
        this.basicAreaChart.render();
        // spine area
        this.splineAreaSerieData = countByCategory(
          documents,
          {
            field: 'keyword',
            operate: 'count',
            x: 'x',
            y: 'y',
          },
          ['人事', '党务', '财务', '行政', '对外'],
          initData,
          typeTransformer,
        );
        console.log('Spine Chart Data:', this.splineAreaSerieData);
        this.splineAreaOption.xaxis.categories = this.splineAreaSerieData.labels;
        this.splineAreaOption.series[0].data = this.splineAreaSerieData.data;
        this.splineAreaOption.series[1].data = this.splineAreaSerieData.data;
        this.splineAreaOption.series[2].data = this.splineAreaSerieData.data;
        this.splineAreaOption.series[3].data = this.splineAreaSerieData.data;
        this.splineAreaOption.series[4].data = this.splineAreaSerieData.data;
        this.splineAreaChart = new window.ApexCharts(
          document.querySelector('#spline-area'),
          this.splineAreaOption,
        );
        this.splineAreaChart.render();
      }); // Basic Area
    });
  }

  loadChart() {
    loadApexCharts().then(() => {
      this.basicAreaChart = new window.ApexCharts(
        document.querySelector('#basic-area'),
        basicAreaOptions,
      );
      this.basicAreaChart.render();
      this.splineAreaChart = new window.ApexCharts(
        document.querySelector('#spline-area'),
        splineAreaOptions,
      );
      this.splineAreaChart.render();
      this.areaChartDatetimeChart = new window.ApexCharts(
        document.querySelector('#area-chart-datetime'),
        areaChartDatetimeOptions,
      );
      this.areaChartDatetimeChart.render();
      this.areaChartNegativeChart = new window.ApexCharts(
        document.querySelector('#area-chart-negative'),
        areaChartNegativeOptions,
      );
      this.areaChartNegativeChart.render();
      this.areaChartGithub2Chart = new window.ApexCharts(
        document.querySelector('#area-chart-github2'),
        areaChartGithub2Options,
      );
      this.areaChartGithub2Chart.render();
      areaChartGithubOptions.events = {
        selection(e: any, t: any) {
          this.areaChartGithub2Chart.updateOptions(
            {
              xaxis: {
                min: t.xaxis.min,
                max: t.xaxis.max,
              },
            },
            !1,
            !1,
          );
        },
        updated(e: any, t: any) {
          this.areaChartGithub2Chart.updateOptions(
            {
              xaxis: {
                min: t.config.xaxis.min,
                max: t.config.xaxis.max,
              },
            },
            !1,
            !1,
          );
        },
      };
      this.areaChartGithubChart = new window.ApexCharts(
        document.querySelector('#area-chart-github'),
        areaChartGithubOptions,
      );
      this.areaChartGithubChart.render();
      this.stackedAreaChart = new window.ApexCharts(
        document.querySelector('#stacked-area'),
        stackedAreaOptions,
      );
      this.stackedAreaChart.render();
      this.areaTimeSeriesChart = new window.ApexCharts(
        document.querySelector('#area-timeSeries'),
        areaTimeSeriesOptions,
      );
      this.areaTimeSeriesChart.render();
      this.areaChartNullvaluesChart = new window.ApexCharts(
        document.querySelector('#area-chart-nullvalues'),
        areaChartNullvaluesOptions,
      );
      this.areaChartNullvaluesChart.render();
    });
  }

  render() {
    return (
      <div class="area-wrap">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">basic-area</h2>
              <div id="basic-area" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">spline-area</h2>
              <div id="spline-area" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }} hidden={true}>
            <a-card>
              <h2 class="item-title">area-chart-datetime</h2>
              <div id="area-chart-datetime" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }} hidden={true}>
            <a-card>
              <h2 class="item-title">area-chart-negative</h2>
              <div id="area-chart-negative" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }} hidden={true}>
            <a-card>
              <h2 class="item-title">area-chart-github</h2>
              <div id="area-chart-github" style="margin-bottom: 48px" />
              <div id="area-chart-github2" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }} hidden={true}>
            <a-card>
              <h2 class="item-title">stacked-area</h2>
              <div id="stacked-area" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }} hidden={true}>
            <a-card>
              <h2 class="item-title">area-timeSeries</h2>
              <div id="area-timeSeries" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }} hidden={true}>
            <a-card>
              <h2 class="item-title">area-chart-nullvalues</h2>
              <div id="area-chart-nullvalues" />
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
