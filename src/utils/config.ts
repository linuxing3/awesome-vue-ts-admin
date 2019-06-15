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
    password: '20090909',
    permissions: userPermission.ADMIN,
  },
  {
    id: 1,
    username: 'guest',
    password: 'guestantd',
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
  name: 'GENERAL ADMIN',
  footerText: 'General Admin System  © 2019 linuxing3',
  logo: Logo,
  icon: '/favicon.ico',
  API,
  openPages: ['/login', '/404', '/401'], // 全屏页面
  noLoginList: ['#/login'],
};

export default config;
