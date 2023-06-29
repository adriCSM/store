import axios from 'axios';
import authHeader from './auth-header';
// import Jsona from 'jsona';

const API_URL = process.env.VUE_APP_API_BASE_URL;
// const dataFormatter = new Jsona();

export default {
  async getProfile(userId) {
    const response = await axios.get(API_URL + `/users/${userId}`, { headers: await authHeader() });
    return response.data.data;
  },
  // async getProfile(userId) {
  //   const response = await axios.get(API_URL + '/users/userId', { headers: authHeader() });
  //   return dataFormatter.deserialize(response.data);
  // },

  async uploadPic(pic, userId) {
    const postUrl = API_URL + '/uploads/users/' + userId + '/profile-image';
    const response = await axios.post(
      postUrl,
      { attachment: pic },
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    return response.data;
  },
};
