import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Card } from 'ant-design-vue';
import { loadApexCharts } from '@/utils/index';

import {
  countByCategory, DVHelper, initData, yearlyTransformer,
} from '@/utils/datetime';
import models from '@/models';

import {
  basicBarOptions,
  groupedBarOptions,
  stackedBarOptions,
  fullStackedBarOptions,
  negativeBarOptions,
  patternBarOptions,
  imageFillBarOptions,
} from './params';

import './index.less';

const Document: any = models.document;
const Event: any = models.event;
const Leave: any = models.leave;

@Component({
  name: 'Bar',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
  },
})
export default class Bar extends Vue {
  itemLayout = {
    xxl: 12,
    xl: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  basicBarSerieData: DVHelper = null

  basicBarOption: any = basicBarOptions

  basicBarChart: any = null

  groupedBarSerieData: DVHelper = null

  groupedBarOption: any = groupedBarOptions

  groupedBarChart: any = null

  stackedBarSerieData: DVHelper = null

  stackedBarOption: any = stackedBarOptions

  stackedBarChart: any = null

  fullStackedBarSerieData: DVHelper = null

  fullStackedBarOption: any = fullStackedBarOptions

  fullStackedBarChart: any = null

  negativeBarChart: any = null

  patternBarChart: any = null

  imageFillBarChart: any = null

  activated() {
    this.getData();
  }

  mounted() {
    this.getData();
  }

  loadChart() {
    this.negativeBarChart = new window.ApexCharts(
      document.querySelector('#negative-bar'),
      negativeBarOptions,
    );
    this.negativeBarChart.render();
    this.patternBarChart = new window.ApexCharts(
      document.querySelector('#pattern-bar'),
      patternBarOptions,
    );
    this.patternBarChart.render();
    this.imageFillBarChart = new window.ApexCharts(
      document.querySelector('#image-fill-bar'),
      imageFillBarOptions,
    );
    this.imageFillBarChart.render();
  }

  getData() {
    loadApexCharts().then(() => {
      // Basic Bar
      Document.$fetch().then(async () => {
        const documents = await Document.all();
        console.log('Document Data:', documents);
        this.basicBarSerieData = countByCategory(documents, {
          field: 'date',
          x: 'x',
          y: 'y',
          operate: 'count',
        });
        console.log('Basic Chart Data:', this.basicBarSerieData);
        this.basicBarOption.xaxis.categories = this.basicBarSerieData.labels;
        this.basicBarOption.series[0].data = this.basicBarSerieData.data;
        this.basicBarChart = new window.ApexCharts(
          document.querySelector('#basic-bar'),
          this.basicBarOption,
        );
        this.basicBarChart.render();
      });
      // Grouped Bar
      Event.$fetch().then(async () => {
        const events = await Event.all();
        console.log('Event Data:', events);
        this.groupedBarSerieData = countByCategory(
          events,
          {
            field: 'date',
            x: 'x',
            y: 'y',
            operate: 'count',
          },
          ['2017', '2018', '2019', '2020'],
          initData,
          yearlyTransformer,
        );
        console.log('Grouped Chart Data:', this.groupedBarSerieData);
        this.groupedBarOption.xaxis.categories = this.groupedBarSerieData.labels;
        this.groupedBarOption.series[0].data = this.groupedBarSerieData.data;
        this.groupedBarOption.series[1].data = this.groupedBarSerieData.data;
        this.groupedBarChart = new window.ApexCharts(
          document.querySelector('#grouped-bar'),
          this.groupedBarOption,
        );
        this.groupedBarChart.render();
      }); // groupedBar
      // Stacked Bar
      Leave.$fetch().then(async () => {
        const leaves = await Leave.all();
        console.log('Leave Data:', leaves);
        this.stackedBarSerieData = countByCategory(leaves, {
          field: 'fromDate',
          operate: 'count',
          x: 'x',
          y: 'y',
        });
        console.log('Stacked Chart Data:', this.stackedBarSerieData);
        this.stackedBarOption.xaxis.categories = this.stackedBarSerieData.labels;
        this.stackedBarOption.series[0].data = this.stackedBarSerieData.data;
        this.stackedBarOption.series[1].data = this.stackedBarSerieData.data;
        this.stackedBarOption.series[2].data = this.stackedBarSerieData.data;
        this.stackedBarOption.series[3].data = this.stackedBarSerieData.data;
        this.stackedBarOption.series[4].data = this.stackedBarSerieData.data;
        this.stackedBarChart = new window.ApexCharts(
          document.querySelector('#stacked-bar'),
          this.stackedBarOption,
        );
        this.stackedBarChart.render();
      }); // stackedBar
      // FullStacked Bar
      Leave.$fetch().then(async () => {
        const leaves = await Leave.all();
        console.log('Leave Data:', leaves);
        this.fullStackedBarSerieData = countByCategory(leaves, {
          field: 'fromDate',
          operate: 'count',
          x: 'x',
          y: 'y',
        });
        console.log('Stacked Chart Data:', this.fullStackedBarSerieData);
        this.fullStackedBarOption.xaxis.categories = this.fullStackedBarSerieData.labels;
        this.fullStackedBarOption.series[0].data = this.fullStackedBarSerieData.data;
        this.fullStackedBarOption.series[1].data = this.fullStackedBarSerieData.data;
        this.fullStackedBarOption.series[2].data = this.fullStackedBarSerieData.data;
        this.fullStackedBarChart = new window.ApexCharts(
          document.querySelector('#full-stacked-bar'),
          this.fullStackedBarOption,
        );
        this.fullStackedBarChart.render();
      }); // stackedBar
    });
  }

  render() {
    return (
      <div class="bar-wrap">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">按月统计文件</h2>
              <div id="basic-bar" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">按公私统计活动</h2>
              <div id="grouped-bar" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">按月统计休假</h2>
              <div id="stacked-bar" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }}>
            <a-card>
              <h2 class="item-title">按路线统计休假</h2>
              <div id="full-stacked-bar" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }} hidden={true}>
            <a-card>
              <h2 class="item-title">negative-bar</h2>
              <div id="negative-bar" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }} hidden={true}>
            <a-card>
              <h2 class="item-title">pattern-bar</h2>
              <div id="pattern-bar" />
            </a-card>
          </a-col>
          <a-col {...{ props: this.itemLayout }} hidden={true}>
            <a-card>
              <h2 class="item-title">image-fill-bar</h2>
              <div id="image-fill-bar" />
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
