import { Component, Vue } from 'vue-property-decorator';
import { months } from 'moment';
import {
  Button, DatePicker, Modal, Row, Col, Card, Icon, Radio,
} from 'ant-design-vue';
import Chart from 'chart.js';
import gql from 'graphql-tag';
import { upperCaseFirst } from 'change-case';

import { numFormat } from '@/utils/index';
import {
  countByCategory, initData, yearlyTransformer, typeTransformer,
} from '@/utils/datetime';
import models from '@/models';

import './index.less';

const Document: any = models.document;
const Event: any = models.event;
const Member: any = models.member;
const Leave: any = models.leave;
const UserMilitant: any = models.userMilitant;

@Component({
  name: 'Dashboard',
  components: {
    'a-button': Button,
    'a-date-picker': DatePicker,
    'a-radio-group': Radio.Group,
    'a-radio-button': Radio.Button,
    'a-modal': Modal,
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
    'a-icon': Icon,
  },
})
export default class Dashboard extends Vue {
  modelName: string = 'member'

  barData = {
    projections: null,
    actuals: null,
  }

  doughnutData = {
    labels: null,
    data: null,
  }

  cardList: any[] = []

  lineData = {
    labels: null,
    PreviousYear: null,
    currentYear: null,
    first: null,
    second: null,
    third: null,
    fourth: null,
  }

  hello: string = ''

  newTag: string = ''

  apollo: any = {
    // 简单的查询，将更新 'hello' 这个 vue 属性
    hello: gql`
      query {
        hello
      }
    `,
  }

  async created() {
    await this.refresh();
  }

  async activated() {
    await this.refresh();
  }

  async refresh() {
    await this.fetch();
    await this.loadData();
    this.loading = false;
    setTimeout(() => {
      this.init();
    }, 200);
  }

  addTag() {
    // 保存用户输入以防止错误
    const newTag = this.newTag;
    // 将其清除以尽早更新用户页面
    this.newTag = '';
    // 调用 graphql 变更
    this.$apollo
      .mutate({
        // 查询语句
        mutation: gql`
          mutation($label: String!) {
            addTag(label: $label) {
              id
              label
            }
          }
        `,
        // 参数
        variables: {
          label: newTag,
        },
        // 用结果更新缓存
        // 查询将先通过乐观响应、然后再通过真正的变更结果更新
        update: (store, { data: { addTag } }) => {
          // 从缓存中读取这个查询的数据
          const data: any = store.readQuery({ query: 'TAGS_QUERY' });
          // 将变更中的标签添加到最后
          data.tags.push(addTag);
          // 将数据写回缓存
          store.writeQuery({ query: 'TAGS_QUERY', data });
        },
        // 乐观 UI
        // 将在请求产生时作为“假”结果，使用户界面能够快速更新
        optimisticResponse: {
          __typename: 'Mutation',
          addTag: {
            __typename: 'Tag',
            id: -1,
            label: newTag,
          },
        },
      })
      .then((data) => {
        // 结果
        console.log(data);
      })
      .catch((error) => {
        // 错误
        console.error(error);
        // 恢复初始用户输入
        this.newTag = newTag;
      });
  }

  async fetch() {
    /**
    * async data from localforage
    */
    await Member.$fetch();
    await Document.$fetch();
    await UserMilitant.$fetch();
    await Event.$fetch();
    await Leave.$fetch();
  }

