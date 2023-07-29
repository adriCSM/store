import productService from '../services/product.service';
import { handler } from '../services/error-handler';
import store from '@/store';

const initialState = {
  data: null,
  product: null,
  cart: null,
  productCount: null,
  listProductsName: [],
};

export const products = {
  namespaced: true,
  state: initialState,
  mutations: {
    data(state, data) {
      state.data = data;
    },
    lists(state, lists) {
      let names = [];
      lists.map((product) => {
        names.push(product.name);
      });
      state.listProductsName = names;
    },
    product(state, product) {
      state.product = product;
    },
    productCount(state, productCount) {
      state.productCount = productCount;
    },
    cart(state, cart) {
      state.cart = cart;
    },
    delete(state, id) {
      state.cart = state.cart.filter((cart) => cart.product_id._id !== id);
    },
  },
  actions: {
    async getProducts({ commit }) {
      try {
        store.commit('loading', true);
        const response = await productService.getProducts();
        store.commit('loading', false);
        commit('data', response.data.products);
      } catch (error) {
        handler.errorHandling(error);
      }
    },
    async getProduct({ commit }, id) {
      try {
        const response = await productService.getProduct(id);
        commit('product', response);
      } catch (error) {
        handler.errorHandling(error);
      }
    },

    async searchProduct({ commit }, query) {
      try {
        const response = await productService.searchProduct(query);
        commit('lists', response);
      } catch (error) {
        handler.errorHandling(error);
      }
    },

    async addToCart({ commit }, payload) {
      try {
        await productService.addToCart(payload);
        const response = await productService.getProductsCart();
        commit('productCount', response.length);
        commit('cart', response);
      } catch (error) {
        handler.errorHandling(error);
      }
    },

    async getProductsCart({ commit }) {
      try {
        const response = await productService.getProductsCart();
        commit('productCount', response.length);
        commit('cart', response);
      } catch (error) {
        handler.errorHandling(error);
      }
    },

    //eslint-disable-next-line no-unused-vars
    async changeCountProduct({ commit }, product) {
      try {
        await productService.changeCountProduct(product);
      } catch (error) {
        handler.errorHandling(error);
      }
    },

    async deleteProductCart({ commit }, productId) {
      try {
        await productService.deleteProductCart(productId);
        const response = await productService.getProductsCart();
        commit('productCount', response.length);
        commit('delete', productId);
      } catch (error) {
        handler.errorHandling(error);
      }
    },
  },
};
