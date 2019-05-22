import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IEmployee } from '../models/Employee';

interface IEmployeeState {
  name: string;
  items: IEmployee[];
  defaultEmployee: IEmployee;
}

export interface IEmployeeGetters {
  defaultGetter(state: IEmployeeState): boolean;
}

export interface IEmployeeMutations {
  defaultMutation(state: IEmployeeState, payload: IEmployee): void;
}

export interface IEmployeeActions {
  defaultAction(context: ActionContext<IEmployeeState, any>, payload: IEmployee): Promise<any>;
}

const state: IEmployeeState = {
  name: 'employee',
  items: [],
  defaultEmployee: {
    firstName: '',
    lastName: '',
  },
};

const mutations: MutationTree<IEmployeeState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IEmployeeState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IEmployeeState, any> = {
  ...make.getters(state),
};

const EmployeeModule: Module<IEmployeeState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default EmployeeModule;
