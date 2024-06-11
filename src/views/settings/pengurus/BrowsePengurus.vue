<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card elevation="2">
                        <v-card-title> Daftar Warga </v-card-title>
                        <v-container>
                            <v-form @submit.prevent="browseWarga()">
                                <v-row>
                                    <v-col cols="9" lg="3" md="3" class="order-2 order-md-1">
                                        <v-text-field v-model="search" label="Pencarian"></v-text-field>
                                    </v-col>
                                    <!-- <v-col cols="2">
                                      <v-text-field v-model="search" label="Email"></v-text-field>
                                  </v-col> -->
                                    <v-col align-self="center" cols="1" class="order-3 order-md-2">
                                        <v-btn type="submit" @click="browseWarga()" icon>
                                            <v-icon>mdi-magnify</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col class="order-1 order-md-3">
                                        <v-btn @click="openModalTambahWarga" class="float-end button-plus-1">
                                            <v-icon>mdi-plus</v-icon> Tambah Warga
                                        </v-btn>
                                        <v-btn title="Tambah Warga" @click="openModalTambahWarga" class="float-end button-plus-2" color="primary" dark>
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                        <!-- <v-btn class="float-end">
                                          <v-icon>mdi-plus</v-icon> Tambah Warga
                                      </v-btn> -->
                                    </v-col>
                                </v-row>
                            </v-form>
                            <v-row>
                                <v-simple-table>
                                    <thead>
                                        <tr>
                                            <th>NO</th>
                                            <th>NAMA</th>
                                            <th>JABATAN</th>
                                            <th>ALAMAT</th>
                                            <th>ORGANISASI</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- <tr @click="redirect(data.NIK)" v-for="(data, index) in dataWarga.data" :key="index"> -->
                                        <tr v-for="(data, index) in dataWarga.data" :key="index">
                                            <td>{{ index + 1 }}</td>
                                            <td>{{ data.nama }}</td>
                                            <td>{{ data.jabatan }}</td>
                                            <td>{{ data.alamat }}</td>
                                            <td>{{ data.organisasi.nama }}</td>
                                            <td>
                                                <v-btn link :to="`/setting/warga/detail/` + data.nik" icon
                                                    color="success">
                                                    <v-icon>mdi-magnify</v-icon>
                                                </v-btn>
                                                <v-btn @click="hapusWarga(data.nik)" icon color="red">
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
                                        <v-btn @click="browseWarga(dataWarga.prev_page_url)"
                                            :disabled="!dataWarga.prev_page_url" color="primary">
                                            prev
                                        </v-btn>
                                        <v-btn>
                                            {{ dataWarga.current_page + '/' + dataWarga.last_page }}
                                        </v-btn>
                                        <v-btn @click="browseWarga(dataWarga.next_page_url)"
                                            :disabled="!dataWarga.next_page_url" color="primary">
                                            next
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
                <v-dialog persistent v-model="modalTambahWarga" max-width="800">
                    <v-card>
                        <v-toolbar color="primary" dark>
                            <v-container>
                                <h4>Tambah Warga</h4>
                            </v-container>
                            <v-btn @click="modalTambahWarga = false" icon>
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-toolbar>
                        <v-container class="form-tambah-1">
                            <v-form ref="formTambahWarga" @submit.prevent="tambahWarga()">
                                <v-row>
                                    <v-col cols="3">NIK</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataWargaBaru.nik" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Nama Lengkap</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataWargaBaru.namaLengkap" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Alamat (Jalan / Perum)</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataWargaBaru.alamat" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Kecamatan</v-col>
                                    <v-col cols="3">
                                        <v-select dense :items="listKecamatan" v-model="selectedKecamatan"
                                            :rules="[rules.required]"></v-select>
                                    </v-col>
                                    <v-col cols="3">Kelurahan / Desa</v-col>
                                    <v-col cols="3">
                                        <v-select dense :items="filteredKelurahan" item-text="nama_kelurahan"
                                            item-value="kode_kelurahan" v-model="selectedKelurahan"
                                            :rules="[rules.required]"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Organisasi</v-col>
                                    <v-col>
                                        <!-- <v-text-field v-model="dataWargaBaru.organisasi" dense></v-text-field> -->
                                        <v-select dense :items="dataOrganisasi" v-model="dataWargaBaru.organisasi" :rules="[rules.required]" item-text="nama"
                                            item-value="kode_organisasi"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Nomor Hp</v-col>
                                    <v-col>
                                        <v-text-field prefix="+62" v-model="dataWargaBaru.nomorHp" dense></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Jabatan</v-col>
                                    <!-- <v-col>
                                        <v-text-field v-model="dataWargaBaru.jabatan" dense></v-text-field>
                                    </v-col> -->
                                    <v-col>
                                        <v-select dense :items="listJabatan" v-model="dataWargaBaru.jabatan"
                                            :rules="[rules.required]"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Email</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataWargaBaru.email" dense
                                            :rules="jabatanRules"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row v-if="dataWargaBaru.jabatan == 'Pengurus'">
                                    <v-col cols="3">Password</v-col>
                                    <v-col>
                                        <v-text-field dense v-model="dataWargaBaru.password" :rules="passwordRules"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show1 ? 'text' : 'password'"
                                            @click:append="show1 = !show1"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row v-if="dataWargaBaru.jabatan == 'Pengurus'">
                                    <v-col cols="3">Konfirmasi Password</v-col>
                                    <v-col>
                                        <v-text-field dense v-model="dataWargaBaru.KonfirmasiPassword"
                                            :rules="passwordRules" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show2 ? 'text' : 'password'"
                                            @click:append="show2 = !show2"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-alert class="px-3" v-if="notMatch" type="error" dense outlined>Password Baru
                                            dan Konfirmasi Password Baru tidak
                                            sama</v-alert>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn @click="tambahWarga()" type="submit" class="primary float-right">
                                            <v-icon>mdi-plus</v-icon> Simpan
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                        <v-container class="form-tambah-2">
                            <v-form ref="formTambahWarga" @submit.prevent="tambahWarga()">
                                <v-row>
                                    <!-- <v-col cols="3">NIK</v-col> -->
                                    <v-col>
                                        <v-text-field label="NIK" v-model="dataWargaBaru.nik" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col cols="3">Nama Lengkap</v-col> -->
                                    <v-col>
                                        <v-text-field label="Nama Lengkap" v-model="dataWargaBaru.namaLengkap" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col cols="3">Alamat (Jalan / Perum)</v-col> -->
                                    <v-col>
                                        <v-text-field label="Alamat (Jalan / Perum)" v-model="dataWargaBaru.alamat" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col cols="3">Kecamatan</v-col> -->
                                    <v-col cols="12" md="3" lg="3">
                                        <v-select label="Kecamatan" dense :items="listKecamatan" v-model="selectedKecamatan"
                                            :rules="[rules.required]"></v-select>
                                    </v-col>
                                    <!-- <v-col cols="3">Kelurahan / Desa</v-col> -->
                                    <v-col cols="12" md="3" lg="3">
                                        <v-select label="Kelurahan" dense :items="filteredKelurahan" item-text="nama_kelurahan"
                                            item-value="kode_kelurahan" v-model="selectedKelurahan"
                                            :rules="[rules.required]"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col cols="3">Organisasi</v-col> -->
                                    <v-col>
                                        <!-- <v-text-field v-model="dataWargaBaru.organisasi" dense></v-text-field> -->
                                        <v-select label="Organisasi" dense :items="dataOrganisasi" v-model="dataWargaBaru.organisasi" :rules="[rules.required]" item-text="nama"
                                            item-value="kode_organisasi"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col cols="3">Nomor Hp</v-col> -->
                                    <v-col>
                                        <v-text-field label="Nomor Hp" prefix="+62" v-model="dataWargaBaru.nomorHp" dense></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col cols="3">Jabatan</v-col> -->
                                    <!-- <v-col>
                                        <v-text-field v-model="dataWargaBaru.jabatan" dense></v-text-field>
                                    </v-col> -->
                                    <v-col>
                                        <v-select label="Jabatan" dense :items="listJabatan" v-model="dataWargaBaru.jabatan"
                                            :rules="[rules.required]"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col cols="3">Email</v-col> -->
                                    <v-col>
                                        <v-text-field label="Email" v-model="dataWargaBaru.email" dense
                                            :rules="jabatanRules"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row v-if="dataWargaBaru.jabatan == 'Pengurus'">
                                    <!-- <v-col cols="3">Password</v-col> -->
                                    <v-col>
                                        <v-text-field label="Password" dense v-model="dataWargaBaru.password" :rules="passwordRules"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show1 ? 'text' : 'password'"
                                            @click:append="show1 = !show1"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row v-if="dataWargaBaru.jabatan == 'Pengurus'">
                                    <!-- <v-col cols="3">Konfirmasi Password</v-col> -->
                                    <v-col>
                                        <v-text-field label="Konfirmasi Password" dense v-model="dataWargaBaru.KonfirmasiPassword"
                                            :rules="passwordRules" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show2 ? 'text' : 'password'"
                                            @click:append="show2 = !show2"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-alert class="px-3" v-if="notMatch" type="error" dense outlined>Password Baru
                                            dan Konfirmasi Password Baru tidak
                                            sama</v-alert>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn @click="tambahWarga()" type="submit" class="primary float-right">
                                            <v-icon>mdi-plus</v-icon> Simpan
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-dialog>
            </v-row>
        </v-container>
    </div>
