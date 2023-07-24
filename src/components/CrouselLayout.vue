<script setup>
import vuetify from '@/plugins/vuetify';
import { computed } from 'vue';
const md = computed(() => (vuetify.display.mdAndUp.value ? true : false));
</script>
<template>
  <v-carousel cycle show-arrows="hover" :height="md ? 300 : 200">
    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
    </v-carousel-item>

    <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-carousel-item>
  </v-carousel>
</template>
