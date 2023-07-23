<template>
  <v-app-bar color="teal" :height="vuetify.display.smAndUp.value ? 125 : 70">
    <div class="w-100 mt-5 d-flex flex-column align-center">
      <v-row class="w-75" v-if="vuetify.display.smAndUp.value">
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-login" to="/auth/registrasi" class="text-capitalize me-5">
          Daftar
        </v-btn>
        <v-divider vertical color="white" thickness="5"> </v-divider>
        <v-btn variant="text" icon="mdi-login" to="auth/login" class="text-capitalize ms-5">
          Log In
        </v-btn>
      </v-row>
      <v-row class="w-100 ma-0" justify="center">
        <v-col cols="auto" v-if="vuetify.display.smAndUp.value">
          <v-img src="../assets/logoam2.png" width="100" />
        </v-col>
        <v-col md="7">
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
        <v-col cols="auto">
          <v-btn icon to="keranjang">
            <v-badge v-if="contentValue !== 0" :content="contentValue" color="error">
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
</script>
