export interface ApiList {
  [key: string]: {
    url: string; // 请求地址
    fetchType?: string; // 数据格式，支持json,formData
    method?: string; // 请求方法
    headers?: any; // 头部携带信息
  };
}

export interface Apis<T> {
  [key: string]: (data: object) => Promise<T>;
}


export const defaultApiList: ApiList = {
  login: {
    url: '/user/login',
    fetchType: 'json',
    method: 'post'
  },
  logout: {
    url: '/user/logout',
    fetchType: 'json',
    method: 'post'
  },
  getUserInfo: {
    url: '/user/getUserInfo',
    fetchType: 'json',
    method: 'post'
  },
  dashboard: {
    url: '/dashboard',
    fetchType: 'json',
    method: 'post'
  },
  baseInfoAdd: {
    url: '/customers/baseInfo/add',
    fetchType: 'json',
    method: 'post'
  },
  baseInfoUpdate: {
    url: '/customers/baseInfo/update',
    fetchType: 'json',
    method: 'post'
  },
  baseInfoDelete: {
    url: '/customers/baseInfo/delete',
    fetchType: 'json',
    method: 'post'
  },
  gpsToAddress: {
    url: 'https://api.map.baidu.com/geocoder/v2/',
    method: 'get',
    fetchType: 'jsonp'
  }
}

export default  defaultApiList
