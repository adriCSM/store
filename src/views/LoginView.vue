<template>
  <div
    class="d-flex min-vh-100 align-items-center"
    style="
      background-image: url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80');
      background-size: cover;
    "
  >
    <v-card class="mx-auto pa-3 overflow-visible" elevation="20" min-width="350" rounded="lg">
      <v-card class="mx-auto bg-success mt-0 rounded-lg align-end" style="top: -40px" elevation="8">
        <v-img class="mx-auto my-8" max-width="120" max-height="70px" src="../assets/logoam2.png">
        </v-img>
        <v-alert
          v-if="error"
          variant="outlined"
          color="error"
          elevation="2"
          prominent
          border="start"
          class="message text-red d-flex text-capitalize justify-center"
        >
          {{ error }}
        </v-alert>
        <v-alert
          v-if="success"
          variant="outlined"
          color="success"
          elevation="2"
          prominent
          border="start"
          class="message text-red d-flex text-capitalize justify-center"
        >
          {{ success }}
        </v-alert>
      </v-card>
      <label for="email" class="text-subtitle-2 text-medium-emphasis">Email</label>
      <v-text-field
        id="email"
        name="email"
        color="success"
        v-model="user.email"
        :rules="emailRules"
        density="compact"
        type="email"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        @keyup.enter="login()"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        <label for="password"> Password </label>
        <router-link
          class="text-caption font-weight-light text-success"
          to="password"
          rel="noopener noreferrer"
          target="_self"
        >
          Forgot password?</router-link
        >
      </div>

      <v-text-field
        id="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        prepend-inner-icon="mdi-lock-outline"
        color-icon="red"
        variant="outlined"
        color="success"
        @click:append-inner="visible = !visible"
        v-model="user.password"
        @keyup.enter="login()"
      ></v-text-field>

      <v-btn block class="mb-8" color="success" @click="login">
        <span class="pe-3"> Log In </span>
        <v-progress-circular :width="6" :size="30" color="white" indeterminate v-show="show">
        </v-progress-circular>
      </v-btn>

      <v-card-text class="text-center" style="font-size: 14px">
        <span color="black " class="font-weight-light">Don't have an account ?</span>
        <router-link class="text-success" :to="{ name: 'register' }" rel="noopener noreferrer">
          Sign Up
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
// import router from '@/router';

export default {
  name: 'HelloWorld',
  data: () => ({
    visible: false,
    emailRules: [
      (value) => {
        if (value) return true;

        return 'Email is required.';
      },
      (value) => {
        if (/.+@.+\..+/.test(value)) return true;

        return 'Email must be valid.';
      },
    ],
  }),
  setup() {
    const user = ref({ email: 'admin@gmail.com', password: 'admin' });
    const error = ref();
    const success = ref();
    const show = ref(false);
    const store = useStore();

    const login = async () => {
      show.value = true;

      await store
        .dispatch('auth/login', user.value)
        .then(() => {
          router.push({ name: 'home' });
          show.value = false;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return { user, login, error, success, show };
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: white;
  font-weight: bolder;
}
</style>
