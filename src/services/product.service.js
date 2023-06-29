import axios from 'axios';
import authHeader from './auth-header';
export default {
  async getProducts() {
    const response = await axios.get('/products');
    return response.data;
  },

  async searchProduct(query) {
    const response = await axios.get(`/products/?productName=${query}`);
    return response.data;
  },

  async addToCart(product) {
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
  },

  async getProductsCart() {
    const response = await axios.get('/carts/products', {
      headers: await authHeader(),
    });

    return response.data;
  },

  async changeCountProduct(product) {
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
  },
  async deleteProductsCart(productId) {
    const response = await axios.delete('/carts/' + productId, {
      headers: await authHeader(),
    });
    return response.data;
  },
};
