import { tableList, FilterFormList, operate } from '@/interface';
import {
  department, etnia, gender, academicBackground, militantRole, politicalRole,
} from '@/utils/constant';

export const defaultItemList: FilterFormList[] = [
  {
    key: 'id',
    type: 'input',
    label: 'id',
    placeholder: 'Leave it untouched!',
  },
  {
    key: 'department',
    type: 'select',
    label: 'department',
    placeholder: 'Input department',
    options: [...department],
  },
  {
    key: 'name',
    type: 'input',
    label: 'name',
    placeholder: 'Input name',
  },
  {
    key: 'gender',
    type: 'select',
    label: 'gender',
    placeholder: 'Input gender',
    options: [...gender],
  },
  {
    key: 'birthday',
    type: 'date',
    label: 'birthday',
    placeholder: 'Input birthday',
  },
  {
    key: 'etnia',
    type: 'select',
    label: 'etnia',
    placeholder: 'Input etnia',
    options: [...etnia],
  },
  {
    key: 'academicBackground',
    type: 'select',
    label: 'academicBackground',
    placeholder: 'Input academicBackground',
    options: [...academicBackground],
  },
  {
    key: 'foreignLanguage',
    type: 'input',
    label: 'foreignLanguage',
    placeholder: 'Input foreignLanguage',
  },
  {
    key: 'politicalRole',
    type: 'select',
    label: 'politicalRole',
    placeholder: 'Input politicalRole',
    options: [...politicalRole],
  },
  {
    key: 'positionAndRank',
    type: 'input',
    label: 'positionAndRank',
    placeholder: 'Input positionAndRank',
  },
  {
    key: 'militantRole',
    type: 'input',
    label: 'militantRole',
    placeholder: 'Input militantRole',
    options: [...militantRole],
  },
  {
    key: 'duty',
    type: 'input',
    label: 'duty',
    placeholder: 'Input duty',
  },
  {
    key: 'fromEntity',
    type: 'input',
    label: 'fromEntity',
    placeholder: 'Input fromEntity',
  },
  {
    key: 'arrivingDate',
    type: 'date',
    label: 'arrivingDate',
    placeholder: 'Input arrivingDate',
  },
  {
    key: 'rotatingDate',
    type: 'date',
    label: 'rotatingDate',
    placeholder: 'Input rotatingDate',
  },
  {
    key: 'sendingEntity',
    type: 'input',
    label: 'sendingEntity',
    placeholder: 'Input sendingEntity',
  },
  {
    key: 'conyugeName',
    type: 'input',
    label: 'conyugeName',
    placeholder: 'Input conyugeName',
  },
  {
    key: 'conyugeEntity',
    type: 'input',
    label: 'conyugeEntity',
    placeholder: 'Input conyugeEntity',
  },
  {
    key: 'conyugeBonus',
    type: 'input',
    label: 'conyugeBonus',
    placeholder: 'Input conyugeBonus',
  },
  {
    key: 'note',
    type: 'textarea',
    label: 'note',
    placeholder: 'Input note',
  },
  {
    key: 'protocolId',
    type: 'input',
    label: 'protocolId',
    placeholder: 'Input protocolId',
  },
  {
    key: 'isActive',
    type: 'checkboxButton',
    label: 'isActive',
    placeholder: 'Input isActive',
    options: [
      {
        label: '在馆',
        value: '在馆',
      },
      {
        label: '离馆',
        value: '离馆',
      },
    ],
  },
  {
    key: 'militant',
    type: 'input',
    label: 'string',
    placeholder: 'Input militant',
  },
];

export const tableFieldsList: tableList[] = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Department',
    dataIndex: 'department',
  },
  {
    title: 'From Entity',
    dataIndex: 'fromEntity',
  },
  {
    title: 'Arriving Date',
    dataIndex: 'arrivingDate',
  },
];

export const filterFormItemList: FilterFormList[] = [
  {
    key: 'name',
    label: 'name',
    type: 'input',
    placeholder: 'Seach Name',
  },
  {
    key: 'gender',
    label: 'gender',
    type: 'checkboxButton',
    placeholder: 'male',
    options: [...gender],
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
