<script>
import { ref } from 'vue';
import axios from 'axios';
export default {
    setup() {
        const pesanan = ref([]);

        axios
            .get('/data')
            .then((items) => {
                const transaksi = items.data.data.pesanan;
                transaksi.map((e) => {
                    pesanan.value.push(e);
                });
            })
            .catch((err) => {
                console.log(err.message);
            });

        return {
            pesanan,
        };
    },
};
</script>
<template>
    <div>
        <!-- ------------------ NAV -->
        <nav class="navbar navbar-expand-lg navbar-transaksi">
            <div class="container">
                <router-link class="navbar-brand" to="/">Home</router-link>
                <div class="collapse navbar-collapse" id="navbarNav"></div>
            </div>
        </nav>
        <!-- ------------------ NAV END-->

        <div class="content-transaksi">
            <div class="transaksi satu" v-for="item in pesanan" :key="item">
                <div class="text-white font-weight-bold">
                    <span>Kode:{{ item.kode }} </span>
                </div>
                <div class="table-product">
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">Name Produk</th>
                                <th class="text-left">Harga</th>
                                <th class="text-center">unit/pcs</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in item.product.pesanan" :key="data">
                                <td>{{ data.productName }}</td>
                                <td>{{ parseInt(data.harga).toLocaleString('id-ID') }}</td>
                                <td class="text-center">{{ data.count }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>
                <v-table class="mt-5">
                    <thead>
                        <tr>
                            <th class="text-left">Total Harga</th>
                            <th class="text-left">Rp{{ item.product.transaksi.totalHarga.toLocaleString('id-ID') }}</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th class="text-left">Nomina Pembayaran</th>
                            <th class="text-left">Rp{{ item.product.transaksi.pembayaran.toLocaleString('id-ID') }}</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th class="text-left">Kembalian</th>
                            <th class="text-left">Rp{{ item.product.transaksi.kembalian.toLocaleString('id-ID') }}</th>
                        </tr>
                    </thead>
                </v-table>
            </div>
        </div>
    </div>
</template>
<style scope>
.navbar-transaksi {
    backdrop-filter: blur(10px);
    background-color: #ffffff30;
    -webkit-backdrop-filter: blur(25px);
}
/* position fixed */

.content-transaksi {
    display: flex;

    justify-content: space-around;
    padding: 0 10px;
    flex-wrap: wrap;
}

.transaksi {
    margin: 5px auto;
    background-color: #1d212b55;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(20px);
    padding: 1rem 2rem;
    box-sizing: border-box;
    width: 45%;
    border-radius: 10px;
    max-height: 550px;
}
.content-transaksi .table-product {
    border-radius: 10px;
    max-height: 300px;
    overflow: auto;
}

/* ===================================responsiv */

@media (max-width: 650px) {
    .content-transaksi {
        flex-wrap: wrap;
        width: 100vw;
    }
    .transaksi {
        padding: 1rem;
        box-sizing: border-box;
        width: 100vw;
    }
}
/* ===================================responsiv End*/
</style>
