import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },

    {
        path: '/shop/minuman',
        name: 'minuman',
        component: () => import(/* webpackChunkName: "about" */ '../views/ShopView.vue'),
    },

    {
        path: '/transaksi',
        name: 'transaksi',

        component: () => import(/* webpackChunkName: "about" */ '../views/TransaksiView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
