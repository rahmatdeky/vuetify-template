<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card elevation="2">
                        <v-card-title> List Berita </v-card-title>
                        <v-container>
                            <v-form @submit.prevent="getListBerita()">
                                <v-row>
                                    <v-col cols="9" md="3" lg="3" class="order-2 order-md-1">
                                        <v-text-field v-model="search" label="Pencarian"></v-text-field>
                                    </v-col>
                                    <v-col align-self="center" cols="1" class="order-3 order-md-2">
                                        <v-btn type="submit" @click="getListBerita()" icon>
                                            <v-icon>mdi-magnify</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col class="order-1 order-md-3">
                                        <!-- <v-btn @click="openModalTambahBerita" class="float-end">
                                        <v-icon>mdi-plus</v-icon> Tambah Berita
                                        </v-btn> -->
                                        <v-btn link to="/setting/berita/tambah" class="float-end button-plus-1">
                                            <v-icon>mdi-plus</v-icon> Tambah Berita
                                        </v-btn>
                                        <v-btn title="Tambah Berita" link to="/setting/berita/tambah" class="float-end button-plus-2"
                                            color="primary" dark>
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                            <v-row>
                                <v-simple-table>
                                    <thead>
                                        <tr>
                                            <th>NO</th>
                                            <th>JUDUL BERITA</th>
                                            <th>TANGGAL</th>
                                            <th>KATEGORI</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(berita, index) in listBerita.data" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ berita.judul }}</td>
                                            <td>{{ formatDate(berita.created_at) }}</td>
                                            <td>{{ berita.kategori.nama }}</td>
                                            <td>
                                                <v-item-group class="float-right">
                                                    <v-btn class="mr-1 my-1" link :to="'/setting/berita/detail/' + berita.id"
                                                        outlined color="success">
                                                        <v-icon>mdi-magnify</v-icon>
                                                    </v-btn>
                                                    <v-btn @click="deleteBerita(berita.id)" outlined color="red">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                    <!-- <v-btn outlined color="warning">
                                                    <v-icon>mdi-square-edit-outline</v-icon>
                                                </v-btn> -->
                                                </v-item-group>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn-toggle rounded dense>
                                        <v-btn @click="getListBerita(listBerita.prev_page_url)"
                                            :disabled="!listBerita.prev_page_url" color="primary">
                                            prev
                                        </v-btn>
                                        <v-btn>
                                            {{ listBerita.current_page + '/' + listBerita.last_page }}
                                        </v-btn>
                                        <v-btn @click="getListBerita(listBerita.next_page_url)"
                                            :disabled="!listBerita.next_page_url" color="primary">
                                            next
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
                <v-dialog v-model="modalTambahBerita" fullscreen persistent>
                    <v-card>
                        <v-toolbar color="primary" dark>
                            <v-container>
                                <h4>Tambah Berita</h4>
                            </v-container>
                            <v-btn @click="modalTambahBerita = false" icon>
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-container>
                            <v-row>
                                <v-col align-self="center" cols="6">
                                    <v-text-field v-model="berita.judul" label="Judul Berita" dense></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field v-model="berita.kategori" label="Kategori" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-textarea v-model="berita.isi" counter auto-grow filled
                                        label="Isi Berita"></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <input type="file" class="form-control" @change="uploadGambar">
                                </v-col>
                                <v-col cols="8">
                                    <v-img :src="previewImage"></v-img>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <img :src="urlHasil" alt="" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn @click="postBerita()" x-large block color="primary">Submit</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-container>
    </div>
</template>
<style>
.button-plus-1 {
    display: flex;
}

.button-plus-2 {
    display: none;
}

@media screen and (max-width: 600px) {

    .button-plus-1 {
        display: none;
    }

    .button-plus-2 {
        display: flex;
    }
}
</style>
<script>
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            modalTambahBerita: false,
            previewImage: null,
            berita: {
                judul: '',
                kategori: '',
                isi: '',
                file: null
            },
            urlHasil: null,
            listBerita: [],
            search: ''
        }
    },
    methods: {
        openModalTambahBerita() {
            this.modalTambahBerita = true
        },
        getImage(namaGambar) {
            return require(`@/assets/${namaGambar}`)
        },
        uploadGambar(e) {
            this.berita.file = e.target.files[0]
            let preview = e.target.files[0]
            this.previewImage = URL.createObjectURL(preview)
        },
        postBerita() {
            const formData = new FormData()
            formData.append('judul', this.berita.judul)
            formData.append('kategori', this.berita.kategori)
            formData.append('isi', this.berita.isi)
            formData.append('file', this.berita.file)
            this.$http.post('/berita/tambah', formData).then((response) => {
                this.urlHasil = response.data.url
            }).then(() => {
                this.modalTambahBerita = false
            })
        },
        getListBerita(page) {
            if (typeof page === 'undefined') {
                page = '/berita/browse?page=1'
            }
            var data = {
                search: this.search
            }
            this.$http.post(page, data).then((response) => {
                this.listBerita = response.data
            })
        },
        deleteBerita(id) {
            Swal.fire({
                title: 'Apa Anda Yakin?',
                text: "Anda Tidak Dapat Mengembalikannya lagi",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = {
                        id_berita: id
                    }
                    this.$http.post('/berita/delete', data).then((response) => {
                        Swal.fire({
                            icon: response.data.icon,
                            title: response.data.title,
                            text: response.data.text
                        }).then(() => {
                            this.getListBerita()
                        })
                    })
                }
            })
        },
        formatDate(datetime) {
            const date = new Date(datetime);
            return date.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        }
    },
    created() {
        this.getListBerita()
    }
}
</script>