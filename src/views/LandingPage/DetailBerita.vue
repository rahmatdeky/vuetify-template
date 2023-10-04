<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <h1 class="text-center">{{ detailBerita.judul_berita }}</h1>
                    <small>
                        <p class="text-center">
                            {{ detailBerita.tanggal_berita }}
                        </p>
                    </small>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-img :src="UrlGambarBerita + detailBerita.nama_file" load></v-img>
                    <!-- <img class="img-fluid" :src="UrlGambarBerita + detailBerita.nama_file"> -->
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <p>{{ detailBerita.isi_berita }}</p>
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
            UrlGambarBerita: window.UrlGambarBerita
        }
    },
    created () {
        this.getDetailBerita()
    },
    methods: {
        getDetailBerita() {
            this.$http.get('/berita/guest/detail/' + this.$route.params.id).then((response) => {
                this.detailBerita = response.data
            })
        }
    }
}
</script>