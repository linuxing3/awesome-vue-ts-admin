---
to: "src/store/modules/pages/<%= h.changeCase.pascal(model) %>/modules/<%= h.changeCase.pascal(model) %>.ts"
---
<%
const EntityName = h.changeCase.camel(model)
const ModelName = h.changeCase.pascal(model)
%>import { ActionContext, Module, MutationTree, ActionTree, GetterTree } from 'vuex'
import { make } from 'vuex-pathify'
import { I<%= ModelName %> } from '../models/<%= ModelName %>'

interface I<%= ModelName %>State {
  name: string
  items: I<%= ModelName %>[],
  default<%= ModelName %>: I<%= ModelName %>
}

export interface I<%= ModelName %>Getters {
  defaultGetter(state: I<%= ModelName %>State): boolean
}

export interface I<%= ModelName %>Mutations {
  defaultMutation(state: I<%= ModelName %>State, payload: I<%= ModelName %>): void
}

export interface I<%= ModelName %>Actions {
  defaultAction(context: ActionContext<I<%= ModelName %>State, any>, payload: I<%= ModelName %>): Promise<any>
}

const state: I<%= ModelName %>State = {
  name: '<%= EntityName %>',
  items: [],
  default<%= ModelName %>: {}
}

const mutations: MutationTree<I<%= ModelName %>State> = {
  ...make.mutations(state),
}

const actions: ActionTree<I<%= ModelName %>State, any> = {
  ...make.actions(state),
}

const getters: GetterTree<I<%= ModelName %>State, any > = { 
  ...make.getters(state)
}

const <%= ModelName %>Module: Module<I<%= ModelName %>State, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
export default <%= ModelName %>Module