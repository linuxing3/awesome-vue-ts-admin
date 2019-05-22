import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IArchive } from '../models/Archive';

interface IArchiveState {
  name: string;
  items: IArchive[];
  defaultArchive: IArchive;
}

export interface IArchiveGetters {
  defaultGetter(state: IArchiveState): boolean;
}

export interface IArchiveMutations {
  defaultMutation(state: IArchiveState, payload: IArchive): void;
}

export interface IArchiveActions {
  defaultAction(context: ActionContext<IArchiveState, any>, payload: IArchive): Promise<any>;
}

const state: IArchiveState = {
  name: 'archive',
  items: [],
  defaultArchive: {},
};

const mutations: MutationTree<IArchiveState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IArchiveState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IArchiveState, any> = {
  ...make.getters(state),
};

const ArchiveModule: Module<IArchiveState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default ArchiveModule;
