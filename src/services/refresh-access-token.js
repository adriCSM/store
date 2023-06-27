import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const refreshAccessTokenHandler = {
  async refreshAccessToken() {
    const accessToken = localStorage.getItem('user');
    const tokenDecoded = jwtDecode(JSON.parse(accessToken));
    const currentTime = new Date().getTime();
    if (currentTime > (tokenDecoded.iat + 13) * 1000) {
      await axios
        .put('/auth', {
          refreshToken: JSON.parse(localStorage.getItem('user_id')),
        })
        .then((response) => {
          const newAccessToken = response.data.data.accessToken;
          localStorage.setItem('user', JSON.stringify(newAccessToken));
        });
    }
  },
};
