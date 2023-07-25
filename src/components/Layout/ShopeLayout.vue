<script setup>
import CrouselLayoutVue from '@/components/CrouselLayout.vue';
import router from '@/router';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

if (!store.state.products.data) {
  onMounted(async () => {
    await store.dispatch('products/getProducts');
  });
}
const products = computed(() => store.state.products.data);

const detail = (id) => {
  router.push({ name: 'Detail Product', params: { id } });
};
</script>

<template>
  <v-container fluid class="d-flex justify-center align-center flex-column pa-0">
    <v-row class="w-100 py-5 bg-white" justify="center">
      <v-col md="10">
        <CrouselLayoutVue />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="10">
        <v-row class="my-1">
          <v-col class="bg-white py-0"
            ><div class="text-h5 my-0 text-teal">Produk</div></v-col
          ></v-row
        >
        <v-row dense justify="left" v-if="products">
          <v-col cols="6" md="2" sm="2" v-for="product in products" :key="product">
            <v-card height="230" class="pb-2" color="#FFFFFF" @click="detail(product._id)">
              <v-img :src="product.image" width="170" cover></v-img>
              <v-card-title class="text-capitalize text-start ps-2" style="font-size: 12px">
                {{ product.name }}
              </v-card-title>
              <div class="d-flex justify-space-between mx-2">
                <v-card-title class="text-teal">
                  Rp
                  <span style="font-size: 15px">{{
                    parseInt(product.price).toLocaleString('id-ID')
                  }}</span>
                </v-card-title>
                <v-card-title> 20 Terjual </v-card-title>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row dense justify="left" v-if="products">
          <v-col cols="6" md="2" sm="2" v-for="product in products" :key="product">
            <v-card height="230" class="pb-2" color="#FFFFFF" @click="detail(product._id)">
              <v-img :src="product.image" width="170" cover></v-img>
              <v-card-title class="text-capitalize text-start ps-2" style="font-size: 12px">
                {{ product.name }}
              </v-card-title>
              <div class="d-flex justify-space-between mx-2">
                <v-card-title class="text-teal">
                  Rp
                  <span style="font-size: 15px">{{
                    parseInt(product.price).toLocaleString('id-ID')
                  }}</span>
                </v-card-title>
                <v-card-title> 20 Terjual </v-card-title>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card-title {
  font-size: 12px;
  padding: 0;
  text-align: center;
  height: 25px;
}
.v-card-subtitle {
  font-size: 10px;
  margin: 0 0 10px 0;
  text-align: center;
}
</style>
