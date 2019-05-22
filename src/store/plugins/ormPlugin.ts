/**
 * ORM插件将vuex状态持久化
 */
import * as Vuex from 'vuex';
import VuexORM, { Database, Model } from '@vuex-orm/core';
import localForagePlugin from 'vuex-orm-localforage';

import models, { Models } from '@/models';
import modules, { Modules } from '@/store/modules/page';

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

    /**
     * Register a model and a module to Database.
     */
    database.register(model, module);
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
