<template>
  <v-container v-if="profile">
    <v-row justify="center">
      <v-col>
        <v-row>
          <v-col md="3" v-if="vuetify.display.smAndUp.value && isLogin">
            <v-list>
              <v-list-item><v-icon>mdi-account</v-icon> Akun Saya </v-list-item>
            </v-list>
          </v-col>
          <v-col md="9" class="bg-white">
            <v-row v-show="!smAndUp">
              <v-col cols="2" v-show="!smAndUp">
                <ButtonBack />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="text-h5 text-center">Profile Saya</div>
              </v-col>
            </v-row>
            <v-divider> </v-divider>
            <v-row>
              <v-col cols="12" md="7">
                <v-row>
                  <v-col>username</v-col>
                  <v-col>{{ profile.username }}</v-col>
                </v-row>
                <v-row>
                  <v-col>name</v-col>
                  <v-col v-if="profile.name">{{ profile.name }}</v-col>
                  <v-col v-else>-</v-col>
                </v-row>
                <v-row>
                  <v-col>email</v-col>
                  <v-col>{{ profile.email }}</v-col>
                </v-row>
                <v-row>
                  <v-col>Nomor Handphone</v-col>
                  <v-col>{{ profile.phone_number }}</v-col>
                </v-row>
                <v-row>
                  <v-col>jenis kelamin</v-col>
                  <v-col v-if="profile.jenis_kelamin">{{ profile.jenis_kelamin }}</v-col>
                  <v-col>-</v-col>
                </v-row>
                <v-row>
                  <v-col>tanggal lahir</v-col>
                  <v-col v-if="profile.tanggal_lahir">{{ profile.tanggal_lahir }}</v-col>
                  <v-col>-</v-col>
                </v-row>
              </v-col>
              <v-col class="text-center">
                <v-avatar :image="profile.pic" size="200"></v-avatar>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn prepend-icon="mdi-pencil" color="teal" @click="edit">Edit Profile</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
import vuetify from '@/plugins/vuetify';
import ButtonBack from '@/components/ButtonBack.vue';
import router from '@/router';

const smAndUp = computed(() => (vuetify.display.smAndUp.value ? true : false));
const isLogin = computed(() => store.state.auth.loggedIn);
const store = useStore();

if (isLogin.value && !store.state.profile.userProfile) {
  onMounted(async () => {
    await store.dispatch('profile/getProfile');
  });
}
const profile = computed(() => store.state.profile.userProfile);

const edit = () => {
  router.push({ name: 'Edit Profile' });
};
</script>
