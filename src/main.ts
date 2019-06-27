import Vue from 'vue';
import { message } from 'ant-design-vue';
/*-----------------------------------------------------------------------
| 核心插件
|-----------------------------------------------------------------------*/
import App from '@/App';
import router from '@/router';
import store from '@/store';
/*-----------------------------------------------------------------------
| 附加插件
/-----------------------------------------------------------------------*/
import '@/utils/use';
import '@/utils/ipcRenderer';
import i18n from '@/utils/i18n';
/*-----------------------------------------------------------------------
| 配置
|-----------------------------------------------------------------------*/
import config from '@/utils/config';
/*-----------------------------------------------------------------------
| Api
|-----------------------------------------------------------------------*/
import Api from '@/api/api.lf';
/*-----------------------------------------------------------------------
| 工具
|-----------------------------------------------------------------------*/
import { log } from '@/utils/helper';
import { api } from '@/api';
// import { genModelConfigJson } from '@/utils/generator';
/*-----------------------------------------------------------------------
/ 格式和组件
/-----------------------------------------------------------------------*/
import '@/styles/global.less';
import '@/components';

/*-----------------------------------------------------------------------
/ 全局api
/-----------------------------------------------------------------------*/
const Apis = new Api({ baseUrl: process.env.NODE_ENV === 'production' ? '/api' : '/api' });
window.ajax = Apis.api;
window.api = api;

/*-----------------------------------------------------------------------
/ 快捷原型链附加工具
/-----------------------------------------------------------------------*/
Vue.prototype.$message = message;
Vue.prototype.$log = log;
Vue.prototype.$http= api.request;

Vue.config.productionTip = false;

/*-----------------------------------------------------------------------
/ 路由拦截，权限验证和菜单生成
/-----------------------------------------------------------------------*/
let flag: boolean = true;
router.beforeEach((to, from, next) => {
  log.info('下一路由: ', to.path);
  log.info('检查路由权限... ');
  const state: any = store.state;
  if (!state.app.menuData.length && flag) {
    log.info('判断是否获取到菜单数据,并且只执行一次');
    flag = false;
    store
      .dispatch('getUserLocalInfo')
      .then((entity) => {
        log.info(`获取有效用户信息${entity}`);
        log.info('检查是否需要生成新标签');
        const toPath = config.noLoginList.indexOf(`#${to.path}`) > -1 ? '/dashboard' : to.path;
        log.info('下一路由: ', to.path);
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
        log.err('获取用户信息失败');
        log.err(err);
        if (config.noLoginList.indexOf(to.path) < 0) {
          log.err(`下一${to.path}不在【无需登录清单】内，跳转至登录页面`);
          next({ name: 'login', replace: true });
        }
        log.info(`下一路由${to.path}在【无需登录清单】内，跳转`);
        next();
      });
  }
  log.suc(`下一路由${to.path}直接跳转`);
  next();
});

/*-----------------------------------------------------------------------
| 挂载实例
|-----------------------------------------------------------------------*/
const app = new Vue({
  router,
  store,
  i18n,
  created() {
    /*-----------------------------------------------------------------------
    | 启动默认用户数据
    |-----------------------------------------------------------------------*/
    store.dispatch('setDefaultUsers');
    /*-----------------------------------------------------------------------
    | 启动附加用户模型
    |-----------------------------------------------------------------------*/
    // genModelConfigJson();
    /*-----------------------------------------------------------------------
    | 启动用户配置本地存储
    |-----------------------------------------------------------------------*/
    store.dispatch('ToggleTheme', config.theme);
    store.dispatch('setLocale', config.locale);
    store.dispatch('ToggleLayoutMode', config.layout);
    store.dispatch('ToggleColor', config.primaryColor);
    store.dispatch('ToggleFixedHeader', String(config.fixedHeader));
    store.dispatch('ToggleFixSiderbar', String(config.fixSiderbar));
    store.dispatch('ToggleFixedHeaderHidden', String(config.fixedHeader));
    store.dispatch('ToggleMultiTab', String(config.multiTab));
  },
  render: h => h(App),
});

app.$mount('#app');
window.app = app;
