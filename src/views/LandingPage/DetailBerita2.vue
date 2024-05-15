<template>
    <div>
        <v-container>
            <v-row class="my-5">
                <v-col>
                    <v-card class="py-15">
                        <v-row class="px-15">
                            <v-col cols="8">
                                <v-row>
                                    <v-col>
                                        <h4>{{ detailBerita.judul }}</h4>
                                        <small>{{ detailBerita.tanggal }}</small>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-card height="515px">
                                            <v-img height="100%" :src="UrlGambarBerita + detailBerita.gambar"></v-img>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <p class="text-justify">{{ detailBerita.deskripsi }}</p>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="4" class="pt-15">
                                <v-row>
                                    <v-col>
                                        <div style="border-bottom: 1px solid grey;" class="m-0">
                                            <v-btn style="color: green !important;" text class="pl-0" disabled>Berita Populer</v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row v-for="(data, index) in dataBeritaPopuler" :key="index">
                                    <v-col cols="2">
                                        <v-btn link :to="'/berita/detail/' + data.id" small color="primary" style="border-radius: 20%;">
                                        {{ index + 1 }}</v-btn>
                                    </v-col>
                                    <v-col cols="10">
                                        <p class="my-0">{{ data.judul }}</p>
                                        <v-btn x-small text class="p-0 m-0" disabled style="color: green !important">{{ data.kategori.nama }}</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row class="mt-15">
                                    <v-col>
                                        <div style="border-bottom: 1px solid grey;" class="m-0">
                                            <v-btn style="color: green !important;" text class="pl-0" disabled>Berita Terbaru</v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                                <v-row v-for="data in dataBerita.data" :key="data.id">
                                    <v-col cols="4">
                                        <v-card height="100%">
                                            <v-img height="100%" :src="UrlGambarBerita + data.gambar"></v-img>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="8">
                                        <router-link style="text-decoration: none;" :to="'/berita/detail/' + data.id">
                                            <p class="my-0" style="color: black;">{{ data.judul }}</p>
                                            <small class="my-0" style="font-size: xx-small; color: green;">{{ data.tanggal }}</small>
                                        </router-link>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    data () {
        return {
            detailBerita: [],
            dataBerita: [],
            dataBeritaPopuler: [],
            UrlGambarBerita: window.UrlGambarBerita
        }
    },
    created () {
        this.getDetailBerita()
        this.getDataBerita()
        this.getDataBeritaPopuler()
    },
    methods: {
        getDetailBerita() {
            this.$http.get('/berita/guest/detail/' + this.$route.params.id).then((response) => {
                this.detailBerita = response.data
            })
        },
        getDataBerita(page) {
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
        }
    }
}
</script>