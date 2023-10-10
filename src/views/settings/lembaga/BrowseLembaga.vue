<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card elevation="2">
                      <v-card-title> Daftar Lembaga </v-card-title>
                        <v-container>
                          <v-row>
                            <v-col cols="3">
                                <v-text-field v-model="search" label="Pencarian"></v-text-field>
                            </v-col>
                            <v-col align-self="center" cols="1">
                                <v-btn @click="browseLembaga()" icon>
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn @click="modalTambahLembaga = true" class="float-end">
                                    <v-icon>mdi-plus</v-icon> Tambah Lembaga
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
                                        <th>NAMA LEMBAGA</th>
                                        <th>JENJANG</th>
                                        <th>JENIS LEMBAGA</th>
                                        <th>JENIS KERJASAMA</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- <tr @click="redirect(data.NIK)" v-for="(data, index) in dataPengurus.data" :key="index"> -->
                                    <tr v-for="(data, index) in dataLembaga.data" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ data.nama_lembaga }}</td>
                                        <td>{{ data.jenjang }}</td>
                                        <td>{{ data.jenis_lembaga }}</td>
                                        <td>{{ data.jenis_kerjasama }}</td>
                                        <td>
                                            <v-btn link :to="'/setting/lembaga/detail/' + data.id_lembaga" icon color="success">
                                                <v-icon>mdi-magnify</v-icon>
                                            </v-btn>
                                            <v-btn @click="hapusLembaga(data.id_lembaga)" icon color="red">
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
                                    <v-btn @click="browseLembaga(dataLembaga.prev_page_url)" :disabled="!dataLembaga.prev_page_url" color="primary">
                                        prev
                                    </v-btn>
                                    <v-btn>
                                        {{ dataLembaga.current_page + '/' + dataLembaga.last_page }}
                                    </v-btn>
                                    <v-btn @click="browseLembaga(dataLembaga.next_page_url)" :disabled="!dataLembaga.next_page_url" color="primary">
                                        next
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-card>
                </v-col>
                <v-dialog v-model="modalTambahLembaga" persistent max-width="800">
                    <v-card>
                        <v-toolbar color="primary" dark>
                            <v-container>
                                <h4>Tambah Lembaga</h4>
                            </v-container>
                            <v-btn @click="modalTambahLembaga = false" icon>
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-container>
                            <v-row>
                                <v-col cols="3">Nama Lembaga</v-col>
                                <v-col>
                                    <v-text-field v-model="dataTambahLembaga.namaLembaga" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Jenjang</v-col>
                                <v-col>
                                    <v-text-field v-model="dataTambahLembaga.jenjang" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Jenis Lembaga Pendidikan</v-col>
                                <v-col>
                                    <v-text-field v-model="dataTambahLembaga.jenisLembaga" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Alamat</v-col>
                                <v-col>
                                    <v-text-field v-model="dataTambahLembaga.alamat" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Nama Pimpinan</v-col>
                                <v-col>
                                    <v-text-field v-model="dataTambahLembaga.namaPimpinan" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Jenis Kerja Sama</v-col>
                                <v-col>
                                    <v-text-field v-model="dataTambahLembaga.kerjaSama" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Nomor Kontak</v-col>
                                <v-col>
                                    <v-text-field v-model="dataTambahLembaga.nomorKontak" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Email</v-col>
                                <v-col>
                                    <v-text-field v-model="dataTambahLembaga.email" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Website</v-col>
                                <v-col>
                                    <v-text-field v-model="dataTambahLembaga.website" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn @click="tambahLembaga" class="primary float-right">
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
            modalTambahLembaga: false,
            dataTambahLembaga: {
                namaLembaga: '',
                jenjang: '',
                jenisLembaga: '',
                alamat: '',
                namaPimpinan: '',
                kerjaSama: '',
                nomorKontak: '',
                email: '',
                website: ''
            },
            search: '',
            dataLembaga: []
        }
    },
    methods: {
        tambahLembaga () {
            this.$http.post('/lembaga/tambah', this.dataTambahLembaga).then((response) => {
                if (response) {
                    this.modalTambahLembaga = false
                    Swal.fire({
                    icon: response.data.icon,
                    title: response.data.title,
                    text: response.data.text
                    }).then(() => {
                        this.browseLembaga()
                    })
                }
            })
        },
        browseLembaga (page) {
            if (typeof page === 'undefined') {
                page = '/lembaga/browse?page=1'
            }
            var data = {
                search: this.search
            }
            this.$http.post(page, data).then((response) => {
                this.dataLembaga = response.data
            })
        },
        hapusLembaga(id) {
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
                        id : id
                    }
                    this.$http.post('/lembaga/delete', data).then((response) => {
                        Swal.fire({
                        icon: response.data.icon,
                        title: response.data.title,
                        text: response.data.text
                        }).then(() => {
                            this.browseLembaga()
                        })
                    })
                }
            })
        }
    },
    created () {
        this.browseLembaga()
    }
}
</script>