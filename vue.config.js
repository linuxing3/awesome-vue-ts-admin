const Mock = require('./src/mock/index');

const i18n = {
  locale: 'cn',
  fallbackLocale: 'en',
  localeDir: 'locales',
  enableInSFC: true,
};

const pages = {
  index: {
    entry: 'src/main.ts',
    template: 'public/index.html',
    filename: 'index.html',
    // title: 'Index Page',
    chunks: ['chunk-vendors', 'chunk-common', 'index'],
  },
  playpage: {
    entry: 'src/playpage/main.ts',
    template: 'public/playpage.html',
    filename: 'playpage.html',
    title: 'Play Page',
    chunks: ['chunk-vendors', 'chunk-common', 'playpage'],
  },
};

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
  pages: {
    index: pages.index,
    // playpage: pages.playpage,
  },
  chainWebpack: (config) => {
    'use strict';

    config.module
      .rule('tsx')
      .test(/\.tsx$/)
      .use('vue-jsx-hot-loader')
      .before('babel-loader')
      .loader('vue-jsx-hot-loader');
    // html plugins
    // config.plugin('html').tap((args) => {
    //   args[0].chunksSortMode = 'auto';
    //   return args;
    // });
    // multipage
    // config.plugin('html').use(HtmlWebpackPlugin, {
    //   template: path.resolve(__dirname, 'public/playpage.html'),
    //   filename: 'playpage.html',
    // });
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#0390FF',
          'border-radius-base': '3px',
          'border-radius-sm': '2px',
          'shadow-color': 'rgba(0,0,0,0.05)',
          'shadow-1-down': '4px 4px 40px @shadow-color',
          'border-color-split': '#f4f4f4',
          'border-color-base': '#e5e5e5',
          'font-size-base': '13px',
          'text-color': '#666',
        },
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api/', // 开发环境地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
      '/graphql': {
        target: 'http://localhost:4000/graphql/', // 开发环境地址
        changeOrigin: true,
        pathRewrite: {
          '^/graphql': '',
        },
      },
    },
    setup(app) {
      Mock(app);
    },
  },
  pluginOptions: {
    i18n,
  },
};
