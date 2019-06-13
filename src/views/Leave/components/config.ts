import { tableList, FilterFormList, operate } from '@/interface';
// import LeaveType from '@/models/ERPModel/hr/leave_type/leave_type.json';

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
    key: 'applicant', type: 'input', label: 'applicant', placeholder: 'applicant',
  },
  {
    key: 'fromDate', type: 'date', label: 'fromDate', placeholder: 'fromDate',
  },
  {
    key: 'toDate', type: 'date', label: 'toDate', placeholder: 'toDate',
  },
  {
    key: 'isActive', type: 'select', label: 'isActive', placeholder: 'isActive',
  },
  {
    key: 'holidayList', type: 'input', label: 'holidayList', placeholder: 'holidayList',
  },
];

/* -------------------------------------------------------------
| Field list for tables in filter-table
|-------------------------------------------------------------*/
export const tableFieldsList: tableList[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  { title: 'Applicant', dataIndex: 'applicant' },
  { title: 'From Date', dataIndex: 'fromDate' },
  { title: 'To Date', dataIndex: 'toDate' },
  { title: 'Is Active', dataIndex: 'isActive' },
  { title: 'Holiday List', dataIndex: 'holidayList' },
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
    key: 'applicant', type: 'input', label: 'applicant', placeholder: 'applicant',
  },
  {
    key: 'fromDate', type: 'date', label: 'fromDate', placeholder: 'fromDate',
  },
  {
    key: 'toDate', type: 'date', label: 'toDate', placeholder: 'toDate',
  },
  {
    key: 'isActive', type: 'select', label: 'isActive', placeholder: 'isActive',
  },
  {
    key: 'holidayList', type: 'input', label: 'holidayList', placeholder: 'holidayList',
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
