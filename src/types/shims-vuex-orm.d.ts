declare module 'vuex-orm-localforage' {

  import { Plugin, Store } from 'vuex';
  import { Database } from '@vuex-orm/core'
  import { Components } from '@vuex-orm/core/lib/plugins/use'
  import Entity from '@vuex-orm/core/lib/database/Entity';

  export class VuexOrmLocalForagePlugin {
    /**
     * This is called, when VuexORM.install(VuexOrmLocalForage, options) is called.
     * @param {Components} components The Vuex-ORM Components collection
     * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
     * @returns {VuexOrmLocalForage}
     */
    static install(components: Components, options: VuexOrmPluginConfig): VuexOrmLocalForage
  }

  export interface VuexOrmPluginConfig {
    /**
     * Default VuexORM Database
     * @param {Database} Instance of VuexORM database
     */
    database: Database

    /**
     * @param {string} Default DataStore prefix
     */
    name: string

    commonFields: any

    /**
     * Generate Id for
     */
    generateId: string

    /**
     * @param {boolean} Load data from LocalForage on startup
     */
    autoFetch: boolean

    /**
     * @param {*} record
     */
    beforeCreate(): void
  }

  export class VuexOrmLocalForage {
    /**
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
     */
    constructor(components: Components, options: VuexOrmPluginConfig)
    /**
     * This method will setup following Vuex actions: $fetch, $get
     */
    setupActions(): void
    /**
     * This method will setup following model methods: Model.$fetch, Model.$get, Model.$create,
     * Model.$update, Model.$delete
     */
    setupModels(): void
    setupLifecycles(): void
  }

  export class Model {
    /**
     * Tells if a field is a attribute (and thus not a relation)
     * @param {Field} field
     * @returns {boolean}
     */
    static isFieldAtribute(field: any): boolean

    getPersistableFields(model: any): string[]
  }

  export class Context {
    /**
     * Private constructor, called by the setup method
     *
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
     */
    constructor(
      components: Components,
      options: VuexOrmPluginConfig
    )

    /**
     * This is called only once and creates a new instance of the Context.
     * @param {Components} components The Vuex-ORM Components collection
     * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
     * @returns {Context}
     */
    setup(
      components: any,
      options: VuexOrmPluginConfig
    ): Context

    /**
     * Get the singleton instance of the context.
     * @returns {Context}
     */
    static getInstance(): Context

    /**
     * Get Model from State
     * @param {object} state
     */
    getModelFromState(state: any): any

    /**
     * Get model by entity
     * @param {Object} entity
     */
    getModelByEntity(entity: Entity): any
  }

  export class Action {
    /**
     * Transform Model to include ModelConfig
     * @param {Model} model
     */
    static transformModel(model: Model): any

    static getRecordKey(record: any): any
  }

  export class Get extends Action {
    /**
     * Call $fetch method
     * @param {Store} store
     * @param {object} params
     */
    static call({ state, dispatch }: any, params: any): Promise<any>
  }

  export class Fetch extends Action {
    /**
     * Call $fetch method
     * @param {Store} store
     * @param {object} params
     */
    static call({ state, dispatch }: any): Promise<any>
  }

  export class Destroy extends Action {
    /**
     * Call $fetch method
     * @param {Store} store
     * @param {object} params
     */
    static call({ state, dispatch }: any, payload: any): Promise<any>
  }

  export class Persist extends Action {
    /**
     * Call $fetch method
     * @param {Store} store
     * @param {object} params
     */
    call({ dispatch }: any, payload: any, action?: string): Promise<any>

    /**
     * Call $fetch helper method
     * @param {Context} context
     * @param {object} payload
     */
    create(context: Context, payload: any): Promise<any>

    /**
     * Call $fetch helper method
     * @param {Context} context
     * @param {object} payload
     */
    update(context: Context, payload: any): Promise<any>
  }

  const localForagePlugin: VuexOrmLocalForagePlugin

  export default localForagePlugin
}
