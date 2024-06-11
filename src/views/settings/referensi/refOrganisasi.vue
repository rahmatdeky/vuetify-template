<template>
    <div>
        <v-card elevation="2" min-height="460px">
            <v-toolbar dense color="primary" dark>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                Referensi Organisasi
            </v-toolbar>
            <v-container>
                <v-row>
                    <v-col cols="12" lg="3" md="3" class="order-2 order-md-1">
                        <v-text-field v-model="search" label="Pencarian"></v-text-field>
                    </v-col>
                    <!-- <v-col align-self="center" cols="1">
                        <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                        </v-btn>
                    </v-col> -->
                    <v-col class="order-1 order-md-2">
                        <v-btn @click="openModalAddOrganisasi()" class="float-end" color="primary">
                            <v-icon>mdi-plus</v-icon> Tambah
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-responsive class="overflow-y-auto" max-height="290">
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>Id Organisasi</th>
                                    <th>Nama Organisasi</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="data in filteredItems" :key="data.id">
                                    <td>{{ data.kode_organisasi }}</td>
                                    <td>{{ data.nama }}</td>
                                    <td>
                                        <v-btn @click="openModalEditOrganisasi(data.kode_organisasi)" class="float-end" color="warning"
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
        <v-dialog v-model="modalAddOrganisasi" width="500">
            <v-card>
                <v-toolbar color="primary" dark>Tambah Organisasi</v-toolbar>
                <v-container>
                    <v-form ref="formAddOrganisasi" @submit.prevent="saveNewOrganisasi()">
                        <v-row>
                            <v-col>
                                <v-text-field label="Nama Organisasi" v-model="newOrganisasi.namaOrganisasi"
                                    :rules="[rules.required]"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn type="submit" class="float-end" color="primary" dark
                                    @click="saveNewOrganisasi()">Simpan</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modalEditOrganisasi" width="500">
            <v-card>
                <v-toolbar color="primary" dark>Edit Organisasi</v-toolbar>
                <v-container>
                    <v-form ref="formEditOrganisasi" @submit.prevent="saveEditOrganisasi()">
                        <v-row>
                            <v-col>
                                <v-text-field label="Nama Organisasi" v-model="selectedOrganisasi.nama" :rules="[rules.required]"></v-text-field>
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
        order: 2;
    }

    .order-md-2 {
        order: 1;
    }
}
</style>
<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            modalAddOrganisasi: false,
            modalEditOrganisasi: false,
            newOrganisasi: {
                namaOrganisasi: ''
            },
            rules: {
                required: (value) => !!value || "Required."
            },
            dataOrganisasi: [],
            search: '',
            selectedOrganisasi: {}
        }
    },
    methods: {
        openModalAddOrganisasi() {
            this.modalAddOrganisasi = true
        },
        openModalEditOrganisasi(id) {
            this.modalEditOrganisasi = true
            this.selectedOrganisasi = this.dataOrganisasi.find((data) => data.kode_organisasi === id)
        },
        saveNewOrganisasi() {
            if (this.$refs.formAddOrganisasi.validate()) {
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
                        this.$http.post('ref/organisasi/add', this.newOrganisasi)
                            .then((response) => {
                                Swal.fire({
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                }).then(() => {
                                    this.modalAddOrganisasi = false
                                    this.getOrganisasi()
                                    this.cleanForm()
                                })
                            })
                    }
                })
            }
        },
        cleanForm() {
            this.newOrganisasi.namaOrganisasi = ''
        },
        getOrganisasi() {
            this.$http.get('ref/organisasi/browse').then((response) => {
                this.dataOrganisasi = response.data
            })
        },
        saveEditOrganisasi() {
            if (this.$refs.formEditOrganisasi.validate()) {
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
                            id: this.selectedOrganisasi.kode_organisasi,
                            namaOrganisasi: this.selectedOrganisasi.nama
                        }
                        this.$http.post('ref/organisasi/edit', data)
                            .then((response) => {
                                Swal.fire({
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                }).then(() => {
                                    this.modalEditOrganisasi = false
                                    this.getOrganisasi()
                                })
                            })
                    }
                })
            }
        }
    },
    mounted() {
        this.getOrganisasi()
    },
    computed: {
        filteredItems() {
            return this.dataOrganisasi.filter(item =>
                item.nama.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    }
}
</script>