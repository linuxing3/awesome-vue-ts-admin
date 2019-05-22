import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IProjectTask } from '../models/ProjectTask';

interface IProjectTaskState {
  name: string;
  items: IProjectTask[];
  defaultProjectTask: IProjectTask;
}

export interface IProjectTaskGetters {
  defaultGetter(state: IProjectTaskState): boolean;
}

export interface IProjectTaskMutations {
  defaultMutation(state: IProjectTaskState, payload: IProjectTask): void;
}

export interface IProjectTaskActions {
  defaultAction(
    context: ActionContext<IProjectTaskState, any>,
    payload: IProjectTask
  ): Promise<any>;
}

const state: IProjectTaskState = {
  name: 'projectTask',
  items: [],
  defaultProjectTask: {},
};

const mutations: MutationTree<IProjectTaskState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IProjectTaskState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IProjectTaskState, any> = {
  ...make.getters(state),
};

const ProjectTaskModule: Module<IProjectTaskState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default ProjectTaskModule;
