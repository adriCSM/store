<template>
    <div v-if="Authorization">
        <!-- ------------------ NAV -->
        <v-app-bar color="teal">
            <template>
                <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
            </template>

            <v-app-bar-title><v-img src="../assets/logoam2.png" height="50" width="100"></v-img></v-app-bar-title>

            <v-spacer></v-spacer>

            <router-link to="keranjang" class="me-5">
                <v-btn icon>
                    <v-badge content="2" color="error">
                        <v-icon>mdi-cart</v-icon>
                    </v-badge>
                </v-btn>
            </router-link>
            <v-btn icon @click.stop="drawer = !drawer">
                <v-avatar :image="decoded.picture" size="45"></v-avatar>
            </v-btn>
        </v-app-bar>
        <!-- ------------------ NAV END-->

        <!-- ------------------ SIDEBAR & CONTENT -->

        <div class="container-baru">
            <aside class="sidebar-hide">
                <v-app-bar-nav-icon @click="hide"></v-app-bar-nav-icon>
                <div class="main-sidebar" v-if="product !== null">
                    <div v-for="item in product" :key="item">
                        <div v-if="item.count != 0" class="pesanan" @change="ubah">
                            <div>
                                <img :src="item.url_img" alt="a" width="40" height="40" />

                                <span>{{ item.title }}</span>
                                <p class="price">Rp{{ item.price.split('Rp').join('').split('/pcs')[0] }}</p>

                                <button class="icon-satu" @click="plus">+</button>
                                <input variant="text" type="number" class="text-center count" style="text-align: center; width: 20px; height: 20px" v-model="item.count" min="1" />
                                <button class="icon-dua" @click="minus">-</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="total text-white">
                    <div class="text-left text-capitalize">
                        <v-title> Total Harga:</v-title>
                        <v-subtitle> Rp{{ totalHarga.toLocaleString('id-ID') }}</v-subtitle>
                    </div>
                </div>
                <div class="nominal">
                    <v-form @submit.prevent>
                        <div class="text-left font-weight-bold" id="nominal">Nominal pembayaran</div>
                        <label for="bayar">Rp</label>
                        <input @keyup.enter="pesan" type="text" id="bayar" v-model="pembayaran" />
                        <!-- ----------------------------dialog -->
                        <v-dialog v-model="showModal" transition="dialog-top-transition" width="auto">
                            <template v-slot:activator="{ props }">
                                <v-btn color="success" class="button-pesan" block v-bind="props" @click="pesan">Pesan</v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">
                                <v-card>
                                    <v-toolbar color="info" title="Konfirmasi Pesanan"></v-toolbar>
                                    <v-card-text>
                                        <div class="text-subtitle">
                                            <div class="tabel d-flex align-top flex-column">
                                                <v-table>
                                                    <thead>
                                                        <tr>
                                                            <th class="text-left" rowspan="2">Total Harga</th>
                                                            <th class="text-left">Rp{{ totalHarga.toLocaleString('id-ID') }}</th>
                                                        </tr>
                                                    </thead>
                                                    <thead>
                                                        <tr>
                                                            <th class="text-left">Nominal Pembayaran</th>
                                                            <th class="text-left">Rp{{ parseInt(pembayaran).toLocaleString('id-ID') }}</th>
                                                        </tr>
                                                    </thead>
                                                    <thead>
                                                        <tr>
                                                            <th class="text-left">Kembalian</th>
                                                            <th class="text-left">Rp{{ (pembayaran - totalHarga).toLocaleString('id-ID') }}</th>
                                                        </tr>
                                                    </thead>
                                                </v-table>
                                            </div>
                                        </div>
                                    </v-card-text>
                                    <p class="text-center text-red" v-if="pembayaran - totalHarga < 0">Pembayaran kurang dari total harga</p>
                                    <v-card-actions class="justify-end">
                                        <v-btn variant="text" color="red" @click="isActive.value = false">Close</v-btn>
                                        <v-btn v-if="pembayaran - totalHarga >= 0 && totalHarga > 0" type="submit" variant="solo" color="success" @click="submit()">Konfirmasi</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </template>
                        </v-dialog>
                        <!-- ----------------------------dialog END-->
                    </v-form>
                </div>
            </aside>
            <section class="content">
                <v-card v-for="product in products" :key="product" class="mt-5 text-center card" @click="tambah">
                    <v-img class="align-end text-white img" :src="require('../assets/' + product.url)" cover />
                    <v-card-title class="title">{{ product.name.toString() }}</v-card-title>
                    <v-card-subtitle class="subtitle">Rp{{ parseInt(product.price).toLocaleString('id-ID') }} /pcs </v-card-subtitle>
                </v-card>
                <!-- <div class="modal-box">hallo</div> -->
            </section>

            <v-navigation-drawer v-model="drawer" temporary location="top" color="teal" theme="light">
                <template v-slot:prepend>
                    <v-list-item lines="two" :prepend-avatar="decoded.picture" :title="decoded.fullName" subtitle="Logged in"></v-list-item>
                </template>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-account" title="Profile" value="profile"></v-list-item>
                    <v-list-item prepend-icon="mdi-logout" title="Logout" value="logout" @click="logout"></v-list-item>
                </v-list>
            </v-navigation-drawer>
        </div>

        <!-- ------------------ SIDEBAR & CONTENT -->
    </div>
