<template>
    <div>
        <v-container>
            <v-card>
                <!-- <v-toolbar color="primary" dark>
                    <v-container>
                        <h4>Tambah Berita</h4>
                    </v-container>
                    <v-btn @click="modalTambahBerita = false" icon>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar> -->
                <v-card-title>
                    Tambah Berita
                </v-card-title>
                <v-container>
                    <v-form ref="form" @submit.prevent="postBerita()">
                        <v-row>
                            <v-col align-self="center" cols="6">
                                <v-text-field v-model="berita.judul" label="Judul Berita" dense :rules="[rules.required]"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select :items="listKategoriBerita" item-text="nama" item-value="id" v-model="berita.kategori" dense label="Kategori" :rules="[rules.required]"></v-select>
                            </v-col>
                            <!-- <v-col>
                                <v-text-field v-model="berita.kategori" label="Kategori" dense :rules="[rules.required]"></v-text-field>
                            </v-col> -->
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-textarea v-model="berita.isi" counter auto-grow filled label="Isi Berita" :rules="[rules.required]"></v-textarea>
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
                                <v-btn type="submit" @click="postBerita()" x-large block color="primary">Submit</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
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
            previewImage: null,
            berita: {
                judul: '',
                kategori: '',
                isi: '',
                file: null
            },
            rules: {
                required: (value) => !!value || "Required."
            },
            listKategoriBerita: [],
        }
    },
    methods: {
        getImage(namaGambar) {
            return require(`@/assets/${namaGambar}`)
        },
        uploadGambar(e) {
            this.berita.file = e.target.files[0]
            let preview = e.target.files[0]
            this.previewImage = URL.createObjectURL(preview)
        },
        postBerita () {
            if (this.$refs.form.validate()) {
                const formData = new FormData()
                formData.append('judul', this.berita.judul)
                formData.append('kategori', this.berita.kategori)
                formData.append('isi', this.berita.isi)
                formData.append('file', this.berita.file)
                if (this.berita.file == null) {
                    Swal.fire({
                    icon: "error",
                    text: "Mohon Masukkan Gambar",
                    });
                    return;
                } else {
                    Swal.fire({
                            title: 'Apa Anda Yakin?',
                            text: "Anda Akan Menyimpan ini",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes'
                            }).then((result) => {
                                if(result.isConfirmed) {
                                    this.$http.post('/berita/tambah', formData).then((response) => {
                                        Swal.fire({
                                            icon: response.data.icon,
                                            title: response.data.title,
                                            text: response.data.text
                                        }).then(() => {
                                            this.clearForm()
                                            this.$router.push(`/setting/berita`)
                                        })
                                    })
                                }
                            })
                }
            }
        },
        clearForm () {
            this.berita.judul = ''
            this.berita.kategori = ''
            this.berita.isi = ''
            this.previewImage = null
        },
        getKategoriBerita() {
            this.$http.post('ref/kategori/browse').then((response) => {
                this.listKategoriBerita = response.data
            })
        }
    },
    mounted () {
        this.getKategoriBerita()
    }
}
</script>