<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const visible = ref(false);
const emailRules = ref([
  (value) => {
    if (value) return true;
    return 'Email is required.';
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;
    return 'Email must be valid.';
  },
]);

// const user = ref({ email: '', password: '' });
const user = ref({ email: 'a@gmail.com', password: '#Mangidi7' });

const show = ref(false);
const store = useStore();
const username = ref(null);
onMounted(() => {
  username.value = store.state.auth.username;
  localStorage.removeItem('user_id');
  localStorage.removeItem('user');
  localStorage.removeItem('activeTabStore');
});

const login = async () => {
  show.value = true;
  await store.dispatch('auth/login', user.value);
  show.value = false;
};
</script>

<template>
  <div class="contain">
    <v-row style="height: 100vh">
      <v-col align-self="center" cols="12 " class="d-flex justify-center">
        <v-card class="pa-3 overflow-visible" elevation="20" min-width="300" rounded="lg">
          <v-card class="bg-teal mt-0 rounded-lg align-end" style="top: -40px" elevation="5">
            <v-img
              class="mx-auto my-8"
              max-width="120"
              max-height="70px"
              src="../../assets/logoam2.png"
            >
            </v-img>
          </v-card>

          <label for="email" class="text-subtitle-2 text-medium-emphasis">Email</label>
          <v-text-field
            id="email"
            color="teal"
            v-model="user.email"
            :rules="emailRules"
            density="compact"
            type="email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            @keyup.enter="login()"
          ></v-text-field>

          <div
            class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
          >
            <label for="password"> Password </label>
            <router-link
              class="text-caption font-weight-light text-teal"
              to="password"
              rel="noopener noreferrer"
              target="_self"
            >
              Forgot password?</router-link
            >
          </div>

          <v-text-field
            id="password"
            required
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            prepend-inner-icon="mdi-lock-outline"
            color-icon="red"
            variant="outlined"
            color="teal"
            @click:append-inner="visible = !visible"
            v-model="user.password"
            @keyup.enter="login()"
          ></v-text-field>

          <v-btn block class="mb-8" color="teal" @click="login">
            <span class="pe-3"> Log In </span>
            <v-progress-circular :width="6" :size="30" color="white" indeterminate v-show="show">
            </v-progress-circular>
          </v-btn>
          <v-card-text class="text-center" style="font-size: 14px">
            <span color="black " class="font-weight-light">Don't have an account ?</span>
            <router-link class="text-teal" :to="{ name: 'Register' }" rel="noopener noreferrer">
              Sign Up
            </router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style>
a {
  text-decoration: none;
  color: white;
  font-weight: bolder;
}
.message {
  position: absolute;
  z-index: 1;
}

.contain {
  background-image: url('../../assets/bg.jpeg');
  background-size: cover;
}
</style>
