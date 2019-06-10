import { FilterFormList } from '@/interface';
import titleCase from 'title-case';

export const genAFormData = (field: string): FilterFormList => {
  // /.*$/.test(field)
  if (field.match(new RegExp(/(content|note|memo)/))) {
    return {
      key: field,
      type: 'textarea',
      label: titleCase(field),
      placeholder: `Input ${field}`,
    };
  }
  if (field.match(new RegExp(/(s|S)elect/))) {
    return {
      key: field,
      type: 'select',
      label: titleCase(field),
      placeholder: [field],
      options: [
        {
          value: field,
          label: titleCase(field),
        },
      ],
    };
  }
  if (field.match(new RegExp(/(d|D)a(y|te)/))) {
    return {
      key: field,
      type: 'date',
      label: titleCase(field),
      placeholder: '2019-01-01',
    };
  }
  if (field.match(new RegExp(/(t|T)ime/))) {
    return {
      key: field,
      type: 'datetime',
      label: titleCase(field),
      placeholder: '12:00',
    };
  }
  return {
    key: field,
    type: 'input',
    label: titleCase(field),
    placeholder: `Input ${field}`,
  };
};

export const AGenTableColumns = (fields: string[]): FilterFormList[] => fields.reduce((columnsConfig: FilterFormList[], field: string): FilterFormList[] => {
  const config: FilterFormList = {
    title: titleCase(field),
    dataIndex: field,
    width: '60px',
    sorter: true,
    ...genAFormData(field),
  };
  columnsConfig.push(config);
  return columnsConfig;
}, []);
