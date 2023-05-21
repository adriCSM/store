<template>
    <ListView />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import ListView from '../components/ListView.vue';

export default defineComponent({
    name: 'HomeView',

    components: {
        ListView,
    },
});
</script>
<style>
#app {
    height: 100vh;
}
main {
    min-height: 100vh;
    background-image: url('../assets/utsman-media-QOqwoaWqqn8-unsplash.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: 100%;
    filter: brightness(90%);
}
</style>
