import models from '@/models';
import { builder, baseData } from '@/utils/builder';
import { log } from '@/utils/helper';
import { AGenTableColumns } from '@/utils/genFormData';
import { Query } from '@vuex-orm/core';
import { LfService, LfResponse, LfBasicCredentials,LfRequestConfig, BaseData, PageParams, PageConfig, StatisticInfo } from '@/interface';
import { BaseModel } from '@/models/BaseModel';

// 创建 axios localforage 实例
const lfService: LfService = {
  getModel: (modelName: string) => models[modelName],
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
  /**
   * 获取需求
   * @param {any} options
   * @returns {Promise<any>}
   */
  fetch: async (options: LfRequestConfig) => new Promise(async (resolve, reject) => {
    const {
      method,
      data,
      params: {
        model, namespace, filter, statistic,
      },
    } = options;
    const pageParams: PageParams = options.params.pageParams;
    const Entity: typeof BaseModel = model;
    const requestedConfig: LfRequestConfig = {
      ...options,
    };

    let query: Query = Entity.query();
    let requestedData: BaseData = null;
    let response: LfResponse = null;

    // response api
    log.suc('Checking data', data);

    switch (method) {
      case 'post':
        if (data === undefined || data === null || Object.keys(data).length === 0) {
          requestedData = baseData('fail', '创建失败');
          requestedData.entity = null;
        } else {
          const createdItems: {
            [namespace: string]: any[]
          } = await (Entity as any).$create({ data });
          requestedData = baseData('success', '创建成功');
          requestedData.entity = createdItems;
          if (createdItems !== undefined) (Entity as any).$fetch();
        }
        break;
      case 'delete':
        if (
          data === undefined
          || data === null
        ) {
          requestedData = baseData('fail', '删除失败');
          requestedData.entity = null;
        } else {
          const deletedItems: {
            [namespace: string] : any[]
          } = await (Entity as any).$delete(data.id || data);
          requestedData = baseData('success', '删除成功');
          requestedData.entity = deletedItems;
          if (deletedItems !== undefined) (Entity as any).$fetch();
        }
        break;
      case 'patch':
        if (
          data === undefined
          || data === null
          || Object.keys(data).length === 0
        ) {
          requestedData = baseData('fail', '更新失败');
          requestedData.entity = null;
        } else {
          const patchedItems: {
            [namespace: string] : any[]
          } = await (Entity as any).$update({ data });
          requestedData = baseData('success', '更新成功');
          requestedData.entity = patchedItems;
          if (patchedItems !== undefined) (Entity as any).$fetch();
        }
        break;
      case 'get':
        if (!data) {
          (Entity as any).$fetch();
          // query with pageParams, header, columns
          if (pageParams.page) {
            log.info('Get pagination information');
            const paginationConfig: PageConfig = Entity.pageConfig(pageParams);
            query = Entity.pageQuery(paginationConfig, query);
            requestedConfig.params.pageParams = paginationConfig;
          }
          // query with filter
          if (filter) {
            log.info('Get fitlered information');
            query = Entity.searchQuery(filter, query);
            requestedConfig.params.filter = filter;
          }
          if (statistic) {
            const statistic = Entity.aggregateValuesOfAllFields();
            requestedConfig.params.statistic = statistic;
          }
          requestedData = baseData('success', '查询成功');
          // using query builder get real data
          const entities: any[] = query.orderBy('id', 'desc').get();
          requestedData.entity = entities;
        } else {
          await (Entity as any).$fetch();
          const entities: {
            [namespace: string]: any[]
          } = await (Entity as any).$get(data.id.toString());
          requestedData = baseData('success', '查询成功');
          requestedData.entity = entities.namespace[0];
        }
    }
    log.info('--------------- LocalForage ---------------------');
    log.info(`${method}  --*--*--*-> `, requestedData);
    log.info('--------------- LocalForage ---------------------');
    // build response
    if (requestedData.entity !== null || requestedData.entity !== undefined) {
      response = builder(
        requestedData,
        `${method} ${namespace} Ok`,
        200,
        requestedConfig,
        {},
      );
      resolve(response);
    } else {
      response = builder(
        requestedData,
        `${method} ${namespace} NotOk`,
        500,
        requestedConfig,
        {},
      );
      reject(response);
    }
  }),
};

export default lfService;
