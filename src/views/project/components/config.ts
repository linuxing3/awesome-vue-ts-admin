import { tableList, FilterFormList, operate } from '@/interface';

/* -------------------------------------------------------------
| Item list for forms in m-form
|-------------------------------------------------------------*/
export const defaultItemList: FilterFormList[] = [
  {
    key: 'id',
    type: 'input',
    label: 'id',
    placeholder: 'Leave it untouched!',
  },
  {
    key: 'title', type: 'input', label: 'title', placeholder: 'title',
  },
  {
    key: 'type',
    type: 'select',
    label: 'type',
    placeholder: 'type',
    options: [
      {
        label: '人事',
        value: '人事',
      },
      {
        label: '党务',
        value: '党务',
      },
      {
        label: '财务',
        value: '财务',
      },
      {
        label: '后勤',
        value: '后勤',
      },
      {
        label: '对外',
        value: '对外',
      },
    ],
  },
  {
    key: 'status', type: 'input', label: 'status', placeholder: 'status',
  },
  {
    key: 'isActive',
    type: 'select',
    label: 'isActive',
    placeholder: 'isActive',
    options: [
      {
        label: '在办',
        value: '在办,',
      },
      {
        label: '结束',
        value: '结束,',
      },
    ],
  },
  {
    key: 'percentComplete', type: 'input', label: 'percentComplete', placeholder: 'percentComplete',
  },
  {
    key: 'expectedStartDate', type: 'input', label: 'expectedStartDate', placeholder: 'expectedStartDate',
  },
  {
    key: 'expectedEndDate', type: 'input', label: 'expectedEndDate', placeholder: 'expectedEndDate',
  },
  {
    key: 'priority', type: 'input', label: 'priority', placeholder: 'priority',
  },
  {
    key: 'department', type: 'input', label: 'department', placeholder: 'department',
  },
  {
    key: 'tasks', type: 'input', label: 'tasks', placeholder: 'tasks',
  },
  {
    key: 'notes', type: 'input', label: 'notes', placeholder: 'notes',
  },
  {
    key: 'actualStartDate', type: 'date', label: 'actualStartDate', placeholder: 'actualStartDate',
  },
  {
    key: 'actualEndDate', type: 'date', label: 'actualEndDate', placeholder: 'actualEndDate',
  },
  {
    key: 'estimatedCost', type: 'input', label: 'estimatedCost', placeholder: 'estimatedCost',
  },
  {
    key: 'totalCost', type: 'input', label: 'totalCost', placeholder: 'totalCost',
  },
  {
    key: 'ExpenseClaim', type: 'input', label: 'ExpenseClaim', placeholder: 'ExpenseClaim',
  },
  {
    key: 'collectProgress', type: 'input', label: 'collectProgress', placeholder: 'collectProgress',
  },
  {
    key: 'frequency',
    type: 'select',
    label: 'frequency',
    placeholder: 'frequency',
    options: [
      {
        label: '每天',
        value: '每天',
      },
      {
        label: '每周',
        value: '每周',
      },
      {
        label: '每月',
        value: '每月',
      },
      {
        label: '季度',
        value: '季度',
      },
      {
        label: '每年',
        value: '每年',
      },
    ],
  },
  {
    key: 'fromTime', type: 'input', label: 'fromTime', placeholder: 'hh:mm',
  },
  {
    key: 'toTime', type: 'input', label: 'toTime', placeholder: 'hh:mm',
  },
];

/* -------------------------------------------------------------
| Field list for tables in filter-table
|-------------------------------------------------------------*/
export const tableFieldsList: tableList[] = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
  },
  {
    title: 'Expected StartDate',
    dataIndex: 'expectedStartDate',
  },
  {
    title: 'Expected EndDate',
    dataIndex: 'expectedEndDate',
  },
];

/* -------------------------------------------------------------
| Item list for filter forms in filter-table
|-------------------------------------------------------------*/
export const filterFormItemList: FilterFormList[] = [
  {
    key: 'id',
    type: 'input',
    label: 'id',
    placeholder: 'Leave it untouched!',
  },
  {
    key: 'title', type: 'input', label: 'title', placeholder: 'title',
  },
  {
    key: 'expectedStartDate', type: 'input', label: 'expectedStartDate', placeholder: 'expectedStartDate',
  },
  {
    key: 'expectedEndDate', type: 'input', label: 'expectedEndDate', placeholder: 'expectedEndDate',
  },
  {
    key: 'priority', type: 'input', label: 'priority', placeholder: 'priority',
  },
  {
    key: 'department', type: 'input', label: 'department', placeholder: 'department',
  },
];

/* -------------------------------------------------------------
| Backend params to find path of http response
|-------------------------------------------------------------*/
export const BackParams: any = {
  code: 'data.result.resultCode',
  codeOK: 0,
  message: 'data.result.resultMessage',
  data: 'data.entity',
  columns: 'config.params.columns',
  total: 'config.params.pageParams.total',
};

/* -------------------------------------------------------------
| Buttons for operations in filter-table
|-------------------------------------------------------------*/
export const operateBtn: operate[] = [
  {
    key: 'edit',
    rowKey: 'id',
    color: 'blue',
    text: '编辑',
    roles: true,
  },
  {
    key: 'delete',
    rowKey: 'id',
    color: 'red',
    text: '删除',
    roles: true,
    msg: '确定删除？',
  },
  {
    key: 'export',
    rowKey: 'id',
    color: 'orange',
    text: '导出',
    roles: true,
    msg: '确定导出？',
  },
];
