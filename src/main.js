import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import axios from 'axios';

axios.defaults.baseURL = 'https://apiappstore-production.up.railway.app/';
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:3123/';

loadFonts();

createApp(App).use(router).use(vuetify).mount('#app');
