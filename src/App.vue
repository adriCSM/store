<template>
  <v-app>
    <HeaderViewVue
      v-if="
        router.currentRoute.value.name !== 'Register' || router.currentRoute.value.name !== 'Login'
      "
    />
    <AlertWeb />
    <v-main>
      <router-view class="d-flex flex-column justify-center mt-5" />
    </v-main>
    <!-- <FooterView></FooterView> -->
  </v-app>
</template>

<script setup>
// import FooterView from '@/components/FooterView.vue';
import router from '@/router';
import AlertWeb from '@/components/AlertWeb.vue';
import HeaderViewVue from '@/components/HeaderView.vue';
</script>
<style>
#app {
  height: 100vh;
}
main {
  min-height: 100vh;

  background-color: #f5f5f5;
}
</style>
