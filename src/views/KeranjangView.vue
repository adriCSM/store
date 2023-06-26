<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import router from '@/router';
import jwt_decode from 'jwt-decode';
export default {
  setup() {
    const snackbar = ref(false);
    const productsCart = ref([]);
    const selected = ref([]);
    const deleteProduct = ref(false);

    const refreshAccessToken = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const tokenDecoded = jwt_decode(accessToken);
        const currentTime = new Date().getTime();
        if (currentTime > (tokenDecoded.iat + 14) * 1000) {
          const response = await axios.put('/auth', {
            refreshToken: localStorage.getItem('refreshToken'),
          });
          const accessToken = response.data.data.accessToken;
          localStorage.setItem('accessToken', accessToken);
        }
      } catch (err) {
        if (err.response.status == 401) {
          router.push({ name: 'login' });
        }
        console.log(err);
      }
    };

    const getProductsCart = async () => {
      try {
        await refreshAccessToken();
        const response = await axios.get('/carts/products', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        });

        productsCart.value = response.data.data.products.sort((productA, productB) => {
          return productA.product_id.name.localeCompare(productB.product_id.name);
        });
      } catch (err) {
        if (err.response.status == 401) {
          router.push({ name: 'login' });
        }
        console.log(err);
      }
    };

    const totalProductsPrice = ref(0);

    const checkbox = () => {
      let totalProductPrice = 0;
      selected.value.map((product) => {
        totalProductPrice += parseInt(product.product_id.price) * product.count;
      });
      totalProductsPrice.value = totalProductPrice;
    };

    const change = async (productId, count) => {
      if (count == 0) {
        deleteProduct.value = true;
      } else {
        deleteProduct.value = false;
        await refreshAccessToken();
        await axios.put(
          '/carts',
          {
            id: productId,
            count,
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          },
        );
      }
    };

    const onChangeCount = async (productId, count) => {
      try {
        await change(productId, count);
        checkbox();
      } catch (err) {
        if (err.response.status == 401) {
          router.push({ name: 'login' });
        }
        console.log(err);
      }
    };

    const changeCount = async (productId, count) => {
      try {
        await change(productId, count);
        checkbox();
      } catch (err) {
        if (err.response.status == 401) {
          router.push({ name: 'login' });
        }
        console.log(err);
      }
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
          await refreshAccessToken();
          await axios
            .delete('/carts/' + product.product_id._id, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
              },
            })
            .catch((err) => {
              if (err.response.status == 401) {
                router.push({ name: 'login' });
              }
              console.log(err);
            });
        });
        const newProductsCart = productsCart.value.filter((e) => {
          return e.count != 0;
        });
        productsCart.value = newProductsCart;
      }
      deleteProduct.value = false;
    };

    const min = (product) => {
      if (product.count > 0) {
        product.count--;
        change(product.product_id._id, product.count);
        checkbox();
      }
      if (product.count == 0) {
        deleteProduct.value = true;
      }
    };
    const plus = (product) => {
      if (product.count < 99) {
        product.count++;
        change(product.product_id._id, product.count);
        checkbox();
      }
    };

    onMounted(() => {
      refreshAccessToken();
      getProductsCart();
    });

    return {
      productsCart,
      snackbar,
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
              <v-title class="font-weight-bold"
                >Rp{{ totalProductsPrice.toLocaleString('id-ID') }}
              </v-title>
            </v-col>

            <v-col cols="2" class="ms-auto me-3 pa-2">
              <v-btn color="teal" @click="snackbar = true">Pesan</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-bottom-navigation v-model="value" active bg-color="teal" grow mode="shift">
        <v-btn value="home" to="home">
          <v-icon>mdi-home-outline</v-icon>
          Home
        </v-btn>

        <v-btn value="chat" @click="snackbar = true">
          <v-icon>mdi-chat-outline</v-icon>
          chat
        </v-btn>

        <v-btn value="akun" @click="snackbar = true">
          <v-icon>mdi-account-outline</v-icon>
          Akun
        </v-btn>
      </v-bottom-navigation>

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
            @keyup.enter="deleteProductInCart(true)"
            @click="deleteProductInCart(true)"
          >
            Yes
          </v-btn>
          <v-btn color="indigo" variant="text" @click="deleteProductInCart(false)"> No </v-btn>
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
