import { ApiList, Apis, defaultApiList } from './index';
import lfServce, { LfService, LfRequestConfig } from '@/utils/request.localforage';

export default class Api {
  // hack here with special service
  service: LfService;

  // 请求列表，在这里添加相应接口
  apiList: ApiList = defaultApiList;

  // 对外暴露方法
  api: Apis<any> = {};

  constructor(options: { baseUrl }) {
    // hack here with custom service
    this.service = lfServce;

    for (const i in this.apiList) {
      this.api[i] = (data?: any, params?: any) => {
        const { url, method, fetchType } = this.apiList[i];
        return this.fetch({
          url,
          method,
          data,
          params,
          fetchType,
        });
      };
    }
  }

  // fetch methods
  fetch = async (options: LfRequestConfig) => {
    console.log('Api Lf:', options);
    return this.service.request(options);
  };

  validateUrl = (options: LfRequestConfig) => {
    console.log('Api Lf:', options);
    return this.service.validateUrl(options);
  };
  // end fetch
}
