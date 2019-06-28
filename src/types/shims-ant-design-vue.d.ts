declare module 'ant-design-vue/lib/locale-provider/zh_CN' {
  const zh_CN: any
  export default zh_CN
}

declare module '@/components/FilterTable/index.vue'
declare module '@/components/FilterForm/index.vue'
declare module '@/components/Loader/index.vue'
declare module '@/components/Ellipsis/index.vue'
declare module '@/components/AvatarList/List.vue'
declare module '@/components/StandardFormRow/StandardFormRow.vue'
declare module '@/components/CountDown/index.vue'
declare module '@/assets/icons/bx-analyse.svg?inline'

declare module 'vuex-orm-localforage' {

  import { Database } from '@vuex-orm/core'

  class VuexOrmLocalForagePlugin {
    /**
     * This is called, when VuexORM.install(VuexOrmLocalForage, options) is called.
     * @param {Components} components The Vuex-ORM Components collection
     * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
     * @returns {VuexOrmLocalForage}
     */
    static install(components: any, options: VuexOrmPluginConfig): VuexOrmLocalForage
  }
  interface VuexOrmPluginConfig {
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
  class VuexOrmLocalForage {
    /**
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
     */
    constructor(components: any, options: any)
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


  class Model {
    /**
     * Tells if a field is a attribute (and thus not a relation)
     * @param {Field} field
     * @returns {boolean}
     */
    static isFieldAtribute(field: any): boolean

    getPersistableFields(model: any): string[]
  }

  class Context {
    /**
     * Private constructor, called by the setup method
     *
     * @constructor
     * @param {Components} components The Vuex-ORM Components collection
     * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
     */
    constructor(
      components: any,
      options: {
        database: Database
        name: string
        commonFields: {}
        generateId: () => string
        autoFetch: boolean
        beforeCreate(): void
      }
    )

    /**
     * This is called only once and creates a new instance of the Context.
     * @param {Components} components The Vuex-ORM Components collection
     * @param {VuexOrmPluginConfig} options The options passed to VuexORM.install
     * @returns {Context}
     */
    setup(
      components: any,
      options: {
        database: Database
        name: string
        commonFields: {}
        generateId: () => string
        autoFetch: boolean
        beforeCreate(): void
      }
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
    getModelByEntity(entity: any): any
  }

  class Action {
    /**
     * Transform Model to include ModelConfig
     * @param {object} model
     */
    static transformModel(model: any): any

    static getRecordKey(record: any): any
  }

  class Get extends Action {
    /**
     * Call $fetch method
     * @param {object} store
     * @param {object} params
     */
    static call({ state, dispatch }: any, params: any): Promise<any>
  }

  class Fetch extends Action {
    /**
     * Call $fetch method
     * @param {object} store
     * @param {object} params
     */
    static call({ state, dispatch }: any): Promise<any>
  }

  class Destroy extends Action {
    /**
     * Call $fetch method
     * @param {object} store
     * @param {object} params
     */
    static call({ state, dispatch }: any, payload: any): Promise<any>
  }

  class Persist extends Action {
    /**
     * Call $fetch method
     * @param {object} store
     * @param {object} params
     */
    call({ dispatch }: any, payload: any, action?: string): Promise<any>

    /**
     * Call $fetch helper method
     * @param {object} context
     * @param {object} payload
     */
    create(context: any, payload: any): Promise<any>

    /**
     * Call $fetch helper method
     * @param {object} context
     * @param {object} payload
     */
    update(context: any, payload: any): Promise<any>
  }

  const localForagePlugin: VuexOrmLocalForagePlugin

  export default localForagePlugin
}
