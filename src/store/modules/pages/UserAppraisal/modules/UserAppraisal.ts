import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IUserAppraisal } from '../models/UserAppraisal';

interface IUserAppraisalState {
  name: string;
  items: IUserAppraisal[];
  defaultUserAppraisal: IUserAppraisal;
}

export interface IUserAppraisalGetters {
  defaultGetter(state: IUserAppraisalState): boolean;
}

export interface IUserAppraisalMutations {
  defaultMutation(state: IUserAppraisalState, payload: IUserAppraisal): void;
}

export interface IUserAppraisalActions {
  defaultAction(
    context: ActionContext<IUserAppraisalState, any>,
    payload: IUserAppraisal
  ): Promise<any>;
}

const state: IUserAppraisalState = {
  name: 'userAppraisal',
  items: [],
  defaultUserAppraisal: {},
};

const mutations: MutationTree<IUserAppraisalState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IUserAppraisalState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IUserAppraisalState, any> = {
  ...make.getters(state),
};

const UserAppraisalModule: Module<IUserAppraisalState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default UserAppraisalModule;
