# Routing and views

- [Routing and views](#routing-and-views)
  - [Overview](#overview)
    - [Routes](#routes)
  - [Views](#views)
  - [Layout](#layout)

## Overview

This project uses `Vue Router`, which we initialize in
`src/router/index.ts`, with routes defined in `src/router/path.ts`.

Inside the `src/router` folder, there are also sub-folders and separate files,
both containing specific route link to components.

### Routes

```javascript
import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

import path from './path'

Vue.use(Router)

/**
 * 动态路由
 */
let requiredRoute: RequireContext = require.context('.', false, /\.ts$/)

requiredRoute.keys().forEach(route => {
  let routeConfig = requiredRoute(route)
  if (route === './index.ts' || route === './path.ts') return
  if (Array.isArray(routeConfig.default)) {
    routeConfig.default.forEach(subRoute => {
      path.push(subRoute)
    })
  } else {
    path.push(routeConfig.default)
  }
})

const router = new Router({
  routes: path as RouteConfig[]
})

// router guards
router.beforeEach((to: any, from: any, next: any) => {
  console.log('Going From ' + from.path + ' to ' + to.path)
  next()
})

router.afterEach((to: any, from: any) => {
  console.log('Arrived ' + to.path + ' from ' + from.path)
})

export default router
```

## Views

Each view component will be used by at least one route in `src/pages`, to provide a template for the page. They can technically include some additional properties from Vue Router [to control navigation](https://router.vuejs.org/guide/advanced/navigation-guards.html), for example to [fetch data](https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-before-navigation) before creating the component, but I recommend adding these guards to `src/router/routes.js` instead, as that behavior typically has much more to do with the route (and will sometimes be shared between routes) than it does the view component.

## Layout

Layout components are located under `src/layouts`, use `slot` to insert the real content

```html
<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6> <slot /> // added slot to inject </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
  import AppToolbar from '@/components/App/AppToolbar.vue'
  import AppDrawer from '@/components/App/AppDrawer.vue'

  export default {
    components: {
      AppToolbar,
      AppDrawer
    }
  }
</script>
<style scoped></style>
```

To use the layout, simply import in you `views` components

```html
<template>
  <DefaultLayout>
    // added this as wrapper
    <TestBook />
  </DefaultLayout>
</template>

<script lang="js">
  import DefaultLayout from '@/layout/default.vue'
  import TestBook from '@/components/TestBook/TestBook.vue'

  export default {
    components: {
      DefaultLayout,
      TestBook
    }
  }
</script>
```
