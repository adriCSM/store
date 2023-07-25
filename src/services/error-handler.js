import router from '@/router';

export const handler = {
  errorHandling(err) {
    console.log(err);
    if (err && err.message == 'Invalid token specified') {
      router.push({ name: 'Login' });
    }
    if (err.response) {
      if (
        err.response.status == 401 ||
        err.response.data.message === 'Refresh token tidak valid.'
      ) {
        router.push({ name: 'Login' });
      }
    }
  },
};
