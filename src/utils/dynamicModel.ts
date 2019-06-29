import { make } from 'vuex-pathify';
import { Model, Database } from '@vuex-orm/core';
import ModelModel from '@/store/modules/pages/Model/models/Model';


/**
 * Transfer the database with dynamic models
 * Should be called in some components
 * @param database database instance
 */
const dynamicRegisterModel = (database: Database): Database => {
  const allModels =  ModelModel.all();

  allModels.forEach((model: ModelModel) => {
    const ModelDefine =  model.$self();
    const entityName = ModelDefine.entity;
    const fields = ModelDefine.fields();

    class newModel extends Model {
      static entity = entityName
      static fields() {
        return Object.keys(fields).reduce((acc, field) => {
          acc[field] = Model.attr(null);
          return acc
        }, {})
      }
    }

    const newModule = {
      state: {
        entity: entityName,
        fields: fields
      },
      mutations: {
        ...make.mutations({
          entity: entityName,
          fields
        })
      },
      actions: {
        ...make.actions({
          entity: entityName,
          fields
        })
      },
      getters: {
        ...make.getters({
          entity: entityName,
          fields
        })
      }
    }

    database.register(newModel, newModule);
  })

  return database;

}

