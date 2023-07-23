<script setup>
import router from '@/router';

const back = () => {
  router.go(-1);
};
</script>

<template>
  <v-row
    v-if="
      router.currentRoute.value.name !== 'Home' &&
      router.currentRoute.value.name !== 'Login' &&
      router.currentRoute.value.name !== 'Notfound'
    "
  >
    <v-col>
      <v-btn color="teal" size="30" icon="mdi-arrow-left" @click="back"></v-btn>
    </v-col>
  </v-row>
</template>
