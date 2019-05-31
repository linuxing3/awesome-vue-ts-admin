import { tableList, FilterFormList, operate } from '@/interface';
import { etnia, gender } from '@/utils/constant';

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
    key: 'date',
    type: 'input',
    label: 'date',
    placeholder: 'Input date',
  },
  {
    key: 'startTime',
    type: 'input',
    label: 'startTime',
    placeholder: 'Input startTime',
  },
  {
    key: 'duration',
    type: 'input',
    label: 'duration',
    placeholder: 'Input duration',
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
    type: 'input',
    label: 'currentDate',
    placeholder: 'Input currentDate',
  },
  {
    key: 'reportDate',
    type: 'input',
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
    type: 'input',
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
    type: 'input',
    label: 'priority',
    placeholder: 'Input priority',
  },
  {
    key: 'userId',
    type: 'input',
    label: 'userId',
    placeholder: 'Input userId',
  },
  {
    key: 'projectId',
    type: 'input',
    label: 'projectId',
    placeholder: 'Input projectId',
  },
];

export const tableFieldsList: tableList[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
];

export const filterFormItemList: FilterFormList[] = [
  {
    key: 'name',
    label: 'name',
    type: 'input',
    placeholder: 'Seach Name',
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
