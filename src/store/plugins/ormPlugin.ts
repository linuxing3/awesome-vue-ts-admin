/**
 * ORM插件将vuex状态持久化
 */
import VuexORM, { Database, Model } from '@vuex-orm/core';
import localForagePlugin from 'vuex-orm-localforage';

import models, { Models } from '@/models';
import modules, { Modules } from '@/store/modules/page';
import { AGenTableColumns } from '@/utils/genFormData';
import { writeFile } from 'fs';
import { resolve } from 'path';
import { upperFirst } from 'lodash';


export const persistentSchema = (Entity: typeof Model) => {
  const entity = Entity.fields();
  const modelName = upperFirst(Entity.entity);
  const columns = AGenTableColumns(Object.keys(entity));
  const schemaFilePath = resolve(
    `src/store/modules/pages/${modelName}/models/${modelName}.json`,
  );
  console.log(`Writing json file : ${schemaFilePath}`);
  writeFile(schemaFilePath, JSON.stringify({ columns }, null, 2), (error) => {
    if (!error) {
      console.log('Write json file done!');
    }
  });
};
/**
 * 在数据库中注册模型和模块
 */
export const registerDatabase = (models: Models, modules: Modules): Database => {
  const database = new Database();
  // base models
  Object.keys(models).map((modelName: string) => {
    console.log(`Registering ORM Model -> [${modelName}]`);

    const model = models[modelName];
    const module = modules[modelName] || {};

    database.register(model, module);
    // persistentSchema(model);
  });

  return database;
};

/**
 * 生成数据库
 */
export const database = registerDatabase(models, modules);

/**
 * 载入插件
 */
// VuexORM.use(VuexORMLowdbPlugin, { database, dbPath })
VuexORM.use(localForagePlugin, { database });

/**
 * 安装localForage ORM databse
 */
const ormPlugin = VuexORM.install(database);

export default ormPlugin;
