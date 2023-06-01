<template>
    <div class="py-4 mx-2">
        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <v-img class="mx-auto mb-10" max-width="228" max-height="70px" src="../assets/logoam2.png"></v-img>
            <v-alert v-if="error" variant="outlined" color="error" elevation="2" prominent border="start" class="message text-red d-flex text-capitalize justify-center">{{ error }}</v-alert>
            <v-alert v-if="success" variant="outlined" color="success" elevation="2" prominent border="start" class="message text-red d-flex text-capitalize justify-center">{{ success }}</v-alert>

            <div class="text-subtitle-1 text-medium-emphasis">Account</div>

            <v-text-field
                v-model="email"
                :rules="emailRules"
                density="compact"
                type="email"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                @keyup.enter="login()"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Password
                <router-link class="text-caption text-decoration-none text-blue" to="password" rel="noopener noreferrer" target="_self"> Forgot login password?</router-link>
            </div>

            <v-text-field
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                v-model="password"
                @keyup.enter="login()"
            ></v-text-field>

            <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login"> Log In </v-btn>
            <div class="login" v-if="!email_verified">
                <div
                    id="g_id_onload"
                    data-auto_prompt="false"
                    data-client_id="744997405077-43ing8cg842ad6onbuocen992qheo5mn.apps.googleusercontent.com"
                    data-callback="handleCredentialResponse"
                    data-login_uri="http://localhost:8080/"
                ></div>
                <div class="g_id_signin" data-type="standard" data-text="sign_in_with"></div>
            </div>

            <v-card-text class="text-center">
                <router-link class="text-blue text-decoration-none" :to="{ name: 'register' }" rel="noopener noreferrer"> Sign up now <v-icon icon="mdi-chevron-right"></v-icon> </router-link>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';
export default {
    name: 'HelloWorld',
    data: () => ({
        visible: false,
        emailRules: [
            (value) => {
                if (value) return true;

                return 'E-mail is required.';
            },
            (value) => {
                if (/.+@.+\..+/.test(value)) return true;

                return 'E-mail must be valid.';
            },
        ],
    }),
    setup() {
        const email = ref();
        const password = ref();
        const error = ref();
        const success = ref();
        if (router.currentRoute.value.query.message) {
            success.value = router.currentRoute.value.query.message;
            setTimeout(() => {
                success.value = '';
            }, 3000);
        }

        const login = async () => {
            await axios
                .post(
                    '/auth/login',
                    {
                        email: email.value,
                        password: password.value,
                    },
                    { withCredentials: true },
                )
                .then((data) => {
                    router.push({ name: 'home', params: { accessToken: data.data.accessToken } });
                })
                .catch((err) => {
                    if (err.response.data.message) {
                        error.value = err.response.data.message;
                        setTimeout(() => {
                            error.value = '';
                        }, 3000);
                    } else {
                        console.log(err);
                    }
                });
        };

        return { email, password, login, error, success };
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
