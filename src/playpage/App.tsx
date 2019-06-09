import {
  Component, Vue,
} from 'vue-property-decorator';
import { loadApexCharts } from '@/utils/index';

import '@/App.less';

import {
  imageFillBarOptions,
} from './params';

const AppState = Vue.observable({
  title: 'Hello Vue',
});

@Component({
  components: {},
})
export default class App extends Vue {
  state: {
    title: string
  } = AppState

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

  changeTitle() {
    this.state.title = 'Hello, Observable Vue';
  }

  render() {
    const { title } = this.state;
    return (
      <div id="play">
        <div class="bar-wrap">
          <h1 class="item-title" on-click={this.changeTitle}>{title}</h1>
          <div id="image-fill-bar" />
        </div>
      </div>
    );
  }
}
