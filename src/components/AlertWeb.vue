<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const errorPercent = ref(0);
const successPercent = ref(0);
const infoPercent = ref(0);
const error = computed(() => {
  if (store.state.error) {
    timer('error');
  }
  return store.state.error;
});
const success = computed(() => {
  if (store.state.success) {
    timer('success');
  }
  return store.state.success;
});
const info = computed(() => {
  if (store.state.info) {
    timer('info');
  }
  return store.state.info;
});

// timer
const timer = (mutation) => {
  if (mutation == 'error') {
    const id = setInterval(() => {
      errorPercent.value++;
      if (errorPercent.value > 100) {
        errorPercent.value = 0;
        store.commit(mutation, '');
        return clearInterval(id);
      }
    }, 40);
  }
  if (mutation == 'success') {
    const id = setInterval(() => {
      successPercent.value++;
      if (successPercent.value > 100) {
        successPercent.value = 0;
        store.commit(mutation, '');
        return clearInterval(id);
      }
    }, 40);
  }
  if (mutation == 'info') {
    const id = setInterval(() => {
      infoPercent.value++;
      if (infoPercent.value > 100) {
        infoPercent.value = 0;
        store.commit(mutation, '');
        return clearInterval(id);
      }
    }, 40);
  }
};
</script>

<template>
  <v-row style="max-width: 400px; position: fixed; z-index: 9999" class="mt-15">
    <v-col>
      <v-alert
        v-if="success"
        color="success"
        elevation="2"
        type="success"
        border="start"
        class="text-start text-white text-capitalize pa-3 w-auto mx-10 mt-5"
        >{{ success }}
        <v-progress-linear v-model="successPercent" color="white" absolute location="bottom">
        </v-progress-linear>
      </v-alert>
      <v-alert
        v-if="error"
        color="red"
        elevation="2"
        type="warning"
        border="start"
        class="text-start text-white text-capitalize pa-3 w-auto mx-10 mt-5"
        >{{ error }}
        <v-progress-linear v-model="errorPercent" color="white" absolute location="bottom">
        </v-progress-linear>
      </v-alert>
      <v-alert
        v-if="info"
        color="info"
        elevation="2"
        border="start"
        class="text-start text-white text-capitalize pa-3 w-auto mx-10 mt-5"
        >{{ info }}
        <v-progress-linear v-model="infoPercent" color="white" absolute location="bottom">
        </v-progress-linear>
      </v-alert>
    </v-col>
  </v-row>
</template>
