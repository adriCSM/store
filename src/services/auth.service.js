import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_BASE_URL;
const BASE_URL = process.env.VUE_APP_BASE_URL;

export default {
  async login(user) {
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
  },

  async logout() {
    await axios
      .delete(API_URL + '/auth/' + JSON.parse(localStorage.getItem('user_id')), {
        headers: await authHeader(),
      })
      .then(() => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user');
      });
  },

  async register(user) {
    const response = await axios.post(API_URL + '/users', {
      username: user.username,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
    });
    return response.data;
  },

  async passwordForgot(userEmail) {
    var response = await axios.post(API_URL + '/password-forgot', {
      redirect_url: BASE_URL + '/password-reset',
      email: userEmail,
    });
    return response.status;
  },

  async passwordReset(passwordDTO) {
    var response = await axios.post(API_URL + '/password-reset', {
      password: passwordDTO.newPassword,
      password_confirmation: passwordDTO.confirmPassword,
      email: passwordDTO.email,
      token: passwordDTO.token,
    });
    return response.status;
  },
};
