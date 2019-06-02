---
to: 'src/views/<%= h.changeCase.pascal(model) %>/components/config.ts'
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
const modelListName = ModelName + 'List'
const modelFormName = ModelName + 'Form'
%>import { tableList, FilterFormList, operate } from '@/interface';
import { etnia, gender } from '@/utils/constant';
import titleCase from 'title-case';
import models, { Model } from '@/models';

const Entity: Model = models['<%= EntityName %>'];
const fields: string[] = Entity.fieldsKeys();

export const defaultItemList: FilterFormList[] = fields.reduce((list, field) => {
  list.push({
    key: field,
    type: 'input'
    label: changeCase(field),
    placeholder: 'Input ' + changeCase(field)
  })
  return list;
}, []);

export const tableFieldsList: tableList[] = fields.reduce((list, field) => {
  list.push({
    title: changeCase(field),
    dataIndex: field,
  })
  return list;
}, []);

export const filterFormItemList: FilterFormList[] = fields.reduce((list, field) => {
  list.push({
    key: field,
    type: 'input'
    label: changeCase(field),
    placeholder: 'Search' + changeCase(field)
  })
  return list;
}, []);

export const BackParams: any = {
  code: 'data.result.resultCode',
  codeOK: 0,
  message: 'data.result.resultMessage',
  data: 'data.entity',
  columns: 'config.params.columns',
  total: 'config.params.pageParams.total'
}

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