import { ActionContext, Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import { make } from 'vuex-pathify'
import { IModel } from '../models/Model'

/* -------------------------------------------------------------
| Interfaces
|-------------------------------------------------------------*/

interface IModelState {
  name: string
  items: IModel[],
  defaultModel: IModel
}

export interface IModelGetters {
  defaultGetter(state: IModelState): boolean
}

export interface IModelMutations {
  defaultMutation(state: IModelState, payload: IModel): void
}

export interface IModelActions {
  defaultAction(context: ActionContext<IModelState, any>, payload: IModel): Promise<any>
}

/* -------------------------------------------------------------
| Vuex state/mutations/actions/getters, auto made with `vuex-pathify`
|-------------------------------------------------------------*/
const state: IModelState = {
  name: 'model',
  items: [],
  defaultModel: {}
}

const mutations: MutationTree<IModelState> = {
  ...make.mutations(state),
}

const actions: ActionTree<IModelState, any> = {
  ...make.actions(state),
}

const getters: GetterTree<IModelState, any > = { 
  ...make.getters(state)
}

/* -------------------------------------------------------------
| Vuex module namespaced
|-------------------------------------------------------------*/
const ModelModule: Module<IModelState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
export default ModelModule