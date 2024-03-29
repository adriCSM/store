import axios from 'axios';
import authHeader from './auth-header';
// import Jsona from 'jsona';

const API_URL = process.env.VUE_APP_API_BASE_URL;

export default {
  async getProfile(userId) {
    const response = await axios.get(API_URL + `/users/${userId}`, { headers: await authHeader() });
    return response.data.data;
  },

  async editProfile(payload) {
    const response = await axios.put(
      '/users',
      {
        ...payload,
      },
      {
        headers: await authHeader(),
      },
    );

    return response.data;
  },
};
