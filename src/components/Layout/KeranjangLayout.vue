<script setup>
import { computed, ref } from 'vue';
import ButtonBack from '@/components/ButtonBack.vue';

import vuetify from '@/plugins/vuetify';
const smAndUp = computed(() => (vuetify.display.smAndUp.value ? true : false));
const mdAndUp = computed(() => (vuetify.display.mdAndUp.value ? true : false));

const count = ref(1);

const stock = ref(50);

const angka = (event) => {
  const angka = event.key;

  if ((angka >= '0' && angka <= '9') || angka === '.') {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};
const errorInput = ref(false);
const angka1 = () => {
  if (stock.value < count.value) {
    errorInput.value = true;
    return (count.value = stock.value);
  }
  if (!count.value || count.value == 0) {
    return (errorInput.value = false);
  }
};
</script>

<template>
  <v-container class="pa-0">
    <v-row justify="center" class="ma-0 mb-3">
      <v-col cols="11">
        <v-row align="center" class="bg-white">
          <v-col cols="2" v-show="!smAndUp">
            <ButtonBack />
          </v-col>
          <v-col cols="1"
            ><v-checkbox color="teal" class="d-flex" style="max-width: fit-content"></v-checkbox
          ></v-col>

          <v-col v-show="smAndUp" md="5" sm="5">Produk</v-col>
          <v-col v-show="smAndUp"> Harga Satuan</v-col>
          <v-col v-show="smAndUp">Kuantitas</v-col>
          <v-col v-show="smAndUp" sm="2"> Total Harga</v-col>
          <v-col v-show="smAndUp" sm="1"> Aksi</v-col>
          <v-col cols="9 text-end" v-show="!smAndUp" sm="1">
            <v-btn icon="mdi-delete" variant="text" color="danger"></v-btn>
          </v-col>
        </v-row>

        <v-row align="center" class="bg-white mt-md-7 mt-5" v-for="a in 10" :key="a">
          <v-col cols="1" :class="smAndUp ? '' : 'me-1 ps-0'"
            ><v-checkbox
              color="teal"
              class="d-flex overflow-x-smAndUp"
              style="max-width: fit-content"
            ></v-checkbox
          ></v-col>
          <v-col class="d-flex">
            <v-img src="../../assets/109715820.jpg" max-width="80" width="80"></v-img>
            <div class="ps-2 w-100" :class="smAndUp ? 'd-flex flex-row align-center' : false">
              <v-row>
                <v-col
                  cols="12"
                  sm="5"
                  class="pb-0"
                  style=""
                  :style="
                    smAndUp
                      ? mdAndUp
                        ? { maxWidth: '350px' }
                        : { maxWidth: '200px' }
                      : {
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }
                  "
                >
                  <span>Herbisida Glifosat GRASS-UP 480SL 1Liter Obat Racun Rumput Si</span>
                </v-col>
                <v-col
                  cols="12"
                  sm="2"
                  :class="!smAndUp ? 'text-start' : 'text-center'"
                  align-self="center"
                >
                  Rp2000</v-col
                >
                <v-col
                  class="d-flex flex-row me-3"
                  :class="!smAndUp ? 'ps-2' : 'pa-0'"
                  sm="2"
                  align-self="center"
                >
                  <button
                    style="border: 1px solid teal; height: 28px; transform: translateY(2px)"
                    @click="count > 0 ? count-- : false"
                  >
                    <v-icon color="grey">mdi-minus</v-icon>
                  </button>
                  <input
                    @keyup="angka1"
                    @keypress="angka"
                    type="text"
                    v-model="count"
                    style="
                      border: 1px solid grey;
                      height: 28px;
                      width: 50px;
                      transform: translateY(2px);
                    "
                    class="text-center mb-1"
                    required
                  />
                  <button
                    style="border: 1px solid teal; height: 28px; transform: translateY(2px)"
                    @click="count < stock ? count++ : false"
                  >
                    <v-icon color="grey">mdi-plus</v-icon>
                  </button>
                </v-col>
                <v-col class="text-teal" sm="2" v-show="smAndUp" align-self="center">
                  Rp100.000</v-col
                >
                <v-col v-show="smAndUp" sm="1" align-self="center"> Hapus</v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row class="checkout bg-white">
          <v-col cols="1" align-self="center">
            <v-checkbox class="d-flex" style="max-width: fit-content"></v-checkbox>
          </v-col>
          <v-col align-self="center ms-3"> <v-btn variant="text"> hapus </v-btn> </v-col>
          <v-col align-self="center">
            Total(0 Produk): <span class="text-teal text-h5">Rp0</span>
          </v-col>
          <v-col align-self="center ms-3">
            <v-btn color="teal" :class="smAndUp ? '' : 'w-100'"> Checkout </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.overflow-y-auto {
  scroll-behavior: smooth;

  -webkit-overflow-scrolling: none;
}

.checkout {
  position: sticky;
  bottom: 0;
}
</style>
