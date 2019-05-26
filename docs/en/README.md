---
home: true
heroImage: https://vuepress.vuejs.org/hero.png
actionText: Get Started →
actionLink: /zh/guide/markdown/
features:
  - title: Simplicity First
    details: Minimal setup with markdown-centered project structure helps you focus on writing.
  - title: Vue-Powered
    details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
  - title: Performant
    details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present Evan You
---

# Get Started

```bash
# install
yarn global add vuepress # OR npm install -g vuepress

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
vuepress dev

# build to static files
vuepress build
```

## Use from `vue-cli`

```bash
vue add vuepress
yarn docs:build
```
