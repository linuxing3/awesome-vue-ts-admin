import config, { adminUsers, noAuthList } from '@/utils/config';
import router, { asyncRouterMap, constantRouterMap } from '@/router';
import { routerItem } from '@/interface';
import { builder, baseData } from '@/utils/builder';
import User from '@/store/modules/pages/User/models/User';

interface UserData {
  username: string;
  userid: string;
  avatarUri: string;
  email: string;
}

const Entity: any = User;

function filterAsyncRouter(AsyncRouterMap: routerItem[], permission: string[]): routerItem[] {
  const routerMap = AsyncRouterMap.filter((item) => {
    if (typeof item.permission === 'string') {
      return permission.indexOf(item.permission) > -1;
    }
    if (item.permission instanceof Array) {
      const filter = item.permission.filter(items => permission.indexOf(items) > -1);
      if (filter.length && item.children) {
        item.children = filterAsyncRouter(item.children, permission);
      }
      return filter.length;
    }
    return item.permission;
  });
  return routerMap;
}

const hasPermission = (permission: string[]) => {
  // 过滤路由
  const filterRouter = filterAsyncRouter(asyncRouterMap, permission);
  // 添加路由的时候排除掉dashboard
  router.addRoutes(filterRouter);
  return filterRouter;
};

const user = {
  state: {
    user: {
      username: '',
      userid: '',
      avatar_uri: '',
      email: '',
    },
    roles: [],
    permission_routers: [],
    spinning: true,
  },
  mutations: {
    SAVEROLES: (state: any, roles: Array<any>) => {
      state.roles = roles;
    },
    SAVEUSER: (state: any, userData: UserData) => {
      state.user = user;
    },
    LOADING: (state: any, loading: boolean) => {
      state.spinning = loading;
    },
  },
  actions: {
    setDefaultUsers: (context: any) => {
      adminUsers.map(async (user) => {
        const foundItems = Entity.query()
          .where('username', user.username)
          .get();
        console.log('Found Existing User:', foundItems);
        if (foundItems.length === 0) {
          Entity.$create({
            data: {
              name: user.username,
              username: user.username,
              password: user.password,
              permissions: user.permissions,
            },
          });
        }
      });
    },
    loginByName: (context: any, loginParams: any) => {
      const user = Entity.query()
        .where('username', loginParams.username)
        .get();
      if (user.length > 0 && user[0].password === loginParams.password) {
        const now = new Date();
        now.setDate(now.getDate() + 1);
        window.localStorage.setItem(
          'token',
          JSON.stringify({
            id: user[0].id,
            deadline: now.getTime(),
          }),
        );
        const data = baseData('success', '登录成功');
        return Promise.resolve(builder(data, 'OK'));
      }
      const error = baseData('success', '登录失败');
      return Promise.reject(builder(error, 'error'));
    },
    logout: (context: any, loginParams: any) => {
      window.localStorage.clear();
      const data = baseData('success', '登出成功');
      return Promise.resolve(builder(data, 'OK'));
    },
    getUserLocalInfo: async (context: any) => {
      const token = JSON.parse(window.localStorage.getItem('token'));
      console.log('token:', token);
      const entity = Entity.find(token.id);
      console.log('User Entity:', entity);
      return new Promise((resolve, reject) => {
        if (entity) {
          const userData: UserData = {
            username: entity.username,
            userid: entity.id,
            avatarUri: entity.avatar_uri,
            email: entity.email,
          };
          context.commit('SAVEUSER', userData);
          context.commit('SAVEROLES', entity.permissions);
          const getRouter = hasPermission(entity.permissions.permission);
          context.dispatch('GetMenuData', getRouter);
          resolve(entity);
        } else {
          reject('获取用户信息失败');
        }
      });
    },
    getUserInfo: (context: any) => new Promise((resolve, reject) => {
      const params = {
        token: localStorage.getItem('token'),
      };
      context.commit('LOADING', false);
      window.api
        .getUserInfo(params)
        .then((res: returnData) => {
          console.log('getUsrInfo Response:', res);
          context.commit('LOADING', true);
          const { result, entity } = res.data;
          if (!result.resultCode) {
            const userData: UserData = {
              username: entity.username,
              userid: entity.id,
              avatarUri: entity.avatar_uri,
              email: entity.email,
            };
            context.commit('SAVEUSER', userData);
            context.commit('SAVEROLES', entity.permissions);
            const getRouter = hasPermission(entity.permissions.permission);
            context.dispatch('GetMenuData', getRouter);
            resolve(entity);
          } else {
            reject(result.resultMessage);
          }
        })
        .catch((error: any) => {
          context.commit('LOADING', true);
          reject(error);
        });
    }),
  },
  getters: {
    currentUser: (state: any) => {
      const { id } = JSON.parse(window.localStorage.getItem('token'));
      const entity = Entity.find(id);
      return entity;
    },
  },
};

export default user;
