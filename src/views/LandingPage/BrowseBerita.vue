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
                                <v-col cols="3" v-for="(data, index) in dataBerita.data.slice(0,4)" :key="index">
                                    <v-card height="245px">
                                        <v-img height="100%" :src="UrlGambarBerita + data.nama_file"></v-img>
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
                                                <v-card height="245px">
                                                    <v-img height="100%" :src="UrlGambarBerita + data.nama_file"></v-img>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="6" v-for="(data, index) in dataBerita.data.slice(2, 4)" :key="index">
                                                <v-card height="245px">
                                                    <v-img height="100%" :src="UrlGambarBerita + data.nama_file"></v-img>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-col>
                                <v-col cols="3">
                                    <v-container>
                                        <v-row>
                                            <v-col>
                                                <v-card>
                                                        <v-row>
                                                            <v-col class="d-flex justify-center mx-2">
                                                                <v-btn rounded block color="primary">tes</v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col class="d-flex justify-center mx-2">
                                                                <v-btn rounded block color="primary">tes</v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col class="d-flex justify-center mx-2">
                                                                <v-btn rounded block color="primary">tes</v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col class="d-flex justify-center mx-2">
                                                                <v-btn rounded block color="primary">tes</v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col class="d-flex justify-center mx-2">
                                                                <v-btn rounded block color="primary">tes</v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col class="d-flex justify-center mx-2">
                                                                <v-btn rounded block color="primary">tes</v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col class="d-flex justify-center mx-2">
                                                                <v-btn rounded block color="primary">tes</v-btn>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col class="d-flex justify-center mx-2">
                                                                <v-btn rounded block color="primary">tes</v-btn>
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
            UrlGambarBerita: window.UrlGambarBerita
        }
    },
    created () {
        this.getDataBerita()
    },
    methods: {
        getDataBerita (page) {
            if (typeof page === 'undefined') {
                page = '/berita/guest/browse?page=1'
            }
            this.$http.get(page).then((response) => {
                this.dataBerita = response.data
            })
        }
    }
}
</script>