<template>
  <v-bottom-navigation v-model="value" active bg-color="teal" grow mode="shift">
    <v-btn value="home" to="home">
      <v-icon>mdi-home-outline</v-icon>
      Home
    </v-btn>

    <v-btn value="chat" @click="snackbar = true">
      <v-icon>mdi-chat-outline</v-icon>
      chat
    </v-btn>

    <v-btn value="akun" @click="snackbar = true">
      <v-icon>mdi-account-outline</v-icon>
      Akun
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
