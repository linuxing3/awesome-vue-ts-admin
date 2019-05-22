import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IBookmark } from '../models/Bookmark';

interface IBookmarkState {
  name: string;
  items: IBookmark[];
  defaultBookmark: IBookmark;
}

export interface IBookmarkGetters {
  defaultGetter(state: IBookmarkState): boolean;
}

export interface IBookmarkMutations {
  defaultMutation(state: IBookmarkState, payload: IBookmark): void;
}

export interface IBookmarkActions {
  defaultAction(context: ActionContext<IBookmarkState, any>, payload: IBookmark): Promise<any>;
}

const state: IBookmarkState = {
  name: 'bookmark',
  items: [],
  defaultBookmark: {},
};

const mutations: MutationTree<IBookmarkState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IBookmarkState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IBookmarkState, any> = {
  ...make.getters(state),
};

const BookmarkModule: Module<IBookmarkState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default BookmarkModule;
