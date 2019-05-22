import * as Vuex from 'vuex';
import { lowerFirst, tail, last } from 'lodash';

// 获取模块
export interface Modules {
  [name: string]: Vuex.Module<any, any>;
}

const requiredModules: RequireContext = require.context('./pages', true, /.*\/modules\/.*\.ts$/);
export const modules: Modules = {};

requiredModules.keys().forEach((fileName: string) => {
  const fileNameMeta = last(tail(fileName.split('/'))) as string;
  const modelName = lowerFirst(fileNameMeta.replace(/(\.\/|\.ts)/g, ''));
  modules[modelName] = requiredModules(fileName).default;
});

console.log(modules);

export default modules;
