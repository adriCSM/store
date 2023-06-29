<template>
  <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
    <v-layout>
      <v-alert
        v-if="successMessage"
        color="success"
        elevation="2"
        type="success"
        border="start"
        class="message text-capitalize pb-3"
        >{{ successMessage }}
        <v-progress-linear v-model="progres_linear" bg-color="white" color="white">
        </v-progress-linear
      ></v-alert>

      <HeaderViewVue></HeaderViewVue>

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
          <v-row v-if="!data.products" dense>
            <v-col>
              <h6 class="text-center">"{{ query }}" tidak ditemukan.</h6>
            </v-col>
          </v-row>
          <v-row v-else dense>
            <v-col cols="4" v-for="product in data.products" :key="product">
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
                        @click.prevent="addToCart(product._id), (isActive.value = false)"
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

      <FooterView></FooterView>
    </v-layout>
  </v-card>
</template>
<script>
import HeaderViewVue from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
export default {
  components: { FooterView, HeaderViewVue },

  setup() {
    const snackbar = ref(false);
    const always = ref(true);
    const count = ref(1);
    const contentValue = ref(0);
    const store = useStore();
    const successMessage = ref(store.state.auth.successMessage);
    setTimeout(() => {
      successMessage.value = null;
    }, 5000);

    onMounted(async () => {
      await store.dispatch('productsStore/getProducts');
    });

    const addToCart = async (productId) => {
      await store.dispatch('productsStore/addToCart', { productId, count: count.value });
    };
    const data = computed(() => {
      const products = store.state.productsStore.products;
      const message = store.state.productsStore.message;
      return { products, message };
    });

    return { data, addToCart, contentValue, snackbar, count, successMessage, always };
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
