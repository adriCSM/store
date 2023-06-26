<template>
  <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-app-bar color="teal">
        <v-app-bar-title>
          <v-text-field
            @keyup.prevent="searchProduct"
            v-model="query"
            class="flex-full-width pt-5"
            density="comfortable"
            placeholder="Search products"
            prepend-inner-icon="mdi-magnify"
            rounded
            theme="light"
            variant="solo"
          ></v-text-field>
        </v-app-bar-title>

        <v-btn icon to="keranjang">
          <v-badge v-if="contentValue !== 0" :content="contentValue" color="error">
            <v-icon size="25">mdi-cart-outline</v-icon>
          </v-badge>

          <v-icon v-else size="25">mdi-cart-outline</v-icon>
        </v-btn>
      </v-app-bar>

      <v-main class="overflow-y-auto bg-white element">
        <v-container fluid>
          <v-row dense>
            <v-carousel cycle show-arrows="hover" height="200" class="mb-5 rounded-lg">
              <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover>
              </v-carousel-item>

              <v-carousel-item
                src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
                cover
              ></v-carousel-item>

              <v-carousel-item
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                cover
              ></v-carousel-item>
            </v-carousel>
          </v-row>
          <v-row v-if="!products.length" dense>
            <v-col>
              <h6 class="text-center">Tidak ada product dengan nama "{{ query }}""</h6>
            </v-col>
          </v-row>
          <v-row v-else dense>
            <v-col cols="4" v-for="product in products" :key="product">
              <v-dialog width="auto">
                <template v-slot:activator="{ props }">
                  <v-card max-height="150" v-bind="props">
                    <v-img :src="product.image" height="100px" cover></v-img>
                    <v-card-title> {{ product.name }} </v-card-title>

                    <v-card-subtitle>
                      Rp{{ parseInt(product.price).toLocaleString('id-ID') }}
                    </v-card-subtitle>
                  </v-card>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card>
                    <v-toolbar color="teal" :title="product.name"></v-toolbar>
                    <v-img :src="product.image" height="100%"></v-img>

                    <v-table height="200px" class="overflow-y-auto">
                      <tbody>
                        <tr>
                          <th>Product</th>
                          <td>{{ product.name }}</td>
                        </tr>
                        <tr>
                          <th>Price</th>
                          <td>Rp{{ parseInt(product.price).toLocaleString('id-ID') }}</td>
                        </tr>
                        <tr>
                          <th>Descriptions</th>
                          <td>belum ada</td>
                        </tr>
                      </tbody>
                    </v-table>
                    <v-card-actions class="justify-end">
                      <v-text-field
                        v-model="count"
                        variant="solo"
                        label="Jumlah"
                        type="number"
                        hide-details
                      ></v-text-field>
                      <v-btn
                        variant="text"
                        @click="addToCart(product._id), (isActive.value = false)"
                        color="green"
                      >
                        <v-icon size="30">mdi-cart-plus</v-icon>
                      </v-btn>
                      <v-btn variant="text" @click="isActive.value = false" color="red"
                        >Close</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
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
    </v-layout>
  </v-card>
</template>
<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '@/router';
export default {
  setup() {
    const snackbar = ref(false);
    const products = ref([]);
    const count = ref(1);
    const query = ref(null);

    const contentValue = ref(0);

    const error = (err) => {
      if (err.response.status == 401) {
        router.push({ name: 'login' });
      }
      console.log(err);
    };

    const getProducts = async () => {
      try {
        await axios.get('/products').then((response) => {
          products.value = response.data.data.products.sort((productA, productB) => {
            return productA.name.localeCompare(productB.name);
          });
        });
      } catch (err) {
        error(err);
      }
    };

    const searchProduct = () => {
      try {
        axios.get(`/products/?productName=${query.value}`).then((response) => {
          products.value = response.data.data.products.sort((productA, productB) => {
            return productA.name.localeCompare(productB.name);
          });
        });
      } catch (err) {
        error(err);
      }
    };

    const refreshAccessToken = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const tokenDecoded = jwtDecode(accessToken);
        const currentTime = new Date().getTime();
        if (currentTime > (tokenDecoded.iat + 13) * 1000) {
          await axios
            .put('/auth', {
              refreshToken: localStorage.getItem('refreshToken'),
            })
            .then((response) => {
              const neAccessToken = response.data.data.accessToken;
              localStorage.setItem('accessToken', neAccessToken);
            });
        }
      } catch (err) {
        error(err);
      }
    };

    const addToCart = async (productId) => {
      try {
        await refreshAccessToken();
        await axios.post(
          '/carts',
          {
            id: productId,
            count: parseInt(count.value),
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          },
        );
        count.value = 1;
        getProductsCart();
      } catch (err) {
        error(err);
      }
    };

    const getProductsCart = async () => {
      try {
        await refreshAccessToken();
        await axios
          .get('/carts/products', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            },
          })
          .then((response) => {
            contentValue.value = response.data.data.products.length;
          });
      } catch (err) {
        error(err);
      }
    };

    // const logOut = () => {
    //   axios
    //     .delete('/auth', {
    //       refreshToken: localStorage.getItem('refreshToken'),
    //     })
    //     .then(() => {
    //       localStorage.removeItem('accessToken');
    //       localStorage.removeItem('refreshToken');
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };

    onMounted(() => {
      getProducts();
      refreshAccessToken();
      getProductsCart();
    });

    return { products, addToCart, contentValue, snackbar, count, searchProduct, query };
  },
};
</script>
<style scoped>
.v-main {
  max-height: 100vh;
}
.v-card-title {
  font-size: 10px;
  padding: 0;
  text-align: center;
  height: 25px;
}
.v-card-subtitle {
  font-size: 10px;
  margin: 0 0 10px 0;
  text-align: center;
}
#text {
  color: white;
}

.element::-webkit-scrollbar {
  display: none; /* Lebar scrollbar */
}

.element::-webkit-scrollbar-track {
  background: transparent; /* Warna latar belakang track */
}
</style>
