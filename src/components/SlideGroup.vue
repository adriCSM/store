<script setup>
import { ref, defineProps, computed } from 'vue';
import DialogImage from '@/components/DialogImage.vue';
const props = defineProps({
  image: String,
});
const image = computed(() => props.image);

const model = ref(null);
const dialog = ref(false);
</script>
<template>
  <v-sheet class="mx-auto" width="100%">
    <v-slide-group v-model="model" class="pt-3" selected-class="bg-success" show-arrows>
      <v-slide-group-item v-for="n in 5" :key="n" v-slot="{ toggle, selectedClass }">
        <v-img
          color="grey-lighten-1"
          :class="['ma-1', selectedClass]"
          height="50"
          width="50"
          @click="toggle, (dialog = true)"
          :src="image"
        >
          <DialogImage hidden :dialog="dialog" />
        </v-img>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>
