<template>
  <div class="bg-white min-vh-100 d-flex align-center pa-0 mx-0">
    <v-row class="min-vw-100 min-vh-100 pa-0">
      <v-col cols="5" class="bg-white ma-0 d-flex justify-center align-self-center form flex-wrap">
        <v-form @submit.prevent style="width: 80%" class="overflow-visible">
          <v-alert
            v-if="error"
            color="red"
            elevation="2"
            type="warning"
            border="start"
            class="message text-white d-flex text-capitalize justify-center pb-3"
            >{{ error }}</v-alert
          >
          <v-alert
            v-if="success"
            color="success"
            elevation="2"
            type="success"
            border="start"
            class="message d-flex text-capitalize justify-center pb-3"
            >{{ success }}</v-alert
          >
          <div class="w-100 pb-5">
            <h4 class="font-weight-bold">Sign Up</h4>
            <p class="font-weight-reguler">
              Silakan isi form dibawah untuk membuat
              <strong class="text-success">akun</strong> baru.
            </p>
          </div>

          <v-text-field
            required
            v-model="user.username"
            density="compact"
            label="Username"
            prepend-inner-icon="mdi-account-outline"
            :rules="usernameRules"
            variant="outlined"
            color="success"
            class="pb-3"
          ></v-text-field>

          <v-text-field
            color="success"
            v-model="user.phoneNumber"
            required
            density="compact"
            class="bi bi-phone pb-3"
            label="Phone Number"
            prepend-inner-icon="mdi-phone-outline"
            variant="outlined"
          >
          </v-text-field>

          <v-text-field
            color="success"
            type="email"
            v-model="user.email"
            :rules="emailRules"
            density="compact"
            label="Email address"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            required
            class="pb-3"
          ></v-text-field>

          <v-text-field
            :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible1 ? 'text' : 'password'"
            density="compact"
            label="Password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible1 = !visible1"
            v-model="user.password"
            :rules="passRule"
            required
            color="success"
            class="pb-3"
          >
          </v-text-field>

          <v-text-field
            color="success"
            required
            :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible2 ? 'text' : 'password'"
            density="compact"
            label="Confirm password"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible2 = !visible2"
            v-model="user.confirmPassword"
            :rules="confirmPassRules"
            class="pb-3"
          >
          </v-text-field>

          <v-btn block class="mb-8" color="success" @click="registrasi">
            <span class="pr-3"> Sign Up </span>
            <v-progress-circular :width="6" :size="30" color="white" indeterminate v-show="show">
            </v-progress-circular>
          </v-btn>

          <v-card-text class="text-center">
            <router-link
              class="text-success text-decoration-none"
              :to="{ name: 'login' }"
              rel="noopener noreferrer"
              style="font-size: 14px"
            >
              <span class="font-weight-light text-black">Already have an account?</span>
              Log In
            </router-link>
          </v-card-text>
        </v-form>
      </v-col>

      <v-col cols="7" class="pa-0 image">
        <v-card class="h-100 rounded-s-xl">
          <v-img
            cover
            class="h-100"
            src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

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
    const show = ref(false);
    const error = ref();
    const success = ref();
    const user = ref({
      username: 'acha',
      phoneNumber: '123456789012',
      email: 'a@gmail.com',
      password: '#Mangidi7',
      confirmPassword: '#Mangidi7l',
    });
    const store = useStore();

    const confirmPassRules = computed(() => {
      return [
        (value) => value === user.value.password || 'Password and confirm password do not match.',
      ];
    });
    const registrasi = async () => {
      show.value = true;

      await store.dispatch('auth/register', user.value);
      error.value = await store.state.auth.errorMessage;
      success.value = await store.state.auth.successMessage;
      setTimeout(() => {
        error.value = null;
        success.value = null;
      }, 5000);
      show.value = false;
    };
    return {
      user,

      confirmPassRules,
      registrasi,
      error,
      success,
      show,
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
@media (max-width: 700px) {
  .image {
    display: none;
  }
  .form {
    min-width: 100%;
  }
}
</style>
