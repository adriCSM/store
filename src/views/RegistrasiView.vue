<template>
  <div class="py-4 mx-2">
    <v-form @submit.prevent>
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <v-alert
          v-if="error"
          variant="outlined"
          color="error"
          elevation="2"
          prominent
          border="start"
          class="message text-red d-flex text-capitalize justify-center"
          >{{ error }}</v-alert
        >
        <div class="text-subtitle-1 text-medium-emphasis">Username</div>

        <v-text-field
          required
          v-model="username"
          density="compact"
          placeholder="Username"
          prepend-inner-icon="mdi-account-outline"
          :rules="usernameRules"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">No. HP (Whats app)</div>
        <v-text-field
          v-model="phoneNumber"
          required
          density="compact"
          class="bi bi-phone"
          placeholder="Number handphone"
          prepend-inner-icon="mdi-phone-outline"
          variant="outlined"
        >
        </v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Email</div>

        <v-text-field
          type="email"
          v-model="email"
          :rules="emailRules"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          required
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>

        <v-text-field
          :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible1 ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible1 = !visible1"
          v-model="password"
          :rules="passRule"
          required
        ></v-text-field>
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Confirm Password
        </div>

        <v-text-field
          required
          :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible2 ? 'text' : 'password'"
          density="compact"
          placeholder="Confirm your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible2 = !visible2"
          v-model="confirmPassword"
          :rules="confirmPassRules"
        ></v-text-field>

        <v-btn block class="mb-8" color="success" size="large" variant="tonal" @click="registrasi">
          Sign Up
        </v-btn>

        <v-card-text class="text-center">
          <router-link
            class="text-blue text-decoration-none"
            :to="{ name: 'login' }"
            rel="noopener noreferrer"
          >
            Log in now
          </router-link>
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import { computed, defineComponent, ref } from 'vue';

// Components

export default defineComponent({
  data: () => ({
    visible1: false,
    visible2: false,

    usernameRules: [
      (value) => {
        if (value) return true;

        return 'Username is requred.';
      },
      (value) => {
        if (/^\S+$/.test(value)) return true;

        return 'Username cannot use spaces.';
      },
    ],
    emailRules: [
      (value) => {
        if (value) return true;

        return 'E-mail is requred.';
      },
      (value) => {
        if (/.+@.+\..+/.test(value)) return true;

        return 'E-mail must be valid.';
      },
    ],
    passRule: [
      (value) => {
        if (value) return true;

        return 'Password is requred.';
      },
      (value) => {
        if (value.length >= 8) return true;

        return 'Password minimal 8 character.';
      },
      (value) => {
        if (/^(?=.*[!@#$%^&*])/.test(value)) return true;

        return 'Password must be using (!@#$%^&*).';
      },
      (value) => {
        if (/^(?=.*[A-Z])/.test(value)) return true;

        return 'Password must be using (A-Z).';
      },
    ],
  }),
  setup() {
    const error = ref();
    const username = ref();
    const phoneNumber = ref();
    const email = ref();
    const password = ref();
    const confirmPassword = ref();
    const confirmPassRules = computed(() => {
      return [(value) => value === password.value || 'Password and confirm password do not match.'];
    });
    const gender = ref();
    const registrasi = async () => {
      axios
        .post('/users', {
          username: username.value,
          phoneNumber: phoneNumber.value,
          email: email.value,
          password: password.value,
        })
        .then(() => {
          router.push({ name: 'login', query: { message: 'Registrasi berhasil' } });
        })
        .catch((err) => {
          console.log(err);
          error.value = err.response.data.message;
          setTimeout(() => {
            error.value = null;
          }, 3000);
        });
    };
    return {
      gender,
      username,
      phoneNumber,
      email,
      password,
      confirmPassword,
      confirmPassRules,
      registrasi,
      error,
    };
  },
});
</script>
<style>
#app {
  height: 100vh;
}
main {
  min-height: 100vh;
  background-color: #1d212b;
  filter: brightness(90%);
}
.message {
  height: auto;
}
</style>
