import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { ILeave } from '../models/Leave';

interface ILeaveState {
  name: string;
  items: ILeave[];
  defaultLeave: ILeave;
}

export interface ILeaveGetters {
  defaultGetter(state: ILeaveState): boolean;
}

export interface ILeaveMutations {
  defaultMutation(state: ILeaveState, payload: ILeave): void;
}

export interface ILeaveActions {
  defaultAction(context: ActionContext<ILeaveState, any>, payload: ILeave): Promise<any>;
}

const state: ILeaveState = {
  name: 'leave',
  items: [],
  defaultLeave: {
    applicant: '',
  },
};

const mutations: MutationTree<ILeaveState> = {
  ...make.mutations(state),
};

const actions: ActionTree<ILeaveState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<ILeaveState, any> = {
  ...make.getters(state),
};

const LeaveModule: Module<ILeaveState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default LeaveModule;
