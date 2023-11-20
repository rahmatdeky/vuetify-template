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
                                <v-col cols="3">Alamat (Jalan / Perum)</v-col>
                                <v-col cols=3>
                                    <v-text-field v-model="dataPengurusBaru.alamat" dense></v-text-field>
                                </v-col>
                                <v-col cols="1">RT</v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="dataPengurusBaru.RT" dense></v-text-field>
                                </v-col>
                                <v-col cols="1">RW</v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="dataPengurusBaru.RW" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">Kecamatan</v-col>
                                <v-col cols="3">
                                    <v-select dense :items="listKecamatan" v-model="selectedKecamatan"></v-select>
                                </v-col>
                                <v-col cols="3">Kelurahan / Desa</v-col>
                                <v-col cols="3">
                                    <v-select dense :items="filteredKelurahan" v-model="selectedKelurahan"></v-select>
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
                RW: '',
                RT: '',
                organisasi: '',
                jabatan: '',
                nomorHp: '',
                email: ''
            },
            dataPengurus: [],
            search: '',
            // listKecamatan: [
            //     'Belakang Padang',
            //     'Bulang',
            //     'Sungai Beduk',
            //     'Sagulung',
            //     'Nongsa',
            //     'Batam Kota',
            //     'Sekupang',
            //     'Batu Aji',
            //     'Lubuk Baja',
            //     'Batu Ampar',
            //     'Bengkong',
            //     'Galang'
            // ],
            // listKelurahan: {
            //     'Belakang Padang': ['Pulau Terong', 'Sekanak Raya', 'Tanjung Sari', 'Pecong', 'Pemping', 'Kasu'],
            //     'Bulang': ['Pulau Setokok', 'Batu Legong', 'Temoyong', 'Pulau Buluh', 'Pulau Gelam', 'Bulang Lintang'],
            //     'Sungai Beduk': ['Mangsang', 'Tanjung Piayu', 'Duriangkang', 'Muka Kuning'],
            //     'Sagulung': ['Tembesi', 'Sungai Langkai', 'Sungai Lekop', 'Sungai Pelunggut', 'Sagulung Kota', 'Sungai Binti'],
            //     'Nongsa': ['Ngenang', 'Batu Besar', 'Kabil', 'Sambau'],
            //     'Batam Kota': ['Belian', 'Teluk Tering', 'Sungai Panas', 'Sukajadi', 'Taman Baloi', 'Baloi Permai'],
            //     'Sekupang': ['Sungai Harapan', 'Tanjung Pinggir', 'Tiban Indah', 'Patam Lestari', 'Tiban Lama', 'Tiban Baru', 'Tanjung Riau'],
            //     'Batu Aji': ['Buliang', 'Bukit Tempayan', 'Kibing', 'Tanjung Uncang'],
            //     'Lubuk Baja': ['Tanjung Uma', 'Kampung Pelita', 'Lubuk Baja Kota', 'Batu Selicin', 'Baloi Indah'],
            //     'Batu Ampar': ['Tanjung Sengkuang', 'Kampung Seraya', 'Sungai Jodoh', 'Batu Merah'],
            //     'Bengkong': ['Bengkong Indah', 'Bengkong Laut','Tanjung Buntung', 'Sadai'],
            //     'Galang': ['Pulau Abang', 'Sijantung', 'Karas', 'Subang Mas', 'Galang Baru', 'Rempang Cate', 'Air Raja', 'Sembulang']
            // },
            selectedKecamatan: null,
            selectedKelurahan: null,
            refKecamatan:[],
            listKecamatan: [],
            listKelurahan: []
        }
    },
    methods: {
        openModalTambahPengurus () {
            this.modalTambahPengurus = true
            this.getRefKecamatan()
        },
        tambahPengurus () {
            Swal.fire({
            title: 'Apa Anda Yakin?',
            text: "Anda Akan Menyimpan Data ini",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya'
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = {
                        nik: this.dataPengurusBaru.nik,
                        namaLengkap: this.dataPengurusBaru.namaLengkap,
                        alamat: this.dataPengurusBaru.alamat,
                        RT: this.dataPengurusBaru.RT,
                        RW: this.dataPengurusBaru.RW,
                        organisasi: this.dataPengurusBaru.organisasi,
                        jabatan: this.dataPengurusBaru.jabatan,
                        nomorHp: this.dataPengurusBaru.nomorHp,
                        email: this.dataPengurusBaru.email,
                        kecamatan: this.selectedKecamatan,
                        kelurahan: this.selectedKelurahan
                    }
                    this.$http.post('/pengurus/tambah', data).then((response) => {
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
        },
        getRefKecamatan() {
            this.$http.get('/refKecamatan').then((response) => {
                this.refKecamatan = response.data
                this.listKecamatan = this.refKecamatan.map(kecamatan => kecamatan.nama_kecamatan);
                this.listKelurahan = this.refKecamatan.flatMap(kecamatan => kecamatan.kelurahan.map(kelurahan => kelurahan.nama_kelurahan));
            })
        }
    },
    created() {
        this.browsePengurus()
    },
    computed: {
        filteredKelurahan () {
            const kecamatan = this.refKecamatan.find(kecamatan => kecamatan.nama_kecamatan === this.selectedKecamatan);
            return kecamatan ? kecamatan.kelurahan.map(kelurahan => kelurahan.nama_kelurahan) : [];
        }
    }
}
</script>