// 获取模型
import { Model } from '@vuex-orm/core';
import { BaseModel } from '@/models/BaseModel';
import { lowerFirst, tail, last } from 'lodash';

// entity interface
export interface Models {
  [name: string]: typeof BaseModel | typeof Model;
}

const requiredModels: RequireContext = require.context(
  '../store/modules/pages',
  true,
  /.*\/models\/.*\.ts$/,
);
const models: Models = {};

requiredModels.keys().forEach((fileName: string) => {
  const fileNameMeta = last(tail(fileName.split('/'))) as string;
  const modelName = lowerFirst(fileNameMeta.replace(/(\.\/|\.ts)/g, ''));
  models[modelName] = requiredModels(fileName).default;
});

console.log(models);

export default models;
