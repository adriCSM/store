<script setup>
import { computed, onMounted, ref } from 'vue';
import ButtonBack from '@/components/ButtonBack.vue';
import { useStore } from 'vuex';

const store = useStore();
const date = ref(null);
const mount = ref(null);
const year = ref(null);

const tanggal = ref([]);
const bulan = ref([]);
const tahun = ref([]);
const inputan = ref({
  name: '',
  username: '',
  email: '',
  phone_number: '',
  gender: null,
  birth: date.value + ' ' + mount.value + ' ' + year.value,
  pic: '',
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
      birth: user.value.birth,
      blob: user.value.pic,
    };
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

const simpan = async () => {
  await store.dispatch('profile/editProfile', {
    name: inputan.value.name,
    username: inputan.value.username,
    email: inputan.value.email,
    phone_number: inputan.value.phone_number,
    gender: inputan.value.gender,
    birth: inputan.value.birth,
    image: inputan.value.pic,
  });
};

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
          <v-col class="text-h5 text-end" cols="auto">
            <v-img :src="inputan.blob" height="200" width="200">
              <v-btn
                icon="mdi-pencil"
                color="teal"
                @click="handleImportFile"
                style="transform: translateY(140px)"
              ></v-btn>
            </v-img>

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
            <v-select variant="outlined" :items="tahun" color="teal" v-model="year"> </v-select>
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
