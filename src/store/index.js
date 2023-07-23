import { createStore } from 'vuex';
import { auth } from './auth.module';
import { products } from './product.module';
import { profile } from './profile.module';

export default createStore({
  modules: {
    auth,
    products,
    profile,
  },
  state: {
    success: false,
    error: false,
    loading: false,
    info: false,
  },
  mutations: {
    success(state, success) {
      state.success = success;
    },
    error(state, error) {
      state.error = error;
    },
    loading(state, loading) {
      state.loading = loading;
    },
    info(state, info) {
      state.info = info;
    },
  },
});
