<script setup>
import { computed, ref, watch } from 'vue';
import ButtonBack from '@/components/ButtonBack.vue';
import DialogVue from '@/components/DialogVue.vue';
import vuetify from '@/plugins/vuetify';
import { useStore } from 'vuex';
const smAndUp = computed(() => (vuetify.display.smAndUp.value ? true : false));
const mdAndUp = computed(() => (vuetify.display.mdAndUp.value ? true : false));
const store = useStore();
const products = computed(() => store.state.products.cart);
// emit and props
const dialog = ref(false);
const newDialog = (data) => {
  dialog.value = data;
};

// checkbox
const selected = ref([]);
const selectAll = ref(false);
const selectAllItems = () => {
  if (selectAll.value) {
    selected.value = [];
    products.value.map((product) => {
      selected.value.push(product);
    });
  } else {
    selected.value = [];
  }
};

// plus/minus and type cuantity
const idUserDelete = ref();
const productName = ref();
const plusMinus = async (id, event, name) => {
  if (id) {
    idUserDelete.value = id;
    productName.value = name;
  }
  const product = products.value.find((product) => product.product_id._id == id);
  event == 'plus' ? product.count++ : product.count == 1 ? (dialog.value = true) : product.count--;
  if (product.count !== 0) {
    await store.dispatch('products/changeCountProduct', { id, count: product.count });
  } else {
    dialog.value = true;
  }
};
const type = async (id, count) => {
  if (count !== 0 && count != '') {
    await store.dispatch('products/changeCountProduct', { id, count });
    dialog.value = false;
  } else {
    await store.dispatch('products/changeCountProduct', { id, count: 1 });
    dialog.value = true;
  }
};

// Delete and checkout
const hapus = () => {
  console.log(selected.value);
};
const hapusSatu = () => {
  console.log(selected.value);
};
const checkout = () => {
  console.log(products.value);
};

// memantau perubahan
watch(
  selected,
  (newSelect) => {
    newSelect.length !== products.value.length
      ? (selectAll.value = false)
      : (selectAll.value = true);
    totalHarga.value = newSelect.reduce((total, product) => {
      return total + product.count * product.product_id.price;
    }, 0);
  },
  { deep: true },
);

const totalHarga = ref(0);

// membatasi inputan
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
</script>

<template>
  <v-container class="pa-0">
    <v-row justify="center" class="ma-0 mb-3">
      <v-col cols="11">
        <DialogVue
          v-show="dialog"
          @data="newDialog"
          :dialog="dialog"
          :id="idUserDelete"
          :name="productName"
        />
        <v-row align="center" class="bg-white">
          <v-col cols="2" v-show="!smAndUp">
            <ButtonBack />
          </v-col>
          <v-col cols="1"
            ><v-checkbox
              v-model="selectAll"
              @change="selectAllItems"
              color="teal"
              class="d-flex"
              style="max-width: fit-content"
            ></v-checkbox
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

        <v-row
          align="center"
          class="bg-white mt-md-7 mt-5"
          v-for="product in products"
          :key="product"
        >
          <v-col cols="1" :class="smAndUp ? '' : 'me-1 ps-0'"
            ><v-checkbox
              color="teal"
              class="d-flex overflow-x-smAndUp"
              style="max-width: fit-content"
              v-model="selected"
              :value="product"
            ></v-checkbox
          ></v-col>
          <v-col class="d-flex">
            <v-img :src="product.product_id.image" max-width="80" width="80"></v-img>
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
                  <span>{{ product.product_id.name }}</span>
                </v-col>
                <v-col
                  cols="12"
                  sm="2"
                  :class="!smAndUp ? 'text-start' : 'text-center'"
                  align-self="center"
                >
                  Rp{{ product.product_id.price.toLocaleString('id-ID') }}</v-col
                >

                <v-col
                  class="d-flex flex-row me-3"
                  :class="!smAndUp ? 'ps-2' : 'pa-0'"
                  sm="2"
                  align-self="center"
                >
                  <button
                    style="border: 1px solid teal; height: 28px; transform: translateY(2px)"
                    @click="
                      product.count > 0
                        ? plusMinus(product.product_id._id, 'minus', product.product_id.name)
                        : null
                    "
                  >
                    <v-icon color="grey">mdi-minus</v-icon>
                  </button>
                  <input
                    @keyup.enter="type(product.product_id._id, product.count)"
                    @keyup="type(product.product_id._id, product.count)"
                    @keypress="angka"
                    type="text"
                    v-model="product.count"
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
                    @click="
                      product.count < stock
                        ? plusMinus(product.product_id._id, 'plus', product.product_id.name)
                        : null
                    "
                  >
                    <v-icon color="grey">mdi-plus</v-icon>
                  </button>
                </v-col>
                <v-col class="text-teal" sm="2" v-show="smAndUp" align-self="center">
                  Rp{{ (product.product_id.price * product.count).toLocaleString('id-ID') }}</v-col
                >
                <v-col v-show="smAndUp" sm="1" align-self="center"
                  ><v-btn variant="text" icon="mdi-delete-outline" color="red" @click="hapusSatu">
                  </v-btn
                ></v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
        <v-row class="checkout bg-white">
          <v-col :cols="smAndUp ? 3 : 6" align-self="center">
            <v-checkbox
              v-model="selectAll"
              @change="selectAllItems"
              class="d-flex"
              color="teal"
              style="max-width: fit-content"
              :label="`Pilih Semua(${selected.length})`"
            ></v-checkbox>
          </v-col>
          <v-col align-self="center ms-3" v-if="smAndUp">
            <v-btn variant="text" @click="hapus"> hapus </v-btn>
          </v-col>
          <v-col align-self="center" v-if="smAndUp">
            Total({{ selected.length }} Produk):
            <span class="text-teal text-h5">Rp{{ totalHarga.toLocaleString('id-ID') }}</span>
          </v-col>
          <v-col cols="5" align-self="center" v-else>
            <p class="text-center mb-0">
              Total:
              <span class="text-teal text-h5">Rp{{ totalHarga.toLocaleString('id-ID') }}</span>
            </p>
          </v-col>
          <v-col align-self="center ms-3">
            <v-btn color="teal" :class="smAndUp ? '' : 'w-100'" @click="checkout"> Checkout </v-btn>
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
