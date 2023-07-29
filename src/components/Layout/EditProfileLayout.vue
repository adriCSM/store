<script setup>
import { onMounted, ref } from 'vue';

const gender = ref(null);
const tanggal = ref([]);
const bulan = ref([]);
const tahun = ref([]);

onMounted(() => {
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
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col md="10" align-self="center">
        <v-row>
          <v-col class="text-h5 text-center font-weight-medium"> Edit Profile </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="3"> username </v-col>
          <v-col cols="9">
            <v-text-field placeholder="type here" variant="outlined" color="teal"> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> name </v-col>
          <v-col cols="9">
            <v-text-field placeholder="type here" variant="outlined" color="teal"> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> email </v-col>
          <v-col cols="9">
            <v-text-field placeholder="type here" variant="outlined" color="teal"> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> phone number </v-col>
          <v-col cols="9">
            <v-text-field placeholder="type here" variant="outlined" color="teal"> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> gender </v-col>
          <v-col cols="9">
            <v-radio-group v-model="gender" inline color="teal">
              <v-radio label="Male" value="radio-1"></v-radio>
              <v-radio label="Female" value="radio-2"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3"> date of bird </v-col>
          <v-col cols="3">
            <v-select variant="outlined" :items="tanggal" color="teal"> </v-select>
          </v-col>
          <v-col cols="3">
            <v-select variant="outlined" :items="bulan" color="teal"> </v-select>
          </v-col>
          <v-col cols="3">
            <v-select variant="outlined" :items="tahun" color="teal"> </v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
