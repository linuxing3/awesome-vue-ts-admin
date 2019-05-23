const Logo = require('../assets/logo.svg');

const API = process.env.NODE_ENV === 'production' ? '' : '/api';

export const userPermission = {
  DEFAULT: ['1', '2', '3', '4', '5'],
  ADMIN: ['1', '2', '3', '4', '5', '6', '7', '8'],
  DEVELOPER: ['1', '2', '3'],
};

export const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  },
  {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  },
  {
    id: 2,
    username: 'daniel',
    password: '20090909',
    permissions: userPermission.DEVELOPER,
  },
];

export const noAuthList = ['/api/user/login'];

const config = {
  name: 'vue-ts-admin',
  footerText: 'vue-ts-admin  © 2018 xiaoyang',
  logo: Logo,
  icon: '/favicon.ico',
  API,
  openPages: ['/login', '/404', '/401'], // 全屏页面
  noLoginList: ['#/login'],
};

export default config;
