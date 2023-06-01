<template>
    <v-card max-width="448" class="mx-auto" color="grey-lighten-3">
        <v-layout>
            <v-app-bar color="teal">
                <v-app-bar-title>
                    <v-text-field
                        :items="items"
                        auto-select-first
                        class="flex-full-width pt-5"
                        density="comfortable"
                        item-props
                        menu-icon=""
                        placeholder="Search item"
                        append-inner-icon="mdi-magnify"
                        rounded
                        theme="light"
                        variant="solo"
                    ></v-text-field>
                </v-app-bar-title>

                <v-btn icon to="keranjang">
                    <v-icon>mdi-cart</v-icon>
                </v-btn>
            </v-app-bar>

            <v-main class="overflow-y-auto bg-white">
                <v-container fluid>
                    <v-row dense>
                        <v-carousel cycle show-arrows="hover" height="200" class="mb-5 rounded-lg">
                            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover> </v-carousel-item>

                            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

                            <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
                        </v-carousel>
                    </v-row>
                    <v-row dense>
                        <v-col cols="4" v-for="n in 8" :key="n">
                            <v-card max-height="150">
                                <v-img :src="require(`../assets/g${n}.jpg`)" height="100px" cover></v-img>

                                <v-card-title> Top western road trips </v-card-title>

                                <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>
                            </v-card>
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
export default {
    data() {
        return {
            snackbar: false,
            value: 1,
            n: [1, 2, 3, 4, 5, 6, 7, 8],
        };
    },
    methods: {},
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
</style>
