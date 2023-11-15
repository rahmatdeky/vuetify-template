<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card elevation="2">
                        <v-card-title>Setting Carousel</v-card-title>
                        <v-container>
                            <v-row>
                                <v-col cols="10"></v-col>
                                <v-col cols="2">
                                    <v-btn @click="openModalAddCarousel()" class="primary">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Gambar</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(data, index) in usedCarouselImage" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td><v-img max-width="200" max-height="200" class="img-thumbnail" :src="UrlGambarBerita + data.url_gambar" alt=""></v-img>
                                                </td>
                                                <td>
                                                    <v-btn @click="deleteImageUsed(data.id)" icon outlined color="red">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn link to="/setting/landingpage" class="secondary float-right">
                                        <v-icon>mdi-keyboard-backspace</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
            <v-dialog max-width="800" v-model="carouselModal">
                <v-card elevation="2">
                    <v-toolbar color="primary" class="text-white"><h2>Add Carousel Image</h2></v-toolbar>
                    <v-container>
                        <v-row>
                            <v-col>
                                <h5>List Gambar</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>gambar</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, index) in filteredRefImgCarousel" :key="index">
                                            <td>
                                                <v-img max-width="200" max-height="200" class="img-thumbnail" :src="UrlGambarBerita + data.nama_file" alt=""></v-img>
                                            </td>
                                            <td>
                                                <v-btn @click="addImgCarousel(data.nama_file, data.id_berita, data.judul_berita, data.tanggal_berita)" icon outlined color="green">
                                                    <v-icon>mdi-plus</v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <v-btn-toggle rounded dense>
                                    <v-btn color="primary">
                                        prev
                                    </v-btn>
                                    <v-btn>
                                    </v-btn>
                                    <v-btn color="primary">
                                        next
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                        <v-row>
                            <hr>
                        </v-row>
                        <v-row>
                            <v-col>
                                <h5>Gambar Akan Ditambahkan</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>gambar</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(data, index) in ImgCarousel" :key="index">
                                            <td>
                                                <v-img max-width="200" max-height="200" class="img-thumbnail" :src="UrlGambarBerita + data.url" alt=""></v-img>
                                            </td>
                                            <td>
                                                <v-btn @click="deleteImageAdded(index)" icon outlined color="red">
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn @click="saveAddCarousel()" x-large block color="primary">Simpan</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
    export default {
        data() {
            return {
                UrlGambarBerita: window.UrlGambarBerita,
                carouselModal: false,
                refImgCarousel: [],
                ImgCarousel: [],
                usedCarouselImage: []
            }
        },
        created () {
            this.getCarouselImg()
        },
        methods: {
            openModalAddCarousel () {
                this.carouselModal = true,
                this.getRefImg()
            },
            getRefImg (page) {
                if (typeof page === 'undefined') {
                    page = '/page/landing/carousel/image?page=1'
                }
                this.$http.get(page).then((response) => {
                    this.refImgCarousel = response.data
                })
            },
            addImgCarousel (namaFile, idBerita, judulBerita, tanggalBerita) {
                this.ImgCarousel.push({
                    url: namaFile,
                    id_berita: idBerita,
                    judul_berita: judulBerita,
                    tanggal_berita: tanggalBerita
                })
            },
            deleteImageAdded (index) {
                this.ImgCarousel.splice(index, 1)
            },
            isImageAdded(namaFile) {
                return this.ImgCarousel.some(img => img.url === namaFile)
            },
            saveAddCarousel () {
                Swal.fire({
                    title: 'Apa Anda Yakin?',
                    text: "Anda Akan Menyimpan Perubahan ini",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Create an array to store the URLs
                            var data = {
                                carouselData: this.ImgCarousel.map(img => {
                                    return {
                                        url: img.url,
                                        id_berita: img.id_berita,
                                        judul_berita: img.judul_berita,
                                        tanggal_berita: img.tanggal_berita
                                    }
                                })
                                // urls: this.ImgCarousel.map(img => img.url)
                            };
                            this.$http.post('/page/landing/carousel/image/add', data).then((response) => {
                                Swal.fire({
                                icon: response.data.icon,
                                title: response.data.title,
                                text: response.data.text
                                }).then(() => {
                                    this.carouselModal = false
                                    this.getCarouselImg()
                                })
                            })
                        }
                    })
            },
            getCarouselImg () {
                this.$http.get('/page/landing/carousel/image/used').then((response) => {
                    this.usedCarouselImage = response.data
                })
            },
            deleteImageUsed (id) {
                Swal.fire({
                    title: 'Apa Anda Yakin?',
                    text: "Anda Akan Menghapus ini",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if(result.isConfirmed) {
                        var data = {
                            id: id
                        }
                        this.$http.post('/page/landing/carousel/image/delete', data).then((response) => {
                            Swal.fire({
                                icon: response.data.icon,
                                title: response.data.title,
                                text: response.data.text
                                }).then(() => {
                                    this.getCarouselImg()
                                })
                        })
                    }
                })
            }
        },
        computed: {
            filteredRefImgCarousel () {
                return this.refImgCarousel.data ? this.refImgCarousel.data.filter(data => !this.isImageAdded(data.nama_file)) : [];
            }
        }
    }
</script>