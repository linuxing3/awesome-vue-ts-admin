import {
  ActionContext, Module, MutationTree, ActionTree, GetterTree,
} from 'vuex';
import { make } from 'vuex-pathify';
import { IAsset } from '../models/Asset';

interface IAssetState {
  name: string;
  items: IAsset[];
  defaultAsset: IAsset;
}

export interface IAssetGetters {
  defaultGetter(state: IAssetState): boolean;
}

export interface IAssetMutations {
  defaultMutation(state: IAssetState, payload: IAsset): void;
}

export interface IAssetActions {
  defaultAction(context: ActionContext<IAssetState, any>, payload: IAsset): Promise<any>;
}

const state: IAssetState = {
  name: 'asset',
  items: [],
  defaultAsset: {
    assetName: '',
  },
};

const mutations: MutationTree<IAssetState> = {
  ...make.mutations(state),
};

const actions: ActionTree<IAssetState, any> = {
  ...make.actions(state),
};

const getters: GetterTree<IAssetState, any> = {
  ...make.getters(state),
};

const AssetModule: Module<IAssetState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
export default AssetModule;
