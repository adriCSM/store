<template>
  <v-footer
    class="bg-teal d-flex text-center flex-column mt-0 foot"
    v-if="
      router.currentRoute.value.name !== 'Login' && router.currentRoute.value.name !== 'Register'
    "
  >
    <v-container class="py-5">
      <v-row justify="space-around">
        <v-col cols="12" md="4">
          <v-img src="../assets/am.png" width="150px" @click="push" style="cursor: pointer"></v-img>
          <v-btn v-for="i in icons" :key="i" :icon="i" variant="text" color="white"></v-btn>
        </v-col>
        <v-col class="6" md="4">
          <p class="text-h6">Product</p>
          <v-list class="bg-teal text-grey">
            <v-list-item v-for="item in links" :key="item" class="py-0">
              <router-link class="text-grey-lighten-1" :to="item.to">{{ item.name }}</router-link>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="6" md="4">
          <p class="text-h6">Tentang Kami</p>
          <v-list class="bg-teal">
            <v-list-item v-for="item in linksb" :key="item" class="py-0">
              <router-link class="text-grey-lighten-1" :to="item.to">{{ item.name }}</router-link>
            </v-list-item>
          </v-list>
        </v-col>
        <v-divider :thickness="2" class="border-opacity-25" color="white"></v-divider>
        <v-col class="text-start pt-0">
          Copyright &copy; {{ new Date().getFullYear() }} by Adri Candra Saputra Mangidi
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script setup>
import { ref } from 'vue';
import router from '@/router';

const icons = ref(['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']);
const links = ref([
  { to: '/', name: 'Makanan' },
  { to: '/', name: 'Pakaian' },
  { to: '/', name: 'Skincare' },
]);
const linksb = ref([
  { to: '/', name: 'Syarat dan Kebijakan' },
  { to: '/', name: 'Kebijakan Pribadi' },
  { to: '/', name: 'Hubungi Kami' },
]);

const push = () => {
  router.push({ name: 'Home' });
};
</script>
<style>
a:hover {
  color: #000000;
}
</style>
