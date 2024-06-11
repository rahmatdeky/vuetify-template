<template>
    <div>
        <v-card elevation="2" min-height="460px">
            <v-toolbar dense color="primary" dark>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                Referensi Kelurahan
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col cols="12" lg="3" md="3" class="order-2 order-md-1">
                        <v-text-field v-model="search" label="Pencarian"></v-text-field>
                    </v-col>
                    <v-col class="order-1 order-md-2">
                        <v-btn @click="openModalAddKelurahan()" class="float-end" color="primary">
                            <v-icon>mdi-plus</v-icon> Tambah
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>Id Kelurahan</th>
                                <th>Nama Kelurahan</th>
                                <th>Nama Kecamatan</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in filteredItems" :key="data.kode_kelurahan">
                                <td>{{ data.kode_kelurahan }}</td>
                                <td>{{ data.nama_kelurahan }}</td>
                                <td>{{ data.kecamatan.nama_kecamatan }}</td>
                                <td>
                                    <v-btn @click="openModalEditKelurahan(data.kode_kelurahan)" class="float-end" color="warning" outlined>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-row>
            </v-container>
        </v-card>
        <v-dialog v-model="modalAddKelurahan" width="500">
            <v-card>
                <v-toolbar color="primary" dark>Tambah Kelurahan</v-toolbar>
                <v-container>
                    <v-form ref="formAddKelurahan" @submit.prevent="saveNewKelurahan()">
                        <v-row>
                            <v-col>
                                <v-select v-model="newKelurahan.kodeKecamatan" :rules="[rules.required]" label="Kecamatan" :items="listKecamatan" item-text="nama_kecamatan" item-value="kode_kecamatan"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="newKelurahan.namaKelurahan" :rules="[rules.required]" label="Nama Kelurahan"></v-text-field>
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
        <v-dialog v-model="modalEditKelurahan" width="500">
            <v-card>
                <v-toolbar color="primary" dark>Edit Kelurahan</v-toolbar>
                <v-container>
                    <v-form ref="formEditKelurahan" @submit.prevent="saveEditKelurahan()">
                        <v-row>
                            <v-col>
                                <v-select v-model="selectedKelurahan.kecamatan" label="Kecamatan" :items="listKecamatan" item-text="nama_kecamatan" item-value="kode_kecamatan" :rules="[rules.required]"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="selectedKelurahan.nama_kelurahan" label="Nama Kelurahan" :rules="[rules.required]"></v-text-field>
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
<style>
@media screen and (max-width: 600px) {
    .order-md-1 {
        order: 1;
    }

    .order-md-2 {
        order: 2;
    }
}
</style>
<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            modalAddKelurahan: false,
            modalEditKelurahan: false,
            listKecamatan: [],
            rules: {
                required: value => !!value || 'Required.'
            },
            newKelurahan: {
                kodeKecamatan: '',
                namaKelurahan: ''
            },
            dataKelurahan: [],
            search: '',
            selectedKelurahan: {}
        }
    },
    methods: {
        openModalAddKelurahan() {
            this.modalAddKelurahan = true
        },
        openModalEditKelurahan(id) {
            this.modalEditKelurahan = true
            this.selectedKelurahan = this.dataKelurahan.find((data) => data.kode_kelurahan === id)
        },
        saveNewKelurahan() {
            if (this.$refs.formAddKelurahan.validate()) {
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
                        this.$http.post('ref/kelurahan/add', this.newKelurahan)
                            .then((response) => {
                                Swal.fire({
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                }).then(() => {
                                    this.modalAddKelurahan = false
                                    this.getDataKelurahan()
                                })
                            })
                    }
                })
            }
        },
        getDataKecamatan() {
            this.$http.get('ref/kecamatan/browse').then((response) => {
                this.listKecamatan = response.data
            })
        },
        getDataKelurahan() {
            this.$http.get('ref/kelurahan/browse').then((response) => {
                this.dataKelurahan = response.data
            })
        },
        saveEditKelurahan() {
            if (this.$refs.formEditKelurahan.validate()) {
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
                            id: this.selectedKelurahan.kode_kelurahan,
                            namaKelurahan: this.selectedKelurahan.nama_kelurahan,
                            kodeKecamatan: this.selectedKelurahan.kecamatan
                        }
                        this.$http.post('ref/kelurahan/edit', data)
                            .then((response) => {
                                Swal.fire({
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                }).then(() => {
                                    this.modalEditKelurahan = false
                                    this.getDataKelurahan()
                                })
                            })
                    }
                })
            }
        }
    },
    mounted() {
        this.getDataKecamatan()
        this.getDataKelurahan()
    },
    computed: {
        filteredItems() {
            return this.dataKelurahan.filter(item => 
                item.nama_kelurahan.toLowerCase().includes(this.search.toLowerCase()) ||
                item.kecamatan.nama_kecamatan.toLowerCase().includes(this.search.toLowerCase())
            )
        }
    }
}
</script>