import { tableList, FilterFormList, operate } from '@/interface';
import titleCase from 'title-case';
import {
  department, etnia, gender, academicBackground, administravieRank, diplomaticRank,
} from '@/utils/constant';
import models from '@/models';

const Entity: any = models.userMilitant;
const fields: string[] = Entity.fieldsKeys();

export const defaultItemList: FilterFormList[] = [
  {
    key: 'id', type: 'input', label: 'id', placeholder: 'Leave it untouched!',
  },
  {
    key: 'name', type: 'input', label: 'name', placeholder: 'Input name',
  },
  {
    key: 'gender', type: 'input', label: 'gender', placeholder: 'Input gender', options: [...gender],
  },
  {
    key: 'etnia', type: 'input', label: 'etnia', placeholder: 'Input etnia', options: [...etnia],
  },
  {
    key: 'idNumber',
    type: 'input',
    label: 'idNumber',
    placeholder: 'Input idNumber',
  },
  {
    key: 'birthday',
    type: 'date',
    label: 'birthday',
    placeholder: 'Input birthday',
  },
  {
    key: 'academicBackground',
    type: 'select',
    label: 'academicBackground',
    placeholder: 'Input academicBackground',
    options: [...academicBackground],
  },
  {
    key: 'hrCategory',
    type: 'input',
    label: 'hrCategory',
    placeholder: 'Input hrCategory',
    options: [...administravieRank],
  },
  {
    key: 'department',
    type: 'select',
    label: 'department',
    placeholder: 'Input department',
    options: [...department],
  },
  {
    key: 'workPosition',
    type: 'input',
    label: 'workPosition',
    placeholder: 'Input workPosition',
  },
  {
    key: 'positionAndRank',
    type: 'select',
    label: 'positionAndRank',
    placeholder: 'Input positionAndRank',
    options: [...diplomaticRank],
  },
  {
    key: 'militantComission',
    type: 'input',
    label: 'militantComission',
    placeholder: 'Input militantComission',
  },
  {
    key: 'militantRole',
    type: 'input',
    label: 'militantRole',
    placeholder: 'Input militantRole',
  },
  {
    key: 'militantAdmissionDate',
    type: 'date',
    label: 'militantAdmissionDate',
    placeholder: 'Input militantAdmissionDate',
  },
  {
    key: 'militantFormalizationDate',
    type: 'date',
    label: 'militantFormalizationDate',
    placeholder: 'Input militantFormalizationDate',
  },
  {
    key: 'militanceStatus',
    type: 'input',
    label: 'militanceStatus',
    placeholder: 'Input militanceStatus',
  },
  {
    key: 'telephone',
    type: 'input',
    label: 'telephone',
    placeholder: 'Input telephone',
  },
  {
    key: 'homeAddress',
    type: 'input',
    label: 'homeAddress',
    placeholder: 'Input homeAddress',
  },
  {
    key: 'looseContact',
    type: 'input',
    label: 'looseContact',
    placeholder: 'Input looseContact',
  },
  {
    key: 'floating',
    type: 'input',
    label: 'floating',
    placeholder: 'Input floating',
  },
  {
    key: 'registerDate',
    type: 'date',
    label: 'registerDate',
    placeholder: 'Input registerDate',
  },
  {
    key: 'transferDate',
    type: 'date',
    label: 'transferDate',
    placeholder: 'Input transferDate',
  },
];
export const tableFieldsList: tableList[] = fields.reduce((list, field) => {
  list.push({
    title: titleCase(field),
    dataIndex: field,
  });
  return list;
}, []);

export const filterFormItemList: FilterFormList[] = fields.reduce((list, field) => {
  list.push({
    key: field,
    type: 'input',
    label: titleCase(field),
    placeholder: `Search${titleCase(field)}`,
  });
  return list;
}, []);

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
