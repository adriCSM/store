import { createStore } from 'vuex';
import { auth } from './auth.module';
import { productsStore } from './product.module';
import { profile } from './profile.module';

export default createStore({
  modules: {
    auth,
    productsStore,
    profile,
  },
  state: {},
});
