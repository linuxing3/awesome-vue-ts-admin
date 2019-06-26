import lfService from '@/utils/request.localforage';
import models, { Models } from '@/models';
export const request = lfService.request;

export const api = lfService;

export interface ApiList {
  [key: string]: {
    url: string; // 请求地址
    fetchType?: string; // 数据格式，支持json,formData
    method?: string; // 请求方法
    headers?: any; // 头部携带信息
  };
}

export interface Apis<T> {
  [key: string]: (data?: object, params?: object) => Promise<T>;
}

export const modelApis = (models: Models): ApiList => {
  const methodMap = {
    Fetch: 'get',
    Create: 'post',
    Update: 'patch',
    Delete: 'delete',
  };
  return Object.keys(models).reduce((modelApi, modelName) => {
    Object.keys(methodMap).map((method) => {
      modelApi[`${modelName}${method}`] = {
        url: `/${modelName}`,
        fetchType: 'json',
        method: methodMap[method],
      };
    });
    return modelApi;
  }, {});
};

export const defaultApiList: ApiList = {
  login: {
    url: '/user/login',
    fetchType: 'json',
    method: 'post',
  },
  logout: {
    url: '/user/logout',
    fetchType: 'json',
    method: 'post',
  },
  getUserInfo: {
    url: '/user/getUserInfo',
    fetchType: 'json',
    method: 'post',
  },
  getLocalUserInfo: {
    url: '/user/getLocalUserInfo',
    fetchType: 'json',
    method: 'post',
  },
  dashboard: {
    url: '/dashboard',
    fetchType: 'json',
    method: 'post',
  },
  baseInfoAdd: {
    url: '/customers/baseInfo/add',
    fetchType: 'json',
    method: 'post',
  },
  baseInfoUpdate: {
    url: '/customers/baseInfo/update',
    fetchType: 'json',
    method: 'post',
  },
  baseInfoDelete: {
    url: '/customers/baseInfo/delete',
    fetchType: 'json',
    method: 'post',
  },
  gpsToAddress: {
    url: 'https://api.map.baidu.com/geocoder/v2/',
    method: 'get',
    fetchType: 'jsonp',
  },
  // insert more api below
  ...modelApis(models),
};

export default defaultApiList;
