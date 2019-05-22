import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IVehicle } from '../models/Vehicle';

interface IVehicleState {
  name: string;
  items: IVehicle[];
  defaultVehicle: IVehicle;
}

export interface IVehicleGetters {
  defaultGetter(state: IVehicleState): boolean;
}

export interface IVehicleMutations {
  defaultMutation(state: IVehicleState, payload: IVehicle): void;
}

export interface IVehicleActions {
  defaultAction(context: ActionContext<IVehicleState, any>, payload: IVehicle): Promise<any>;
}

const state: IVehicleState = {
  name: 'vehicle',
  items: [],
  defaultVehicle: {
    mark: '',
  },
};

const mutations: MutationTree<IVehicleState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IVehicleState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IVehicleState, any> = {
  ...make.getters(state),
};

const VehicleModule: Module<IVehicleState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default VehicleModule;
