[![Netlify Status](https://api.netlify.com/api/v1/badges/7576e708-c11b-43dd-b90e-b983c5a8067e/deploy-status)](https://app.netlify.com/sites/embajadachinave/deploys)

![https://ci.appveyor.com/api/projects/status/32r7s2skrgm9ubva?svg=true](https://ci.appveyor.com/api/projects/status/32r7s2skrgm9ubva?svg=true)

# awesome-vue-ts-admin

  > 一个基于`typesciprt` + `vue` + `vue-cli@3.4.1`的中台管理系统

## [演示地址](https://embajadachinave.netlify.com)

### 特点
  1. 基于`vue-cli/vuex/vue-router`
  2. 基于`typescript`, 代码健壮，出bug几率更小
  3. 基于`ant-design-vue`, 美观大方，简洁明亮
  4. 响应式架构，在移动端可以正常使用
  5. `tab`缓存页面，可以同时打开多个路由，并随意切换和关闭
  6. 接入`electron`桌面应用
  7. 后台使用`vuex/orm/localforage`作为数据Mock和存储

### 持续更新中

### Compiles and hot-reloads for electron development
```
yarn dev
yarn electron:serve
```

### Compiles and minifies for production
```
yarn dist
yarn electron:build
```

### install necessary plugins

```
yarn plugins:install
```

### generate new

``` sh
# hygen new component-table
yarn new component-table
```

## General Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

## Documentation

This project includes a `docs` folder with more details on:

[documents](/docs/README.md)

## FAQ

### 项目截图

![perview](/perview/vue-ts-admin.gif)


![perview](/perview/vue-ts-admin-mobile.gif)

