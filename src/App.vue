<template>
  <v-app>
    <HeaderViewVue />
    <AlertWeb />

    <v-main>
      <router-view />
    </v-main>
    <FooterView></FooterView>
  </v-app>
</template>

<script setup>
import FooterView from '@/components/FooterView.vue';
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
