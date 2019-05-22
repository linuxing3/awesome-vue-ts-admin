import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IDocumentType } from '../models/DocumentType';

interface IDocumentTypeState {
  name: string;
  items: IDocumentType[];
  defaultDocumentType: IDocumentType;
}

export interface IDocumentTypeGetters {
  defaultGetter(state: IDocumentTypeState): boolean;
}

export interface IDocumentTypeMutations {
  defaultMutation(state: IDocumentTypeState, payload: IDocumentType): void;
}

export interface IDocumentTypeActions {
  defaultAction(
    context: ActionContext<IDocumentTypeState, any>,
    payload: IDocumentType
  ): Promise<any>;
}

const state: IDocumentTypeState = {
  name: 'documentType',
  items: [],
  defaultDocumentType: {
    title: '',
  },
};

const mutations: MutationTree<IDocumentTypeState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IDocumentTypeState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IDocumentTypeState, any> = {
  ...make.getters(state),
};

const DocumentTypeModule: Module<IDocumentTypeState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default DocumentTypeModule;
