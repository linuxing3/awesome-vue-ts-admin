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
  // Employee
  employeeDelete: {
    url: '/employee/delete',
    method: 'delete',
    fetchType: 'json',
  },
  employeeUpdate: {
    url: '/employee/update',
    method: 'patch',
    fetchType: 'json',
  },
  employeeCreate: {
    url: '/employee/create',
    method: 'post',
    fetchType: 'json',
  },
  employeeFetch: {
    url: '/employee/fetch',
    method: 'get',
    fetchType: 'json',
  },
  // UserDesignation
  userDesignationDelete: {
    url: '/userDesignation/delete',
    method: 'delete',
    fetchType: 'json',
  },
  userDesignationUpdate: {
    url: '/userDesignation/update',
    method: 'patch',
    fetchType: 'json',
  },
  userDesignationCreate: {
    url: '/userDesignation/create',
    method: 'post',
    fetchType: 'json',
  },
  userDesignationFetch: {
    url: '/userDesignation/fetch',
    method: 'get',
    fetchType: 'json',
  },
  // UserPromotion
  userPromotionDelete: {
    url: '/userPromotion/delete',
    method: 'delete',
    fetchType: 'json',
  },
  userPromotionUpdate: {
    url: '/userPromotion/update',
    method: 'patch',
    fetchType: 'json',
  },
  userPromotionCreate: {
    url: '/userPromotion/create',
    method: 'post',
    fetchType: 'json',
  },
  userPromotionFetch: {
    url: '/userPromotion/fetch',
    method: 'get',
    fetchType: 'json',
  },
  // Leave
  leaveDelete: {
    url: '/leave/delete',
    method: 'delete',
    fetchType: 'json',
  },
  leaveUpdate: {
    url: '/leave/update',
    method: 'patch',
    fetchType: 'json',
  },
  leaveCreate: {
    url: '/leave/create',
    method: 'post',
    fetchType: 'json',
  },
  leaveFetch: {
    url: '/leave/fetch',
    method: 'get',
    fetchType: 'json',
  },
  // Project
  projectDelete: {
    url: '/project/delete',
    method: 'delete',
    fetchType: 'json',
  },
  projectUpdate: {
    url: '/project/update',
    method: 'patch',
    fetchType: 'json',
  },
  projectCreate: {
    url: '/project/create',
    method: 'post',
    fetchType: 'json',
  },
  projectFetch: {
    url: '/project/fetch',
    method: 'get',
    fetchType: 'json',
  },
  // UserMilitant
  userMilitantDelete: {
    url: '/userMilitant/delete',
    method: 'delete',
    fetchType: 'json',
  },
  userMilitantUpdate: {
    url: '/userMilitant/update',
    method: 'patch',
    fetchType: 'json',
  },
  userMilitantCreate: {
    url: '/userMilitant/create',
    method: 'post',
    fetchType: 'json',
  },
  userMilitantFetch: {
    url: '/userMilitant/fetch',
    method: 'get',
    fetchType: 'json',
  },
  // Militant
  militantDelete: {
    url: '/militant/delete',
    method: 'delete',
    fetchType: 'json',
  },
  militantUpdate: {
    url: '/militant/update',
    method: 'patch',
    fetchType: 'json',
  },
  militantCreate: {
    url: '/militant/create',
    method: 'post',
    fetchType: 'json',
  },
  militantFetch: {
    url: '/militant/fetch',
    method: 'get',
    fetchType: 'json',
  },
  // Document
  documentDelete: {
    url: '/document/delete',
    method: 'delete',
    fetchType: 'json',
  },
  documentUpdate: {
    url: '/document/update',
    method: 'patch',
    fetchType: 'json',
  },
  documentCreate: {
    url: '/document/create',
    method: 'post',
    fetchType: 'json',
  },
  documentFetch: {
    url: '/document/fetch',
    method: 'get',
    fetchType: 'json',
  },
};

export default defaultApiList;
