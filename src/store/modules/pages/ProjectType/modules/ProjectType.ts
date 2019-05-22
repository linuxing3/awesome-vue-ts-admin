import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IProjectType } from '../models/ProjectType';

interface IProjectTypeState {
  name: string;
  items: IProjectType[];
  defaultProjectType: IProjectType;
}

export interface IProjectTypeGetters {
  defaultGetter(state: IProjectTypeState): boolean;
}

export interface IProjectTypeMutations {
  defaultMutation(state: IProjectTypeState, payload: IProjectType): void;
}

export interface IProjectTypeActions {
  defaultAction(
    context: ActionContext<IProjectTypeState, any>,
    payload: IProjectType
  ): Promise<any>;
}

const state: IProjectTypeState = {
  name: 'projectType',
  items: [],
  defaultProjectType: {},
};

const mutations: MutationTree<IProjectTypeState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IProjectTypeState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IProjectTypeState, any> = {
  ...make.getters(state),
};

const ProjectTypeModule: Module<IProjectTypeState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default ProjectTypeModule;
