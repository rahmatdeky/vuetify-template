<template>
    <div>
        <v-card elevation="2" min-height="460px">
            <v-toolbar dense color="primary" dark>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                Referensi Kategori Berita
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col cols="3">
                        <v-text-field v-model="search" label="Pencarian"></v-text-field>
                    </v-col>
                    <!-- <v-col align-self="center" cols="1">
                        <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-col> -->
                    <v-col>
                        <v-btn @click="openModalAddKategoriBerita()" class="float-end" color="primary">
                            <v-icon>mdi-plus</v-icon> Tambah
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-responsive class="overflow-y-auto" max-height="290">
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>Id Kategori</th>
                                    <th>Nama Kategori</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in filteredItems" :key="data.id">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ data.nama }}</td>
                                    <td>
                                        <v-btn @click="openModalEditKategoriBerita(data.id)" class="float-end" color="warning"
                                            outlined>
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-responsive>
                </v-row>
            </v-container>
        </v-card>
        <v-dialog v-model="modalAddKategoriBerita" width="500">
            <v-card>
                <v-toolbar color="primary" dark>Tambah Kategori</v-toolbar>
                <v-container>
                    <v-form ref="formAddKategoriBerita" @submit.prevent="saveNewKategori()">
                        <v-row>
                            <v-col>
                                <v-text-field label="Nama Kategori" v-model="newKategori.namaKategori"
                                    :rules="[rules.required]"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn type="submit" class="float-end" color="primary" dark
                                    @click="saveNewKategori()">Simpan</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modalEditKategoriBerita" width="500">
            <v-card>
                <v-toolbar color="primary" dark>Edit Kategori</v-toolbar>
                <v-container>
                    <v-form ref="formEditKategoriBerita" @submit.prevent="saveEditKategori()">
                        <v-row>
                            <v-col>
                                <v-text-field label="Nama Kategori" v-model="selectedKategori.nama" :rules="[rules.required]"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn type="submit" class="float-end" color="primary" dark>Simpan</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            modalAddKategoriBerita: false,
            modalEditKategoriBerita: false,
            newKategori: {
                namaKategori: ''
            },
            rules: {
                required: (value) => !!value || "Required."
            },
            dataKategori: [],
            search: '',
            selectedKategori: {}
        }
    },
    methods: {
        openModalAddKategoriBerita() {
            this.modalAddKategoriBerita = true
        },
        openModalEditKategoriBerita(id) {
            this.modalEditKategoriBerita = true
            this.selectedKategori = this.dataKategori.find((data) => data.id === id)
        },
        saveNewKategori() {
            if (this.$refs.formAddKategoriBerita.validate()) {
                Swal.fire({
                    title: 'Apa Anda Yakin?',
                    text: "Anda Akan Menyimpan ini",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$http.post('ref/kategori/add', this.newKategori)
                            .then((response) => {
                                Swal.fire({
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                }).then(() => {
                                    this.modalAddKategoriBerita = false
                                    this.getKategoriBerita()
                                })
                            })
                    }
                })
            }
        },
        getKategoriBerita() {
            this.$http.post('ref/kategori/browse').then((response) => {
                this.dataKategori = response.data
            })
        },
        saveEditKategori() {
            if (this.$refs.formEditKategoriBerita.validate()) {
                Swal.fire({
                    title: 'Apa Anda Yakin?',
                    text: "Anda Akan Menyimpan ini",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.isConfirmed) {
                        var data = {
                            id: this.selectedKategori.id,
                            namaKategori: this.selectedKategori.nama
                        }
                        this.$http.post('ref/kategori/edit', data)
                            .then((response) => {
                                Swal.fire({
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                }).then(() => {
                                    this.modalEditKategoriBerita = false
                                    this.getKategoriBerita()
                                })
                            })
                    }
                })
            }
        }
    },
    mounted() {
        this.getKategoriBerita()
    },
    computed: {
        filteredItems() {
            return this.dataKategori.filter(item =>
                item.nama.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    }
}
</script>