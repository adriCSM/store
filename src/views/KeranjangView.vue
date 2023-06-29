<script>
import FooterView from '@/components/FooterView.vue';

import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: { FooterView },
  setup() {
    const store = useStore();
    const snackbar = ref(false);
    const deleteProduct = ref(false);
    const totalProductsPrice = ref(0);
    const selected = ref([]);

    const getProductsCart = async () => {
      await store.dispatch('productsStore/getProductsCart');
    };

    const changeCountProduct = async (productId, count) => {
      if (count == 0) {
        deleteProduct.value = true;
      } else {
        await store.dispatch('productsStore/changeCountProduct', { productId, count });
      }
    };

    onMounted(async () => {
      await getProductsCart();
    });

    const productsCart = computed(() => {
      const products = store.state.productsStore.cartProducts;
      return products;
    });

    const checkbox = () => {
      let totalProductPrice = 0;
      selected.value.map((product) => {
        totalProductPrice += parseInt(product.product_id.price) * product.count;
      });
      totalProductsPrice.value = totalProductPrice;
    };

    const onChangeCount = async (productId, count) => {
      await changeCountProduct(productId, count);
      checkbox();
    };

    const changeCount = async (productId, count) => {
      await changeCountProduct(productId, count);
      checkbox();
    };

    const deleteProductInCart = (boolean) => {
      if (!boolean) {
        productsCart.value.find((product) => {
          if (product.count == 0) {
            product.count = 1;
          }
        });
        checkbox();
      } else {
        const productsCartDelete = productsCart.value.filter((e) => {
          return e.count == 0;
        });
        productsCartDelete.map(async (product) => {
          await store.dispatch('productsStore/deleteProductsCart', product.product_id._id);
        });
      }
      deleteProduct.value = false;
    };

    const min = (product) => {
      if (product.count > 0) {
        product.count--;
        changeCountProduct(product.product_id._id, product.count);
        checkbox();
      }
      if (product.count == 0) {
        deleteProduct.value = true;
      }
    };
    const plus = (product) => {
      if (product.count < 99) {
        product.count++;
        changeCountProduct(product.product_id._id, product.count);
        checkbox();
      }
    };

    return {
      productsCart,
      snackbar,
      changeCountProduct,
      changeCount,
      onChangeCount,
      selected,
      checkbox,
      totalProductsPrice,
      deleteProductInCart,
      deleteProduct,
      min,
      plus,
    };
  },
};
</script>
<template>
  <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-main class="d-flex flex-column">
        <v-container fluid class="overflow-y-auto bg-white">
          <v-row
            dense
            class="bg-white d-flex align-center"
            v-for="product in productsCart"
            :key="product"
          >
            <v-col cols="1">
              <v-checkbox
                class="checkbox"
                color="teal"
                @change="checkbox()"
                v-model="selected"
                :value="product"
              >
              </v-checkbox>
            </v-col>
            <v-col cols="2">
              <v-img :src="product.product_id.image"></v-img>
            </v-col>
            <v-col cols="6" class="ps-5">
              <v-row>
                <v-title>{{ product.product_id.name }}</v-title>
              </v-row>
              <v-row>
                <v-subtitle class="text-teal"
                  >Rp.{{ parseInt(product.product_id.price).toLocaleString('id-ID') }}</v-subtitle
                >
              </v-row>
            </v-col>
            <v-col cols="1" class="d-flex align-center"
              ><v-btn
                @click="min(product)"
                icon="mdi-minus"
                color="teal"
                height="22"
                width="22"
              ></v-btn
            ></v-col>
            <v-col cols="1" class="custom-input mt-5 pa-0">
              <v-text-field
                color="teal"
                type="number"
                min="0"
                max="99"
                v-model="product.count"
                @keyup="changeCount(product.product_id._id, product.count)"
                @change="onChangeCount(product.product_id._id, product.count)"
                variant="solo-filled"
              ></v-text-field>
            </v-col>
            <v-col cols="1 " class="d-flex align-center"
              ><v-btn
                icon="mdi-plus"
                color="teal"
                height="22"
                width="22"
                @click="plus(product)"
              ></v-btn
            ></v-col>
            <v-divider class="ma-0 mb-2"></v-divider>
          </v-row>
        </v-container>
        <v-container class="bg-white mt-auto">
          <v-row class="d-flex align-center">
            <v-col cols="auto" class="ps-0">
              <v-title class="font-weight-bold">Total harga :</v-title>
            </v-col>
            <v-col cols="auto">
              <v-title class="font-weight-bold text-teal"
                >Rp
                {{ totalProductsPrice.toLocaleString('id-ID') }}
              </v-title>
            </v-col>

            <v-col cols="2" class="ms-auto me-3 pa-2">
              <v-btn color="teal" @click="snackbar = true">Pesan</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <FooterView></FooterView>

      <v-snackbar v-model="snackbar" vertical timeout="3000">
        <div class="text-subtitle-1 pb-2">Info</div>
        <p>Fitur ini masih dalam tahap pengembangan</p>
        <template v-slot:actions>
          <v-btn color="indigo" variant="text" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar v-model="deleteProduct" vertical timeout="36000">
        <div class="text-subtitle-1 pb-2">Delete Product</div>
        <p>Yakin untuk menghapus product dari keranjang?</p>
        <template v-slot:actions>
          <v-btn
            color="red"
            variant="text"
            @keyup.enter.prevent="deleteProductInCart(true)"
            @click.prevent="deleteProductInCart(true)"
          >
            Yes
          </v-btn>
          <v-btn color="indigo" variant="text" @click.prevent="deleteProductInCart(false)">
            No
          </v-btn>
        </template>
      </v-snackbar>
    </v-layout>
  </v-card>
</template>
<style scope>
.v-container--fluid {
  max-height: 85.3vh;
  min-height: 85.3vh;
}
.custom-input input[type='number']::-webkit-inner-spin-button,
.custom-input input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.custom-input input[type='number'] {
  text-align: center;
  padding: 0;
  -moz-appearance: textfield; /* Untuk Firefox */
}

.checkbox {
  left: 0;
  transform: translateY(-25px);
}
/* ===================================responsiv */

@media (max-width: 650px) {
  .content-transaksi {
    flex-wrap: wrap;
    width: 100vw;
  }
  .transaksi {
    padding: 1rem;
    box-sizing: border-box;
    width: 100vw;
  }
  .v-container--fluid {
    max-height: 84.4vh;
    min-height: 84.4vh;
  }
}
/* ===================================responsiv End*/
</style>
