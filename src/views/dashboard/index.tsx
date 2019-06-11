import { Component, Vue, Emit } from 'vue-property-decorator';
import {
  keys, values, mapKeys, pullAll, uniq, map, countBy,
} from 'lodash';
import { months, weekdays } from 'moment';
import {
  Button, DatePicker, Modal, Row, Col, Card, Icon, Radio,
} from 'ant-design-vue';
import Chart from 'chart.js';
import gql from 'graphql-tag';

import { numFormat } from '@/utils/index';
import { fillAllMonth } from '@/utils/datetime';
import { entity } from '@/mock/dashboard';

import Member from '@/store/modules/pages/Member/models/Member';
import Document from '@/store/modules/pages/Document/models/Document';
import UserMilitant from '@/store/modules/pages/UserMilitant/models/UserMilitant';
import Event from '@/store/modules/pages/Event/models/Event';

import './index.less';

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

  pageData: any = null;

  hello: string = '';

  newTag: string = '';

  apollo: any = {
    // 简单的查询，将更新 'hello' 这个 vue 属性
    hello: gql`query { hello }`,
  }

  created() {
    // this.loadMock();
    this.loadData();
  }

  activated() {
    // this.loadMock();
    this.loadData();
  }

  loadMock() {
    this.$log.suc(entity);
    this.pageData = entity;
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
    this.$apollo.mutate({
      // 查询语句
      mutation: gql`mutation ($label: String!) {
        addTag(label: $label) {
          id
          label
        }
      }`,
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
    }).then((data) => {
      // 结果
      console.log(data);
    }).catch((error) => {
      // 错误
      console.error(error);
      // 恢复初始用户输入
      this.newTag = newTag;
    });
  }

  loadData() {
    this.$log.suc(entity);
    this.pageData = {};
    // counting cards
    const MemberTotal = Member.count();
    const DocumentTotal = Document.count();
    const MilitantTotal = UserMilitant.count();
    const EventTotal = Event.count();
    this.pageData.dataList = [
      {
        name: 'member',
        value: MemberTotal,
        number: Math.random(),
      },
      {
        name: 'document',
        value: DocumentTotal,
        number: Math.random(),
      },
      {
        name: 'userMilitant',
        value: MilitantTotal,
        number: Math.random(),
      },
      {
        name: 'event',
        value: EventTotal,
        number: Math.random(),
      },
    ];
    // counting documents sending by month
    const countByMonth = Document.countByMonth('date', true);
    const projections = fillAllMonth(countByMonth, 15);
    const actuals = fillAllMonth(countByMonth, 10);
    this.pageData.projections = projections;
    this.pageData.actuals = actuals;
    this.pageData.lineData = {
      Current: map(projections, o => o * 10),
      Previous: map(projections, o => o * 8),
    };
    this.pageData.doughnut = map(projections, o => o * 20);
    this.pageData.CurrentWeek = '16666';
    this.pageData.PreviousWeek = '23333';
    this.loading = false;
    setTimeout(() => {
      this.init();
    }, 200);
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
      0, 500, 0,
      150,
    );
    a.addColorStop(0, '#fa5c7c');
    a.addColorStop(1, '#727cf5');
    const config: any = {
      type: 'bar',
      data: {
        labels: months(),
        datasets: [{
          label: 'Document In',
          backgroundColor: a,
          borderColor: a,
          hoverBackgroundColor: a,
          hoverBorderColor: a,
          data: this.pageData.projections,
        }, {
          label: 'Document Out',
          backgroundColor: '#e3eaef',
          borderColor: '#e3eaef',
          hoverBackgroundColor: '#e3eaef',
          hoverBorderColor: '#e3eaef',
          data: this.pageData.actuals,
        }],
      },
      options: {
        maintainAspectRatio: !1,
        legend: {
          display: !1,
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: !1,
            },
            stacked: !1,
            ticks: {
              stepSize: 20,
            },
          }],
          xAxes: [{
            barPercentage: 0.7,
            categoryPercentage: 0.5,
            stacked: !1,
            gridLines: {
              color: 'rgba(0,0,0,0.01)',
            },
          }],
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
        labels: weekdays(),
        datasets: [{
          label: 'Current Week',
          backgroundColor: 'transparent',
          borderColor: '#727cf5',
          data: this.pageData.lineData.Current,
        }, {
          label: 'Previous Week',
          fill: !0,
          backgroundColor: 'transparent',
          borderColor: '#0acf97',
          data: this.pageData.lineData.Previous,
        }],
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
          xAxes: [{
            reverse: !0,
            gridLines: {
              color: 'rgba(0,0,0,0.05)',
            },
          }],
          yAxes: [{
            ticks: {
              stepSize: 20,
            },
            display: !0,
            borderDash: [5, 5],
            gridLines: {
              color: 'rgba(0,0,0,0)',
              fontColor: '#fff',
            },
          }],
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
        labels: ['Direct', 'Affilliate', 'Sponsored', 'E-mail'],
        datasets: [{
          data: this.pageData.doughnut,
          backgroundColor: ['#727cf5', '#fa5c7c', '#0acf97', '#ebeff2'],
          borderColor: 'transparent',
          borderWidth: '3',
        }],
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


  ColLayout: any = {
    span: 12,
    lg: 12,
    md: 12,
    sm: 24,
    xs: 24,
  }

  tabChange() {

  }

  iconList = ['team', 'shopping-cart', 'pay-circle', 'line-chart']

  loading: boolean = true;

  renderMock(): JSX.Element {
    return (
      <div class="container">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }} class="dash-col">
          <a-col span={10} xxl={10} xl={10} lg={12} md={24} sm={24} xs={24}>
            <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
              {/* datalist with cards */}
              {
                this.pageData && this.pageData.dataList.map((item: any, index: number) => <a-col {...{ props: this.ColLayout }} class="sub-item">
                  <a-card loading={this.loading} class="dash-card">
                    <h3>{item.name}</h3>
                    <a-icon class="icon" type={this.iconList[index]}></a-icon>
                    <p class="number">{numFormat(item.value)}</p>
                    <div class="footer">
                      <span class={`s-number ${index % 2 ? 'green' : 'red'}`}>
                        <a-icon type={index % 2 ? 'arrow-up' : 'arrow-down'}></a-icon>
                        {item.number}%
                      </span>
                      <span class="txt">Since last month</span>
                    </div>
                  </a-card>
                </a-col>)
              }
              {
                !this.pageData && this.iconList.map((item: any) => <a-col {...{ props: this.ColLayout }} class="sub-item">
                  <a-card loading={this.loading} class="dash-card" style="height: 160px">
                    ............
                  </a-card>
                </a-col>)
              }
            </a-row>
          </a-col>
          <a-col span={14} xxl={14} xl={14} lg={12} md={24} sm={24} xs={24}>
            {/* Document statistic chart */}
            <a-card loading={this.loading} class="dash-box dash-bar-chart">
              <a-icon class="operate" type="ellipsis"></a-icon>
              <h2 class="title">Documents Statistic</h2>
              <div style="height: 263px;" class="chartjs-chart">
                <canvas height="86px" id="BarChart"></canvas>
              </div>
            </a-card>
          </a-col>
        </a-row>
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col span={16} xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
            {/* Weekly Statistic chart */}
            <a-card loading={this.loading} class="dash-box revenue-chart">
              <h2 class="title">REVENUE</h2>
              <a-icon class="operate" type="ellipsis"></a-icon>
              <div class="week-data">
                <div class="item">
                  <h4 class="item-title">Current Week</h4>
                  <p class="number">${this.pageData && numFormat(this.pageData.CurrentWeek)}</p>
                </div>
                <div class="item">
                  <h4 class="item-title">Previous Week</h4>
                  <p class="number number2">${this.pageData && numFormat(this.pageData.PreviousWeek)}</p>
                </div>
              </div>
              <div class="float-text">
                <p class="txt">Today's Earning: $2,562.30</p>
                <p class="tips">Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus...</p>
                <a-button type="dashed">
                  View Statements <a-icon type="arrow-right"></a-icon>
                </a-button>
              </div>
              <div style="height: 364px; margin-top: 40px" class="chartjs-chart">
                <canvas height="100px" id="LineChart"></canvas>
              </div>
            </a-card>
          </a-col>
          <a-col span={8} xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            {/* donut chart */}
            <a-card loading={this.loading} class="dash-box total-wrap">
              <h2 class="title">Total Sales</h2>
              <a-icon class="operate" type="ellipsis"></a-icon>
              <div class="filter-wrap">
                <a-radio-group defaultValue="a" buttonStyle="solid">
                  <a-radio-button value="a">Today</a-radio-button>
                  <a-radio-button value="b">Yesterday</a-radio-button>
                  <a-radio-button value="c">A Week</a-radio-button>
                  <a-radio-button value="d">A Month</a-radio-button>
                </a-radio-group>
                <span class="tips">Please select filter time</span>
              </div>
              <div style="height: 225px; margin-top: 40px" class="chartjs-chart">
                <canvas height="100px" id="Doughnut"></canvas>
              </div>
              <div class="chart-widget-list">
                <p>
                  <i class="mdi mdi-square text-primary"></i> Direct
                  <span class="fr">$300.56</span>
                </p>
                <p>
                  <i class="mdi mdi-square text-danger"></i> Affilliate
                  <span class="fr">$135.18</span>
                </p>
                <p>
                  <i class="mdi mdi-square text-success"></i> Sponsored
                  <span class="fr">$48.96</span>
                </p>
                <p class="mb-0">
                  <i class="mdi mdi-square"></i> E-mail
                  <span class="fr">$154.02</span>
                </p>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }

  render() {
    return (
      <div class="container">
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }} class="dash-col">
          <a-col span={10} xxl={10} xl={10} lg={12} md={24} sm={24} xs={24}>
            <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
              {
                this.pageData && this.pageData.dataList.map((item: any, index: number) => <a-col {...{ props: this.ColLayout }} class="sub-item">
                  <a-card loading={this.loading} class="dash-card">
                    <h3>{item.name}</h3>
                    <a-icon class="icon" type={this.iconList[index]}></a-icon>
                    <p class="number">{numFormat(item.value)}</p>
                    <div class="footer">
                      <span class={`s-number ${index % 2 ? 'green' : 'red'}`}>
                        <a-icon type={index % 2 ? 'arrow-up' : 'arrow-down'}></a-icon>
                        {item.number}%
                      </span>
                      <span class="txt">Since last month</span>
                    </div>
                  </a-card>
                </a-col>)
              }
              {
                !this.pageData && this.iconList.map((item: any) => <a-col {...{ props: this.ColLayout }} class="sub-item">
                  <a-card loading={this.loading} class="dash-card" style="height: 160px">
                    ............
                  </a-card>
                </a-col>)
              }
            </a-row>
          </a-col>
          <a-col span={14} xxl={14} xl={14} lg={12} md={24} sm={24} xs={24}>
            <a-card loading={this.loading} class="dash-box dash-bar-chart">
              <a-icon class="operate" type="ellipsis"></a-icon>
              <h2 class="title">Document by month</h2>
              <div style="height: 263px;" class="chartjs-chart">
                <canvas height="86px" id="BarChart"></canvas>
              </div>
            </a-card>
          </a-col>
        </a-row>
        <a-row gutter={{ xs: 8, md: 12, xl: 20 }}>
          <a-col span={16} xxl={16} xl={16} lg={24} md={24} sm={24} xs={24}>
            <a-card loading={this.loading} class="dash-box revenue-chart">
              <h2 class="title">文档</h2>
              <a-icon class="operate" type="ellipsis"></a-icon>
              <div class="week-data">
                <div class="item">
                  <h4 class="item-title">本周</h4>
                  <p class="number">{this.pageData && numFormat(this.pageData.CurrentWeek)}件</p>
                </div>
                <div class="item">
                  <h4 class="item-title">上周</h4>
                  <p class="number number2">{this.pageData && numFormat(this.pageData.PreviousWeek)}件</p>
                </div>
              </div>
              <div class="float-text">
                <p class="txt">本周统计：555</p>
                <p class="tips">...</p>
                <a-button type="dashed">
                  看图说话 <a-icon type="arrow-right"></a-icon>
                </a-button>
              </div>
              <div style="height: 364px; margin-top: 40px" class="chartjs-chart">
                <canvas height="100px" id="LineChart"></canvas>
              </div>
            </a-card>
          </a-col>
          <a-col span={8} xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <a-card loading={this.loading} class="dash-box total-wrap">
              <h2 class="title">休假统计</h2>
              <a-icon class="operate" type="ellipsis"></a-icon>
              <div class="filter-wrap">
                <a-radio-group defaultValue="a" buttonStyle="solid">
                  <a-radio-button value="a">路线</a-radio-button>
                  <a-radio-button value="b">月份</a-radio-button>
                </a-radio-group>
                <span class="tips">选择分类</span>
              </div>
              <div style="height: 225px; margin-top: 40px" class="chartjs-chart">
                <canvas height="100px" id="Doughnut"></canvas>
              </div>
              <div class="chart-widget-list">
                <p>
                  <i class="mdi mdi-square text-primary"></i> 其他
                  <span class="fr">300.56</span>
                </p>
                <p>
                  <i class="mdi mdi-square text-success"></i> 美国
                  <span class="fr">48.96</span>
                </p>
                <p class="mb-0">
                  <i class="mdi mdi-square"></i> 欧洲
                  <span class="fr">154.02</span>
                </p>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </div>
    );
  }
}
