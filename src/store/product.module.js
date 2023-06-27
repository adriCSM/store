import productService from '../services/product.service';

const initialState = { products: null };

export const productsStore = {
  namespaced: true,
  state: initialState,
  mutations: {
    successGet(state, products) {
      state.products = products;
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
      const response = await productService.getProducts();
      commit('successGet', response.data.products);
      return response.data;
    },

    async searchProduct({ commit }, query) {
      const response = await productService.searchProduct(query);
      commit('successGet', response.data.products);
    },

    async addToCart({ commit }, product) {
      const response = await productService.addToCart(product);
      commit('message', response.message);
      const response1 = await productService.getProductsCart();
      commit('contentValue', response1.data.products.length);
      commit('cartProducts', response1.data.products);
      setTimeout(() => {
        commit('message', null);
      }, 5000);
    },

    async getProductsCart({ commit }) {
      const response = await productService.getProductsCart();
      commit('contentValue', response.data.products.length);
      commit('cartProducts', response.data.products);
    },

    //eslint-disable-next-line no-unused-vars
    async changeCountProduct({ commit }, product) {
      await productService.changeCountProduct(product);
    },

    async deleteProductsCart({ commit }, productId) {
      const response = await productService.deleteProductsCart(productId);
      commit('message', response.message);
      const response1 = await productService.getProductsCart();
      commit('cartProducts', response1.data.products);
    },
  },
};
