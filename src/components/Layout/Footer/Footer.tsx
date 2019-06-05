import { Component, Vue } from 'vue-property-decorator';

import './index.less';

Component({});
export default class GlobalFooter extends Vue {
  render() {
    return (
      <div class="footer">
        <div class="links">
          <a href="https://embajadachinave.netlify.com" target="_blank">
            首页
          </a>
          <a href="https://github.com/linuxing3/awesome-vue-ts-admin" target="_blank">
            <a-icon type="github" />
          </a>
          <a href="https://ant.design/">Ant Design</a>
          <a href="https://vue.ant.design/">Vue Antd</a>
        </div>
        <div class="copyright">
          Copyright
          <a-icon type="copyright" /> 2019 <span>白马书苑技术组出品</span>
        </div>
    </div>
    );
  }
}
