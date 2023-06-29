<template>
  <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-snackbar v-if="successMessage" :timeout="20000000" transition="1s" v-model="always">
        <div class="text-center">{{ successMessage }}</div>
      </v-snackbar>

      <v-main class="overflow-y-auto bg-white element">
        <v-container fluid>
          <v-row>
            <v-col cols="12" justify="center">
              <v-avatar size="150">
                <v-img src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png">
                </v-img>
              </v-avatar>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="4">
              <v-title> <strong>Name</strong> </v-title>
            </v-col>
            <v-col cols="8">
              <!-- <v-title>{{ userProfile.username }}</v-title> -->
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="4">
              <v-title> <strong>Email</strong></v-title>
            </v-col>
            <v-col cols="8">
              <!-- <v-title>: {{ userProfile.email }}</v-title> -->
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="4">
              <v-title><strong>No.HP</strong> </v-title>
            </v-col>
            <v-col cols="8">
              <!-- <v-title>: {{ userProfile.phone_number }}</v-title> -->
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <v-btn @click="logout()" color="error">Log out</v-btn>
            </v-col>
          </v-row>
          <h1 class="text-info">Masih dalam tahap pengembangan</h1>
        </v-container>
      </v-main>

      <FooterView></FooterView>
    </v-layout>
  </v-card>
</template>
<script>
import FooterView from '@/components/FooterView.vue';
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
import router from '@/router';

export default {
  components: { FooterView },
  setup() {
    const store = useStore();

    const userProfile = ref();

    const fetchUserProfile = async () => {
      await store.dispatch('profile/getProfile');
      userProfile.value = store.state.profile.userProfile;
    };

    watch(fetchUserProfile, async () => {
      await fetchUserProfile();
    });

    const computedUserProfile = computed(() => {
      return userProfile.value;
    });
    const logout = async () => {
      await store.dispatch('auth/logout').then(() => {
        router.push({ name: 'Login' });
      });
    };

    return { computedUserProfile, logout };
  },
};
</script>
