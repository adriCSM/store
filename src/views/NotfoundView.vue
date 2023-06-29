<template>
  <div class="min-vh-100 bg-white d-flex flex-column justify-center align-center">
    <div>
      <v-img src="../assets/errr.gif" alt="" width="400" />
    </div>
    <h1 class="font-weight-black">Page Not Found</h1>
    <strong class="text-error font-weight-light"
      ><h4>"{{ url }}"</h4>
    </strong>
    <v-btn @click="goBack()" color="info">Back to</v-btn>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import router from '@/router';
export default {
  setup() {
    const url = ref('');
    onMounted(() => {
      url.value = window.location.href;
    });

    const goBack = () => {
      router.go(-1);
    };

    return { url, goBack };
  },
};
</script>
