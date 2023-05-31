<template>
    <div class="py-4 mx-2">
        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <v-alert v-if="error" variant="outlined" color="error" elevation="2" prominent border="start" class="message text-red d-flex text-capitalize justify-center">{{ error }}</v-alert>
            <v-alert v-if="success" variant="outlined" color="success" elevation="2" prominent border="start" class="message text-red d-flex text-capitalize justify-center">{{ success }}</v-alert>

            <div class="text-subtitle-1 text-medium-emphasis">Email address</div>

            <v-text-field v-model="email" density="compact" type="email" placeholder="Email address" prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

            <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="send"> Get link </v-btn>
            <v-card-text class="text-center">
                <router-link class="text-blue text-decoration-none" to="login" rel="noopener noreferrer"><v-icon icon="mdi-chevron-left"></v-icon> Back to log in </router-link>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
// import axios from 'axios';
// import router from '@/router';
export default {
    name: 'HelloWorld',
    data: () => ({
        visible: false,
    }),
    setup() {
        const email = ref();
        const success = ref();
        const error = ref();
        const send = async () => {
            await axios
                .post('/email', {
                    email: email.value,
                })
                .then((items) => {
                    success.value = items.data.message;
                    setTimeout(() => {
                        success.value = '';
                    }, 1000 * 60);
                })
                .catch((err) => {
                    error.value = err.response.data.message;
                });
        };

        return { email, send, error, success };
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
