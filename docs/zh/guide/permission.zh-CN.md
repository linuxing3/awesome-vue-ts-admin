# 权限管理

- [权限管理](#%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86)
  - [路由权限](#%E8%B7%AF%E7%94%B1%E6%9D%83%E9%99%90)
  - [登录篇](#%E7%99%BB%E5%BD%95%E7%AF%87)
    - [登录：](#%E7%99%BB%E5%BD%95)
    - [权限验证：](#%E6%9D%83%E9%99%90%E9%AA%8C%E8%AF%81)
    - [获取用户信息](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
  - [权限篇](#%E6%9D%83%E9%99%90%E7%AF%87)
    - [addRoutes](#addRoutes)
      - [router.addRoutes](#routeraddRoutes)
    - [router.ts](#routerts)
    - [main.ts](#maints)
    - [store/permission.ts](#storepermissionts)
    - [侧边栏](#%E4%BE%A7%E8%BE%B9%E6%A0%8F)
    - [`axios`拦截器](#axios%E6%8B%A6%E6%88%AA%E5%99%A8)

权限控制是中后台系统中常见的需求之一，可以利用提供的路由权限 实现一些基本的权限控制功能。

## 路由权限

一般路由权限的实现方式是通过获取当前用户的权限去比对路由表，生成当前用户具有的权限可访问的路由表，通过 `router.addRoutes` 动态挂载到 `router` 上。

更灵活的思路是每个页面的权限也可以动态从后端配置的，并不是像默认的路由表那样写死在预设的。

1. 可以在后台返回每一个页面的 `动态配置权限`，之后将这份 `路由表` 存储到后端。

2. 当用户登录后得到 `roles`，前端根据 `roles` 去向后端请求可访问的路由表，从而动态生成可访问页面，

3. `router.addRoutes` 动态挂载到 `router` 上。


## 登录篇

### 登录：

当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个``token``，拿到`token`之后（会将这个`token`存贮到cookie中，保证刷新页面后能记住用户登录状态），前端会根据`token`再去拉取一个 user_info 的接口来获取用户的详细信息（如用户权限，用户名等等信息）。

### 权限验证：

通过`token`获取用户对应的 role，动态根据用户的 role 算出其对应有权限的路由，通过 `router.addRoutes` 动态挂载这些路由。

上述所有的数据和操作都是通过vuex全局管理控制的。

最简单的登录页面, `click` 事件触发登录操作:

+ click
```javascript
this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
  this.$router.push({ path: '/' }); //登录成功之后重定向到首页
}).catch(err => {
  this.$message.error(err); //登录失败提示错误
});
```

+ action:
```javascript
LoginByUsername({ commit }, userInfo) {
  const username = userInfo.username.trim()
  return new Promise((resolve, reject) => {
    loginByUsername(username, userInfo.password).then(response => {
      const data = response.data
      Cookies.set('`token`', response.data.`token`) //登录成功后将`token`存储在cookie之中
      commit('SET_`token`', data.`token`)
      resolve()
    }).catch(error => {
      reject(error)
    });
  });
}
```

登录成功后，服务端会返回一个 `token`（该`token`的是一个能唯一标示用户身份的一个key）

将`token`存储在本地cookie之中，这样下次打开页面或者刷新页面的时候能记住用户的登录状态，不用再去登录页面重新登录了。

### 获取用户信息

用户登录成功之后，在全局钩子 `router.beforeEach` 中拦截路由，判断是否已获得`token`，在获得`token`之后们就要去获取用户基本信息

```javascript
//router.beforeEach
if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
  store.dispatch('GetInfo').then(res => { // 拉取user_info
    const roles = res.data.role;
    next();//resolve 钩子
  })
```

## 权限篇

权限控制的主体思路

1. 前端会有一份路由表，它表示了每一个路由可访问的权限。
2. 当用户登录之后，通过 `token` 获取用户的 role ，动态根据用户的 role 算出其对应有权限的路由
3. 通过router.addRoutes动态挂载路由。但这些控制都只是页面级的。

前端来控制页面级的权限，不同权限的用户显示不同的侧边栏和限制其所能进入的页面。

后端则会验证每一个涉及请求的操作，验证其是否有该操作的权限。

### addRoutes

#### router.addRoutes

> Dynamically add more routes to the router. The argument must be an Array using the same route config format with the routes constructor option.

具体实现

1. 创建vue实例的时候将vue-router挂载，但这个时候vue-router挂载一些登录或者不用权限的公用的页面。

2. 当用户登录后，获取用role，将role和路由表每个页面的需要的权限作比较，生成最终用户可访问的路由表。

3. 调用router.addRoutes(store.getters.addRouters)添加用户可访问的路由。

4. 使用vuex管理路由表，根据vuex中可访问的路由渲染侧边栏组件。


### router.ts

实现router.ts路由表

```javascript
// router.ts
import Vue from 'vue';
import Router from 'vue-router';

import Login from '../views/login/';
const dashboard = resolve => require(['../views/dashboard/index'], resolve);

export const constantRouterMap = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [{ path: 'dashboard', component: dashboard }]
  },
]

//实例化vue的时候只挂载constantRouter
export default new Router({
  routes: constantRouterMap
});

//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    name: '权限测试',
    meta: { role: ['admin','super_editor'] }, //页面需要的权限
    children: [
    { 
      path: 'index',
      component: Permission,
      name: '权限测试页',
      meta: { role: ['admin','super_editor'] }  //页面需要的权限
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
];
```

`vue-router`官方推荐通过`meta`标签来标示改页面能访问的权限有哪些。如`meta: { role: ['admin','super_editor'] }`表示该页面只有admin和超级编辑才能有资格进入。

### main.ts

关键的main.ts

```javascript
// main.ts
router.beforeEach((to, from, next) => {
  if (store.getters.`token`) { // 判断是否有`token`
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取info
          const roles = res.data.role;
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(err => {
          console.log(err);
        });
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});
```

### store/permission.ts

+ GenerateRoutes Action

```javascript
// store/permission.ts
import { asyncRouterMap, constantRouterMap } from 'src/router';

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        const accessedRouters = asyncRouterMap.filter(v => {
          if (roles.indexOf('admin') >= 0) return true;
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
};

export default permission;
```

通过用户的权限和之前在`router.ts`里面`asyncRouterMap`的每一个页面所需要的权限做匹配，最后返回一个该用户能够访问路由有哪些。

### 侧边栏

方便实现动态显示侧边栏, 遍历之前算出来的`permission_routers`，通过`vuex`拿到之后动态渲染。

### `axios`拦截器

通过request拦截器在每个请求头里面塞入`token`，好让后端对请求进行权限验证。并创建一个respone拦截器，当服务端返回特殊的状态码，们统一做处理，如没权限或者`token`失效等操作。

```javascript
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { get`token` } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

export default service
```
