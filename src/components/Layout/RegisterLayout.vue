<template>
  <div class="bg-white min-vh-100 d-flex align-center pa-0 mx-0">
    <v-row class="min-vw-100 min-vh-100 pa-0">
      <v-col md="4" class="bg-white ma-0 d-flex justify-center align-self-center form flex-wrap">
        <v-form @submit.prevent style="width: 80%" class="overflow-visible">
          <div class="w-100 pb-5">
            <h4 class="font-weight-bold">Sign Up</h4>
            <p class="font-weight-reguler">
              Silakan isi form dibawah untuk membuat
              <strong class="text-teal">akun</strong> baru.
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
            color="teal"
            class="pb-3"
          ></v-text-field>

          <v-text-field
            color="teal"
            type="number"
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
            color="teal"
            type="email"
            name="email"
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
            color="teal"
            class="pb-3"
          >
          </v-text-field>

          <v-text-field
            color="teal"
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

          <v-btn block class="mb-8" color="teal" @click="registrasi">
            <span class="pr-3"> Sign Up </span>
            <v-progress-circular :width="6" :size="30" color="white" indeterminate v-show="show">
            </v-progress-circular>
          </v-btn>

          <v-card-text class="text-center">
            <router-link
              class="text-teal text-decoration-none"
              :to="{ name: 'Login' }"
              rel="noopener noreferrer"
              style="font-size: 14px"
            >
              <span class="font-weight-light text-black">Already have an account?</span>
              Log In
            </router-link>
          </v-card-text>
        </v-form>
      </v-col>

      <v-col cols="8" class="py-5 pe-8 image d-none d-sm-block">
        <v-card class="h-100 rounded-e-xl">
          <v-img cover class="h-100" src="../../assets/bg.jpeg"></v-img>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

// Components

const visible1 = ref(false);
const visible2 = ref(false);

const usernameRules = ref([
  (value) => {
    if (value) return true;

    return 'Username is requred.';
  },
  (value) => {
    if (/^\S+$/.test(value)) return true;

    return 'Username cannot use spaces.';
  },
]);
const emailRules = ref([
  (value) => {
    if (value) return true;

    return 'E-mail is requred.';
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;

    return 'E-mail must be valid.';
  },
]);
const passRule = ref([
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
]);

const show = ref(false);

const user = ref({
  username: '',
  phoneNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
});
const store = useStore();

const confirmPassRules = computed(() => {
  return [
    (value) => value === user.value.password || 'Password and confirm password do not match.',
  ];
});

const registrasi = async () => {
  await store.dispatch('auth/register', user.value);
};
</script>
