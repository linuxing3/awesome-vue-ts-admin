import store from '@/store';
import models from '@/models';
import { builder } from '@/utils/builder';
import { AGenTableColumns, VGenTableHeaders } from '@/utils/genFormData';

export interface LfBasicCredentials {
  username: string
  password: string
}

export interface LfRequestConfig {
  url?: string
  method?: string
  params?: any
  data?: any
  baseURL?: string
  headers?: any
  paramsSerializer?: (params: any) => string
  timeout?: number
  withCredentials?: boolean
  auth?: LfBasicCredentials
  responseType?: string
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onUploadProgress?: (progressEvent: any) => void
  onDownloadProgress?: (progressEvent: any) => void
  maxContentLength?: number
  validateStatus?: (status: number) => boolean
  maxRedirects?: number
  httpAgent?: any
  httpsAgent?: any
}

export interface LfResponse<T = any> {
  data: T
  status?: number
  statusText?: string
  headers?: any
  config?: LfRequestConfig
  request?: any,
  message?: string
  code?: number,
  timestamp?: number
}

export interface LfService {
  validateUrl: (options: LfRequestConfig) => LfRequestConfig

  request(params: any): Promise<LfResponse>

  post(model: any, data: any): Promise<LfResponse>

  remove(model: any, data: any): Promise<LfResponse>

  patch(model: any, data: any): Promise<LfResponse>

  handleRequest: (options: LfRequestConfig) => Promise<LfResponse>

  response(params: any): Promise<LfResponse>

  $response: (options: LfRequestConfig) => Promise<LfResponse>
}

const genPagination = (model, pagination) => {
  const totalCount = model.query().count();
  const pageNo = (pagination.pageNo && parseInt(pagination.pageNo)) || 1;
  const pageSize = (pagination.pageSize && parseInt(pagination.pageSize)) || 10;
  const totalPage = Math.ceil(totalCount / pageSize) || 0;
  // offset and next
  const offset = (pageNo - 1) * pageSize || 0;
  const next = (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1;
  return {
    totalCount,
    pageNo,
    pageSize,
    totalPage,
    offset,
    next,
  };
};



// 创建 axios localforage 实例
const lfService: LfService = {
  validateUrl: (options: LfRequestConfig) => {
    const [prefix, namespace, action] = options.url.split('/')
    const model: any = models[namespace]
    // header, columns
    const columns = AGenTableColumns(model.fieldsKeys())
    const headers = VGenTableHeaders(model.fieldsKeys())
    const newOptions: LfRequestConfig = {
      ...options,
      params: {
        ...options.params,
        model,
        action,
        prefix,
        namespace,
        columns,
        headers
      }
    }
    return newOptions
  },
  async response(params) {
    const result = await this.request(params)
    return result
  },
  /**
   * 从请求参数中获取model等，包装返回类axios的内容
   * @param {any} params 请求参数
   */
  async request(params: LfRequestConfig) {
    const newParams = this.validateUrl(params)
    console.log(newParams)
    const result = await this.handleRequest(newParams)
    return result
  },
  async post(model, data) {
    const createdItems = await model.$create({ data })
    return {
      model,
      data: createdItems
    }
  },
  async remove(model, data) {
    const deletedItems = await model.$delete(data.id || data)
    return {
      model,
      data: deletedItems
    }
  },
  async patch(model, data) {
    const updatedItems = await model.$delete({ data })
    return {
      model,
      data: updatedItems
    }
  },
  handleRequest: async (options: LfRequestConfig) => {
    // Using vuex-orm with localforage
    try {
      const {
        method,
        data,
        params: { model, namespace, pagination }
      } = options

      let requestedData = null
      let requestedConfig: LfRequestConfig = {
        ...options
      }
      // data from localforage
      switch (method) {
        case 'post':
          const createdItems = await model.$create({ data })
          requestedData = {
            model,
            data: createdItems
          }
          break
        case 'delete':
          const deletedItems = await model.$delete(data.id || data)
          requestedData = {
            model,
            data: deletedItems
          }
          break
        case 'patch':
          const updatedItems = await model.$update({ data })
          requestedData = {
            model,
            data: updatedItems
          }
          break
        case 'get':
          if (!data) {
            await model.$fetch()
            // query with pagination, header, columns
            // pagination
            const paginationConfig = genPagination(
              model,
              pagination
            )
            requestedData = model
              .query()
              .offset(paginationConfig.offset)
              .limit(paginationConfig.pageSize)
              .get()
          } else {
            await model.$get(data.id || data)
            requestedData = model.find(data.id || data) || {}
          }
          break
      }

      // build response
      console.log(`${method} Localforage vuex -> `, requestedData)
      const response = builder(
        requestedData,
        `${method} ${namespace} Ok`,
        200,
        requestedConfig,
        {}
      )
      return Promise.resolve(response)
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      const response = builder(error, 'Error', 500, {}, {})
      return Promise.reject(response)
    }
  },
  $response: async (options: LfRequestConfig) => {
    // Using vuex-orm without localforage
    const {
      method,
      data,
      params: { namespace }
    } = options
    try {
      let requestedData
      switch (method) {
        case 'post':
          requestedData = await store.dispatch(`entities/${namespace}/create`, data)
          break
        case 'delete':
          requestedData = await store.dispatch(`entities/${namespace}/delete`, data.id || data)
          break
        case 'patch':
          requestedData = await store.dispatch(`entities/${namespace}/update`, data)
          break
        case 'put':
          requestedData = await store.dispatch(`entities/${namespace}/update`, data)
          break
        case 'get':
          if (!data) {
            const foundItems = await store.dispatch(`entities/${namespace}/all`)
            requestedData = foundItems || []
          } else {
            const foundItem = await store.dispatch(`entities/${namespace}/find`, data.id || data)
            requestedData = foundItem || {}
          }
          break
      }
      return Promise.resolve(
        builder(
          {
            data: requestedData
          },
          '',
          200,
          {}
        )
      )
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default lfService;
