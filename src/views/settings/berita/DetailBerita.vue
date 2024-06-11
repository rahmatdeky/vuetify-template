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
                            <v-container class="container-detail-berita-1">
                                <v-form ref="formEditBerita">
                                    <v-row>
                                        <v-col cols="2">Judul</v-col>
                                        <!-- <v-col><input v-model="editBerita.judul_berita" type="text" class="form-control" :disabled="isDisabled"></v-col> -->
                                        <v-col class="pb-0">
                                            <v-text-field v-model="editBerita.judul_berita" outlined dense :disabled="isDisabled" :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="2">Tanggal</v-col>
                                        <!-- <v-col><input v-model="editBerita.tanggal_berita" type="date" class="form-control" :disabled="isDisabled"></v-col> -->
                                        <v-col class="py-0">
                                            <v-text-field disabled :value="formatDate(editBerita.tanggal_berita)" outlined dense :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="2">Kategori</v-col>
                                        <!-- <v-col><input v-model="editBerita.kategori" type="text" class="form-control" :disabled="isDisabled"></v-col> -->
                                        <v-col class="py-0">
                                            <v-select :items="dataKategori" item-text="nama" item-value="id" v-model="editBerita.kategori" dense outlined :disabled="isDisabled" :rules="[rules.required]"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="2">Isi</v-col>
                                        <!-- <v-col><v-textarea :filled="isDisabled" :outlined="!isDisabled" auto-grow :readonly="isDisabled" v-model="editBerita.isi_berita" counter></v-textarea></v-col> -->
                                        <v-col><v-textarea outlined auto-grow :disabled="isDisabled" v-model="editBerita.isi_berita" counter :rules="[rules.required]"></v-textarea></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols=2>Gambar</v-col>
                                        <v-col v-if="isDisabled" cols="10">
                                            <v-img :src="editBerita.url_gambar" load></v-img>
                                        </v-col>
                                        <v-col v-if="!isDisabled" cols="2">
                                            <input type="file" class="form-control" @change="uploadGambar">
                                        </v-col>
                                        <v-col v-if="!isDisabled" cols="8">
                                            <v-img :src="previewImage" load></v-img>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                            <v-container class="container-detail-berita-2">
                                <v-form ref="formEditBerita">
                                    <v-row>
                                        <v-col cols="12" lg="2" md="2">Judul</v-col>
                                        <!-- <v-col><input v-model="editBerita.judul_berita" type="text" class="form-control" :disabled="isDisabled"></v-col> -->
                                        <v-col class="pb-0" lg="10" md="10" cols="12">
                                            <v-textarea rows="2" v-model="editBerita.judul_berita" outlined dense :disabled="isDisabled" :rules="[rules.required]"></v-textarea>
                                            <!-- <v-text-field v-model="editBerita.judul_berita" outlined dense :disabled="isDisabled" :rules="[rules.required]"></v-text-field> -->
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" lg="2" md="2">Tanggal</v-col>
                                        <!-- <v-col><input v-model="editBerita.tanggal_berita" type="date" class="form-control" :disabled="isDisabled"></v-col> -->
                                        <v-col class="py-0" lg="10" md="10" cols="12">
                                            <v-text-field disabled :value="formatDate(editBerita.tanggal_berita)" outlined dense :rules="[rules.required]"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" lg="2" md="2">Kategori</v-col>
                                        <!-- <v-col><input v-model="editBerita.kategori" type="text" class="form-control" :disabled="isDisabled"></v-col> -->
                                        <v-col class="py-0">
                                            <v-select :items="dataKategori" item-text="nama" item-value="id" v-model="editBerita.kategori" dense outlined :disabled="isDisabled" :rules="[rules.required]"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" lg="2" md="2">Isi</v-col>
                                        <!-- <v-col><v-textarea :filled="isDisabled" :outlined="!isDisabled" auto-grow :readonly="isDisabled" v-model="editBerita.isi_berita" counter></v-textarea></v-col> -->
                                        <v-col><v-textarea outlined auto-grow :disabled="isDisabled" v-model="editBerita.isi_berita" counter :rules="[rules.required]"></v-textarea></v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" lg="2" md="2">Gambar</v-col>
                                        <v-col v-if="isDisabled" cols="12" lg="10" md="10">
                                            <v-img :src="editBerita.url_gambar" load></v-img>
                                        </v-col>
                                        <v-col v-if="!isDisabled" cols="12" lg="2" md="2">
                                            <input type="file" class="form-control" @change="uploadGambar">
                                        </v-col>
                                        <v-col v-if="!isDisabled" cols="12" lg="8" md="8">
                                            <v-img :src="previewImage" load></v-img>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>
<style>
    .container-detail-berita-1 {
        display: block;
    }

    .container-detail-berita-2 {
        display: none;
    }

    @media screen and (max-width: 600px) {
        .container-detail-berita-1 {
            display: none;
        }

        .container-detail-berita-2 {
            display: block;
        }
        }
</style>
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
            previewImage: null,
            dataKategori: [],
            rules:{
                required: (value) => !!value || "Required."
            }
        }
    },
    created () {
        this.getDetailBerita()
        this.getKategoriBerita()
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
            this.editBerita.id_berita = this.detailBerita.id
            this.editBerita.judul_berita = this.detailBerita.judul
            this.editBerita.tanggal_berita = this.detailBerita.tanggal
            this.editBerita.kategori = this.detailBerita.kategori
            this.editBerita.isi_berita = this.detailBerita.deskripsi
            this.editBerita.url_gambar = this.UrlGambarBerita + this.detailBerita.gambar
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
            if (this.$refs.formEditBerita.validate()) {
                const formData = new FormData()
                formData.append('id_berita', this.editBerita.id_berita)
                formData.append('judul_berita', this.editBerita.judul_berita)
                formData.append('tanggal_berita', this.editBerita.tanggal_berita)
                formData.append('kategori', this.editBerita.kategori)
                formData.append('isi_berita', this.editBerita.isi_berita)
                formData.append('file', this.editBerita.file)
                formData.append('url', this.detailBerita.gambar)
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
                        this.$http.post('/berita/edit', formData)
                        .then((response) => {
                            if (response) {
                                Swal.fire({
                                icon: response.data.icon,
                                title: response.data.title,
                                text: response.data.text
                                }).then(() => {
                                    this.getDetailBerita(),
                                    this.toggleDisabled()
                                })
                            }
                        })
                    }else {
                        this.toggleDisabled()
                    }
                })
            }
        },
        formatDate(datetime) {
            const date = new Date(datetime);
            return date.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        },
        getKategoriBerita() {
            this.$http.post('ref/kategori/browse').then((response) => {
                this.dataKategori = response.data
            })
        }
    }
}
</script>