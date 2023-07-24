<script setup>
import { computed, onMounted, ref } from 'vue';
import SlideGroup from '@/components/SlideGroup.vue';
import ButtonBack from '@/components/ButtonBack.vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import vuetify from '@/plugins/vuetify';

const mdUp = computed(() => vuetify.display.mdAndUp.value);
const rating = ref(4.5);
const count = ref(1);

const stock = computed(() => parseInt(store.state.products.product.cuantity));
const route = useRoute();
const store = useStore();
const id = route.params.id;
const errorInput = ref(false);

onMounted(async () => {
  await store.dispatch('products/getProduct', id);
});
const product = computed(() => store.state.products.product);

const angka = (event) => {
  const angka = event.key;

  if ((angka >= '0' && angka <= '9') || angka === '.') {
    return true;
  } else {
    event.preventDefault();
    return false;
  }
};
const angka1 = () => {
  if (stock.value < count.value) {
    errorInput.value = true;
    return (count.value = stock.value);
  }
  if (!count.value || count.value == 0) {
    return (errorInput.value = false);
  }
};

const keranjang = async () => {
  await store.dispatch('products/addToCart', { productId: id, count: count.value });
};
</script>
<template>
  <v-container v-if="product" :class="mdUp ? 'mt-5' : 'mt-0'">
    <v-row justify="center">
      <v-col style="background-color: #ffffff">
        <v-row>
          <v-col cols="12" sm="5" md="5">
            <ButtonBack style="position: fixed; z-index: 99" />

            <v-img width="100%" :src="product.image"></v-img>
            <SlideGroup :image="product.image" />
            <div class="d-flex justify-space-around">
              <div>
                Share:
                <v-btn variant="text" color="blue-darken-4" icon="mdi-facebook"></v-btn>
                <v-btn variant="text" color="blue" icon="mdi-twitter"></v-btn>
              </div>
              <div>
                <v-btn icon="mdi-heart-outline" color="pink" variant="text"></v-btn>
                Faforit (34)
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="7" md="7">
            <h5 class="text-capitalize">
              {{ product.name }}
            </h5>

            <div class="text-h4 font-weight-bold text-teal">
              Rp{{ product.price.toLocaleString('id-ID') }}
            </div>
            <span class="text-teal text-caption me-2"> ({{ rating }}) </span>
            <v-rating
              v-model="rating"
              color="teal"
              active-color="teal"
              half-increments
              hover
              readonly
              size="18"
            >
            </v-rating>
            <span class="mx-3"> | </span>
            <span>134 Penilaian</span>
            <span class="mx-3"> | </span>
            <span>123 Terjual</span>

            <div class="pt-10">
              <div class="text-title">Deskripsi Produk:</div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit laudantium provident
                vero eaque quo natus autem explicabo dicta ipsum libero!
              </p>
            </div>

            <div class="pt-10">
              <span>Kuantitas</span>
              <button
                style="border: 1px solid teal"
                class="ms-10"
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
                  transform: translateY(1.7px);
                "
                class="text-center"
                required
              />
              <button style="border: 1px solid teal" @click="count < stock ? count++ : false">
                <v-icon color="grey">mdi-plus</v-icon>
              </button>
              <span class="ps-3">Tersisa {{ stock }} buah</span>
            </div>
            <div v-if="errorInput" class="text-error">Jumlah telah mencapai batas maksimum!</div>

            <div class="pt-10">
              <v-btn
                prepend-icon="mdi-cart"
                variant="outlined"
                color="teal"
                class="me-4 mb-2 text-capitalize"
                @click="keranjang"
                >Masukkan Keranjang</v-btn
              >
              <v-btn color="teal" class="text-capitalize mb-2">Beli Sekarang</v-btn>
            </div>
            <v-divider color="teal"></v-divider>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
