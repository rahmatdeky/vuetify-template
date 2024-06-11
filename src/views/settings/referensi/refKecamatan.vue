<template>
    <div>
        <v-card elevation="2" min-height="460px">
            <v-toolbar dense color="primary" dark>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                Referensi Kecamatan
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col cols="12" md="3" lg="3" class="order-2 order-md-1">
                        <v-text-field label="Pencarian" v-model="search"></v-text-field>
                    </v-col>
                    <v-col class="order-1 order-md-2">
                        <v-btn @click="openModalAddKecamatan()" class="float-end" color="primary">
                            <v-icon>mdi-plus</v-icon> Tambah
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-simple-table>
                        <thead>
                            <tr>
                                <th>Kode Kecamatan</th>
                                <th>Kode Kemendagri</th>
                                <th>Nama Kecamatan</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="data in filteredItems" :key="data.kode_kecamatan">
                                <td>{{ data.kode_kecamatan }}</td>
                                <td>{{ data.kode_kemendagri }}</td>
                                <td>{{ data.nama_kecamatan }}</td>
                                <td>
                                    <v-btn @click="openModalEditKecamatan(data.kode_kecamatan)" class="float-end" color="warning" outlined>
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </v-row>
            </v-container>
        </v-card>
        <v-dialog v-model="modalAddKecamatan" width="500">
            <v-card>
                <v-toolbar color="primary" dark>Tambah Kecamatan</v-toolbar>
                <v-container>
                    <v-form ref="formAddKecamatan" @submit.prevent="saveNewKecamatan()">
                        <v-row>
                            <v-col>
                                <v-text-field v-model="newKecamatan.kodeKemendagri" :rules="[rules.required]" label="Kode Kemendagri"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="newKecamatan.namaKecamatan" :rules="[rules.required]" label="Nama Kecamatan"></v-text-field>
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
        <v-dialog v-model="modalEditKecamatan" width="500">
            <v-card>
                <v-toolbar color="primary" dark>Edit Kecamatan</v-toolbar>
                <v-container>
                    <v-form ref="formEditKecamatan" @submit.prevent="saveEditKecamatan()">
                        <v-row>
                            <v-col>
                                <v-text-field label="Kode Kemendagri" v-model="selectedKecamatan.kode_kemendagri" :rules="[rules.required]"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field label="Nama Kecamatan" v-model="selectedKecamatan.nama_kecamatan" :rules="[rules.required]"></v-text-field>
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
            modalAddKecamatan: false,
            modalEditKecamatan: false,
            newKecamatan: {
                namaKecamatan: '',
                kodeKemendagri: ''
            },
            rules: {
                required: (value) => !!value || "Required."
            },
            dataKecamatan: [],
            search: '',
            selectedKecamatan: {}
        }
    },
    methods: {
        openModalAddKecamatan() {
            this.modalAddKecamatan = true
        },
        openModalEditKecamatan(id) {
            this.modalEditKecamatan = true
            this.selectedKecamatan = this.dataKecamatan.find((data) => data.kode_kecamatan === id)
        },
        saveNewKecamatan() {
            if (this.$refs.formAddKecamatan.validate()) {
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
                        this.$http.post('ref/kecamatan/add', this.newKecamatan)
                            .then((response) => {
                                Swal.fire({
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                }).then(() => {
                                    this.modalAddKecamatan = false
                                    this.getKecamatan()
                                    this.cleanForm()
                                })
                            })
                    }
                })
            }
        },
        cleanForm() {
            this.newKecamatan.namaKecamatan = ''
            this.newKecamatan.kodeKemendagri = ''
        },
        getKecamatan() {
            this.$http.get('ref/kecamatan/browse').then((response) => {
                this.dataKecamatan = response.data
            })
        },
        saveEditKecamatan() {
            if (this.$refs.formEditKecamatan.validate()) {
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
                            id: this.selectedKecamatan.kode_kecamatan,
                            namaKecamatan: this.selectedKecamatan.nama_kecamatan,
                            kodeKemendagri: this.selectedKecamatan.kode_kemendagri
                        }
                        this.$http.post('ref/kecamatan/edit', data)
                            .then((response) => {
                                Swal.fire({
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                }).then(() => {
                                    this.modalEditKecamatan = false
                                    this.getKecamatan()
                                })
                            })
                    }
                })
            }
        }
    },
    mounted() {
        this.getKecamatan()
    },
    computed: {
        filteredItems() {
            return this.dataKecamatan.filter(item =>
                item.nama_kecamatan.toLowerCase().includes(this.search.toLowerCase()) ||
                item.kode_kemendagri.toLowerCase().includes(this.search.toLowerCase())
            );
        }   
    }
}
</script>