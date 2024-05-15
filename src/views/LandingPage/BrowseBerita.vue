<template>
    <div>
        <v-container>
            <v-row class="my-5">
                <v-col>
                    <v-card>
                        <v-container>
                            <v-row>
                                <v-col class="px-15">
                                    <h4 class="text-center">Berita Terpopuler</h4>
                                </v-col>
                            </v-row>
                            <v-row class="px-15 py-5">
                                <v-col cols="3" v-for="data in dataBeritaPopuler.slice(0,4)" :key="data.id">
                                    <v-card height="245px" @click="goTo(data.id)">
                                        <v-img :title="data.judul" height="100%" :src="UrlGambarBerita + data.gambar" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                            <v-row>
                                                <v-col>
                                                    <v-container class="align-end">
                                                        <v-btn style="cursor: default; pointer-events: none;" x-small color="success" rounded>{{ data.kategori.nama }}</v-btn>
                                                        <v-card-title class="m-0 p-0" style="word-wrap: normal; font-size: medium; overflow:hidden ; text-overflow: ellipsis; white-space: nowrap;">{{ data.judul }}</v-card-title>
                                                    </v-container>
                                                </v-col>
                                            </v-row>
                                        </v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card>
                        <v-container>
                            <v-row class="px-15">
                                <v-col cols="9">
                                    <h3 class="text-center">Berita Terbaru</h3>
                                </v-col>
                                <v-col cols="3">
                                    <h3 class="text-center">Kategori</h3>
                                </v-col>
                            </v-row>
                            <v-row class="px-11">
                                <v-col cols="9">
                                    <v-container>
                                        <v-row>
                                            <v-col cols="6" v-for="(data, index) in dataBerita.data.slice(0, 2)" :key="index">
                                                <v-card height="245px" @click="goTo(data.id)">
                                                    <v-img height="100%" :src="UrlGambarBerita + data.gambar" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                                        <v-row>
                                                            <v-col>
                                                                <v-container class="align-end">
                                                                    <v-btn style="cursor: default; pointer-events: none;" x-small color="success" rounded>{{ data.kategori.nama }}</v-btn>
                                                                    <v-card-title class="m-0 p-0" style="word-wrap: normal; font-size: medium;">{{ data.judul }}</v-card-title>
                                                                </v-container>
                                                            </v-col>
                                                        </v-row>
                                                    </v-img>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="6" v-for="(data, index) in dataBerita.data.slice(2, 4)" :key="index">
                                                <v-card height="245px" @click="goTo(data.id)">
                                                    <v-img height="100%" :src="UrlGambarBerita + data.gambar" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                                        <v-row>
                                                            <v-col>
                                                                <v-container class="align-end">
                                                                    <v-btn style="cursor: default; pointer-events: none;" x-small color="success" rounded>{{ data.kategori.nama }}</v-btn>
                                                                    <v-card-title class="m-0 p-0" style="word-wrap: normal; font-size: medium;">{{ data.judul }}</v-card-title>
                                                                </v-container>
                                                            </v-col>
                                                        </v-row>
                                                    </v-img>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-col>
                                <v-col cols="3">
                                    <v-container>
                                        <v-row>
                                            <v-col>
                                                <v-card min-height="514px" max-height="514px" color="rgb(241, 241, 248)" elevation="2" class="overflow-auto overflow-x-hidden py-2" >
                                                        <v-row v-for="(data, index) in dataKategori" :key="index">
                                                            <v-col class="d-flex justify-center mx-2">
                                                                <v-btn @click="getDataBeritaByKategori(data.id)" rounded block :disabled="isActive(data.id)" :color="isActive(data.id) ? 'secondary' : 'primary'" outlined>{{ data.nama }}</v-btn>
                                                            </v-col>
                                                        </v-row>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-col>
                            </v-row>
                            <v-row class="px-15">
                                <v-col>
                                    <v-btn-toggle rounded dense>
                                        <v-btn color="primary" @click="getDataBerita(dataBerita.prev_page_url)" :disabled="!dataBerita.prev_page_url">
                                            prev
                                        </v-btn>
                                        <v-btn>
                                            {{ dataBerita.current_page + '/' + dataBerita.last_page}}
                                        </v-btn>
                                        <v-btn color="primary" @click="getDataBerita(dataBerita.next_page_url)" :disabled="!dataBerita.next_page_url">
                                            next
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
    <!-- <div>
        <v-container>
            <v-row>
                <v-col>
                    <table class="table table-bordered">
                        <tr v-for="(data, index) in dataBerita.data" :key="index">
                            <td>
                                <v-row>
                                    <v-col>
                                        <h4>{{ data.judul_berita }}</h4>
                                        <small>{{ data.tanggal_berita }}</small>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <img class="img-thumbnail" :src="UrlGambarBerita + data.nama_file" alt="hiyaa gagal">
                                    </v-col>
                                    <v-col cols="6">
                                        <p>{{ data.isi_berita }}</p>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn link :to="'/berita/detail/' + data.id_berita" x-small color="primary">Selengkapnya >></v-btn>
                                    </v-col>
                                </v-row>
                            </td>
                        </tr>
                    </table>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn-toggle rounded dense>
                        <v-btn color="primary" @click="getDataBerita(dataBerita.prev_page_url)" :disabled="!dataBerita.prev_page_url">
                            prev
                        </v-btn>
                        <v-btn>
                            {{ dataBerita.current_page + '/' + dataBerita.last_page}}
                        </v-btn>
                        <v-btn color="primary" @click="getDataBerita(dataBerita.next_page_url)" :disabled="!dataBerita.next_page_url">
                            next
                        </v-btn>
                    </v-btn-toggle>
                </v-col>
            </v-row>
        </v-container>
    </div> -->
</template>
<script>
export default {
    data () {
        return {
            dataBerita: [],
            UrlGambarBerita: window.UrlGambarBerita,
            dataBeritaPopuler: [],
            dataKategori: [],
            activeButtonId: null
        }
    },
    created () {
        this.getDataBerita()
        this.getDataBeritaPopuler()
        this.getDataKategori()
    },
    methods: {
        getDataBerita (page) {
            if (typeof page === 'undefined') {
                page = '/berita/guest/browse?page=1'
            }
            this.$http.get(page).then((response) => {
                this.dataBerita = response.data
            })
        },
        getDataBeritaPopuler () {
            this.$http.get('/berita/guest/populer').then((response) => {
                this.dataBeritaPopuler = response.data
            })
        },
        getDataKategori () {
            this.$http.get('/ref/kategori/browse').then((response) => {
                this.dataKategori = response.data
            })
        },
        goTo(id) {
            this.$router.push('/berita/detail/' + id)
        },
        getDataBeritaByKategori (id) {
            if (!this.isActive(id)) {
                this.activeButtonId = id
                const page = `berita/guest/browse?page=1&id_kategori=${id}`
                this.getDataBerita(page)
            }
        },
        isActive(id) {
            return this.activeButtonId === id
        }
    }
}
</script>