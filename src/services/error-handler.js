import router from '@/router';
import store from '@/store';

export const handler = {
  errorHandling(err) {
    if (err.response && (err.message == 'Invalid token specified' || err.response.status == 401)) {
      router.push({ name: 'Login' });
    }
    if (err.response) {
      store.commit('auth/errorMessage', err.response.data.message);
      setTimeout(() => {
        store.commit('auth/errorMessage', null);
      });
    }
  },
};
