import { routerItem } from '@/interface';
import { routeToArray } from '@/utils';
import router from '@/router';
import config from '@/utils/config';
import {
  LOCALE,
  SIDEBAR_TYPE,
  SIDEBAR_STATUS,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR,
  DEFAULT_COLOR_WEAK,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_CONTENT_WIDTH_TYPE,
  DEFAULT_MULTI_TAB,
} from '@/store/mutation-types';

// 循环匹配当前路由数据
function findMenu(
  data: any,
  url: Array<string>,
  tabList: Array<any>,
  tabActiveKey: string,
  params?: string,
  query?: any,
  key?: string[],
) {
  let result: any = { tabList, tabActiveKey };
  data.forEach((item: any) => {
    if (url.indexOf(item.path.replace(/\/:\w+/g, '')) > -1) {
      if (!key) {
        key = [];
      }
      key.push(item.meta.key);
      if (url.length === 1) {
        result.tabList.push({
          ...item,
          params,
          query,
        });
        result.tabActiveKey = item.name;
      } else {
        url.shift();
        result = findMenu(item.children, url, tabList, tabActiveKey, params, query, key);
      }
    }
  });
  result.key = key;
  return result;
}

const app = {
  state: {
    locale: config.locale,
    sidebar: {
      opened: localStorage.getItem(SIDEBAR_STATUS),
      bgColor: config.sidebar.bgColor,
      txtColor: config.sidebar.txtColor,
      theme: config.sidebar.theme,
      mode: config.sidebar.mode,
      side: config.sidebar.side,
    },
    theme: config.theme,
    isMobile: false, // 是否为移动设备，条件width <= 768px
    menuData: [], // 存储菜单路由数据
    tabList: [], // 页面tab功能数据
    tabActiveKey: '', // 当前激活tab页面
    keepList: [], // 需要缓存的页面name
    layout: '',
    contentWidth: '',
    fixedHeader: config.fixedHeader,
    fixSiderbar: config.fixSiderbar,
    autoHideHeader: config.autoHideHeader,
    primaryColor: '#1890FF',
    colorWeak: false,
  },
  mutations: {
    SET_LOCALE: (state: any, locale) => {
      localStorage.setItem(LOCALE, locale);
      state.locale = locale;
    },
    TOGGLE_SIDEBAR: (state: any) => {
      localStorage.setItem(SIDEBAR_STATUS, state.sidebar.opened ? '1' : '0');
      state.sidebar.opened = !state.sidebar.opened;
    },
    SAVE_MENU: (state: any, menuData: routerItem[]) => {
      state.menuData = menuData;
      const list: string[] = [];
      menuData.map(item => list.push(item.name ? item.name : ''));
      state.keepList = list; // 菜单列表的页面都需要缓存
    },
    TAB_CHANGE: (state: any, data: { tabList: any; tabActiveKey: string }) => {
      state.tabList = data.tabList;
      state.tabActiveKey = data.tabActiveKey;
    },
    KEEP_CHANGE: (state: any, list: Array<string>) => {
      state.keepList = list;
    },
    ISMOBILE: (state: any, isMobile: boolean) => {
      state.isMobile = isMobile;
    },
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type;
      window.localStorage.setItem(SIDEBAR_TYPE, type);
    },
    CLOSE_SIDEBAR: (state) => {
      window.localStorage.setItem(SIDEBAR_TYPE, 'true');
      state.sidebar = false;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    TOGGLE_THEME: (state, theme) => {
      window.localStorage.setItem(DEFAULT_THEME, theme);
      state.theme = theme;
      state.sidebar.theme = theme;
    },
    TOGGLE_LAYOUT_MODE: (state, layout) => {
      window.localStorage.setItem(DEFAULT_LAYOUT_MODE, layout);
      state.layout = layout;
    },
    TOGGLE_FIXED_HEADER: (state, fixed) => {
      window.localStorage.setItem(DEFAULT_FIXED_HEADER, fixed);
      state.fixedHeader = fixed;
    },
    TOGGLE_FIXED_SIDERBAR: (state, fixed) => {
      window.localStorage.setItem(DEFAULT_FIXED_SIDEMENU, fixed);
      state.fixSiderbar = fixed;
    },
    TOGGLE_FIXED_HEADER_HIDDEN: (state, show) => {
      window.localStorage.setItem(DEFAULT_FIXED_HEADER_HIDDEN, show);
      state.autoHideHeader = show;
    },
    TOGGLE_CONTENT_WIDTH: (state, type) => {
      window.localStorage.setItem(DEFAULT_CONTENT_WIDTH_TYPE, type);
      state.contentWidth = type;
    },
    TOGGLE_COLOR: (state, color) => {
      window.localStorage.setItem(DEFAULT_COLOR, color);
      state.color = color;
    },
    TOGGLE_WEAK: (state, flag) => {
      window.localStorage.setItem(DEFAULT_COLOR_WEAK, flag);
      state.weak = flag;
    },
    TOGGLE_MULTI_TAB: (state, bool) => {
      window.localStorage.setItem(DEFAULT_MULTI_TAB, bool);
      state.multiTab = bool;
    },
  },
  actions: {
    setLocale({ commit }, locale) {
      commit('SET_LOCALE', locale);
    },
    setSidebar({ commit }, type) {
      commit('SET_SIDEBAR_TYPE', type);
    },
    CloseSidebar({ commit }) {
      commit('CLOSE_SIDEBAR');
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device);
    },
    ToggleTheme({ commit }, theme) {
      commit('TOGGLE_THEME', theme);
    },
    ToggleLayoutMode({ commit }, mode) {
      commit('TOGGLE_LAYOUT_MODE', mode);
    },
    ToggleFixedHeader({ commit }, fixedHeader) {
      if (!fixedHeader) {
        commit('TOGGLE_FIXED_HEADER_HIDDEN', false);
      }
      commit('TOGGLE_FIXED_HEADER', fixedHeader);
    },
    ToggleFixSiderbar({ commit }, fixSiderbar) {
      commit('TOGGLE_FIXED_SIDERBAR', fixSiderbar);
    },
    ToggleFixedHeaderHidden({ commit }, show) {
      commit('TOGGLE_FIXED_HEADER_HIDDEN', show);
    },
    ToggleContentWidth({ commit }, type) {
      commit('TOGGLE_CONTENT_WIDTH', type);
    },
    ToggleColor({ commit }, color) {
      commit('TOGGLE_COLOR', color);
    },
    ToggleWeak({ commit }, weakFlag) {
      commit('TOGGLE_WEAK', weakFlag);
    },
    ToggleMultiTab({ commit }, bool) {
      commit('TOGGLE_MULTI_TAB', bool);
    },
    ChangeMobile: (context: any, isMobile: boolean) => {
      context.commit('ISMOBILE', isMobile);
    },
    ToggleSideBar: (context: any) => {
      context.commit('TOGGLE_SIDEBAR');
    },
    GetMenuData: (context: any, menuData: routerItem[]) => {
      context.commit('SAVE_MENU', menuData);
    },
    // 新增缓存页面
    addKeep: async (context: any, name: string[]) => {
      // 新增tab，增加缓存状态
      const { keepList } = context.state;
      name.forEach((item: string) => {
        if (keepList.indexOf(item) === -1) {
          keepList.push(item);
        }
      });
      await context.commit('KEEP_CHANGE', keepList);
    },
    AddTabPane: (context: any, url: string) => new Promise((resolve, reject) => {
      const {
        menuData, tabList, tabActiveKey, keepList,
      } = context.state;
      let resultData = { tabList, tabActiveKey, key: [] };
      let haveMenu = false;
      const ArrPath = routeToArray(url);
      tabList.map((item: any) => {
        if (ArrPath.routeArr.indexOf(item.path.replace(/\/:\w+/g, '')) > -1) {
          resultData.tabActiveKey = item.name;
          haveMenu = true;
          return false;
        }
        return item;
      });
      if (!haveMenu) {
        resultData = findMenu(
          menuData,
          ArrPath.routeArr,
          tabList,
          tabActiveKey,
          ArrPath.params,
        );
        if (resultData.tabActiveKey && resultData.key) {
          context.dispatch('addKeep', resultData.key);
        }
      }
      context.commit('TAB_CHANGE', resultData);
      resolve(true);
    }),
    RemoveTab: (context: any, name: string) => {
      let { tabList } = context.state;
      const { keepList } = context.state;
      const resultData = { tabList: [], tabActiveKey: '' };
      tabList = tabList.filter((item: any, index: number) => {
        if (item.name === name) {
          // 关闭tab后，页面跳转到前一个TAB，特殊情况是关闭第一个TAB应该打开第二个TAB
          resultData.tabActiveKey = index
            ? tabList[index - 1].name
            : tabList[index + 1].name;
          keepList.splice(keepList.indexOf(item.meta.key), 1);
          context.commit('KEEP_CHANGE', keepList);
          router.push({ name: resultData.tabActiveKey });
          return false;
        }
        return true;
      });
      resultData.tabList = tabList;
      context.commit('TAB_CHANGE', resultData);
    },
    TabChange: (context: any, name: string) => {
      const { tabList } = context.state;
      const resultData = { tabList, tabActiveKey: name };
      context.commit('TAB_CHANGE', resultData);
    },
  },
};

export default app;
