import axios from 'axios';
import authHeader from './auth-header';
import { handler } from './error-handler';

const API_URL = process.env.VUE_APP_API_BASE_URL;
const BASE_URL = process.env.VUE_APP_BASE_URL;

export default {
  async login(user) {
    try {
      const response = await axios.post(
        API_URL + '/auth',
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            Accept: 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
          },
        },
      );
      if (response.data.data) {
        localStorage.setItem('user_id', JSON.stringify(response.data.data.refreshToken));
        localStorage.setItem('user', JSON.stringify(response.data.data.accessToken));
      }
      return response.data;
    } catch (error) {
      handler.errorHandling(error);
    }
  },

  async logout() {
    try {
      await axios.post(API_URL + '/logout', {}, { headers: authHeader() });
      localStorage.removeItem('user_free');
    } catch (error) {
      handler.errorHandling(error);
    }
  },

  async register(user) {
    try {
      const response = await axios.post(API_URL + '/users', {
        username: user.username,
        phoneNumber: user.phoneNumber,
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      handler.errorHandling(error);
    }
  },

  async passwordForgot(userEmail) {
    try {
      var response = await axios.post(API_URL + '/password-forgot', {
        redirect_url: BASE_URL + '/password-reset',
        email: userEmail,
      });
      return response.status;
    } catch (error) {
      handler.errorHandling(error);
    }
  },

  async passwordReset(passwordDTO) {
    try {
      var response = await axios.post(API_URL + '/password-reset', {
        password: passwordDTO.newPassword,
        password_confirmation: passwordDTO.confirmPassword,
        email: passwordDTO.email,
        token: passwordDTO.token,
      });
      return response.status;
    } catch (error) {
      handler.errorHandling(error);
    }
  },
};
