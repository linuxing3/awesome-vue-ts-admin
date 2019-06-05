---
to: 'src/views/<%= h.changeCase.pascal(model) %>/components/config.ts'
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelListName = ModelName + 'List'
const modelFormName = ModelName + 'Form'
%>import { tableList, FilterFormList, operate } from '@/interface';

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
];

/* -------------------------------------------------------------
| Field list for tables in filter-table
|-------------------------------------------------------------*/
export const tableFieldsList: tableList[] = [
  {
    title: 'Name',
    dataIndex: 'name',
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
]

/* -------------------------------------------------------------
| Backend params to find path of http response
|-------------------------------------------------------------*/
export const BackParams: any = {
  code: 'data.result.resultCode',
  codeOK: 0,
  message: 'data.result.resultMessage',
  data: 'data.entity',
  columns: 'config.params.columns',
  total: 'config.params.pageParams.total'
}

/* -------------------------------------------------------------
| Buttons for operations in filter-table
|-------------------------------------------------------------*/
export const operateBtn: operate[] = [
  {
    key: 'edit',
    rowKey: 'id',
    color: 'blue',
    text: '编辑',
    roles: true
  },
  {
    key: 'delete',
    rowKey: 'id',
    color: 'red',
    text: '删除',
    roles: true,
    msg: '确定删除？'
  },
  {
    key: 'export',
    rowKey: 'id',
    color: 'orange',
    text: '导出',
    roles: true,
    msg: '确定导出？'
  }
]