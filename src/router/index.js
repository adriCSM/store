import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'redirect',
    redirect: '/home',
  },
  {
    path: '/auth/registrasi',
    name: 'Register',
    component: () => import('../views/RegistrasiView.vue'),
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/auth/password',
    name: 'Password',
    component: () => import('../views/ForgetPasswordView.vue'),
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShopView.vue'),
  },
  {
    path: '/product/detail/:id',
    name: 'Detail Product',
    component: () => import('../views/DetileView.vue'),
  },

  {
    path: '/keranjang',
    name: 'Keranjang',

    component: () => import(/* webpackChunkName: "about" */ '../views/KeranjangView.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfileUser.vue'),
  },
  {
    path: '/profile/edit',
    name: 'Edit Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditProfile.vue'),
  },
  // {
  //   path: '/pesanan',
  //   name: 'pesanan',

  //   component: () => import(/* webpackChunkName: "about" */ '../views/ProfileUser.vue'),
  // },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotfoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name) {
    document.title = ` ${to.name} || Store`;
    next();
  } else {
    next({ name: 'Notfound' });
  }
});

export default router;
