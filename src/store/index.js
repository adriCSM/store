import { createStore } from 'vuex';
import { auth } from './auth.module';
import { productsStore } from './product.module';

export default createStore({
  modules: {
    auth,
    productsStore,
  },
  state: {},
});
