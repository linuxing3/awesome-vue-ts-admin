import { message } from 'ant-design-vue';
import lfServce, { LfService, LfResponse } from '@/utils/request.localforage';
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
  service: LfService;

  // 请求列表，在这里添加相应接口
  apiList: ApiList = defaultApiList;

  // 对外暴露方法
  api: Apis<any> = {};

  constructor(options: { baseUrl: string }) {

    // hack here with custom service
    this.service = lfServce;

    for (const i in this.apiList) {
      this.api[i] = (data: any) => {
        const { url } = this.apiList[i];
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
      const finalResponse: LfResponse = {
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

    // if fetchType is not defined
    switch (method.toLowerCase()) {
      case 'get':
        // hack here with special service
        return this.service.request({
          method: 'get',
          url,
          data,
          params: {
            pagination: {
              pageNo: 0,
              pageSize: 1000,
            },
          },
        });
      case 'delete':
        // hack here with special service
        return this.service.request({
          method: 'delete',
          url,
          data,
        });
      case 'post':
        // hack here with special service
        await this.service.request({
          method: 'post',
          url,
          data,
        });
      case 'put':
        // hack here with special service
        await this.service.request({
          method: 'put',
          url,
          data,
        });
      case 'patch':
        await this.service.request({
          method: 'patch',
          url,
          data,
        });
        // hack here with special service
      default:
        // hack here with special service
        return this.service.request(options);
    }
  };
  // end fetch
}
