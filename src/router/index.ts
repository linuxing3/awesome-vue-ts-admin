import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
import { routerItem } from '@/interface';

const getComponent = require(`./import_${process.env.NODE_ENV}`);

export const constantRouterMap: routerItem[] & RouterOptions['routes'] = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/statistic',
    name: 'Statistic',
    redirect: '/charts',
  },
  {
    path: '/helper',
    name: 'Helper',
    component: getComponent('helpers/index'),
    meta: { key: 'helper' },
    children: [
      {
        path: 'export-helper',
        name: 'ExportHelper',
        component: getComponent('helpers/components/ExportHelper'),
        meta: { key: 'ExportHelper' },
      },
    ],
  },
  {
    path: '/playground',
    name: '实验室',
    component: getComponent('playground/index'),
    meta: { key: 'Playground' },
    children: [
      {
        path: 'crudForm',
        name: 'Crud From',
        component: getComponent('playground/crudForm/index'),
        meta: { key: 'CrudForm' },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: getComponent('login/index'),
  },
  {
    path: '/modiflyPwd',
    name: 'modiflyPwd',
    component: getComponent('updatePwd/index.vue'),
  },
  {
    path: '/updateSelf',
    name: 'personCenter',
    component: getComponent('updateSelf/index.vue'),
  },
  {
    path: '*',
    name: '404',
    component: getComponent('error/404.vue'),
  },
  {
    path: '/401',
    name: '401',
    component: getComponent('error/401.vue'),
  },
];
/**
 * permission 有3种类型： Boolean Array String
 * Boolean值的情况，为true，有权限，为false，没有权限
 * Array值的情况，只要其中一个有，就有权限，
 * String值，会匹配vuex里面的perssions数组，如果有，就有权限
 * meta.key 这个是用来匹配缓存的，请确保key值和对应页面的class名称一致，否则页面无法正常缓存
 */
export const asyncRouterMap: routerItem[] = [
  {
    path: '/dashboard',
    icon: 'dashboard',
    name: 'Dashboard',
    component: getComponent('dashboard/index'),
    permission: true,
    meta: { key: 'Dashboard' },
  },
  // insert more route below
  // document
  {
    path: '/document',
    icon: 'folder',
    name: '文件',
    component: getComponent('Document/index'),
    permission: true,
    meta: { key: 'document' },
    children: [
      {
        path: 'document-form',
        name: 'DocumentForm',
        component: getComponent('Document/components/DocumentForm'),
        permission: true,
        meta: { key: 'DocumentForm' },
      },
      {
        path: 'document-table',
        name: 'DocumentTable',
        component: getComponent('Document/components/DocumentTable'),
        permission: true,
        meta: { key: 'DocumentTable' },
      },
    ],
  },
  // member
  {
    path: '/member',
    icon: 'team',
    name: '成员',
    component: getComponent('Member/index'),
    permission: true,
    meta: { key: 'member' },
    children: [
      {
        path: 'member-form',
        name: 'MemberForm',
        component: getComponent('Member/components/MemberForm'),
        permission: true,
        meta: { key: 'MemberForm' },
      },
      {
        path: 'member-table',
        name: 'MemberTable',
        component: getComponent('Member/components/MemberTable'),
        permission: true,
        meta: { key: 'MemberTable' },
      },
      {
        path: 'member-card-list',
        name: 'MemberCardList',
        component: getComponent('Member/components/MemberCardList'),
        permission: true,
        meta: { key: 'MemberCardList' },
      },
      {
        path: 'userDesignation-form',
        name: 'UserDesignationForm',
        component: getComponent('UserDesignation/components/UserDesignationForm'),
        permission: true,
        meta: { key: 'UserDesignationForm' },
      },
      {
        path: 'userDesignation-table',
        name: 'UserDesignationTable',
        component: getComponent('UserDesignation/components/UserDesignationTable'),
        permission: true,
        meta: { key: 'UserDesignationTable' },
      },
      {
        path: 'userPromotion-form',
        name: 'UserPromotionForm',
        component: getComponent('UserPromotion/components/UserPromotionForm'),
        permission: true,
        meta: { key: 'UserPromotionForm' },
      },
      {
        path: 'userPromotion-table',
        name: 'UserPromotionTable',
        component: getComponent('UserPromotion/components/UserPromotionTable'),
        permission: true,
        meta: { key: 'UserPromotionTable' },
      },
      {
        path: 'leave-form',
        name: 'LeaveForm',
        component: getComponent('Leave/components/LeaveForm'),
        permission: true,
        meta: { key: 'LeaveForm' },
      },
      {
        path: 'leave-table',
        name: 'LeaveTable',
        component: getComponent('Leave/components/LeaveTable'),
        permission: true,
        meta: { key: 'LeaveTable' },
      },
    ],
  },
  // employee
  {
    path: '/employee',
    icon: 'flag',
    name: '雇员',
    component: getComponent('Employee/index'),
    permission: true,
    meta: { key: 'employee' },
    children: [
      {
        path: 'employee-form',
        name: 'EmployeeForm',
        component: getComponent('Employee/components/EmployeeForm'),
        permission: true,
        meta: { key: 'EmployeeForm' },
      },
      {
        path: 'employee-table',
        name: 'EmployeeTable',
        component: getComponent('Employee/components/EmployeeTable'),
        permission: true,
        meta: { key: 'EmployeeTable' },
      },
    ],
  },
  // project
  {
    path: '/project',
    icon: 'ordered-list',
    name: '项目任务',
    component: getComponent('Project/index'),
    permission: true,
    meta: { key: 'project' },
    children: [
      {
        path: 'project-form',
        name: 'ProjectForm',
        component: getComponent('Project/components/ProjectForm'),
        permission: true,
        meta: { key: 'ProjectForm' },
      },
      {
        path: 'project-table',
        name: 'ProjectTable',
        component: getComponent('Project/components/ProjectTable'),
        permission: true,
        meta: { key: 'ProjectTable' },
      },
    ],
  },
  // userMilitant
  {
    path: '/userMilitant',
    icon: 'team',
    name: '党员',
    component: getComponent('UserMilitant/index'),
    permission: true,
    meta: { key: 'userMilitant' },
    children: [
      {
        path: 'userMilitant-form',
        name: 'UserMilitantForm',
        component: getComponent('UserMilitant/components/UserMilitantForm'),
        permission: true,
        meta: { key: 'UserMilitantForm' },
      },
      {
        path: 'userMilitant-table',
        name: 'UserMilitantTable',
        component: getComponent('UserMilitant/components/UserMilitantTable'),
        permission: true,
        meta: { key: 'UserMilitantTable' },
      },
    ],
  },
  // event
  {
    path: '/event',
    icon: 'calendar',
    name: '活动',
    component: getComponent('Event/index'),
    permission: true,
    meta: { key: 'event' },
    children: [
      {
        path: 'event-form',
        name: 'EventForm',
        component: getComponent('Event/components/EventForm'),
        permission: true,
        meta: { key: 'EventForm' },
      },
      {
        path: 'event-table',
        name: 'EventTable',
        component: getComponent('Event/components/EventTable'),
        permission: true,
        meta: { key: 'EventTable' },
      },
    ],
  },
  {
    path: '/charts',
    icon: 'line-chart',
    name: '图表展示',
    component: getComponent('chart/index'),
    permission: true,
    meta: { key: 'Charts' },
    children: [
      {
        path: 'apexCharts',
        name: 'ApexCharts',
        component: getComponent('chart/apexCharts/index'),
        permission: true,
        meta: { key: 'ApexCharts' },
        children: [
          // Insert more charts here
          {
            path: 'line',
            name: 'Line',
            component: getComponent('chart/apexCharts/line/index'),
            permission: true,
            meta: { key: 'Line' },
          },
          {
            path: 'area',
            name: 'Area',
            component: getComponent('chart/apexCharts/area/index'),
            permission: true,
            meta: { key: 'Area' },
          },
          {
            path: 'column',
            name: 'Column',
            component: getComponent('chart/apexCharts/column/index'),
            permission: true,
            meta: { key: 'Column' },
          },
          {
            path: 'bar',
            name: 'Bar',
            component: getComponent('chart/apexCharts/bar/index'),
            permission: true,
            meta: { key: 'Bar' },
          },
          {
            path: 'mixed',
            name: 'Mixed',
            component: getComponent('chart/apexCharts/mixed/index'),
            permission: true,
            meta: { key: 'Mixed' },
          },
        ],
      },
    ],
  },
  {
    path: '/profile',
    icon: 'setting',
    name: '用户设置',
    component: getComponent('components/index'),
    permission: true,
    meta: { key: 'Profile' },
    children: [
      {
        path: 'baseForm',
        name: 'ProfileBaseForm',
        component: getComponent('components/form/baseForm/index'),
        permission: true,
        meta: { key: 'ProfileBaseForm' },
      },
      {
        path: 'personalCenter',
        name: 'PersonalCenter',
        component: getComponent('components/form/personalCenter/index'),
        permission: true,
        meta: { key: 'PersonalCenter' },
      },
    ],
  },
  {
    path: '/map',
    icon: 'environment',
    name: '地图',
    component: getComponent('map/index'),
    permission: true,
    meta: { key: 'Map' },
    children: [
      {
        path: 'trajectory',
        name: 'Trajectory',
        component: getComponent('map/trajectory/index'),
        permission: true,
        meta: { key: 'Trajectory' },
      },
    ],
  },
];

Vue.use(Router);

export default new Router({
  routes: constantRouterMap,
});
