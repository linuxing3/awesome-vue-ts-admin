# 业务组件

基本的添加组件流程如下

- 组件中调用`request`,请求服务器数据
- `request`调用`vuex/orm/localforage`同步并查询修改`vuex`
- 获取服务器数据，更新组件`数据`

## 组件

`MemberForm.vue`文件

```js
  async handleGetInfo () {
    // if no id, do not get
    if (this.id === -1) return
    // if has id, get info to edit
    // ajax
    const { result: { data } } = await this.$lf.request({
      url: `/${this.modelName}`,
      method: 'get',
      data: { id: this.id }
    })
    this.loadEditInfo(data)
  },
```

## 模型

`member.model.js`文件

```js
import { Model } from "@vuex-orm/core";

export default class Member extends Model {
  static entity = "member";

  static fields() {
    return {
      id: this.increment(),
      name: this.string("Emacser"),
      username: this.string("admin"),
      password: this.string(""),
      avatar: this.string("/avatar2.jpg"),
      status: this.number(1),
      telephone: this.string("")
    };
  }
}
```

## 接口

`crud.vuex.js`文件

```
import { lfService } from '@/utils/request.localforage'

/**
 * crud func
 * @param parameter
 * @returns {Promise<any>}
 */
function crud ({ url, method, data }) {
  return this.$http({
    url,
    method,
    data
  })
}

function createItem ({ url, data }) {
  return this.$http({
    url,
    method: 'post',
    data
  })
}

function updateItem ({ url, data }) {
  return this.$http({
    url,
    method: 'patch',
    data
  })
}

function deleteItem ({ url, data }) {
  return this.$http({
    url,
    method: 'delete',
    data
  })
}

function fetchItem ({ url, data }) {
  return this.$http({
    url,
    method: 'get',
    data
  })
}

function fetchItems ({ url, data }) {
  return this.$http({
    url,
    method: 'get'
  })
}

export {
  crud,
  createItem,
  deleteItem,
  updateItem,
  fetchItem,
  fetchItems
}
```

## 帮助器

### `mock/util.js`文件

```js
const responseBody = {
  message: "",
  timestamp: 0,
  result: null,
  code: 0
};

export const builder = (data, message, code = 0, headers = {}) => {
  responseBody.result = data;
  if (message !== undefined && message !== null) {
    responseBody.message = message;
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code;
    responseBody._status = code;
  }
  if (
    headers !== null &&
    typeof headers === "object" &&
    Object.keys(headers).length > 0
  ) {
    responseBody._headers = headers;
  }
  responseBody.timestamp = new Date().getTime();
  return responseBody;
};
```

### `utis/axios.js`中定义`vue`插件

```js
// Vue Axios-plugin backed with localforage
const VueLocalForageAxios = {
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install(Vue, instance) {
    if (this.installed) {
      return;
    }
    this.installed = true;

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error("You have to install localforage axios");
      return;
    }

    Vue.lf = instance;

    Object.defineProperties(Vue.prototype, {
      lf: {
        get: function get() {
          return instance;
        }
      },
      $lf: {
        get: function get() {
          return instance;
        }
      }
    });
  }
};
```

### `request.localforage.js`中定义类`axios.request`帮助器

```js
import store from "@/store";
import { builder } from "@/mock/util";
import { VueLocalForageAxios } from "./axios";
import models from "@/store/models";

// 创建 axios 实例
const service = {
  validateUrl: ({ url, method, data, pageParams }) => {
    const [prefix, namespace, action] = url.split("/");
    const model = models[namespace];
    return {
      method,
      data,
      model,
      pageParams,
      namespace,
      url,
      prefix,
      action
    };
  },
  request: async function(params) {
    const newParams = this.validateUrl(params);
    console.log(newParams);
    const result = await this.handleRequest(newParams);
    return result;
  },
  handleRequest: async ({ method, data, model, namespace, pageParams }) => {
    // Using vuex-orm with localforage
    try {
      let requestedData = null;
      // data from localforage
      switch (method) {
        case "post":
          const createdItems = await model.$create({ data });
          requestedData = {
            model,
            data: createdItems
          };
          break;
        case "delete":
          const deletedItems = await model.$delete(data.id || data);
          requestedData = {
            model,
            data: deletedItems
          };
          break;
        case "patch":
          const updatedItems = await model.$update({ data });
          requestedData = {
            model,
            data: updatedItems
          };
          break;
        case "get":
          if (!data) {
            await model.$fetch();
            // pageParams
            const totalCount = model.query().count() || 0;
            const pageNo =
              (pageParams.pageNo && parseInt(pageParams.pageNo)) || 1;
            const pageSize =
              (pageParams.pageSize && parseInt(pageParams.pageSize)) || 10;
            const totalPage = Math.ceil(totalCount / pageSize) || 0;
            // offset and next
            const offset = (pageNo - 1) * pageSize || 0;
            const next =
              (pageNo >= totalPage ? totalCount % pageSize : pageSize) + 1;
            // query with pageParams
            const paginatedData = model
              .query()
              .offset(offset)
              .limit(pageSize)
              .get();
            // build data and attach to result
            requestedData = {
              model,
              pageSize,
              pageNo,
              totalCount,
              totalPage,
              offset,
              next,
              data: paginatedData
            };
          } else {
            await model.$get(data.id || data);
            const foundItem = model.find(data.id || data) || {};
            requestedData = {
              model,
              data: foundItem
            };
          }
          break;
      }

      // build response
      console.log(`${method} Localforage --> vuex:`);
      console.log(requestedData);
      const response = builder(
        requestedData,
        `${method} ${namespace} Ok`,
        200,
        {}
      );
      return Promise.resolve(response);
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      const response = builder(error, "Error", 500, {});
      return Promise.reject(response);
    }
  }
};

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueLocalForageAxios, service);
  }
};

export { installer as VueLocalForageAxios, service as lfService };
```
