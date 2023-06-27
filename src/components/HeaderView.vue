<template>
  <v-app-bar color="teal">
    <v-app-bar-title>
      <v-text-field
        @keyup.prevent="searchProduct"
        v-model="query"
        class="flex-full-width pt-5"
        density="comfortable"
        placeholder="Search "
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
</template>
<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const query = ref();
    const store = useStore();
    const searchProduct = async () => {
      await store.dispatch('productsStore/searchProduct', query.value);
    };
    const getProductsCart = async () => {
      await store.dispatch('productsStore/getProductsCart');
    };
    onMounted(async () => {
      await getProductsCart();
    });

    const contentValue = computed(() => {
      const count = store.state.productsStore.contentValue;
      return count;
    });
    return { searchProduct, query, contentValue };
  },
};
</script>
