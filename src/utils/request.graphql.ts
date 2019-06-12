import { values } from 'lodash';
import models from '@/models';
import { builder, baseData } from '@/utils/builder';
import { AGenTableColumns } from '@/utils/genFormData';

export interface BaseData {
  result: {
    resultCode: number;
    resultMessage: any;
  };
  entity: any;
}
export interface LfBasicCredentials {
  username: string;
  password: string;
}

export interface LfRequestConfig {
  url?: string;
  method?: string;
  params?: any;
  data?: any;
  fetchType?: string;
  baseURL?: string;
  headers?: any;
  paramsSerializer?: (params: any) => string;
  timeout?: number;
  withCredentials?: boolean;
  auth?: LfBasicCredentials;
  responseType?: string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (progressEvent: any) => void;
  onDownloadProgress?: (progressEvent: any) => void;
  maxContentLength?: number;
  validateStatus?: (status: number) => boolean;
  maxRedirects?: number;
  httpAgent?: any;
  httpsAgent?: any;
}

export interface LfResponse<T = any> {
  data: T;
  status?: number;
  statusText?: string;
  headers?: any;
  config?: LfRequestConfig;
  request?: any;
  success?: boolean;
  message?: string;
  code?: number;
  statusCode?: number;
  timestamp?: number;
}

export interface LfService {
  validateUrl: (options: LfRequestConfig) => LfRequestConfig;

  request(params: any): Promise<LfResponse>;

  post?(model: any, data: any): Promise<LfResponse>;

  remove?(model: any, data: any): Promise<LfResponse>;

  patch?(model: any, data: any): Promise<LfResponse>;

  fetch: (options: LfRequestConfig) => Promise<LfResponse>;

  response(params: any): Promise<LfResponse>;
}


// 创建 axios localforage 实例
const lfService: LfService = {
  validateUrl: (options: LfRequestConfig) => {
    const [prefix, namespace, action] = options.url.split('/');
    const model: any = models[namespace];
    // header, columns
    const columns = AGenTableColumns(model.fieldsKeys());
    const newOptions: LfRequestConfig = {
      ...options,
      params: {
        ...options.params,
        model,
        prefix,
        namespace,
        action,
        columns,
      },
    };
    return newOptions;
  },
  async response(params) {
    const result = await this.request(params);
    return result;
  },
  /**
   * 从请求参数中获取model等，包装返回类axios的内容
   * @param {any} options 请求参数
   */
  async request(options: LfRequestConfig) {
    const newOpitons = this.validateUrl(options);
    const result = await this.fetch(newOpitons);
    return result;
  },
  fetch: async (options: LfRequestConfig) => new Promise(async (resolve, reject) => {
    const {
      method,
      data,
      params: {
        model, namespace, pageParams, filter, statistic,
      },
    } = options;

    const Entity = model;

    let query = Entity.query();
    let requestedData: BaseData = null;
    const requestedConfig: LfRequestConfig = {
      ...options,
    };

    // response api
    switch (method) {
      case 'post':
        await Entity.create({ data });
        const createdItem = Entity.query().first();
        if (createdItem !== undefined) {
          await createdItem.$persist();
          requestedData = baseData('success', '创建成功');
          requestedData.entity = createdItem;
          Entity.fetch();
        }
        break;
      case 'delete':
        const itemToDelete = await Entity.find(data.id);
        if (itemToDelete !== undefined) {
          await itemToDelete.$deleteAndDestroy();
          requestedData = baseData('success', '删除成功');
          requestedData.entity = itemToDelete;
          Entity.fetch();
        }
        break;
      case 'patch':
        const itemToUpdate = await Entity.find(data.id);
        if (itemToUpdate !== undefined) {
          itemToUpdate.$update({ data });
          itemToUpdate.$push();
          requestedData = baseData('success', '更新成功');
          requestedData.entity = itemToUpdate;
          Entity.fetch();
        }
        break;
      case 'get':
        if (!data) {
          await Entity.fetch();
          // query with pageParams, header, columns
          if (pageParams.page) {
            // console.log('Get pagination information');
            const paginationConfig = Entity.pageConfig(pageParams);
            query = Entity.pageQuery(paginationConfig, query);
            requestedConfig.params.pageParams = paginationConfig;
          }
          // query with filter
          if (filter) {
            // console.log('Get fitlered information');
            query = Entity.searchQuery(filter, query);
            requestedConfig.params.filter = filter;
          }
          if (statistic) {
            const statistic = Entity.aggregateValuesOfAllFields();
            requestedConfig.params.statistic = statistic;
          }
          requestedData = baseData('success', '查询成功');
          // using query builder get real data
          requestedData.entity = query.orderBy('id', 'desc').get();
        } else {
          await Entity.fetch();
          const itemFound = await Entity.find(data.id);
          requestedData = baseData('success', '查询成功');
          requestedData.entity = itemFound;
        }
    }
    console.log(`${method} Localforage vuex -> `, requestedData);
    const response = builder(
      requestedData,
      `${method} ${namespace} Ok`,
      200,
      requestedConfig,
      {},
    );
    resolve(response);
  }),
};

export default lfService;
