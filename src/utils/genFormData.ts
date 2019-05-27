import { FilterFormList } from '@/interface';

export interface ATableColumnConfig {
  dataIndex: string;
  title: string;
  width?: string;
  sorter?: boolean;
  scopedSlots?: any;
}

export const genAFormData = (field: string): FilterFormList => {
  // /.*$/.test(field)
  if (field.match(new RegExp(/(c|C|n|N)o(te|ntent)/))) {
    return {
      key: field,
      type: 'textarea',
      label: field,
      placeholder: `Input ${field}`
    };
  }
  if (field.match(new RegExp(/(s|S)elect/))) {
    return {
      key: field,
      type: 'select',
      label: field,
      placeholder: [field],
      options: [
        {
          value: field,
          label: field
        }
      ]
    };
  }
  if (field.match(new RegExp(/(d|D)a(y|te)/))) {
    return {
      key: field,
      type: 'date',
      label: field,
      placeholder: `2019-01-01`
    };
  }
  if (field.match(new RegExp(/(t|T)ime/))) {
    return {
      key: field,
      type: 'datetime',
      label: field,
      placeholder: `12:00:00`
    };
  }
  return {
    key: field,
    type: 'input',
    label: field,
    placeholder: `Input ${field}`
  };
};


export const AGenTableColumns = (fields: string[]): ATableColumnConfig[] => fields.reduce((columnsConfig: ATableColumnConfig[], field: string): ATableColumnConfig[] => {
  const config: ATableColumnConfig = {
    title: field,
    dataIndex: field,
    width: '60px',
    sorter: true,
    ...genAFormData(field),
  };
  columnsConfig.push(config);
  return columnsConfig;
}, []);
