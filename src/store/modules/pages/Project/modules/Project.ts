import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IProject } from '../models/Project';

interface IProjectState {
  name: string;
  items: IProject[];
  defaultProject: IProject;
}

export interface IProjectGetters {
  defaultGetter(state: IProjectState): boolean;
}

export interface IProjectMutations {
  defaultMutation(state: IProjectState, payload: IProject): void;
}

export interface IProjectActions {
  defaultAction(context: ActionContext<IProjectState, any>, payload: IProject): Promise<any>;
}

const state: IProjectState = {
  name: 'project',
  items: [],
  defaultProject: {
    title: '',
  },
};

const mutations: MutationTree<IProjectState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IProjectState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IProjectState, any> = {
  ...make.getters(state),
};

const ProjectModule: Module<IProjectState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default ProjectModule;
