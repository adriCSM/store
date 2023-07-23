import productService from '../services/product.service';
import { handler } from '../services/error-handler';

const initialState = { data: null, product: null };

export const products = {
  namespaced: true,
  state: initialState,
  mutations: {
    data(state, data) {
      state.data = data;
    },
    product(state, product) {
      state.product = product;
    },
    message(state, message) {
      state.message = message;
    },
    contentValue(state, contentValue) {
      state.contentValue = contentValue;
    },
    cartProducts(state, cartProducts) {
      state.cartProducts = cartProducts;
    },
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const response = await productService.getProducts();
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
        commit('successGet', response.data.products);
      } catch (error) {
        handler.errorHandling(error);
      }
    },

    async addToCart({ commit }, product) {
      try {
        const response = await productService.addToCart(product);
        commit('message', response.message);
        const response1 = await productService.getProductsCart();
        commit('contentValue', response1.data.products.length);
        commit('cartProducts', response1.data.products);
        setTimeout(() => {
          commit('message', null);
        }, 5000);
      } catch (error) {
        handler.errorHandling(error);
      }
    },

    async getProductsCart({ commit }) {
      try {
        const response = await productService.getProductsCart();
        commit('contentValue', response.data.products.length);
        commit('cartProducts', response.data.products);
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

    async deleteProductsCart({ commit }, productId) {
      try {
        const response = await productService.deleteProductsCart(productId);
        commit('message', response.message);
        const response1 = await productService.getProductsCart();
        commit('cartProducts', response1.data.products);
      } catch (error) {
        handler.errorHandling(error);
      }
    },
  },
};
