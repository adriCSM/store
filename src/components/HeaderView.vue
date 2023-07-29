<template>
  <v-app-bar
    color="teal"
    :height="vuetify.display.smAndUp.value ? 125 : 70"
    v-if="
      router.currentRoute.value.name !== 'Login' &&
      router.currentRoute.value.name !== 'Register' &&
      router.currentRoute.value.name !== 'Keranjang'
    "
    style="max-width: 100vw"
  >
    <div class="w-100 d-flex flex-column align-center">
      <v-row class="w-75" v-if="vuetify.display.smAndUp.value && !isLogin">
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-login" to="/auth/registrasi" class="text-capitalize me-5">
          Daftar
        </v-btn>
        <v-divider vertical color="white" thickness="5"> </v-divider>
        <v-btn variant="text" icon="mdi-login" to="/auth/login" class="text-capitalize ms-5">
          Log In
        </v-btn>
      </v-row>
      <v-row class="w-100 ma-0" justify="center">
        <v-col cols="auto" v-if="vuetify.display.smAndUp.value" align-self="center">
          <router-link to="/home">
            <v-img src="../assets/am.png" width="180" />
          </router-link>
        </v-col>
        <v-col md="7 pe-0" class="mt-5">
          <v-text-field
            @keyup="search(query)"
            :v-model="query"
            class="flex-full-width"
            placeholder="Search "
            prepend-inner-icon="mdi-magnify"
            theme="light"
            variant="solo"
            :items="names"
          ></v-text-field>
        </v-col>
        <v-col cols="auto" class="px-0" align-self="center">
          <v-btn @click="keranjang" icon to="/keranjang">
            <v-badge v-if="count" :content="count" color="error">
              <v-icon size="25">mdi-cart-outline</v-icon>
            </v-badge>
            <v-icon v-else size="25">mdi-cart-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto" v-if="isLogin && profile" align-self="center">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-avatar :image="profile.pic" v-bind="props" style="cursor: pointer"> </v-avatar>
            </template>

            <v-list>
              <v-list-item v-for="(item, i) in menu" :key="i" @click="item.method">
                <v-list-item-title>
                  <v-icon>{{ item.icon }}</v-icon> {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </div>
  </v-app-bar>
</template>
<script setup>
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const isLogin = computed(() => store.state.auth.loggedIn);
const names = ref(['d']);
if (isLogin.value && !store.state.products.productCount && !store.state.profile.userProfile) {
  onMounted(async () => {
    await store.dispatch('products/getProductsCart');
    await store.dispatch('profile/getProfile');
  });
}
const keranjang = async () => {
  await store.dispatch('products/getProductsCart');
};

const search = async (query) => {
  console.log(query);
  // await store.dispatch('products/searchProduct', query);
  // console.log(store.state.products.listProductsName);
};
const count = computed(() => store.state.products.productCount);
const profile = computed(() => store.state.profile.userProfile);
const menu = ref([
  {
    title: 'Profile',
    method: () => {
      router.push({ name: 'Profile' });
    },
    icon: 'mdi-account',
  },
  {
    title: 'Log Out',
    method: async () => {
      await store.dispatch('auth/logout');
    },
    icon: 'mdi-logout',
  },
]);
</script>
