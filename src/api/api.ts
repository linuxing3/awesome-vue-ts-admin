import axios, { AxiosPromise, AxiosInstance } from 'axios';
import qs from 'qs';
import jsonp from 'jsonp';
import lodash from 'lodash';
import router from '@/router/index';
import { message } from 'ant-design-vue';
import { ApiList, Apis, defaultApiList } from './index';

interface Options {
  url: string;
  method?: string;
  params?: string;
  data: any;
  fetchType?: string;
  headers?: any;
}

export default class Api {
  // hack here with special service
  service: AxiosInstance;

  // 请求列表，在这里添加相应接口
  apiList: ApiList = defaultApiList;

  // 对外暴露方法
  api: Apis<any> = {};

  constructor(options: { baseUrl: string }) {
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    // hack here with custom service
    this.service = axios.create({
      baseURL: options.baseUrl, // api的base_url
      timeout: 20000, // 请求超时时间
    });

    for (const i in this.apiList) {
      this.api[i] = (data: any) => {
        const { url } = this.apiList[i];
        if (i === 'gpsToAddress') {
          data = {
            callback: 'renderReverse',
            coordtype: data.coordinateSystem,
            location: `${data.lat},${data.lng}`,
            output: 'json',
            pois: 1,
            ak: '3oWu5SgExpeyXtRXbuDdRO08CoVMTloM',
          };
        }
        return this.request({
          method: this.apiList[i].method,
          data,
          fetchType: this.apiList[i].fetchType,
          url,
          headers: this.apiList[i].headers,
        });
      };
    }
  }

  request = (options: Options) => this.fetch(options)
    .then((response: any) => {
      const { statusText, status } = response;
      let { data } = response;
      if (data instanceof Array) {
        data = {
          list: data,
        };
      }
      // 登录超时判断
      // if (response.data.result && response.data.result.resultCode === 3) {
      //   router.replace({ name: 'login' });
      //   return Promise.reject({
      //     success: false,
      //     message: response.data.result.resultMessage,
      //   });
      // }
      const finalResponse = {
        success: true,
        message: statusText,
        statusCode: status,
        ...response,
      };
      return Promise.resolve(finalResponse);
    })
    .catch((error: any) => {
      const { response } = error;
      let msg;
      let statusCode;
      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }
      message.error(msg);
      return Promise.reject({ success: false, statusCode, message: msg });
    });

  // fetch methods
  fetch = async (options: Options) => {
    const {
      url, data, fetchType, method = 'get',
    } = options;
    let cloneData: any = lodash.cloneDeep(data);
    cloneData = qs.stringify(cloneData);
    const headers = {
      token: window.localStorage.getItem('token'),
      ...options.headers,
    };

    if (fetchType === 'jsonp') {
      return new Promise((resolve, reject) => {
        jsonp(
          url,
          {
            param: `${qs.stringify(data)}&callback`,
            name: `jsonp_${new Date().getTime()}`,
            timeout: 4000,
          },
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve({ statusText: 'OK', status: 200, data: result });
          },
        );
      });
    }
    if (fetchType === 'jsonfile') {
      return axios.get(url, { headers });
    }
    // common type for json response
    if (fetchType === 'json') {
      // hack here with special service
      return this.service({
        url,
        method: method.toLowerCase(),
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        data,
      });
    }
    // if fetchType is not defined
    switch (method.toLowerCase()) {
      case 'get':
        // hack here with special service
        return this.service.get(`${url}?${cloneData}`, { headers });
      case 'delete':
        // hack here with special service
        return this.service.delete(url, {
          data: cloneData,
          headers,
        });
      case 'post':
        // hack here with special service
        return this.service.post(url, cloneData, { headers });
      case 'put':
        // hack here with special service
        return this.service.put(url, cloneData, { headers });
      case 'patch':
        // hack here with special service
        return this.service.patch(url, cloneData, { headers });
      default:
        // hack here with special service
        return this.service(options);
    }
  };
  // end fetch
}
