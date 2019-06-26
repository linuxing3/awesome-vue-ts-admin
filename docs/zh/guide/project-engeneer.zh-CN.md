# 导航

- [导航](#%E5%AF%BC%E8%88%AA)
    - [侧边栏:](#%E4%BE%A7%E8%BE%B9%E6%A0%8F)
    - [面包屑:](#%E9%9D%A2%E5%8C%85%E5%B1%91)
  - [favicon](#favicon)
  - [babel-polyfill](#babel-polyfill)
      - [复制代码在入口文件中引入](#%E5%A4%8D%E5%88%B6%E4%BB%A3%E7%A0%81%E5%9C%A8%E5%85%A5%E5%8F%A3%E6%96%87%E4%BB%B6%E4%B8%AD%E5%BC%95%E5%85%A5)
  - [eslint](#eslint)

### 侧边栏:

侧边栏是根据 router.js 配置的路由并且根据权限动态生成的，这样就省去了写一遍路由还要再手动写侧边栏这种麻烦事，同是使用了递归组件，这样不管你路由多少级嵌套，都能愉快的显示了。权限验证那里也做了递归的处理。

### 面包屑:

本项目中也封装了一个面包屑导航，它也是通过watch $route动态生成的。代码

由于侧边栏导航和面包屑亦或是权限，你会发现其实都是和router密切相关的，所以基于vue-router路由信息对象上做了一下小小的拓展，自定义了一些属性

## favicon

每个项目都需要有一个属于自己的favicon。

其实实现起来非常的方便，我们主需要借助html-webpack-plugin

```javascript
//webpack config
function resolveApp(relativePath) {
    return path.resolve(relativePath);
}
new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      favicon: resolveApp('favicon.ico')
    }),
```

复制代码你只要将本项目跟目录下的favicon.ico文件替换为你想要的图标即可。

## babel-polyfill

本项目暂时没有兼容性需求，如有兼容性需求可自行使用`babel-polyfill`。

在`Node/Browserify/webpack`中使用

```bash
npm install --save babel-polyfill //下载依赖
```

#### 复制代码在入口文件中引入

```javascript
import 'babel-polyfill';
// 或者
require('babel-polyfill');//es6
复制代码在webpack.config.js中加入babel-polyfill到你的入口数组：
module.exports = {
    entry:["babel-polyfill","./app/js"]
}
```

## eslint

vue cli 默认提供了standard和airbnb 两种 lint 规范

配置 eslint 对多人协作的项目有很大的好处,同时配置好lint, 在加 ide 的 lint 插件写代码简直要起飞。
