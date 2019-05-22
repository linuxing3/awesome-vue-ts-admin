import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IEvent } from '../models/Event';

interface IEventState {
  name: string;
  items: IEvent[];
  defaultEvent: IEvent;
}

export interface IEventGetters {
  defaultGetter(state: IEventState): boolean;
}

export interface IEventMutations {
  defaultMutation(state: IEventState, payload: IEvent): void;
}

export interface IEventActions {
  defaultAction(context: ActionContext<IEventState, any>, payload: IEvent): Promise<any>;
}

const state: IEventState = {
  name: 'event',
  items: [],
  defaultEvent: {
    title: '',
  },
};

const mutations: MutationTree<IEventState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IEventState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IEventState, any> = {
  ...make.getters(state),
};

const EventModule: Module<IEventState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default EventModule;
