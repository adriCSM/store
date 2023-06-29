<template>
  <div class="min-vh-100 contain">
    <v-alert
      v-if="error"
      color="red"
      elevation="2"
      type="warning"
      border="start"
      class="message text-white text-capitalize pa-3 w-auto mx-10 mt-5"
      >{{ error }}
      <v-progress-linear v-model="progres_linear" bg-color="white" color="white">
      </v-progress-linear
    ></v-alert>
    <v-alert
      v-if="username"
      color="success"
      elevation="2"
      type="success"
      border="start"
      class="message text-white text-capitalize pa-3 w-auto mx-10 mt-5"
      >Sampai jumpa lagi "{{ username }}"
      <v-progress-linear v-model="progres_linear" bg-color="white" color="white">
      </v-progress-linear
    ></v-alert>

    <v-row style="height: 100vh">
      <v-col align-self="center" cols="auto mx-auto">
        <v-card class="pa-3 overflow-visible" elevation="20" min-width="320" rounded="lg">
          <v-card class="bg-teal mt-0 rounded-lg align-end" style="top: -40px" elevation="5">
            <v-img
              class="mx-auto my-8"
              max-width="120"
              max-height="70px"
              src="../assets/logoam2.png"
            >
            </v-img>
          </v-card>

          <label for="email" class="text-subtitle-2 text-medium-emphasis">Email</label>
          <v-text-field
            id="email"
            name="email"
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
            name="password"
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

<script>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

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
    const user = ref({ email: '', password: '' });
    const error = ref(null);
    const progres_linear = ref(0);
    let idInterval = [];

    const show = ref(false);
    const store = useStore();

    const username = ref(null);
    onMounted(() => {
      username.value = store.state.auth.username;
      if (user.value) {
        setTimeout(() => {
          username.value = null;
        }, 3000);
        timer();
      }
    });

    const timer = () => {
      progres_linear.value = 0;
      error.value = store.state.auth.errorMessage;

      const interval = setInterval(() => {
        progres_linear.value++;
        if (progres_linear.value >= 100) {
          error.value = null;

          idInterval.map((id) => {
            clearInterval(id);
          });
          idInterval = [];
        }
      }, 30);
      idInterval.push(interval);
    };

    const login = async () => {
      show.value = true;

      const response = await store.dispatch('auth/login', user.value);
      if (response) {
        router.push({ name: 'Home' });
        show.value = false;
      } else {
        timer();
      }

      show.value = false;
    };

    return { user, login, error, show, progres_linear, username };
  },
};
</script>

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
  background-image: url('../assets/bg.jpeg');
  background-size: cover;
}
</style>
