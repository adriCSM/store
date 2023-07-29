<template>
  <v-container v-if="profile">
    <v-row justify="center">
      <v-col md="10">
        <v-row>
          <v-col md="3">
            <v-list>
              <v-list-item> Akun Saya </v-list-item>
            </v-list>
          </v-col>
          <v-col md="9" class="bg-white">
            <v-row>
              <v-col>
                <div class="text-h5 text-center">Profile Saya</div>
              </v-col>
            </v-row>
            <v-divider> </v-divider>
            <v-row>
              <v-col>
                <v-row>
                  <v-col>username</v-col>
                  <v-col>{{ profile.username }}</v-col>
                </v-row>
                <v-row>
                  <v-col>name</v-col>
                  <v-col></v-col>
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
                  <v-col>-</v-col>
                </v-row>
                <v-row>
                  <v-col>tanggal lahir</v-col>
                  <v-col>-</v-col>
                </v-row>
              </v-col>
              <v-col class="text-center">
                <v-avatar :image="profile.pic" size="200"></v-avatar>
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

const isLogin = computed(() => store.state.auth.loggedIn);
const store = useStore();

if (isLogin.value && !store.state.profile.userProfile) {
  onMounted(async () => {
    await store.dispatch('profile/getProfile');
  });
}
const profile = computed(() => store.state.profile.userProfile);
</script>
