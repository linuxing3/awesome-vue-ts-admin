const Logo = require('../assets/logo.svg');

const API = process.env.NODE_ENV === 'production' ? '' : '/api';

export const userPermission = {
  DEFAULT: ['1', '2', '3', '4', '5'],
  ADMIN: ['1', '2', '3', '4', '5', '6', '7', '8'],
  DEVELOPER: ['1', '2', '3'],
};

export const userPermissionMap = {
  1: 'dashboard',
  2: 'exception',
  3: 'result',
  4: 'profile',
  5: 'table',
  6: 'form',
  7: 'permission',
  8: 'role',
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

export const actionEntityArray = [
  {
    action: 'add',
    describe: '新增',
    defaultCheck: false,
  },
  {
    action: 'get',
    describe: '详情',
    defaultCheck: false,
  },
  {
    action: 'update',
    describe: '修改',
    defaultCheck: false,
  },
  {
    action: 'delete',
    describe: '删除',
    defaultCheck: false,
  },
];

export const actionEntitySetString = '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]';

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
