import { LfResponse, BaseData } from '@/interface';

/**
 * 获取数据，包装成axios类似的返回格式
 * @param {BaseData} data Data from request
 * @param {string} message Response messag
 * @param {number} code Response code
 * @param {any} headers Response headers
 */
export const builder = (data: BaseData, message = '', code = 0, config = {}, headers = {}): LfResponse => {
  const responseBody: LfResponse = {
    data: null,
    config: {},
    status: null,
    statusText: '',
    headers: null,
    message: '',
    success: false,
    code: 0,
    timestamp: 0,
  };
  responseBody.data = data;
  responseBody.config = config;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody.status = code;
    responseBody.statusText = 'Ok';
    responseBody.success = true;
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody.headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};

/**
 * 获取url查询参数字符串，包装为json对象
 * @param {any} options Url查询参数字符串
 */
export const getQueryParameters = (options) => {
  const url = options.url;
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    `{"${decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`,
  );
};

/**
 * 获取请求体字符串，返回json对象
 * @param {any} options 获取请求体
 */
export const getBody = options => options.body && JSON.parse(options.body);

export const baseData = (type, message, code?): BaseData => {
  let resultCode = 0;
  if (code) {
    resultCode = code;
  } else {
    resultCode = type === 'success' ? 0 : 1;
  }
  return {
    result: { resultCode, resultMessage: message },
    entity: null,
  };
};
