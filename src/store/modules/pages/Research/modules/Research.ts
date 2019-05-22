import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IResearch } from '../models/Research';

interface IResearchState {
  name: string;
  items: IResearch[];
  defaultResearch: IResearch;
}

export interface IResearchGetters {
  defaultGetter(state: IResearchState): boolean;
}

export interface IResearchMutations {
  defaultMutation(state: IResearchState, payload: IResearch): void;
}

export interface IResearchActions {
  defaultAction(context: ActionContext<IResearchState, any>, payload: IResearch): Promise<any>;
}

const state: IResearchState = {
  name: 'research',
  items: [],
  defaultResearch: {},
};

const mutations: MutationTree<IResearchState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IResearchState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IResearchState, any> = {
  ...make.getters(state),
};

const ResearchModule: Module<IResearchState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default ResearchModule;
