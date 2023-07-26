<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5 text-teal"> Anda yakin menghapus product ini? </v-card-title>
        <v-card-text class="text-center"> {{ name }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal" @click="klik('yes')"> Iya </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="klik('no')"> Tidak </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script setup>
import { defineProps, computed, defineEmits } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const props = defineProps({
  dialog: { type: Boolean, default: false },
  id: String,
  name: String,
});
const emit = defineEmits({
  data: Object,
});
const klik = async (event) => {
  if (event == 'yes') {
    await store.dispatch('products/deleteProductsCart', props.id);
  }
  emit('data', false);
};
const dialog = computed(() => props.dialog);
</script>
