import router from '@/router';
import store from '@/store';

export const handler = {
  errorHandling(err) {
    if (err.response.status == 401) {
      router.push({ name: 'login' });
    }
    store.commit('auth/errorMessage', err.response.data.message);
    setTimeout(() => {
      store.commit('auth/errorMessage', null);
    });
  },
};
