import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IUserAppraisalGoal } from '../models/UserAppraisalGoal';

interface IUserAppraisalGoalState {
  name: string;
  items: IUserAppraisalGoal[];
  defaultUserAppraisalGoal: IUserAppraisalGoal;
}

export interface IUserAppraisalGoalGetters {
  defaultGetter(state: IUserAppraisalGoalState): boolean;
}

export interface IUserAppraisalGoalMutations {
  defaultMutation(state: IUserAppraisalGoalState, payload: IUserAppraisalGoal): void;
}

export interface IUserAppraisalGoalActions {
  defaultAction(
    context: ActionContext<IUserAppraisalGoalState, any>,
    payload: IUserAppraisalGoal
  ): Promise<any>;
}

const state: IUserAppraisalGoalState = {
  name: 'userAppraisalGoal',
  items: [],
  defaultUserAppraisalGoal: {},
};

const mutations: MutationTree<IUserAppraisalGoalState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IUserAppraisalGoalState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IUserAppraisalGoalState, any> = {
  ...make.getters(state),
};

const UserAppraisalGoalModule: Module<IUserAppraisalGoalState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default UserAppraisalGoalModule;