</template>
########################################################################################################################
<script scope>
import { onMounted, ref } from 'vue';
import getToken from '../function/refereshToken';
import router from '@/router';
import axios from 'axios';
import AutoNumeric from 'autonumeric';
import jwt_decode from 'jwt-decode';
export default {
    data() {
        return {
            drawer: null,
        };
    },
    setup() {
        const svg = ref(require('../assets/icons8-double-left-100.png'));
        const product = ref([]);
        const totalHarga = ref(0);
        const token = ref();
        const Authorization = ref(false);

        const products = ref([
            { name: '2 in 1 Toner and Micellar Water', url: 'r1.jpg', price: '90000' },
            { name: 'Facial Wash', url: 'r2.jpg', price: '85000' },
            { name: 'Rejuvenating Intenstive Cream', url: 'r3.jpg', price: '90000' },
        ]);

        const hide = () => {
            const sidebar = document.querySelector('.sidebar-baru');
            const hide = document.querySelector('.sidebar-hide');
            const card = document.querySelector('.main-sidebar');
            const nominal = document.querySelector('.nominal');
            const total = document.querySelector('.total');

            if (sidebar) {
                sidebar.setAttribute('class', 'sidebar-hide');
                card.style.display = 'none';
                nominal.style.display = 'none';
                total.style.display = 'none';
            } else {
                hide.setAttribute('class', 'sidebar-baru');
                card.style.display = 'block';
                nominal.style.display = 'block';
                total.style.display = 'block';
            }
        };

        const tambah = (e) => {
            const sidebar = document.querySelector('.sidebar-baru');
            const hide = document.querySelector('.sidebar-hide');
            const cards = document.querySelector('.main-sidebar');
            const nominal = document.querySelector('.nominal');
            const total = document.querySelector('.total');

            if (sidebar) {
                sidebar.setAttribute('class', 'sidebar-baru');
                cards.style.display = 'block';
                nominal.style.display = 'block';
                total.style.display = 'block';
            } else {
                hide.setAttribute('class', 'sidebar-baru');
                cards.style.display = 'block';
                nominal.style.display = 'block';
                total.style.display = 'block';
            }

            // const allCard = document.querySelectorAll('.card');
            const card = e.currentTarget.closest('.card');
            const title = card.querySelector('.title').innerHTML;
            const url_img = card.querySelector('img').src;
            const price = card.querySelector('.subtitle').innerHTML.split('Rp')[1].split('/pcs')[0];

            const cekProduct = product.value.find((a) => {
                return a.title == title;
            });

            if (cekProduct) {
                cekProduct.count++;
            } else {
                product.value.push({ title, count: 1, url_img, price });
            }
            const totals = product.value.reduce((prevalue, currVal) => {
                let jumlah = currVal.count;
                let harga = parseInt(currVal.price.split('.').join('')) * jumlah;
                return prevalue + harga;
            }, 0);

            totalHarga.value = totals;
        };

        const ubah = () => {
            const pesanan = document.querySelectorAll('.pesanan');
            let jumlah_berubah = [];
            pesanan.forEach((e) => {
                const price = e.querySelector('.price').innerHTML.split('Rp')[1].split('.').join('');
                const count = e.querySelector('.count').value;
                jumlah_berubah.push({ harga: price, count });
            });

            const total = jumlah_berubah.reduce((preVal, currVal) => {
                // preval dlm reduce adalah nilai awal sekaligus nilai hasil jumlah jka terjadi operasi matematik dari 2 element array
                return preVal + currVal.harga * currVal.count;
            }, 0);
            totalHarga.value = total;
        };

        // axios.interceptors.request.use(async())

        const decoded = ref();
        const pembayaran = ref(0);
        onMounted(async () => {
            getToken()
                .then((res) => {
                    console.log(res);
                    token.value = res.token;
                    decoded.value = jwt_decode(token.value).decoded;
                    Authorization.value = true;
                })
                .catch((err) => {
                    console.log(err);
                });

            const inputElement = document.getElementById('bayar');
            if (inputElement) {
                new AutoNumeric(inputElement, {
                    decimalCharacter: ',',
                    digitGroupSeparator: '.',
                });
            }
        });

        const totalPesanan = ref();
        const showModal = ref(false);

        const pesan = () => {
            showModal.value = true;
            const pesanan = document.querySelectorAll('.pesanan');
            let jumlah_berubah = [];
            pesanan.forEach((e) => {
                const price = e.querySelector('.price').innerHTML.split('Rp')[1];
                const count = e.querySelector('.count').value;
                const productName = e.querySelector('span').innerHTML;
                jumlah_berubah.push({ productName, harga: price, count });
            });

            totalPesanan.value = jumlah_berubah;
            if (pembayaran.value != 0) {
                pembayaran.value = pembayaran.value.split('.').join('');
            }
            if (pembayaran.value == '' || pembayaran.value == undefined) {
                pembayaran.value = 0;
            }
        };

        const submit = async () => {
            const response = await getToken();
            token.value = response.token;

            const transaksi = { totalHarga: totalHarga.value, pembayaran: parseInt(pembayaran.value.split('.').join('')), kembalian: pembayaran.value.split('.').join('') - totalHarga.value };
            const allTransaksi = { pesanan: totalPesanan.value, transaksi };
            try {
                await axios
                    .post(
                        '/data/pesanan',
                        {
                            arrayProduct: allTransaksi,
                        },
                        {
                            headers: {
                                Authorization: 'Bearer ' + token.value,
                            },
                        },
                    )
                    .then((items) => {
                        router.push({ name: 'keranjang', params: { message: items.data.message } });
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

                await axios.post('/wa/costumer', {
                    no: decoded.value.phoneNumber,
                    name: decoded.value.fullName,
                });
            } catch (err) {
                console.log(err.message);
            }
        };

        const plus = (e) => {
            const parent = e.target.closest('.pesanan');
            const titleKlik = parent.querySelector('span').innerHTML;
            const cekProduct = product.value.find((a) => {
                return a.title == titleKlik;
            });

            if (cekProduct) {
                cekProduct.count++;
            }
            const totals = product.value.reduce((prevalue, currVal) => {
                let jumlah = currVal.count;
                let harga = parseInt(currVal.price.split('.').join('')) * jumlah;
                return prevalue + harga;
            }, 0);

            totalHarga.value = totals;
        };
        const minus = (e) => {
            const parent = e.target.closest('.pesanan');
            const titleKlik = parent.querySelector('span').innerHTML;
            // MENGUBAH PROPERTI pada OBJECT OF ARRAY
            // mencari properti yang sesuai
            const cekProduct = product.value.find((a) => {
                return a.title == titleKlik;
            });

            // cekProduct berisi object yang ada pada array product

            if (cekProduct) {
                cekProduct.count--;
            }
            const totals = product.value.reduce((prevalue, currVal) => {
                let jumlah = currVal.count;
                let harga = parseInt(currVal.price.split('.').join('')) * jumlah;
                return prevalue + harga;
            }, 0);

            totalHarga.value = totals;
        };

        const logout = async () => {
            await axios
                .delete('/logout', {
                    withCredentials: true,
                })
                .then(() => {
                    router.push({ name: 'login' });
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        return { decoded, Authorization, logout, plus, minus, showModal, products, svg, hide, product, totalHarga, pembayaran, ubah, tambah, submit, pesan, totalPesanan };
    },
};
</script>
##############################################################################################################
<style scoped>
nav {
    backdrop-filter: blur(10px);
    background-color: #ffffff30;
    -webkit-backdrop-filter: blur(25px);
}

/* -------------------------------------------SIDEBAR DAN KONTEN */
.container-baru {
    max-height: 100vh;
    display: flex;
}
.exit {
    cursor: pointer;
}
.container-baru .sidebar-baru,
.sidebar-hide {
    backdrop-filter: blur(10px);
    background-color: #ffffff30;
    -webkit-backdrop-filter: blur(25px);
    height: 100vh;
    width: 400px;
    padding: 10px;
    box-sizing: border-box;
    text-align: end;
    transition: 0.5s;
}

.sidebar-hide {
    transition: 0.5s;
    width: 50px;
}
.sidebar-baru .main-sidebar {
    width: 100%;
    height: 60%;
    border-radius: 10px;
    margin: 0 auto;
    overflow: auto;
}

.pesanan {
    background-color: rgb(236, 233, 233);
    display: flex;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    margin-top: 10px;
    justify-content: left;
}
.pesanan span {
    margin: 5px auto;
    text-justify: left;
    text-align: center;
    text-transform: capitalize;
    line-height: 10px;
    position: absolute;
    transform: translate(10px, 0px);
}
.pesanan p {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(61px, 34px);
    opacity: 0.6;
    font-size: 14;
}
.pesanan input {
    position: absolute;
    right: 25px;
    align-items: center;
    transform: translateY(50%);
    min-width: 40px;
}

.pesanan input::-webkit-inner-spin-button,
.pesanan input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.icon-satu,
.icon-dua {
    z-index: 1;
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #38bdf8;
    right: 0;
    top: 0;
    transform: translate(-5px, 100%);
    display: flex;
    margin: auto;
    align-items: self-end;
    justify-content: center;
    border-radius: 20px;
    color: white;
    font-weight: bolder;
}

.icon-dua {
    transform: translate(-65px, 100%);
}

.nominal {
    margin-top: 10px;
    background-color: rgb(189, 185, 185);
    border-radius: 5px;
    transition: 0.5s;
    display: none;
    position: relative;
}

.nominal label {
    display: block;
    text-align: left;
}
.total {
    display: none;
}
.v-form #bayar {
    border-style: none;
    background-color: #fff;
    border-radius: 5px;
    width: 80%;
    position: absolute;
    left: 0;
    top: 0px;
    transform: translate(30px, 25px);
}
.nominal .v-btn {
    margin-top: 10px;
}
.namaProduct {
    text-transform: capitalize;
}
/* ---------------------------------------sidebar End */

/* ---------------------------------------content---------------------------------------------------------------*/
.container-baru .content {
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    overflow: auto;
    transition: flex-basis 5s all ease-in-out;
    min-height: 100vh;
}

@keyframes animate {
    from {
        transform: translateX(800px);
    }
    to {
        transform: translateX(0px);
    }
}

.card {
    padding: 2px;
    margin: 0px 5px 0px 5px;
    box-sizing: border-box;
    animation: animate 0.5s ease;
}

.img {
    width: 200px;
    height: 250px;
}
.card {
    width: 200px;
    height: 325px;
    box-shadow: -2px 2px 2px rgb(0, 0, 0, 0.5);
    transition: 0.5s;
}
.card:active {
    box-shadow: -10px 10px 10px rgb(0, 0, 0, 0.5);
    cursor: pointer;
}

/* ---------------------------------------content End*/

/* --------------------------------------------------------------------responsiv */
@media (max-width: 1000px) {
    .pesanan span {
        font-size: 14px;
    }
    .pesanan p {
        font-size: 12px;
    }
    #nominal {
        font-size: 14px;
    }

    .img {
        width: 150px;
        height: 200px;
    }
    .card {
        width: 150px;
        height: 250px;
    }
    .v-card .v-card-title {
        line-height: 12px;
        padding-bottom: 5px;
    }
    .card .v-card-subtitle {
        font-size: 11px;
    }
    .container-baru .sidebar-baru,
    .sidebar-hide {
        width: 370px;
    }
    .sidebar-hide {
        width: 50px;
    }
}

@media (max-width: 749px) {
    .pesanan span {
        width: 55%;
        font-size: 13px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .pesanan p {
        font-size: 12px;
    }
    .img {
        width: 150px;
        height: 150px;
    }
    .card {
        width: 150px;
        height: 200px;
    }
    .v-card .v-card-title {
        line-height: 12px;
        padding-bottom: 5px;
        font-size: 14px;
    }
    .card .v-card-subtitle {
        font-size: 10px;
    }

    .container-baru .sidebar-baru,
    .sidebar-hide {
        width: 900px;
    }
    .sidebar-hide {
        width: 50px;
    }
}
@media (max-width: 510px) {
    .pesanan input {
        transform: translateY(10%);
        font-size: 15px;
        min-width: 30px;
    }
    .pesanan p {
        transform: translate(50px, 30px);
        font-size: 9px;
    }
    .pesanan span {
        width: 55%;
        font-size: 13px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    img {
        width: 30px;
        height: 30px;
    }
    .icon-satu,
    .icon-dua {
        transform: translate(-5px, 65%);
    }
    .icon-dua {
        transform: translate(-55px, 65%);
    }

    .img {
        width: 105px;
        height: 100px;
    }
    .card {
        width: 105px;
        height: 150px;
    }
    .container-baru .sidebar-baru,
    .sidebar-hide {
        width: 1000px;
    }
    .sidebar-hide {
        width: 50px;
    }
    .v-card .v-card-title {
        line-height: 12px;
        padding-bottom: 5px;
        font-size: 12px;
    }
    .card .v-card-subtitle {
        font-size: 10px;
    }
}
@media (max-width: 359px) {
    .pesanan input {
        right: 20px;
        font-size: 14px;
        color: green;
        min-width: 15px;
    }
    .icon-satu,
    .icon-dua {
        transform: translate(0px, 65%);
    }
    .icon-dua {
        transform: translate(-40px, 65%);
    }
    .pesanan p {
        transform: translate(40px, 27px);
        font-size: 9px;
    }
    .pesanan span {
        font-size: 12px;
        width: 45%;
        white-space: nowrap;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .total v-title,
    .total v-subtitle {
        font-size: 12px;
    }
    #nominal {
        font-size: 12px;
    }

    img {
        width: 20px;
        height: 20px;
    }
    .v-form #bayar {
        width: 75%;
        transform: translate(30px, 20px);
    }
    .img {
        width: 100%;
        height: 80%;
    }
    .card {
        width: 250px;
        height: 300px;
    }
    .v-card .v-card-title {
        line-height: 12px;
        padding-bottom: 5px;
        font-size: 14px;
    }
    .card .v-card-subtitle {
        font-size: 16px;
    }

    sectiom .content {
        margin: 0px;
    }

    .container-baru .sidebar-baru,
    .sidebar-hide {
        width: 1000px;
    }
    .sidebar-hide {
        width: 50px;
    }
}
/* --------------------------------------------------------------------responsiv End*/

/* .router-link-active {
    background-color: #006994;
    border-radius: 10px;
} */
.router-link:hover {
    color: white;
}
</style>
