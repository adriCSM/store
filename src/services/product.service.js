import axios from 'axios';
import authHeader from './auth-header';
export default {
  async getProducts() {
    const response = await axios.get('/store/products');
    return response.data;
  },
  async getProduct(id) {
    const response = await axios.get('/store/products/' + id);
    return response.data.data.product;
  },

  async searchProduct(query) {
    const response = await axios.get(`/products/?productName=${query}`);
    return response.data;
  },

  async addToCart(payload) {
    const response = await axios.post(
      '/store/carts',
      {
        id: payload.productId,
        count: payload.count,
      },
      {
        headers: await authHeader(),
      },
    );
    return response.data.message;
  },

  async getProductsCart() {
    const response = await axios.get('/store/carts', {
      headers: await authHeader(),
    });

    return response.data.data.products;
  },

  async changeCountProduct(product) {
    const response = await axios.put(
      '/store/carts',
      {
        ...product,
      },
      {
        headers: await authHeader(),
      },
    );

    return response.data;
  },
  async deleteProductsCart(productId) {
    const response = await axios.delete('/store/carts/' + productId, {
      headers: await authHeader(),
    });
    return response.data;
  },
};
