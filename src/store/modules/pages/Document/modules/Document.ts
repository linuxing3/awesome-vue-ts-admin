import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IDocument } from '../models/Document';

interface IDocumentState {
  name: string;
  items: IDocument[];
  defaultDocument: IDocument;
}

export interface IDocumentGetters {
  defaultGetter(state: IDocumentState): boolean;
}

export interface IDocumentMutations {
  defaultMutation(state: IDocumentState, payload: IDocument): void;
}

export interface IDocumentActions {
  defaultAction(context: ActionContext<IDocumentState, any>, payload: IDocument): Promise<any>;
}

const state: IDocumentState = {
  name: 'document',
  items: [],
  defaultDocument: {
    title: '',
  },
};

const mutations: MutationTree<IDocumentState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IDocumentState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IDocumentState, any> = {
  ...make.getters(state),
};

const DocumentModule: Module<IDocumentState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default DocumentModule;