</template>
<style>
.button-plus-1 {
    display: flex;
}

.button-plus-2 {
    display: none;
}

.form-tambah-1 {
    display: flex;
}

.form-tambah-2 {
    display: none;
}

@media screen and (max-width: 600px) {
    .order-md-1 {
        order: 2;
    }

    .order-md-2 {
        order: 3;
    }

    .order-md-3 {
        order: 1;
    }

    .button-plus-1 {
        display: none;
    }

    .button-plus-2 {
        display: flex;
    }
    .form-tambah-1 {
    display: none;
}

.form-tambah-2 {
    display: flex;
}
}
</style>
<script>
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            modalTambahWarga: false,
            dataWargaBaru: {
                nik: '',
                namaLengkap: '',
                alamat: '',
                organisasi: '',
                jabatan: '',
                nomorHp: '',
                email: '',
                username: '',
                password: '',
                KonfirmasiPassword: ''
            },
            dataWarga: [],
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
            listJabatan: [
                'Pengurus',
                'Warga'
            ],
            selectedKecamatan: null,
            selectedKelurahan: null,
            refKecamatan: [],
            listKecamatan: [],
            listKelurahan: [],
            rules: {
                required: value => !!value || 'Required.',
                min: (v) => v.length >= 6 || "Min 6 characters",
            },
            show1: false,
            show2: false,
            notMatch: false,
            dataOrganisasi: []
        }
    },
    methods: {
        openModalTambahWarga() {
            this.modalTambahWarga = true
            this.getRefKecamatan()
            this.getOrganisasi()
        },
        tambahWarga() {
            if (this.$refs.formTambahWarga.validate()) {
                if (this.dataWargaBaru.password === this.dataWargaBaru.KonfirmasiPassword) {
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
                                nik: this.dataWargaBaru.nik,
                                namaLengkap: this.dataWargaBaru.namaLengkap,
                                alamat: this.dataWargaBaru.alamat,
                                organisasi: this.dataWargaBaru.organisasi,
                                jabatan: this.dataWargaBaru.jabatan,
                                nomorHp: this.dataWargaBaru.nomorHp,
                                email: this.dataWargaBaru.email,
                                kecamatan: this.selectedKecamatan,
                                kelurahan: this.selectedKelurahan,
                                password: this.dataWargaBaru.password
                            }
                            this.notMatch = false
                            this.$http.post('/warga/tambah', data).then((response) => {
                                if (response) {
                                    this.browseWarga()
                                    this.modalTambahWarga = false
                                    this.clearForm()
                                    Swal.fire({
                                        icon: response.data.icon,
                                        title: response.data.title,
                                        text: response.data.text
                                    })
                                }
                            })
                        }
                    })
                } else {
                    this.notMatch = true
                }
            }
        },
        browseWarga(page) {
            if (typeof page === 'undefined') {
                page = '/warga/browse?page=1'
            }
            var data = {
                search: this.search
            }
            this.$http.post(page, data).then((response) => {
                this.dataWarga = response.data
            })
        },
        redirect(NIK) {
            this.$router.push(`/setting/warga/detail/${NIK}`)
        },
        hapusWarga(NIK) {
            Swal.fire({
                title: 'Apa Anda Yakin?',
                text: "Anda Akan Menghapus Warga Ini",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const data = {
                        NIK: NIK
                    }
                    this.$http.post('/warga/delete', data).then((response) => {
                        Swal.fire({
                            icon: response.data.icon,
                            title: response.data.title,
                            text: response.data.text
                        }).then(() => {
                            this.browseWarga()
                        })
                    })
                }
            })
        },
        getRefKecamatan() {
            this.$http.get('ref/kecamatan/browse').then((response) => {
                this.refKecamatan = response.data
                this.listKecamatan = this.refKecamatan.map(kecamatan => kecamatan.nama_kecamatan);
                this.listKelurahan = this.refKecamatan.flatMap(kecamatan =>
                    kecamatan.kelurahan.map(kelurahan => ({ kode_kelurahan: kelurahan.kode_kelurahan, nama_kelurahan: kelurahan.nama_kelurahan }))
                )
            })
        },
        clearForm() {
            this.dataWargaBaru.nik = '',
                this.dataWargaBaru.namaLengkap = '',
                this.dataWargaBaru.alamat = '',
                this.dataWargaBaru.organisasi = '',
                this.dataWargaBaru.jabatan = '',
                this.dataWargaBaru.nomorHp = '',
                this.dataWargaBaru.email = '',
                this.dataWargaBaru.password = '',
                this.dataWargaBaru.KonfirmasiPassword = '',
                this.selectedKecamatan = '',
                this.selectedKelurahan = ''
        },
        getOrganisasi() {
            this.$http.get('ref/organisasi/browse').then((response) => {
                this.dataOrganisasi = response.data
            })
        }
    },
    created() {
        this.browseWarga()
    },
    computed: {
        filteredKelurahan() {
            const kecamatan = this.refKecamatan.find(kecamatan => kecamatan.nama_kecamatan === this.selectedKecamatan);
            return kecamatan ? kecamatan.kelurahan.map(kelurahan => ({ kode_kelurahan: kelurahan.kode_kelurahan, nama_kelurahan: kelurahan.nama_kelurahan })) : [];
        },
        jabatanRules() {
            return this.dataWargaBaru.jabatan === 'Pengurus' ? [this.rules.required] : [];
        },
        passwordRules() {
            let rules = [];
            // Aturan validasi email akan aktif hanya jika jabatan yang dipilih adalah 'Pengurus'
            if (this.dataWargaBaru.jabatan === 'Pengurus') {
                rules.push(this.rules.required);
                rules.push(value => (value && value.length >= 6) || 'Min 6 characters');
            }
            return rules;
        }
    }
}
</script>