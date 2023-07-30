import jwtDecode from 'jwt-decode';
import AuthService from '../services/auth.service';
import ProfileService from '@/services/profile.service';
import { handler } from '../services/error-handler';
import router from '@/router';
import store from '@/store';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true } : { loggedIn: false };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      try {
        const response = await AuthService.login(user);
        const { id } = jwtDecode(response.data.refreshToken);
        const userProfile = await ProfileService.getProfile(id);
        commit('username', userProfile.username);

        commit('successMessage', `Selamat datang ${userProfile.username}`);
        setTimeout(() => {
          commit('successMessage', null);
        }, 1000);
        commit('isLoggedIn', true);
        router.push({ name: 'Home' });
        return response.data;
      } catch (error) {
        commit('isLoggedIn', false);
        handler.errorHandling(error);
      }
    },
    async logout(context) {
      try {
        await AuthService.logout();
        context.commit('isLoggedIn', false);
        router.push({ name: 'Login' });
      } catch (error) {
        context.commit('isLoggedIn', true);
        handler.errorHandling(error);
      }
    },
    async register({ commit }, user) {
      try {
        const message = await AuthService.register(user);
        commit('isLoggedIn', true);
        store.commit('success', message);
      } catch (error) {
        commit('isLoggedIn', false);
        handler.errorHandling(error);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async passwordForgot({ commit }, userEmail) {
      await AuthService.passwordForgot(userEmail);
    },
    // eslint-disable-next-line no-unused-vars
    async passwordReset({ commit }, passwordDTO) {
      await AuthService.passwordReset(passwordDTO);
    },
  },
  mutations: {
    isLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    errorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    successMessage(state, successMessage) {
      state.successMessage = successMessage;
    },
    username(state, username) {
      state.username = username;
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    },
  },
};
