import { tableList, FilterFormList, operate } from '@/interface';
import { priority, privacy } from '@/utils/constant';

export const defaultItemList: FilterFormList[] = [
  {
    key: 'id',
    type: 'input',
    label: 'id',
  },
  {
    key: 'title',
    type: 'input',
    label: 'title',
    placeholder: 'Input title',
  },
  {
    key: 'private',
    type: 'select',
    label: 'private',
    placeholder: '因公',
    options: [...privacy],
  },
  {
    key: 'date',
    type: 'date',
    label: 'date',
    placeholder: 'Input date',
  },
  {
    key: 'startTime',
    type: 'input',
    label: 'startTime',
    placeholder: 'As 10:00',
  },
  {
    key: 'duration',
    type: 'input',
    label: 'duration',
    placeholder: 'As 30 m',
  },
  {
    key: 'applicant',
    type: 'input',
    label: 'applicant',
    placeholder: 'Input applicant',
  },
  {
    key: 'participants',
    type: 'input',
    label: 'participants',
    placeholder: 'Input participants',
  },
  {
    key: 'guests',
    type: 'input',
    label: 'guests',
    placeholder: 'Input guests',
  },
  {
    key: 'content',
    type: 'textarea',
    label: 'content',
    placeholder: 'Input content',
  },
  {
    key: 'currentDate',
    type: 'date',
    label: 'currentDate',
    placeholder: 'Input currentDate',
  },
  {
    key: 'reportDate',
    type: 'date',
    label: 'reportDate',
    placeholder: 'Input reportDate',
  },
  {
    key: 'reportContent',
    type: 'textarea',
    label: 'reportContent',
    placeholder: 'Input reportContent',
  },
  {
    key: 'instructionDate',
    type: 'date',
    label: 'instructionDate',
    placeholder: 'Input instructionDate',
  },
  {
    key: 'instruction',
    type: 'textarea',
    label: 'instruction',
    placeholder: 'Input instruction',
  },
  {
    key: 'priority',
    type: 'select',
    label: 'priority',
    placeholder: 'Input priority',
    options: [...priority],
  },
];

export const tableFieldsList: tableList[] = [
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Guests',
    dataIndex: 'guests',
  },
  {
    title: 'Participants',
    dataIndex: 'participants',
  },
];

export const filterFormItemList: FilterFormList[] = [
  {
    key: 'guests',
    label: 'Guests',
    type: 'input',
    placeholder: 'Seach Guests',
  },
  {
    key: 'participants',
    label: 'Participants',
    type: 'input',
    placeholder: 'Seach Participants',
  },
  {
    key: 'date',
    label: 'Date',
    type: 'date',
    placeholder: 'Seach Date',
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
