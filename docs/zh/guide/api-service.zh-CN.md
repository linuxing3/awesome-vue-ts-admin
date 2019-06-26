# 和服务端进行交互

- [和服务端进行交互](#%E5%92%8C%E6%9C%8D%E5%8A%A1%E7%AB%AF%E8%BF%9B%E8%A1%8C%E4%BA%A4%E4%BA%92)
  - [前端请求流程](#%E5%89%8D%E7%AB%AF%E8%AF%B7%E6%B1%82%E6%B5%81%E7%A8%8B)
  - [使用服务器作为后台](#%E4%BD%BF%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%BD%9C%E4%B8%BA%E5%90%8E%E5%8F%B0)
  - [使用本地内存数据库作为后台](#%E4%BD%BF%E7%94%A8%E6%9C%AC%E5%9C%B0%E5%86%85%E5%AD%98%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BD%9C%E4%B8%BA%E5%90%8E%E5%8F%B0)

`Ant Desgin TS Vue` 是一套基于 `Vue` 技术栈的单页面应用，简单提供的是前端代码和浏览器内存数据库 `indexdb` 模拟数据的开发模式，
当然也可以通过 API 的形式，和任何技术栈的服务端应用一起工作。

下面将简单介绍和服务端交互的基本写法。

## 前端请求流程

在 `Ant Desgin TS Vue` 中，一个完整的前端 UI 交互到服务端处理流程是这样的：

UI 组件交互操作；

1. 调用统一管理的 api service 请求函数；
2. 使用封装的 request.js 发送请求；
3. 获取服务端返回；
4. 更新 data。

从上面的流程可以看出，为了方便管理维护，统一的请求处理都放在 `@/src/api` 文件夹中，并且一般按照 model 纬度进行拆分文件，如：

```bash
api/
  index.ts
  api.ts
  ...
```

## 使用服务器作为后台

一般而言，`@/src/utils/request.ts` 是基于 `axios` 的封装，便于统一处理 POST，GET 等请求参数，请求头，以及错误提示信息等。

具体可以参看 `request.ts`。 它封装了全局 `request` 拦截器、`response` 拦截器、统一的错误处理、`baseURL` 设置等。

## 使用本地内存数据库作为后台

下面将简单介绍和本地内存数据服务端交互的基本写法。

主要目的是不使用后台数据库，直接通过`vuex/orm`和`localforage`插件将数据存储在`electron`的`indexdb`中，实现离线数据存储，便于桌面应用的离线功能。

同时，可以省略`mock`功能，在打包`electron`应用是，避免出现无服务器状态导致的请求失败。

`@/src/utils/request.localforage.ts` 是基于 `localforage-indexdb` 的封装，请求和返回的参数和`axios`基本一致。


```javascript

export interface LfService {

  getModel: (modelName: string ) => any;

  validateUrl: (options: LfRequestConfig) => LfRequestConfig;

  request(params: LfRequestConfig): Promise<LfResponse>;

  post?(model: any, data: any): Promise<LfResponse>;

  remove?(model: any, data: any): Promise<LfResponse>;

  patch?(model: any, data: any): Promise<LfResponse>;

  fetch: (options: LfRequestConfig) => Promise<LfResponse>;

  response(params: any): Promise<LfResponse>;
}

const lfService: LfService = {
  ...
}

```

所有的`request`请求都将返回，其中提取实际包含数据的键值路径为`response.data.entity`。

为方便使用，在`@/api/index.ts`中将`request.localforage`导出为`api`对象，并挂载到`window`中，方便调用。

