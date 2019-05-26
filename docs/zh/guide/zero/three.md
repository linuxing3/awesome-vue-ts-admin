# Routing and views

- [Overview](#overview)
- [Views](#views)

## Overview

This project uses [Vue Router](tech.md#vue-router), which we initialize in
`src/router/index.ts`, with routes defined in `src/router/path.awesome.ts`.

Inside the `src/router` folder, there are also sub-folders and separate files,
both containing specific route link to components.

## Views

Each view component will be used by at least one route in `src/pages`, to provide a template for the page. They can technically include some additional properties from Vue Router [to control navigation](https://router.vuejs.org/guide/advanced/navigation-guards.html), for example to [fetch data](https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-before-navigation) before creating the component, but I recommend adding these guards to `src/router/routes.js` instead, as that behavior typically has much more to do with the route (and will sometimes be shared between routes) than it does the view component.

