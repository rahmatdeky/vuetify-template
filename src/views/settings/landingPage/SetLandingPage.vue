<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card elevation="2">
                        <v-card-title>Setting Landing Page</v-card-title>
                        <v-container>
                            <v-row>
                                <v-col cols="10">
                                    <v-carousel height="400" hide-delimiters>
                                        <v-carousel-item v-for="(item, index) in usedCarouselImage" :key="index" :src="UrlGambarBerita + item.url_gambar" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                            <div class="carousel-text">
                                            <small style="font-weight: bold; color: yellow;">{{ item.tanggal_berita }}</small>
                                            <h2 style="font-weight: bold; color: white;">{{item.judul_berita}}</h2>
                                            </div>
                                        </v-carousel-item>
                                    </v-carousel>
                                </v-col>
                                <v-col cols="2">
                                    <v-btn link to="/setting/landingpage/carousel" class="primary">Setting</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <v-card elevation="2">
                                        <v-img :src="UrlGambarBerita + seri1.url_gambar" height="200px" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                            <v-btn @click="openModalH1()" color="warning" class="float-end" style="position: absolute; top: 0; right: 0;">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-row>
                                                <v-col>
                                                    <v-container class="align-end">
                                                        <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri1.tanggal_berita }}</v-card-subtitle>
                                                        <v-card-title class="m-0 p-0">{{ seri1.judul_berita }}</v-card-title>
                                                    </v-container>
                                                </v-col>
                                            </v-row>
                                        </v-img>
                                    </v-card>
                                </v-col>
                                <v-col cols="4">
                                    <v-card elevation="2">
                                        <v-img :src="UrlGambarBerita + seri2.url_gambar" height="200px" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                            <v-btn @click="openModalH2()" color="warning  " class="float-end" style="position: absolute; top: 0; right: 0;">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-row>
                                                <v-col>
                                                    <v-container class="align-end">
                                                        <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri2.tanggal_berita }}</v-card-subtitle>
                                                        <v-card-title class="m-0 p-0">{{seri2.judul_berita}}</v-card-title>
                                                    </v-container>
                                                </v-col>
                                            </v-row>
                                        </v-img>
                                    </v-card>
                                </v-col>
                                <v-col cols="4">
                                    <v-card elevation="2">
                                        <v-img :src="UrlGambarBerita + seri3.url_gambar" height="200px" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                            <v-btn @click="openModalH3()" color="warning  " class="float-end" style="position: absolute; top: 0; right: 0;">
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-row>
                                                <v-col>
                                                    <v-container class="align-end">
                                                        <v-card-subtitle class="m-0 p-0" style="color: yellow;">{{ seri3.tanggal_berita }}</v-card-subtitle>
                                                        <v-card-title class="m-0 p-0">{{seri3.judul_berita}}</v-card-title>
                                                    </v-container>
                                                </v-col>
                                            </v-row>
                                        </v-img>
                                    </v-card>
                                </v-col>
                            </v-row>
                            <v-dialog v-model="modalHighlight" max-width="800">
                                <v-card elevation="2">
                                    <v-card-title>{{ seri === 1 ? 'Seri 1' : seri === 2 ? 'Seri 2' : 'Seri 3' }}</v-card-title>
                                    <v-container>
                                        <v-row v-for="(data, index) in dataBerita.data" :key="index">
                                            <v-col cols="4">
                                                <img class="img-thumbnail" :src="UrlGambarBerita + data.nama_file" alt="">
                                            </v-col>
                                            <v-col cols="6">
                                                <p>{{ data.judul_berita }}</p>
                                            </v-col>
                                            <v-col cols="2">
                                                <v-btn @click="selectBerita(data.id_berita, data.judul_berita, data.tanggal_berita, data.nama_file)" class="primary">select</v-btn>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-btn-toggle rounded dense class="float-right">
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
                            </v-dialog>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<style scoped>
  .carousel-item:hover {
    cursor: pointer;
    background-color: #e0e0e0;
  }

  .carousel-text {
    position: absolute;
    bottom: 50px;
    left: 50px;
  }
</style>
<script>
import Swal from 'sweetalert2'
  export default {
    data () {
      return {
        UrlGambarBerita: window.UrlGambarBerita,
        usedCarouselImage: [],
        modalHighlight: false,
        seri: '',
        dataBerita: [],
        seri1:[],
        seri2:[],
        seri3:[],
      }
    },
    created () {
      this.getCarouselImg()
      this.getHighlight()
    },
    methods: {
      getCarouselImg () {
          this.$http.get('/page/landing/carousel/image/used').then((response) => {
              this.usedCarouselImage = response.data
          })
      },
      openModalH1 () {
        this.modalHighlight = true
        this.seri = 1
        this.getDataBerita()
      },
      openModalH2 () {
        this.modalHighlight = true
        this.seri = 2
        this.getDataBerita()
      },
      openModalH3 () {
        this.modalHighlight = true
        this.seri = 3
        this.getDataBerita()
      },
      getDataBerita (page) {
        if (typeof page === 'undefined') {
            page = '/berita/guest/browse?page=1'
        }
        this.$http.get(page).then((response) => {
            this.dataBerita = response.data
        })
      },
      selectBerita (idBerita, judulBerita, tanggalBerita, url) {
        Swal.fire({
        title: 'Apa Anda Yakin?',
        text: "Anda Akan Memilih ini",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    id_berita: idBerita,
                    judul_berita: judulBerita,
                    tanggal_berita: tanggalBerita,
                    url_gambar: url,
                    seri: this.seri
                }
                this.$http.put('/page/landing/highlihgt/change', data).then((response) => {
                    Swal.fire({
                    icon: response.data.icon,
                    title: response.data.title,
                    text: response.data.text
                    }).then(() => {
                        this.modalHighlight = false
                        this.getHighlight()
                    })
                })
            }
        })
      },
      getHighlight () {
        // this.$http.get('/page/landing/highlihgt/get').then((response) => {
        //     console.log(response.data)
        // })
        this.$http.get('/page/landing/highlihgt/get').then((response) => {
            this.seri1 = response.data.seri1
            this.seri2 = response.data.seri2
            this.seri3 = response.data.seri3
        })
      }
    }
  }
</script>