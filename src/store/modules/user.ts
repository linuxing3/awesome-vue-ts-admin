import bcrypt from 'bcryptjs';
import router, { asyncRouterMap } from '@/router';
import { routerItem } from '@/interface';
import { builder, baseData } from '@/utils/builder';
import { adminUsers } from '@/utils/config';
import models from '@/models';
import { BaseModel } from '@/models/BaseModel';
import { ILocalForageModel } from 'vuex-orm-localforage';

const User = models.user as ILocalForageModel;

interface UserData {
  id?: string;
  username: string;
  userid: string;
  avatarUrl: string;
  email: string;
  permissions?: any[];
}

interface IUserState {
  user: UserData;
  roles: any[];
  permission_routers: any[];
  permission_roles: any[];
  spinning: boolean;
}

function filterAsyncRouter(AsyncRouterMap: routerItem[], permission: string[]): routerItem[] {
  const routerMap = AsyncRouterMap.filter((route) => {
    if (typeof route.permission === 'string') {
      return permission.indexOf(route.permission) > -1;
    }
    if (route.permission instanceof Array) {
      const filter = route.permission.filter(permissionKey => permission.indexOf(permissionKey) > -1);
      if (filter.length && route.children) {
        route.children = filterAsyncRouter(route.children, permission);
      }
      return filter.length;
    }
    return route.permission;
  });
  return routerMap;
}

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
const hasPermission = (permission: string[]) => {
  // 过滤路由
  const filterRouter = filterAsyncRouter(asyncRouterMap, permission);
  // 添加路由的时候排除掉dashboard
  router.addRoutes(filterRouter);
  return filterRouter;
};

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id);
  }
  return true;
}

const state: IUserState = {
  user: {
    username: '',
    userid: '',
    avatarUrl: '',
    email: '',
  },
  roles: [],
  permission_roles: [],
  permission_routers: [],
  spinning: true,
};

const user = {
  state,
  mutations: {
    SAVEROLES: (state: any, roles: Array<any>) => {
      state.roles = roles;
      window.localStorage.setItem('ROLES', JSON.stringify(roles));
    },
    SAVEPERMISSIONROLES: (state: any, roles: Array<any>) => {
      state.permission_roles = roles;
      window.localStorage.setItem('PERMISSION_ROLES', JSON.stringify(roles));
    },
    SAVEUSER: (state: any, userData: UserData) => {
      state.user = user;
    },
    LOADING: (state: any, loading: boolean) => {
      state.spinning = loading;
    },
  },
  actions: {
    setDefaultUsers: async (context: any) => {
      await User.$fetch();
      adminUsers.map(async (user) => {
        const foundUsers = (User as typeof BaseModel).query()
          .where('username', user.username)
          .get();
        if (foundUsers.length === 0) {
          const hash = await bcrypt.hash(user.password, 10);
          const newUser = await User.$create({
            data: {
              name: user.username,
              username: user.username,
              password: user.password,
              hash,
              permissions: user.permissions,
            },
          });
          // fix:
          await (User as any).generatePermissionDetails(newUser);
          console.log('Created new User:', newUser);
        } else {
          console.log('Found Existing User:', foundUsers);
        }
      });
    },
    registerByName: async (context: any, loginParams: any) => {
      await User.$fetch();
      const foundUsers = (User as typeof BaseModel).query()
        .where('username', loginParams.username)
        .get();
      if (foundUsers.length === 0) {
        const hash = await bcrypt.hash(loginParams.password, 10);
        const newUser = await User.$create({
          data: {
            name: loginParams.username,
            username: loginParams.username,
            password: loginParams.password,
            hash,
            permissions: ['1', '2', '3', '4', '5'],
          },
        });
        // fix:
        await (User as any).generatePermissionRoles(newUser);
        if (newUser.length > 0) {
          const data = baseData('success', '注册成功，请登录');
          return Promise.resolve(builder(data, '注册成功，请登录'));
        }
        const error = baseData('fail', '注册失败');
        return Promise.reject(builder(error, '未知错误'));
      }
      const error = baseData('fail', '注册失败');
      return Promise.reject(builder(error, '用户名已存在'));
    },
    loginByName: async (context: any, loginParams: any) => {
      await User.$fetch();
      const user: any[] = (User as typeof BaseModel).query()
        .where('username', loginParams.username)
        .get();
      if (user.length > 0) {
        const validPassword = await bcrypt.compare(loginParams.password, user[0].hash);
        if (validPassword) {
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
          return Promise.resolve(builder(data, '登陆成功'));
        }
        const error = baseData('fail', '登录失败');
        return Promise.reject(builder(error, '密码错误'));
      }
      const error = baseData('fail', '登录失败');
      return Promise.reject(builder(error, '无此用户名'));
    },
    logout: (context: any, loginParams: any) => {
      // clear token
      window.localStorage.clear();
      const data = baseData('success', '登出成功');
      return Promise.resolve(builder(data, '登出，结束会话'));
    },
    getUserLocalInfo: async (context: any) => {
      User.$fetch();
      const token = JSON.parse(window.localStorage.getItem('token'));
      console.log('token:', token);
      const entity: any = await (User as typeof BaseModel).find(token.id);

      console.log('User User:', entity);
      return new Promise((resolve, reject) => {
        if (entity) {
          const userData: UserData = {
            username: entity.username,
            userid: entity.id,
            avatarUrl: entity.avatarUrl,
            email: entity.email,
          };
          // SAVE USER
          context.commit('SAVEUSER', userData);
          // SAVE PERMISSION to entities.user.state.permission_roles
          (User as any).generatePermissionRoles({ user: [entity] });
          // SAVE PERMISSION to user.permission_roles
          context.commit('SAVEROLES', entity.permissions);
          // GET ROUTERS
          const getRouter = hasPermission(entity.permissions);
          context.dispatch('GetMenuData', getRouter);
          resolve(entity);
        } else {
          reject('获取用户信息失败');
        }
      });
    },
  },
  getters: {
    currentUser: async (state: any) => {
      const { id } = JSON.parse(window.localStorage.getItem('token'));
      const entity = await User.$get(id);
      return entity;
    },
  },
};

export default user;
