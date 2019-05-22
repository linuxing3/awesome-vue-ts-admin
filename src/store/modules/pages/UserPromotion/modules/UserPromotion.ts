import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IUserPromotion } from '../models/UserPromotion';

interface IUserPromotionState {
  name: string;
  items: IUserPromotion[];
  defaultUserPromotion: IUserPromotion;
}

export interface IUserPromotionGetters {
  defaultGetter(state: IUserPromotionState): boolean;
}

export interface IUserPromotionMutations {
  defaultMutation(state: IUserPromotionState, payload: IUserPromotion): void;
}

export interface IUserPromotionActions {
  defaultAction(
    context: ActionContext<IUserPromotionState, any>,
    payload: IUserPromotion
  ): Promise<any>;
}

const state: IUserPromotionState = {
  name: 'userPromotion',
  items: [],
  defaultUserPromotion: {},
};

const mutations: MutationTree<IUserPromotionState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IUserPromotionState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IUserPromotionState, any> = {
  ...make.getters(state),
};

const UserPromotionModule: Module<IUserPromotionState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default UserPromotionModule;
