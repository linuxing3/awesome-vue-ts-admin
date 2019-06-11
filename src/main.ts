import Vue from 'vue';
import { message } from 'ant-design-vue';
/*-----------------------------------------------------------------------
/ 核心插件
/-----------------------------------------------------------------------*/
import App from '@/App';
import router from '@/router';
import store from '@/store';
/*-----------------------------------------------------------------------
/ 附加插件
/-----------------------------------------------------------------------*/
import '@/utils/use';
import '@/utils/ipcRenderer';
import i18n from '@/utils/i18n';
/*-----------------------------------------------------------------------
// 配置
/-----------------------------------------------------------------------*/
import config from '@/utils/config';
/*-----------------------------------------------------------------------
/ Api
/-----------------------------------------------------------------------*/
import Api from '@/api/api.lf';
/*-----------------------------------------------------------------------
/ 工具
/-----------------------------------------------------------------------*/
import { log } from '@/utils/helper';
import lfService from '@/utils/request.localforage';
import { apolloProvider } from '@/utils/apollo';
/*-----------------------------------------------------------------------
/ 格式和组件
/-----------------------------------------------------------------------*/
import '@/styles/global.less';
import '@/components';

/*-----------------------------------------------------------------------
/ 全局api
/-----------------------------------------------------------------------*/
const Apis = new Api({ baseUrl: process.env.NODE_ENV === 'production' ? '/api' : '/api' });
window.api = Apis.api;
window.ajax = Apis;

/*-----------------------------------------------------------------------
/ 启动默认用户数据
/-----------------------------------------------------------------------*/
store.dispatch('setDefaultUsers');
/*-----------------------------------------------------------------------
/ 配置数据
/-----------------------------------------------------------------------*/
const options = {
  position: 'fixed',
  show: true,
  height: '3px',
};
/*-----------------------------------------------------------------------
/ 快捷原型链附加工具
/-----------------------------------------------------------------------*/
Vue.prototype.$message = message;
Vue.prototype.$log = log;
Vue.prototype.$http= lfService.request;

Vue.config.productionTip = false;

/*-----------------------------------------------------------------------
/ 路由拦截，权限验证和菜单生成
/-----------------------------------------------------------------------*/
let flag: boolean = true;
router.beforeEach((to, from, next) => {
  if (!store.state.app.menuData.length && flag) {
    // 判断是否获取到菜单数据,并且只执行一次
    flag = false;
    store
      .dispatch('getUserLocalInfo')
      .then((entity) => {
        log.info('Route Guard Found Entity:', entity);
        const toPath = config.noLoginList.indexOf(`#${to.path}`) > -1 ? '/dashboard' : to.path;
        store.dispatch('AddTabPane', toPath).then(() => {
          next({
            path: toPath,
            query: to.query,
            params: to.params,
            replace: true,
          });
        });
      })
      .catch((err) => {
        log.err(err);
        if (config.noLoginList.indexOf(to.path) < 0) {
          next({ name: 'login', replace: true });
        }
        next();
      });
  }
  next();
});

/*-----------------------------------------------------------------------
/ 挂载实例
/-----------------------------------------------------------------------*/
new Vue({
  router,
  store,
  i18n,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
