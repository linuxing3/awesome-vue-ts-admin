import { ApiList, Apis, defaultApiList } from './index';
import lfService, { LfService, LfResponse } from '@/utils/request.localforage';

export default class LfApi {
  service: LfService;

  apiList: ApiList = defaultApiList;

  api: Apis<any> = {};

  constructor(options: { baseUrl }) {
    this.service = lfService;

    for (const item in this.apiList) {
      this.api[item] = (data?: any, params?: any) : Promise<LfResponse<any>> => {
        const { url, method, fetchType } = this.apiList[item];
        return this.service.request({
          url,
          method,
          data,
          params,
          fetchType,
        });
      };
    }

    console.log('Lf Api [service]:', this.service);
    console.log('Lf Api [api]:', this.api);
  }
}
