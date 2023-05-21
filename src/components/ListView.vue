<template>
    <v-container class="d-flex justify-center align-center">
        <v-card id="card" width="400">
            <v-row class="text-center ma-10 my-16 mx-16">
                <v-col col="12">
                    <router-link to="shop/minuman">
                        <v-btn class="home" height="50" width="300"> Shop </v-btn>
                    </router-link>
                </v-col>
            </v-row>
            <v-row class="text-center ma-10 mx-16">
                <v-col col="12">
                    <router-link to="transaksi">
                        <v-btn class="home" height="50" width="300"> Transaksi </v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'HelloWorld',
    setup() {
        const klik = (e) => {
            console.log(e);
        };
        return { klik };
    },
};
</script>

<style>
.v-container {
    height: 100vh;
}
#card {
    background-color: #ffffff05;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(30px);
    border-radius: 30px;
    animation: menciut 0.3s linear 1;
}

@keyframes menciut {
    0% {
        transform: scale(0%);
    }

    100% {
        transform: scale(100%);
    }
}

.v-btn.home {
    background-color: #ffffff40;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(25px);
    border-radius: 30px;
    font-size: 18px;
    border: none;
}

.v-btn.home:hover {
    background-color: #006994;
    box-shadow: -5px 5px 5px 0px rgb(0, 0, 0, 0.5);
    color: white;
}

a {
    text-decoration: none;
    color: white;
    font-weight: bolder;
}
</style>
