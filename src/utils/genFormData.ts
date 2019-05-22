const formDataSchema = {
  content: 'v-textarea',
  text: 'v-textarea',
  select: 'v-select',
  date: 'v-date-picker',
  '*': 'v-text-field',
};

export interface ATableColumnConfig {
  dataIndex: string;
  title: string;
  width?: string;
  sorter?: boolean;
  scopedSlots?: any;
}

export interface VTableHeaderConfig {
  value: string;
  text: string;
  align?: string;
  sortable?: boolean;
  type?: string;
  attrs?: any;
}

export interface FormDataConfig {
  type?: string;
  attrs?: any;
}

export const genFormData = (field: string): FormDataConfig => {
  // /.*$/.test(field)
  if (field.match(new RegExp(/(c|C)ontent/))) {
    return { type: 'v-textarea', attrs: { class: 'pa-1 ma-1' } };
  }
  if (field.match(new RegExp(/(s|S)elect/))) {
    return { type: 'v-select', attrs: { class: 'pa-1 ma-1' } };
  }
  if (field.match(new RegExp(/(d|D)ate/))) {
    return { type: 'v-date-picker', attrs: { class: 'pa-1 ma-1' } };
  }
  return { type: 'v-text-field', attrs: { class: 'pa-1 ma-1' } };
};

export const VGenTableHeaders = (fields: string[]): VTableHeaderConfig[] => fields.reduce((headersConfig: VTableHeaderConfig[], field: string): VTableHeaderConfig[] => {
  const config: VTableHeaderConfig = {
    value: field,
    text: field,
    align: 'left',
    sortable: true,
    ...genFormData(field),
  };
  headersConfig.push(config);
  return headersConfig;
}, []);

export const AGenTableColumns = (fields: string[]): ATableColumnConfig[] => fields.reduce((columnsConfig: ATableColumnConfig[], field: string): ATableColumnConfig[] => {
  const config: ATableColumnConfig = {
    title: field,
    dataIndex: field,
    width: '60px',
    sorter: true,
  };
  columnsConfig.push(config);
  return columnsConfig;
}, []);
