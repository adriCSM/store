<template>
  <v-app-bar
    color="teal"
    :height="vuetify.display.smAndUp.value ? 125 : 70"
    v-if="
      router.currentRoute.value.name !== 'Login' &&
      router.currentRoute.value.name !== 'Register' &&
      router.currentRoute.value.name !== 'Keranjang'
    "
  >
    <div class="w-100 mt-5 d-flex flex-column align-center">
      <v-row class="w-75" v-if="vuetify.display.smAndUp.value && isLogin">
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
        <v-col cols="auto" v-if="vuetify.display.smAndUp.value">
          <router-link to="/home">
            <v-img src="../assets/am.png" width="180" />
          </router-link>
        </v-col>
        <v-col md="7 pe-0">
          <v-text-field
            @keyup.prevent="searchProduct"
            v-model="query"
            class="flex-full-width"
            density="comfortable"
            placeholder="Search "
            prepend-inner-icon="mdi-magnify"
            theme="light"
            variant="solo"
          ></v-text-field>
        </v-col>
        <v-col cols="auto" class="px-0">
          <v-btn @click="keranjang" icon to="/keranjang">
            <v-badge v-if="count" :content="count" color="error">
              <v-icon size="25">mdi-cart-outline</v-icon>
            </v-badge>

            <v-icon v-else size="25">mdi-cart-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-app-bar>
</template>
<script setup>
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const isLogin = computed(() => store.state.auth.loggedIn);
if (isLogin.value && !store.state.products.productCount) {
  onMounted(async () => {
    await store.dispatch('products/getProductsCart');
  });
}
const keranjang = async () => {
  await store.dispatch('products/getProductsCart');
};
const count = computed(() => store.state.products.productCount);
</script>
