import ProfileService from '@/services/profile.service';
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

    // async editProfile({ commit }, modifiedProfile) {
    //   const userProfile = await ProfileService.editProfile(modifiedProfile);
    //   commit('success', userProfile);
    // },

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
