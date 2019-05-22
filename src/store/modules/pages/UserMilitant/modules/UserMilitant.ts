import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IUserMilitant } from '../models/UserMilitant';

interface IUserMilitantState {
  name: string;
  items: IUserMilitant[];
  defaultUserMilitant: IUserMilitant;
}

export interface IUserMilitantGetters {
  defaultGetter(state: IUserMilitantState): boolean;
}

export interface IUserMilitantMutations {
  defaultMutation(state: IUserMilitantState, payload: IUserMilitant): void;
}

export interface IUserMilitantActions {
  defaultAction(
    context: ActionContext<IUserMilitantState, any>,
    payload: IUserMilitant
  ): Promise<any>;
}

const state: IUserMilitantState = {
  name: 'userMilitant',
  items: [],
  defaultUserMilitant: {
    name: '',
  },
};

const mutations: MutationTree<IUserMilitantState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IUserMilitantState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IUserMilitantState, any> = {
  ...make.getters(state),
};

const UserMilitantModule: Module<IUserMilitantState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default UserMilitantModule;
