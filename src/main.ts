import Vue from 'vue';
import { message } from 'ant-design-vue';

import App from '@/App';
import router from '@/router';
import store from '@/store';
import config from '@/utils/config';
import Api from '@/api/api';
import i18n from './utils/i18n';
import { log } from './utils/helper';
import lfService from './utils/request.localforage';

import './styles/global.less';
import './components';

// 全局api
const Apis = new Api({ baseUrl: process.env.NODE_ENV === 'production' ? '/api' : '/api' });
window.api = Apis.api;
window.ajax = Apis;

// bootstrap
store.dispatch('setDefaultUsers');

const options = {
  position: 'fixed',
  show: true,
  height: '3px',
};

// tools
Vue.prototype.$message = message;
Vue.prototype.$log = log;
Vue.prototype.$http= lfService.request;

Vue.config.productionTip = false;

// 路由拦截，权限验证和菜单生成
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

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
