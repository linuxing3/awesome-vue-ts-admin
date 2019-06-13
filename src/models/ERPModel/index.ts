
import {
  tail, first, last, nth, pick,
} from 'lodash';
import { pathExistsSync, mkdirpSync, writeFileSync } from 'fs-extra';
import { resolve } from 'path';
import { camelCase, titleCase, camel } from 'change-case';
import { BaseModel } from '../BaseModel';

const data = {
  fields: [
    {
      fieldname: 'bank_name',
      fieldtype: 'Data',
      label: 'Bank Name',
    },
    {
      fieldname: 'bank_name',
      fieldtype: 'Link',
      label: 'Bank Name',
    },
    {
      fieldname: 'bank_name',
      fieldtype: 'Select',
      label: 'Bank Name',
      options: '\nA\nB',
    },
  ],
};

const ERPModels: RequireContext = require.context('.', true, /\.json$/);

function mapFieldKeys(fieldConfig: any): any[] {
  const field: any[] = fieldConfig.fields;
  return field.reduce((result, config) => {
    let newConfig = {};
    let options = [];
    const key = camelCase(config.label);
    const label = titleCase(config.label);
    const placerholder = `Input ${titleCase(config.label)}`;
    let type = 'input';
    if (config.options) {
      options = tail(config.options.split('\n').concat()).map(v => ({
        label: v,
        value: v,
      }));
      type = 'select';
    }
    switch (config.fieldType) {
      case 'Data':
        type = 'input';
        break;
      case 'Int':
        type = 'input';
        break;
      case 'Date':
        type = 'date';
        break;
      case 'Select':
        type = 'select';
        break;
      default:
        break;
    }
    newConfig = {
      key,
      label,
      type,
      placerholder,
      options,
    };
    result.push(newConfig);
    return result;
  }, []);
}

/**
 * 将ERPModels的fields内容重新组合，只取必要字段
 */
export function genModelConfigJson() {
  const rootDir = resolve('E:\\workspace\\awesome-vue-ts-admin\\src\\models\\ERPModel');
  if (!pathExistsSync(rootDir)) mkdirpSync(rootDir);
  console.log('Root Dir is: ', rootDir);

  ERPModels.keys().forEach((fileName: string) => {
    const fileNameMeta = tail(fileName.split('/'));
    const sectionMeta = {
      section: first(fileNameMeta),
      modelName: nth(fileNameMeta, -2),
      fileName: last(fileNameMeta),
      fullPath: fileName,
    };
    // const newFieldConfig = pickFields(ERPModels(fileName)['fields'])
    const f = ERPModels(fileName);
    const newFieldConfig = mapFieldKeys(f);

    const newFolderName = resolve(rootDir, sectionMeta.section, sectionMeta.modelName);
    const newFileName = resolve(newFolderName, sectionMeta.fileName);

    if (!pathExistsSync(newFolderName)) mkdirpSync(newFolderName);

    writeFileSync(newFileName, JSON.stringify({ fields: newFieldConfig }, null, 2));
    console.log(`${fileName} created`);
  });
}

/**
 * Auto create all models
 */
const models: {
  [key: string]: typeof BaseModel
} = {};

ERPModels.keys().forEach((fileName: string) => {
  const fileNameMeta = last(tail(fileName.split('/'))) as string;
  const modelName = camel(fileNameMeta);
  const initFields: any[] = ERPModels(fileName).fields;

  class DynamicEntity extends BaseModel {
    static entity = modelName

    static fields() {
      const fields = {
        id: BaseModel.increment(),
      };
      initFields.forEach((field) => {
        fields[field.label] = BaseModel.attr('');
      });
      console.log(`${modelName} Model has fields: `, fields);
      return fields;
    }
  }

  models[modelName] = DynamicEntity;
});

export default models;
