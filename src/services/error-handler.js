import router from '@/router';
import store from '@/store';

export const handler = {
  errorHandling(err) {
    console.log(err);
    if (err && err.message == 'Invalid token specified') {
      router.push({ name: 'Login' });
    }
    if (err.response) {
      if (err.response.status == 401) {
        router.push({ name: 'Login' });
      }
      store.commit('auth/errorMessage', err.response.data.message);
      setTimeout(() => {
        store.commit('auth/errorMessage', null);
      });
    }
  },
};
