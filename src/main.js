import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import axios from 'axios';
import store from './store';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.withCredentials = true;
window.addEventListener('unload', (event) => {
  event.preventDefault();
  localStorage.removeItem('user');
  localStorage.removeItem('user_id');
});

loadFonts();

createApp(App).use(router).use(store).use(vuetify).mount('#app');
