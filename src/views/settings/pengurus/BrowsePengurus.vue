<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card elevation="2">
                      <v-card-title> Daftar Pengurus </v-card-title>
                        <v-container>
                          <v-row>
                            <v-col cols="3">
                                <v-text-field v-model="search" label="Pencarian"></v-text-field>
                            </v-col>
                            <!-- <v-col cols="2">
                                <v-text-field v-model="search" label="Email"></v-text-field>
                            </v-col> -->
                            <v-col align-self="center" cols="1">
                                <v-btn @click="browsePengurus()" icon>
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn @click="openModalTambahPengurus" class="float-end">
                                    <v-icon>mdi-plus</v-icon> Tambah Pengurus
                                </v-btn>
                                <!-- <v-btn class="float-end">
                                    <v-icon>mdi-plus</v-icon> Tambah Pengurus
                                </v-btn> -->
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-simple-table>
                                <thead>
                                    <tr>
                                        <th>NO</th>
                                        <th>NAMA</th>
                                        <th>NIK</th>
                                        <th>ALAMAT</th>
                                        <th>ORGANISASI</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- <tr @click="redirect(data.NIK)" v-for="(data, index) in dataPengurus.data" :key="index"> -->
                                    <tr v-for="(data, index) in dataPengurus.data" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ data.nama_pengurus }}</td>
                                        <td>{{ data.NIK }}</td>
                                        <td>{{ data.alamat_pengurus }}</td>
                                        <td>{{ data.organisasi }}</td>
                                        <td>
                                            <v-btn link :to="`/setting/pengurus/detail/` + data.NIK" icon color="success">
                                                <v-icon>mdi-magnify</v-icon>
                                            </v-btn>
                                            <v-btn @click="hapusPengurus(data.NIK)" icon color="red">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                          </v-row>
                          <v-row>
                            <v-col>
                                <v-btn-toggle rounded dense>
                                    <v-btn @click="browsePengurus(dataPengurus.prev_page_url)" :disabled="!dataPengurus.prev_page_url" color="primary">
                                        prev
                                    </v-btn>
                                    <v-btn>
                                        {{ dataPengurus.current_page + '/' + dataPengurus.last_page }}
                                    </v-btn>
                                    <v-btn @click="browsePengurus(dataPengurus.next_page_url)" :disabled="!dataPengurus.next_page_url" color="primary">
                                        next
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-card>
                </v-col>
                <v-dialog persistent v-model="modalTambahPengurus" max-width="800">
                    <v-card>
                        <v-toolbar color="primary" dark>
                            <v-container>
                                <h4>Tambah Pengurus</h4>
                            </v-container>
                            <v-btn @click="modalTambahPengurus = false" icon>
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-container>
                            <v-row>
                                <v-col cols="3">NIK</v-col>
                                <v-col>
                                    <v-text-field v-model="dataPengurusBaru.nik" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Nama Lengkap</v-col>
                                <v-col>
                                    <v-text-field v-model="dataPengurusBaru.namaLengkap" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Alamat</v-col>
                                <v-col>
                                    <v-text-field v-model="dataPengurusBaru.alamat" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Organisasi</v-col>
                                <v-col>
                                    <v-text-field v-model="dataPengurusBaru.organisasi" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Jabatan</v-col>
                                <v-col>
                                    <v-text-field v-model="dataPengurusBaru.jabatan" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Nomor Hp</v-col>
                                <v-col>
                                    <v-text-field v-model="dataPengurusBaru.nomorHp" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Email</v-col>
                                <v-col>
                                    <v-text-field v-model="dataPengurusBaru.email" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn @click="tambahPengurus" class="primary float-right">
                                        <v-icon>mdi-plus</v-icon> Simpan
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import Swal from 'sweetalert2'

export default {
    data () {
        return {
            modalTambahPengurus: false,
            dataPengurusBaru: {
                nik: '',
                namaLengkap: '',
                alamat: '',
                organisasi: '',
                jabatan: '',
                nomorHp: '',
                email: ''
            },
            dataPengurus: [],
            search: ''
        }
    },
    methods: {
        openModalTambahPengurus () {
            this.modalTambahPengurus = true
        },
        tambahPengurus () {
            this.$http.post('/pengurus/tambah', this.dataPengurusBaru).then((response) => {
                if(response) {
                    this.browsePengurus()
                    this.modalTambahPengurus = false
                    Swal.fire({
                    icon: response.data.icon,
                    title: response.data.title,
                    text: response.data.text
                    })
                }
            })
        },
        browsePengurus (page) {
            if (typeof page === 'undefined') {
                page = '/pengurus/browse?page=1'
            }
            var data = {
                search : this.search
            }
            this.$http.post(page, data).then((response) => {
                this.dataPengurus = response.data
            })
        },
        redirect(NIK) {
            this.$router.push(`/setting/pengurus/detail/${NIK}`)
        },
        hapusPengurus(NIK) {
            Swal.fire({
            title: 'Apa Anda Yakin?',
            text: "Anda Akan Menghapus Pengurus Ini",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = {
                        NIK : NIK
                    }
                    this.$http.post('/pengurus/delete', data).then((response) => {
                        Swal.fire({
                        icon: response.data.icon,
                        title: response.data.title,
                        text: response.data.text
                        }).then(() => {
                            this.browsePengurus()
                        })
                    })
                }
            })
        }
    },
    created() {
        this.browsePengurus()
    }
}
</script>