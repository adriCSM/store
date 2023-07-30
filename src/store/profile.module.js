import router from '@/router';
import ProfileService from '@/services/profile.service';
import store from '@/store';
import jwtDecode from 'jwt-decode';

const initialState = { userProfile: null };
import { handler } from '../services/error-handler';

export const profile = {
  namespaced: true,
  state: initialState,
  actions: {
    async getProfile({ commit }) {
      try {
        const token = JSON.parse(localStorage.getItem('user_id'));
        const { id: userId } = jwtDecode(token);
        const userProfile = await ProfileService.getProfile(userId);
        commit('profile', userProfile);
      } catch (error) {
        handler.errorHandling(error);
      }
    },

    async editProfile({ commit }, payload) {
      try {
        const response = await ProfileService.editProfile(payload);
        const userProfile = await ProfileService.getProfile(response.id);
        commit('profile', userProfile);
        store.commit('success', response.message);
        router.push({ name: 'Profile' });
      } catch (error) {
        handler.errorHandling(error);
      }
    },

    // async uploadPic({ commit }, file) {
    //   const picURL = (await ProfileService.uploadPic(file, this.state.profile.userProfile.id)).url;
    //   commit('successUpload', picURL);
    // },
  },
  mutations: {
    profile(state, profile) {
      state.userProfile = profile;
    },
    successUpload(state, picURL) {
      state.userProfile.profile_image = picURL;
    },
  },
};
