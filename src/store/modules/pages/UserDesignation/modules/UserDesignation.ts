import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IUserDesignation } from '../models/UserDesignation';

interface IUserDesignationState {
  name: string;
  items: IUserDesignation[];
  defaultUserDesignation: IUserDesignation;
}

export interface IUserDesignationGetters {
  defaultGetter(state: IUserDesignationState): boolean;
}

export interface IUserDesignationMutations {
  defaultMutation(state: IUserDesignationState, payload: IUserDesignation): void;
}

export interface IUserDesignationActions {
  defaultAction(
    context: ActionContext<IUserDesignationState, any>,
    payload: IUserDesignation
  ): Promise<any>;
}

const state: IUserDesignationState = {
  name: 'userDesignation',
  items: [],
  defaultUserDesignation: {},
};

const mutations: MutationTree<IUserDesignationState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IUserDesignationState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IUserDesignationState, any> = {
  ...make.getters(state),
};

const UserDesignationModule: Module<IUserDesignationState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default UserDesignationModule;
