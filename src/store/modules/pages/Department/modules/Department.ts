import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IDepartment } from '../models/Department';

interface IDepartmentState {
  name: string;
  items: IDepartment[];
  defaultDepartment: IDepartment;
}

export interface IDepartmentGetters {
  defaultGetter(state: IDepartmentState): boolean;
}

export interface IDepartmentMutations {
  defaultMutation(state: IDepartmentState, payload: IDepartment): void;
}

export interface IDepartmentActions {
  defaultAction(context: ActionContext<IDepartmentState, any>, payload: IDepartment): Promise<any>;
}

const state: IDepartmentState = {
  name: 'department',
  items: [],
  defaultDepartment: {
    name: '',
  },
};

const mutations: MutationTree<IDepartmentState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IDepartmentState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IDepartmentState, any> = {
  ...make.getters(state),
};

const DepartmentModule: Module<IDepartmentState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default DepartmentModule;
