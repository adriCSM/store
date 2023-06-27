import axios from 'axios';
import { handler } from './error-handler';
import authHeader from './auth-header';
export default {
  async getProducts() {
    try {
      const response = await axios.get('/products');
      return response.data;
    } catch (error) {
      handler.errorHandling(error);
    }
  },

  async searchProduct(query) {
    try {
      const response = await axios.get(`/products/?productName=${query}`);
      return response.data;
    } catch (error) {
      handler.errorHandling(error);
    }
  },

  async addToCart(product) {
    try {
      const response = await axios.post(
        '/carts',
        {
          id: product.productId,
          count: product.count,
        },
        {
          headers: await authHeader(),
        },
      );
      return response.data;
    } catch (error) {
      handler.errorHandling(error);
    }
  },

  async getProductsCart() {
    try {
      const response = await axios.get('/carts/products', {
        headers: await authHeader(),
      });

      return response.data;
    } catch (error) {
      handler.errorHandling(error);
    }
  },

  async changeCountProduct(product) {
    try {
      const response = await axios.put(
        '/carts',
        {
          id: product.productId,
          count: product.count,
        },
        {
          headers: await authHeader(),
        },
      );

      return response.data;
    } catch (error) {
      handler.errorHandling(error);
    }
  },
  async deleteProductsCart(productId) {
    try {
      const response = await axios.delete('/carts/' + productId, {
        headers: await authHeader(),
      });
      return response.data;
    } catch (error) {
      handler.errorHandling(error);
    }
  },
};
