import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import bcrypt from 'bcryptjs';
import { api } from '@/api';
import { IAccount } from '../models/Account';

export interface IAccountState {
  name: string;
  items: any[];
  cached: any[];
  defaultAccount: IAccount;
  currentItem: IAccount;
  loggedIn: boolean;
  filter: {
    search: string;
    sort: string;
  };
  token: {
    secret: string;
    simpleToken: string;
    netlifyToken: string;
    firebaseToken: string;
  };
  entity?: string;
  $entity?: string;
  data?: any[];
}
export interface IAccountGetters {
  // [name: string]: (state: IAccountState) => any
  isAuthenticated(state: IAccountState): boolean;
}

export interface IAccountMutations {
  // [name: string]: (state: IAccountState, payload: any) => any
  CACHE_ITEMS(state: IAccountState, newAccount: IAccount): void;
  SET_ACCESS_TOKEN(state: IAccountState, accessToken: string): void;
  SET_REFRESH_TOKEN(state: IAccountState, refreshToken: string): void;
}

export interface IAccountActions {
  init(context: ActionContext<IAccountState, any>, data: IAccount): Promise<any>;
  signup(context: ActionContext<IAccountState, any>, data: IAccount): Promise<any>;
  setLoginStatus(context: ActionContext<IAccountState, any>, data: IAccount): Promise<any>;
  clearCache(context: ActionContext<IAccountState, any>, data?: any): Promise<any>;
  createToken?(context: ActionContext<IAccountState, any>, data: IAuthRequest): Promise<any>;
  refreshToken?(context: ActionContext<IAccountState, any>): Promise<any>;
  revokeToken?(context: ActionContext<IAccountState, any>): Promise<any>;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthRequest {
  username: string;
  password: string;
}

const state: IAccountState = {
  name: 'account',
  items: [],
  cached: [],
  defaultAccount: {
    name: 'admin',
    password: 'admin',
    email: 'admin@mfa.gov.cn',
    hash: '',
    role: 'manager',
    avatar: 'avatar/man_1.jpg',
  },
  currentItem: {
    name: '',
    password: '',
  },
  loggedIn: false,
  filter: {
    search: '',
    sort: '',
  },
  token: {
    secret: 'daniel',
    simpleToken: '',
    netlifyToken: '',
    firebaseToken: '',
  },
};

const mutations: MutationTree<IAccountState> = {
  ...make.mutations(state),
  CACHE_ITEMS(state, newAccount: IAccount) {
    state.cached.push(newAccount);
  },
};

const AccountActions: IAccountActions = {
  // 创建初始化用户
  async init(ctx) {
    const {
      name, password, email, role, avatar,
    } = ctx.state.defaultAccount;

    console.log('检查默认账户是否存在');
    // TODO Fetch from localforage to vuex
    await api.request({
      url: 'account',
      method: 'get',
    });

    const accounts = ctx.state.data;

    if (accounts === undefined) {
      console.log('默认账户不存在');
      const hash = await bcrypt.hash(password, 10);

      const accountInfo: IAccount = {
        name,
        password,
        email,
        role,
        hash,
        avatar,
      };
      // Create new account and save to localforage
      await api.request({
        url: 'account',
        method: 'post',
        data: accountInfo,
      });
      console.log('创建默认账户');
    }
    console.log('存在默认账户');
  },
  // 注册用户
  async signup(ctx, signupData) {
    // 按姓名查找账户
    const {
      data: { entity },
    } = await api.request({
      url: 'account',
      method: 'get',
    });

    const authedAccount = entity.find(item => item.name === signupData.name);

    if (authedAccount === undefined) {
      try {
        console.log('该用户不存在，正在创建!');

        // 1 加密密码
        const hash = await bcrypt.hash(signupData.password, 10);

        const accountInfo: IAccount = {
          ...signupData,
          hash,
          role: 'user',
        };

        // 2 保存用户名和加密密码
        await api.request({
          url: 'account',
          method: 'post',
          data: accountInfo,
        });
        console.log('保存用户名和加密密码');

        // 3 使用创建后账户，再次尝试登录
        await ctx.dispatch('signup', accountInfo);
      } catch (e) {
        throw new Error('添加新账户失败!');
      }
    } else {
      console.log('账户已注册，请登录');
      // 检查用户名和密码
      const hash = authedAccount.hash;
      const password = signupData.password;
      const valid = await bcrypt.compare(password, hash);
      if (valid) {
        console.log('密码验证通过');
        await ctx.dispatch('setLoginStatus', authedAccount);
      } else {
        console.log('无效密码');
        ctx.commit('SET_LOGGED_IN', false);
      }
    }
  },
  // 设置登录状态
  async setLoginStatus(ctx, authData) {
    // 登录状态为真
    ctx.commit('SET_LOGGED_IN', true);
    // 缓存用户数据
    ctx.commit('SET_CURRENT_ITEM', authData);
    ctx.commit('CACHE_ITEMS', authData);
    // 设置简单托证
    ctx.commit('SET_TOKEN', {
      ...ctx.state.token,
      ...{
        simpleToken: authData.id,
      },
    });
  },
  // Logs out the current user.
  async clearCache({ commit }) {
    // 登录状态为假
    commit('SET_LOGGED_IN', false);
    // 删除缓存用户数据
    commit('SET_CACHED', []);
    commit('SET_CURRENT_ITEM', {});
  },
};

const actions: ActionTree<IAccountState, any> = {
  ...make.actions(state),
  ...AccountActions,
};

const getters: GetterTree<IAccountState, any> = {
  ...make.getters(state),
  isAuthenticated(state) {
    const { cached, currentItem } = state;
    return cached.filter(item => item.name === currentItem.name);
  },
};

const AccountModule: Module<IAccountState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default AccountModule;
