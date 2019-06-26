import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IArticle } from '../models/Article';

/* -------------------------------------------------------------
| Interfaces
|-------------------------------------------------------------*/

interface IArticleState {
  name: string
  items: IArticle[],
  defaultArticle: IArticle
}

export interface IArticleGetters {
  defaultGetter(state: IArticleState): boolean
}

export interface IArticleMutations {
  defaultMutation(state: IArticleState, payload: IArticle): void
}

export interface IArticleActions {
  defaultAction(context: ActionContext<IArticleState, any>, payload: IArticle): Promise<any>
}

/* -------------------------------------------------------------
| Vuex state/mutations/actions/getters, auto made with `vuex-pathify`
|-------------------------------------------------------------*/
const state: IArticleState = {
  name: 'article',
  items: [],
  defaultArticle: {},
};

const mutations: MutationTree<IArticleState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IArticleState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IArticleState, any > = {
  ...make.getters(state),
};

/* -------------------------------------------------------------
| Vuex module namespaced
|-------------------------------------------------------------*/
const ArticleModule: Module<IArticleState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default ArticleModule;
