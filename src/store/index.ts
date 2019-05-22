import Vue from 'vue';
import Vuex from 'vuex';
import app from '@/store/modules/app';
import user from '@/store/modules/user';
import plugins from '@/store/plugins';
import getters from '@/store/getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
  },
  plugins,
  getters,
});

export default store;
