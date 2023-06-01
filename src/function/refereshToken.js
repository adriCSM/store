import axios from 'axios';

async function getToken() {
    try {
        const response = await axios.get('/token', {
            withCredentials: true,
        });
        const data = { token: response.data.accessToken };
        return data;
    } catch (err) {
        return err;
    }
}

export default getToken;