  async loadData() {
    // load card grid
    const DocumentTotal = Document.count();
    const MemberTotal = Member.count();
    const UserMilitantTotal = UserMilitant.count();
    const EventTotal = Event.count();
    this.cardList = [
      {
        name: Member.entity,
        value: MemberTotal,
        number: MemberTotal,
      },
      {
        name: UserMilitant.entity,
        value: UserMilitantTotal,
        number: UserMilitantTotal,
      },
      {
        name: Event.entity,
        value: EventTotal,
        number: EventTotal,
      },
      {
        name: Document.entity,
        value: DocumentTotal,
        number: DocumentTotal,
      },
    ];

    // load bar
    const documents = await Document.all();
    const projectionData = countByCategory(documents, {
      field: 'date',
      x: 'x',
      y: 'y',
      operate: 'count',
    });
    console.log('Document Data:', projectionData);
    this.barData.projections = projectionData.data;
    // load line
    const events = await Event.all();
    const lineData = countByCategory(
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
    console.log('Event Data:', lineData);
    this.lineData = {
      labels: lineData.labels,
      first: lineData.data,
      second: lineData.data,
      third: lineData.data,
      fourth: lineData.data,
      currentYear: lineData.data[1],
      PreviousYear: lineData.data[2],
    };


    const leaves = await Leave.all();
    console.log('Leave Data:', leaves);
    // donut chart
    this.doughnutData = countByCategory(
      leaves,
      {
        field: 'private',
        operate: 'count',
        x: 'x',
        y: 'y',
      },
      ['因私', '因公'],
      initData,
      typeTransformer,
    );
  }

  init() {
    this.BarChart();
    this.LineChart();
    this.Doughnut();
  }

  BarChartDom: any = null

  BarChart() {
    const BarChart: any = document.getElementById('BarChart');
    if (!BarChart) {
      return false;
    }
    const a: any = BarChart.getContext('2d').createLinearGradient(
      0,
      500,
      0,
      150,
    );
    a.addColorStop(0, '#fa5c7c');
    a.addColorStop(1, '#727cf5');
    const config: any = {
      type: 'bar',
      data: {
        labels: months(),
        datasets: [
          {
            label: 'Document In',
            backgroundColor: a,
            borderColor: a,
            hoverBackgroundColor: a,
            hoverBorderColor: a,
            data: this.barData.projections,
          },
          {
            label: 'Document Out',
            backgroundColor: '#e3eaef',
            borderColor: '#e3eaef',
            hoverBackgroundColor: '#e3eaef',
            hoverBorderColor: '#e3eaef',
            data: this.barData.actuals,
          },
        ],
      },
      options: {
        maintainAspectRatio: !1,
        legend: {
          display: !1,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: !1,
              },
              stacked: !1,
              ticks: {
                stepSize: 20,
              },
            },
          ],
          xAxes: [
            {
              barPercentage: 0.7,
              categoryPercentage: 0.5,
              stacked: !1,
              gridLines: {
                color: 'rgba(0,0,0,0.01)',
              },
            },
          ],
        },
      },
    };
    this.BarChartDom = new Chart(BarChart.getContext('2d'), config);
  }

  LineChart() {
    const LineChart: any = document.getElementById('LineChart');
    const config: any = {
      type: 'line',
      data: {
        labels: this.lineData.labels,
        datasets: [
          {
            label: '2017',
            backgroundColor: 'transparent',
            borderColor: '#727cf5',
            data: this.lineData.first,
          },
          {
            label: '2018',
            fill: !0,
            backgroundColor: 'transparent',
            borderColor: '#0acf97',
            data: this.lineData.second,
          },
          {
            label: '2019',
            fill: !0,
            backgroundColor: 'transparent',
            borderColor: '#0acf97',
            data: this.lineData.third,
          },
          {
            label: '2020',
            fill: !0,
            backgroundColor: 'transparent',
            borderColor: '#0acf97',
            data: this.lineData.fourth,
          },
        ],
      },
      options: {
        maintainAspectRatio: !1,
        legend: {
          display: !1,
        },
        tooltips: {
          intersect: !1,
        },
        hover: {
          intersect: !0,
        },
        plugins: {
          filler: {
            propagate: !1,
          },
        },
        scales: {
          xAxes: [
            {
              reverse: !0,
              gridLines: {
                color: 'rgba(0,0,0,0.05)',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                stepSize: 20,
              },
              display: !0,
              borderDash: [5, 5],
              gridLines: {
                color: 'rgba(0,0,0,0)',
                fontColor: '#fff',
              },
            },
          ],
        },
      },
    };
    this.BarChartDom = new Chart(LineChart.getContext('2d'), config);
  }

  DoughnutDom: any = null

  Doughnut() {
    const config: any = {
      type: 'doughnut',
      data: {
        labels: this.doughnutData.labels,
        datasets: [
          {
            data: this.doughnutData.data,
            backgroundColor: ['#727cf5', '#fa5c7c', '#0acf97', '#ebeff2'],
            borderColor: 'transparent',
            borderWidth: '3',
          },
        ],
      },
      options: {
        maintainAspectRatio: !1,
        cutoutPercentage: 60,
        legend: {
          display: !1,
        },
      },
    };
    const Doughnut: any = document.getElementById('Doughnut');
    this.DoughnutDom = new Chart(Doughnut.getContext('2d'), config);
  }

  async changeDonut(e) {
    const field = e.target.value;
    this.$log.info('Donut value changed:', field);
    const leaves = await Leave.all();
    let label = [];
    this.$log.info('Leave Data:', leaves);
    if (field ==='private') {
      label = ['因私', '因公'];
      this.doughnutData = countByCategory(
        leaves,
        {
          field,
          operate: 'count',
          x: 'x',
          y: 'y',
        },
        label,
        initData,
        typeTransformer,
      );
    }
    if (field ==='route') {
      label = ['美国', '欧洲', '其他'];
      this.doughnutData = countByCategory(
        leaves,
        {
          field,
          operate: 'count',
          x: 'x',
          y: 'y',
        },
        label,
        initData,
        typeTransformer,
      );
    }
    if (field ==='month') {
      this.doughnutData = countByCategory(
        leaves,
        {
          field: 'fromDate',
          operate: 'count',
          x: 'x',
          y: 'y',
        },
      );
    }
    // donut chart
    this.$log.info('Leave Statistic:', this.doughnutData);
    this.Doughnut();
  }

  ColLayout: any = {
    span: 12,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  changeRoute(route) {
    const name = `${upperCaseFirst(route)}Table`;
    this.$router.push({
      name,
    });
  }

  iconList = ['team', 'profile', 'calendar', 'folder-open']

  loading: boolean = true

  renderDonut(): JSX.Element {
    return (
      <a-col span={8} xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
        <a-card loading={this.loading} class="dash-box total-wrap">
          <h2 class="title">休假统计</h2>
          <a-icon class="operate" type="ellipsis" />
          <div class="filter-wrap">
            <a-radio-group
              defaultValue="private"
              buttonStyle="solid"
              on-change={this.changeDonut}
            >
              <a-radio-button value="private">公私</a-radio-button>
              <a-radio-button value="route">路线</a-radio-button>
              <a-radio-button value="month">月份</a-radio-button>
            </a-radio-group>
            <span class="tips">选择分类</span>
          </div>
          <div
            style="height: 225px; margin-top: 40px"
            class="chartjs-chart"
          >
            <canvas height="100px" id="Doughnut" />
          </div>
          <div class="chart-widget-list">
            {this.doughnutData.labels.map((label, index) => (
              <p>
                <i class="mdi mdi-square text-primary" />
                {label}
                <span class="fr">{this.doughnutData.data[index]}</span>
              </p>
            ))}
          </div>
        </a-card>
      </a-col>
    );
  }

  renderCard(): JSX.Element {
    return (
      <a-col span={10} xxl={10} xl={10} lg={12} md={24} sm={24} xs={24}>
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          {/* card list grid */}
          {this.cardList.map((item: any, index: number) => (
            <a-col
              {...{ props: this.ColLayout }}
              class="sub-item"
              on-click={() => this.changeRoute(item.name)}
            >
              <a-card loading={this.loading} class="dash-card">
                <h3>{this.$t(item.name)}</h3>
                <a-icon class="icon" type={this.iconList[index]} />
                <p class="number">{numFormat(item.value)}</p>
                <div class="footer">
                  <span class={`s-number ${index % 2 ? 'green' : 'red'}`}>
                    <a-icon type={index % 2 ? 'arrow-up' : 'arrow-down'} />
                    {item.number}%
                  </span>
                  <span class="txt">Status</span>
                </div>
              </a-card>
            </a-col>
          ))}
        </a-row>
      </a-col>
    );
  }

  renderBar(): JSX.Element {
    return (
      <a-col
        span={14}
        xxl={14}
        xl={14}
        lg={12}
        md={24}
        sm={24}
        xs={24}
        on-click={() => this.changeRoute('document')}
      >
        <a-card loading={this.loading} class="dash-box dash-bar-chart">
          <a-icon class="operate" type="ellipsis" />
          <h2 class="title">按月统计文档</h2>
          <div style="height: 263px;" class="chartjs-chart">
            <canvas height="86px" id="BarChart" />
          </div>
        </a-card>
      </a-col>
    );
  }

  renderLine(): JSX.Element {
    return (
      <a-col
        span={16}
        xxl={16}
        xl={16}
        lg={24}
        md={24}
        sm={24}
        xs={24}
        on-click={() => this.changeRoute('event')}
      >
        <a-card loading={this.loading} class="dash-box revenue-chart">
          <h2 class="title">内外活动统计</h2>
          <a-icon class="operate" type="ellipsis" />
          <div class="week-data">
            <div class="item">
              <h4 class="item-title">今年</h4>
              <p class="number">{numFormat(this.lineData.currentYear)}件</p>
            </div>
            <div class="item">
              <h4 class="item-title">去年</h4>
              <p class="number number2">
                {numFormat(this.lineData.PreviousYear)}件
              </p>
            </div>
          </div>
          <div class="float-text">
            <p class="txt">统计：</p>
            <p class="tips">...</p>
            <a-button type="dashed">
              看图说话 <a-icon type="arrow-right" />
            </a-button>
          </div>
          <div
            style="height: 364px; margin-top: 40px"
            class="chartjs-chart"
          >
            <canvas height="100px" id="LineChart" />
          </div>
        </a-card>
      </a-col>
    );
  }

  render() {
    return (
      <div class="container">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }} class="dash-col">
          {this.renderCard()}
          {this.renderBar()}
        </a-row>
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          {this.renderLine()}
          {this.renderDonut()}
        </a-row>
      </div>
    );
  }
}
