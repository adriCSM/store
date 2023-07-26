<template>
  <v-app>
    <HeaderViewVue />
    <AlertWeb />
    <LoadProgres
      style="position: fixed; z-index: 9999; align-self: center; justify-self: center"
      class="mt-15"
    />
    <v-main>
      <router-view />
    </v-main>
    <!-- <FooterView></FooterView> -->
  </v-app>
</template>

<script setup>
// import FooterView from '@/components/FooterView.vue';
import LoadProgres from '@/components/LoadProgres.vue';
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
