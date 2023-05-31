import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';

const routes = [
    {
        path: '/',
        redirect: '/auth/login',
    },
    {
        path: '/auth/registrasi',
        name: 'register',
        component: () => import('../views/RegistrasiView.vue'),
    },
    {
        path: '/auth/login',
        name: 'login',
        component: LoginView,
    },
    {
        path: '/auth/password',
        name: 'password',
        component: () => import('../views/ForgetPasswordView.vue'),
    },

    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/ShopView.vue'),
    },

    {
        path: '/keranjang',
        name: 'keranjang',

        component: () => import(/* webpackChunkName: "about" */ '../views/KeranjangView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
