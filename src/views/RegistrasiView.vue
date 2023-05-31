<template>
    <div class="py-4 mx-2">
        <v-form @submit.prevent>
            <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
                <v-alert v-if="error" variant="outlined" color="error" elevation="2" prominent border="start" class="message text-red d-flex text-capitalize justify-center">{{ error }}</v-alert>
                <div class="text-subtitle-1 text-medium-emphasis">First Name</div>

                <v-text-field required v-model="firstName" density="compact" placeholder="First name" prepend-inner-icon="mdi-account-outline" variant="outlined"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis">Last Name</div>
                <v-text-field required v-model="lastName" density="compact" placeholder="Last name" prepend-inner-icon="mdi-account-outline" variant="outlined"></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis">No. HP (Whats app)</div>
                <v-text-field v-model="phoneNumber" required density="compact" class="bi bi-phone" placeholder="Number handphone" prepend-inner-icon="mdi-phone-outline" variant="outlined">
                </v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis">Jenis Kelamin</div>
                <v-combobox v-model="gender" required density="compact" class="bi bi-phone" placeholder="Number handphone" prepend-inner-icon="mdi-phone-outline" variant="outlined" :items="items">
                </v-combobox>

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

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Password</div>

                <v-text-field
                    :append-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible1 ? 'text' : 'password'"
                    density="compact"
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible1 = !visible1"
                    v-model="password"
                    required
                ></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">Confirm Password</div>

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
                ></v-text-field>

                <v-btn block class="mb-8" color="success" size="large" variant="tonal" @click="registrasi"> Sign Up </v-btn>

                <v-card-text class="text-center">
                    <router-link class="text-blue text-decoration-none" :to="{ name: 'login' }" rel="noopener noreferrer"> Log in now </router-link>
                </v-card-text>
            </v-card>
        </v-form>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';
import { defineComponent, ref } from 'vue';

// Components

export default defineComponent({
    data: () => ({
        items: ['Pria', 'Wanita'],
        visible1: false,
        visible2: false,
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
    }),
    setup() {
        const error = ref();
        const firstName = ref();
        const lastName = ref();
        const phoneNumber = ref();
        const email = ref();
        const password = ref();
        const confirmPassword = ref();
        const gender = ref();
        const registrasi = async () => {
            axios
                .post('/auth/registrasi', {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    phoneNumber: phoneNumber.value,
                    email: email.value,
                    password: password.value,
                    confirmPassword: confirmPassword.value,
                    gender: gender.value,
                })
                .then(() => {
                    router.push({ name: 'login', query: { message: 'Registrasi berhasil' } });
                })
                .catch((err) => {
                    error.value = err.response.data.message;
                    setTimeout(() => {
                        error.value = null;
                    }, 3000);
                });
        };
        return { gender, firstName, lastName, phoneNumber, email, password, confirmPassword, registrasi, error };
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
