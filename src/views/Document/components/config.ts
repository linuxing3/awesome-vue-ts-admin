import { tableList, FilterFormList, operate } from '@/interface';
import {
  classLevel, inOrOut, area,
} from '@/utils/constant';

export const defaultItemList: FilterFormList[] = [
  {
    key: 'id',
    type: 'input',
    label: 'id',
  },
  {
    key: 'year',
    type: 'input',
    label: 'year',
    placeholder: 'Input year',
  },
  {
    key: 'date',
    type: 'date',
    label: 'date',
    placeholder: 'Input date',
  },
  {
    key: 'classiLevel',
    type: 'select',
    label: 'classiLevel',
    options: [...classLevel],
  },
  {
    key: 'category',
    type: 'input',
    label: 'category',
    placeholder: 'Input category',
  },
  {
    key: 'inOrOut',
    type: 'select',
    label: 'inOrOut',
    placeholder: 'Input inOrOut',
    options: [...inOrOut],
  },
  {
    key: 'sendingCode',
    type: 'input',
    label: 'sendingCode',
    placeholder: 'Input sendingCode',
  },
  {
    key: 'orderedNumber',
    type: 'input',
    label: 'orderedNumber',
    placeholder: 'Input orderedNumber',
  },
  {
    key: 'title',
    type: 'input',
    label: 'title',
    placeholder: 'Input title',
  },
  {
    key: 'content',
    type: 'textarea',
    label: 'content',
    placeholder: 'Input content',
  },
  {
    key: 'toEntity',
    type: 'input',
    label: 'toEntity',
    placeholder: 'Input toEntity',
  },
  {
    key: 'copyEntity',
    type: 'input',
    label: 'copyEntity',
    placeholder: 'Input copyEntity',
  },
  {
    key: 'attachment',
    type: 'input',
    label: 'attachment',
    placeholder: 'Input attachment',
  },
  {
    key: 'keyword',
    type: 'select',
    label: 'keyword',
    placeholder: 'Input keyword',
    options: [...area],
  },
  {
    key: 'workEntity',
    type: 'input',
    label: 'workEntity',
    placeholder: 'Input workEntity',
  },
  {
    key: 'author',
    type: 'input',
    label: 'author',
    placeholder: 'Input author',
  },
];

export const tableFieldsList: tableList[] = [
  {
    title: 'Year',
    dataIndex: 'year',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'To Entity',
    dataIndex: 'toEntity',
  },
];

export const filterFormItemList: FilterFormList[] = [
  {
    key: 'title',
    type: 'input',
    label: 'title',
    placeholder: 'Search title',
  },
  {
    key: 'content',
    type: 'input',
    label: 'content',
    placeholder: 'Search content',
  },
  {
    key: 'toEntity',
    type: 'input',
    label: 'To Entity',
  },
  {
    key: 'keyword',
    type: 'select',
    label: 'Keyword',
    options: [...area],
  },
];

export const BackParams: any = {
  code: 'data.result.resultCode',
  codeOK: 0,
  message: 'data.result.resultMessage',
  data: 'data.entity',
  columns: 'config.params.columns',
  total: 'config.params.pageParams.total',
};

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
