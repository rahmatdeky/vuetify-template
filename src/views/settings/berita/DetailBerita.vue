<template>
    <div>
        <v-container>
            <v-card>
                <v-toolbar elevation="0">
                    <v-container>
                        <v-row>
                            <v-col>
                                <h4>Detail Berita</h4>
                            </v-col>
                            <v-col>
                                <v-btn title="edit" v-if="isDisabled" @click="toggleDisabled" class="warning float-right">
                                    <v-icon>mdi-square-edit-outline</v-icon>
                                </v-btn>
                                <v-btn title="save" v-if="!isDisabled" @click="saveEdit" class="success float-right">
                                    <v-icon>mdi-check</v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-toolbar>
                <v-container>
                    <v-row>
                        <v-col>
                            <v-container>
                                <v-row>
                                    <v-col cols="2">Judul</v-col>
                                    <v-col><input v-model="editBerita.judul_berita" type="text" class="form-control" :disabled="isDisabled"></v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="2">Tanggal</v-col>
                                    <v-col><input v-model="editBerita.tanggal_berita" type="date" class="form-control" :disabled="isDisabled"></v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="2">Kategori</v-col>
                                    <v-col><input v-model="editBerita.kategori" type="text" class="form-control" :disabled="isDisabled"></v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="2">Isi</v-col>
                                    <v-col><v-textarea :filled="isDisabled" :outlined="!isDisabled" auto-grow :readonly="isDisabled" v-model="editBerita.isi_berita"></v-textarea></v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols=2>Gambar</v-col>
                                    <v-col v-if="isDisabled" cols="4">
                                        <v-img :src="editBerita.url_gambar" load></v-img>
                                    </v-col>
                                    <v-col v-if="!isDisabled" cols="4">
                                        <input type="file" class="form-control" @change="uploadGambar">
                                    </v-col>
                                    <v-col v-if="!isDisabled" cols="6">
                                        <v-img :src="previewImage"></v-img>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
    data () {
        return {
            detailBerita: [],
            UrlGambarBerita: window.UrlGambarBerita,
            editBerita: {
                id_berita: '',
                judul_berita: '',
                tanggal_berita: '',
                kategori: '',
                isi_berita: '',
                url_gambar: '',
                file: null
            },
            isDisabled: true,
            previewImage: null
        }
    },
    created () {
        this.getDetailBerita()
    },
    methods: {
        getDetailBerita() {
            this.$http.get('/berita/guest/detail/' + this.$route.params.id).then((response) => {
                this.detailBerita = response.data
            }).then(() => {
                this.reconData()
            })
        },
        reconData() {
            this.editBerita.id_berita = this.detailBerita.id_berita
            this.editBerita.judul_berita = this.detailBerita.judul_berita
            this.editBerita.tanggal_berita = this.detailBerita.tanggal_berita
            this.editBerita.kategori = this.detailBerita.kategori
            this.editBerita.isi_berita = this.detailBerita.isi_berita
            this.editBerita.url_gambar = this.UrlGambarBerita + this.detailBerita.nama_file
        },
        toggleDisabled () {
            this.isDisabled = !this.isDisabled
        },
        uploadGambar(e) {
            this.editBerita.file = e.target.files[0]
            let preview = e.target.files[0]
            this.previewImage = URL.createObjectURL(preview)
        },
        saveEdit () {
            const formData = new FormData()
            formData.append('id_berita', this.editBerita.id_berita)
            formData.append('judul_berita', this.editBerita.judul_berita)
            formData.append('tanggal_berita', this.editBerita.tanggal_berita)
            formData.append('kategori', this.editBerita.kategori)
            formData.append('isi_berita', this.editBerita.isi_berita)
            formData.append('file', this.editBerita.file)
            formData.append('url', this.detailBerita.nama_file)
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
                    this.$http.post('/berita/edit', formData).then((response) => {
                        if (response) {
                            Swal.fire({
                            icon: response.data.icon,
                            title: response.data.title,
                            text: response.data.text
                            })
                        }
                    })
                }
            }).then(
                this.toggleDisabled()
            )
        }
    }
}
</script>