<script setup>
import { computed, onMounted, ref } from 'vue';
import ButtonBack from '@/components/ButtonBack.vue';
import { useStore } from 'vuex';

const store = useStore();

const date = ref();
const mount = ref();
const years = ref();

const tanggal = ref([]);
const bulan = ref([]);
const tahun = ref([]);
const inputan = ref({
  name: '',
  username: '',
  email: '',
  phone_number: '',
  gender: null,
  pic: [],
  blob: '',
});
const user = computed(() => store.state.profile.userProfile);

onMounted(async () => {
  if (!store.state.profile.userProfile) {
    await store.dispatch('profile/getProfile');
  }
  if (store.state.profile.userProfile) {
    inputan.value = {
      ...inputan.value,
      name: user.value.name,
      username: user.value.username,
      email: user.value.email,
      phone_number: user.value.phone_number,
      gender: user.value.gender,
      pic: [new File([user.value.pic], 'default profile', { type: 'image/png' })],
      blob: user.value.pic,
    };
    if (store.state.profile.userProfile.birth) {
      date.value = user.value.birth.split(' ')[0];
      mount.value = user.value.birth.split(' ')[1];
      years.value = user.value.birth.split(' ')[2];
    }
  }
  const year = new Date().getFullYear() + 1;
  for (let i = 1; i <= 100; i++) {
    if (i <= 12) {
      bulan.value.push(new Date(0, i, 0).toLocaleString('id-ID', { month: 'long' }));
    }
    if (i <= 31) {
      tanggal.value.push(i);
    }
    tahun.value.push(year - i);
  }
});

if (!store.state.profile.userProfile) {
  onMounted(() => {
    store.dispatch('profile/getProfile');
  });
}

const uploader = ref();
const handleImportFile = () => {
  uploader.value.click();
};
const onFileChanged = (event) => {
  const file = event.target.files[0];
  const blob = URL.createObjectURL(file);
  inputan.value.pic = event.target.files;
  inputan.value.blob = blob;
};
const simpan = async () => {
  await store.dispatch('profile/editProfile', {
    name: inputan.value.name,
    username: inputan.value.username,
    email: inputan.value.email,
    phoneNumber: inputan.value.phone_number,
    gender: inputan.value.gender,
    birth: date.value + ' ' + mount.value + ' ' + years.value,
    image: inputan.value.pic[0],
  });
};
</script>

<template>
  <v-container v-if="user">
    <v-row justify="center">
      <v-col md="10" align-self="center" class="bg-white" elevation="3">
        <ButtonBack />
        <v-row>
          <v-col class="text-h5 text-center font-weight-medium"> Edit Profile </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center">
          <v-col class="text-h5" cols="auto">
            <v-avatar :image="inputan.blob" size="200"> </v-avatar>
          </v-col>
          <v-col class="text-h5" cols="auto">
            <v-btn
              icon="mdi-pencil"
              position="absolute"
              color="teal"
              @click="handleImportFile"
              style="transform: translate(-100px, 160px)"
            ></v-btn>

            <input ref="uploader" class="d-none" type="file" @change="onFileChanged" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> username </v-col>
          <v-col cols="9">
            <v-text-field
              placeholder="type here"
              variant="outlined"
              color="teal"
              v-model="inputan.username"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> name </v-col>
          <v-col cols="9">
            <v-text-field
              placeholder="type here"
              variant="outlined"
              color="teal"
              v-model="inputan.name"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> email </v-col>
          <v-col cols="9">
            <v-text-field
              placeholder="type here"
              variant="outlined"
              color="teal"
              v-model="inputan.email"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> phone number </v-col>
          <v-col cols="9">
            <v-text-field
              placeholder="type here"
              variant="outlined"
              color="teal"
              v-model="inputan.phone_number"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> gender </v-col>
          <v-col cols="9">
            <v-radio-group v-model="inputan.gender" inline color="teal">
              <v-radio label="Male" value="Male"></v-radio>
              <v-radio label="Female" value="Female"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> date of bird </v-col>
          <v-col cols="3">
            <v-select variant="outlined" :items="tanggal" color="teal" v-model="date"> </v-select>
          </v-col>
          <v-col cols="3">
            <v-select
              variant="outlined"
              :items="bulan"
              class="overflow-x-hidden"
              color="teal"
              v-model="mount"
            >
            </v-select>
          </v-col>
          <v-col cols="3">
            <v-select variant="outlined" :items="tahun" color="teal" v-model="years"> </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-end">
            <v-btn @click="simpan" color="teal">Simpan</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
