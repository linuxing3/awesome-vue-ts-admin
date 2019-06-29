import models from '@/models';
import { builder, baseData } from '@/utils/builder';
import { log } from '@/utils/helper';
import { AGenTableColumns } from '@/utils/genFormData';
import { Query } from '@vuex-orm/core';
import {
  LfService, LfResponse, LfRequestOption, BaseData, PageParams, PageConfig,
} from '@/interface';
import { BaseModel } from '@/models/BaseModel';

// 创建 axios localforage 实例
const lfService: LfService = {

  getModel: (modelName: string) => models[modelName] as typeof BaseModel,

  validateUrl: (options: LfRequestOption) => {
    const [prefix, namespace, action] = options.url.split('/');
    const model = models[namespace] as typeof BaseModel;
    // header, columns
    const columns = AGenTableColumns(model.fieldsKeys());
    const newOptions: LfRequestOption = {
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

  async response(options: LfRequestOption) {
    const result = await this.request(options);
    return result;
  },

  async request(options: LfRequestOption) {
    const newOpitons = this.validateUrl(options);
    const result = await this.fetch(newOpitons);
    return result;
  },

  fetch: async (options: LfRequestOption) => new Promise(async (resolve, reject) => {
    const {
      method,
      data,
      params: {
        model, namespace, filter, statistic,
      },
    } = options;
    const pageParams: PageParams = options.params.pageParams;
    const Model: any = model;
    const requestedOption: LfRequestOption = {
      ...options,
    };

    let query: Query = Model.query();
    let requestedData: BaseData = null;
    let response: LfResponse = null;

    // response api
    log.suc('[LfRequestOption Helper] ---> 检查请求是否包含数据', data);

    switch (method) {
      case 'post':
        if (data === undefined || data === null || Object.keys(data).length === 0) {
          requestedData = baseData('fail', '创建失败');
          requestedData.entity = null;
        } else {
          const createdItems: {
            [namespace: string]: any[]
          } = await Model.$create({ data });
          requestedData = baseData('success', '创建成功');
          requestedData.entity = createdItems;
          if (createdItems !== undefined) Model.$fetch();
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
          } = await Model.$delete(data.id || data);
          requestedData = baseData('success', '删除成功');
          requestedData.entity = deletedItems;
          if (deletedItems !== undefined) Model.$fetch();
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
          } = await Model.$update({ data });
          requestedData = baseData('success', '更新成功');
          requestedData.entity = patchedItems;
          if (patchedItems !== undefined) Model.$fetch();
        }
        break;
      case 'get':
        if (!data) {
          Model.$fetch();
          // query with pageParams, header, columns
          if (pageParams.page) {
            log.info('Get pagination information');
            const paginationConfig: PageConfig = Model.pageConfig(pageParams);
            query = Model.pageQuery(paginationConfig, query);
            requestedOption.params.pageParams = paginationConfig;
          }
          // query with filter
          if (filter) {
            log.info('Get fitlered information');
            query = Model.searchQuery(filter, query);
            requestedOption.params.filter = filter;
          }
          if (statistic) {
            const statistic = Model.aggregateValuesOfAllFields();
            requestedOption.params.statistic = statistic;
          }
          requestedData = baseData('success', '查询成功');
          // using query builder get real data
          const entities: any[] = query.orderBy('id', 'desc').get();
          requestedData.entity = entities;
        } else {
          await Model.$fetch();
          const entities: {
            [namespace: string]: any[]
          } = await Model.$get(data.id.toString());
          requestedData = baseData('success', '查询成功');
          requestedData.entity = entities[namespace][0];
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
        requestedOption,
        options,
      );
      resolve(response);
    } else {
      response = builder(
        requestedData,
        `${method} ${namespace} NotOk`,
        500,
        requestedOption,
        options,
      );
      reject(response);
    }
  }),
};

export default lfService;
