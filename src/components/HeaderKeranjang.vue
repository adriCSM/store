<template>
  <v-app-bar
    color="white"
    class="d-flex align-center"
    :height="smAndUp ? 125 : 70"
    v-if="router.currentRoute.value.name === 'Keranjang'"
  >
    <div class="w-100 d-flex flex-column align-center">
      <v-row class="w-100" justify="center">
        <v-col md="8">
          <v-row justify="center">
            <v-col cols="auto" v-show="smAndUp" align-self="center">
              <router-link to="/home">
                <v-img src="../assets/logoam2.png" width="100" />
              </router-link>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col align-self="center">
              <div class="text-h6 text-teal" v-if="smAndUp">Keranjang Belanja</div>
              <div class="text-teal" v-else>Keranjang Saya</div>
            </v-col>
            <v-col v-if="smAndUp" md="6" align-self="center" class="d-flex">
              <v-text-field
                @keyup.prevent="searchProduct"
                v-model="query"
                class="flex-full-width"
                density="comfortable"
                placeholder="Search "
                theme="light"
                variant="outlined"
                color="teal"
                base-color="teal"
              ></v-text-field>
              <v-btn
                class="justify-center pa-0"
                value="elevated"
                color="white"
                prepend-icon="mdi-magnify"
                style="background-color: teal"
                size="47"
              ></v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-app-bar>
</template>
<script setup>
import vuetify from '@/plugins/vuetify';
import router from '@/router';
import { computed } from 'vue';

const smAndUp = computed(() => (vuetify.display.smAndUp.value ? true : false));
</script>
