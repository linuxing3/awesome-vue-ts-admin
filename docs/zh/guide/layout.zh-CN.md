# 布局

- [布局](#%E5%B8%83%E5%B1%80)
  - [布局](#%E5%B8%83%E5%B1%80-1)
  - [`Ant Design TS Vue ` 的布局](#Ant-Design-TS-Vue--%E7%9A%84%E5%B8%83%E5%B1%80)
  - [如何使用 `Ant Design TS Vue ` 布局](#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-Ant-Design-TS-Vue--%E5%B8%83%E5%B1%80)
  - [Pro 扩展配置](#Pro-%E6%89%A9%E5%B1%95%E9%85%8D%E7%BD%AE)
  - [Ant Design 布局组件](#Ant-Design-%E5%B8%83%E5%B1%80%E7%BB%84%E4%BB%B6)
  - [Grid 组件](#Grid-%E7%BB%84%E4%BB%B6)
  - [Layout 组件](#Layout-%E7%BB%84%E4%BB%B6)
  - [根据不同场景区分抽离布局组件](#%E6%A0%B9%E6%8D%AE%E4%B8%8D%E5%90%8C%E5%9C%BA%E6%99%AF%E5%8C%BA%E5%88%86%E6%8A%BD%E7%A6%BB%E5%B8%83%E5%B1%80%E7%BB%84%E4%BB%B6)

## 布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、页脚、侧边栏、通知栏以及内容等。在页面之中，也有很多区块的布局结构。在真实项目中，页面布局通常统领整个应用的界面，有非常重要的作用。

## `Ant Design TS Vue ` 的布局

在 `Ant Design TS Vue ` 中，我们抽离了使用过程中的通用布局，都放在 `src/components/Layouts` 目录中


## 如何使用 `Ant Design TS Vue ` 布局

通常布局是和路由系统紧密结合的，`Ant Design TS Vue ` 的路由使用了 `Vue-Router` 的路由方案，为了统一方便的管理路由和页面的关系，我们将配置信息统一抽离到 `router/index.ts` 下，通过如下配置定义每个页面的布局：

映射路由和页面布局（组件）的关系如代码所示，完整映射转换实现可以参看 `router/index.ts`。

更多 `Vue-Router` 的路由配置方式可以参考：`Vue-Router` 配置式路由。

## Pro 扩展配置
我们在 `router/index.ts` 扩展了一些关于 pro 全局菜单的配置。

```javascript
{
    hidden: true,
    hideChildrenInMenu: true,
    meta: {
        icon: 'dashboard',
        title: '菜单标题',
        keepAlive: true,
        permission: ['admin']
    }
}
```

- hidden: 当前路由从菜单中隐藏，但是路由然后可以访问到。
- hideChildrenInMenu: 当前路由显示为没有子路由的菜单Menu.Item。并且从菜单上隐藏该路由下的所有子菜单。
- meta.icon: 当前路由在菜单下的图标名。
- meta.title: 当前路由在菜单和面包屑中的名称
- meta.keepAlive: 缓存页面
- meta.permission: 允许展示的权限，不设则都可见，详见：权限管理。
- 
## Ant Design 布局组件

除了内建布局以外，在一些页面中需要进行布局，可以使用 `Ant Design Vue` 目前提供的两套布局组件工具：`Layout` 和 `Grid`。

## Grid 组件

栅格布局是网页中最常用的布局，其特点就是按照一定比例划分页面，能够随着屏幕的变化依旧保持比例，从而具有弹性布局的特点。

而 `Ant Design` 的栅格组件提供的功能更为强大，能够设置间距、具有支持响应式的比例设置，以及支持 `flex` 模式，基本上涵盖了大部分的布局场景，详情参看：`Grid`。

## Layout 组件

如果你需要辅助页面框架级别的布局设计，那么 `Layout` 则是你最佳的选择，它抽象了大部分框架布局结构，使得只需要填空就可以开发规范专业的页面整体布局，详情参看：`Layout`。

## 根据不同场景区分抽离布局组件

在大部分场景下，我们需要基于上面两个组件封装一些适用于当下具体业务的组件，包含了通用的导航、侧边栏、顶部通知、页面标题等元素。例如 `Ant Design TS Vue ` 的 `AppMain.tsx`。

通常，我们会把抽象出来的布局组件，放到跟 `components` 和 `components/Layout` 文件夹中方便管理。需要注意的是，这些布局组件和我们平时使用的其它组件并没有什么不同，只不过功能性上是为了处理布局问题。