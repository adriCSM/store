<template>
  <v-bottom-navigation v-model="value" active bg-color="teal" grow mode="shift">
    <v-btn value="home" to="home">
      <v-icon size="30">mdi-home</v-icon>

      <v-tooltip activator="parent" location="top"> Home </v-tooltip>
    </v-btn>

    <v-btn value="chat" @click="snackbar = true">
      <v-icon size="35">mdi-dropbox</v-icon>
      <v-tooltip activator="parent" location="top"> Pesanan </v-tooltip>
    </v-btn>

    <v-btn value="akun" :to="`profile`">
      <v-icon size="30"> mdi-account</v-icon>
      <v-tooltip activator="parent" location="top"> Akun </v-tooltip>
    </v-btn>
  </v-bottom-navigation>

  <v-snackbar v-model="snackbar" vertical timeout="3000">
    <div class="text-subtitle-1 pb-2">Info</div>
    <p>Fitur ini masih dalam tahap pengembangan</p>
    <template v-slot:actions>
      <v-btn color="indigo" variant="text" @click="snackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const snackbar = ref(false);

    return {
      snackbar,
    };
  },
};
</script>
