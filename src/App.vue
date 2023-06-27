<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
#app {
  height: 100vh;
}
main {
  min-height: 100vh;
  /* background-image: url('./assets/utsman-media-QOqwoaWqqn8-unsplash.jpg'); */
  /* background-size: cover;
    background-repeat: no-repeat; */
  /* background-position-y: 100%; */
  background-color: #1d212b;
  filter: brightness(90%);
}
</style>
