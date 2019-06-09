# Routing and views

- [Routing and views](#routing-and-views)
  - [Overview](#overview)
  - [Views](#views)

## Overview

This project uses [Vue Router](tech.md#vue-router), which we initialize in
`src/router/index.ts`.

## Views

Each view component will be used by at least one route in `src/views`, to provide a template for the page. 

They can technically include some additional properties from Vue Router [to control navigation](https://router.vuejs.org/guide/advanced/navigation-guards.html), for example to [fetch data](https://router.vuejs.org/guide/advanced/data-fetching.html#fetching-before-navigation) before creating the component.
