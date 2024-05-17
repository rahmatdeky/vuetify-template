<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card elevation="2">
                        <v-card-title> Daftar Lembaga </v-card-title>
                        <v-container>
                            <v-form @submit.prevent="browseLembaga()">
                                <v-row>
                                    <v-col cols="3">
                                        <v-text-field v-model="search" label="Pencarian"></v-text-field>
                                    </v-col>
                                    <v-col align-self="center" cols="1">
                                        <v-btn type="submit" @click="browseLembaga()" icon>
                                            <v-icon>mdi-magnify</v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col>
                                        <v-btn @click="openModalTambahLembaga()" class="float-end">
                                            <v-icon>mdi-plus</v-icon> Tambah Lembaga
                                        </v-btn>
                                        <!-- <v-btn class="float-end">
                                        <v-icon>mdi-plus</v-icon> Tambah Pengurus
                                    </v-btn> -->
                                    </v-col>
                                </v-row>
                            </v-form>
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
                                            <td>{{ data.nama }}</td>
                                            <td>{{ data.jenjang }}</td>
                                            <td>{{ data.jenis_lembaga }}</td>
                                            <td>{{ data.jenis_kerjasama }}</td>
                                            <td>
                                                <v-btn link :to="'/setting/lembaga/detail/' + data.id" icon
                                                    color="success">
                                                    <v-icon>mdi-magnify</v-icon>
                                                </v-btn>
                                                <v-btn @click="hapusLembaga(data.id)" icon color="red">
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
                                        <v-btn @click="browseLembaga(dataLembaga.prev_page_url)"
                                            :disabled="!dataLembaga.prev_page_url" color="primary">
                                            prev
                                        </v-btn>
                                        <v-btn>
                                            {{ dataLembaga.current_page + '/' + dataLembaga.last_page }}
                                        </v-btn>
                                        <v-btn @click="browseLembaga(dataLembaga.next_page_url)"
                                            :disabled="!dataLembaga.next_page_url" color="primary">
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
                            <v-form ref="formTambahLembaga" @submit.prevent="tambahLembaga()">
                                <v-row>
                                    <v-col cols="3">Nama Lembaga</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataTambahLembaga.namaLembaga" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Jenjang</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataTambahLembaga.jenjang" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Jenis Lembaga Pendidikan</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataTambahLembaga.jenisLembaga" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Alamat (Jalan / Perum)</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataTambahLembaga.alamat" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Kecamatan</v-col>
                                    <v-col cols="3">
                                        <v-select dense :items="listKecamatan" v-model="selectedKecamatan"
                                            item-text="nama_kecamatan" item-value="kode_kecamatan"
                                            :rules="[rules.required]"></v-select>
                                    </v-col>
                                    <v-col cols="3">Kelurahan / Desa</v-col>
                                    <v-col cols="3">
                                        <v-select dense :items="filteredKelurahan" v-model="selectedKelurahan"
                                            item-text="nama_kelurahan" item-value="kode_kelurahan"
                                            :rules="[rules.required]"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Nama Pimpinan</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataTambahLembaga.namaPimpinan" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Jenis Kerja Sama</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataTambahLembaga.kerjaSama" dense
                                            :rules="[rules.required]"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3">Nomor Kontak</v-col>
                                    <v-col>
                                        <v-text-field v-model="dataTambahLembaga.nomorKontak" dense
                                            ></v-text-field>
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
                                        <v-btn type="submit" @click="tambahLembaga()" class="primary float-right">
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
<script>
import Swal from 'sweetalert2'
export default {
    data() {
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
                website: '',
                RW: '',
                RT: ''
            },
            search: '',
            dataLembaga: [],
            selectedKecamatan: null,
            selectedKelurahan: null,
            refKecamatan: [],
            listKecamatan: [],
            listKelurahan: [],
            rules: {
                required: value => !!value || 'Required.',
                min: (v) => v.length >= 6 || "Min 6 characters",
            }
        }
    },
    methods: {
        tambahLembaga() {
            if (this.$refs.formTambahLembaga.validate()) {
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
                            namaLembaga: this.dataTambahLembaga.namaLembaga,
                            jenjang: this.dataTambahLembaga.jenjang,
                            jenisLembaga: this.dataTambahLembaga.jenisLembaga,
                            alamat: this.dataTambahLembaga.alamat,
                            namaPimpinan: this.dataTambahLembaga.namaPimpinan,
                            kerjaSama: this.dataTambahLembaga.kerjaSama,
                            nomorKontak: this.dataTambahLembaga.nomorKontak,
                            email: this.dataTambahLembaga.email,
                            website: this.dataTambahLembaga.website,
                            kecamatan: this.selectedKecamatan,
                            kelurahan: this.selectedKelurahan
                        }
                        this.$http.post('/lembaga/tambah', data).then((response) => {
                            if (response) {
                                this.modalTambahLembaga = false
                                Swal.fire({
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                }).then(() => {
                                    this.browseLembaga()
                                    this.clearForm()
                                })
                            }
                        })
                    }
                })
            }
        },
        browseLembaga(page) {
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
                        id: id
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
        },
        openModalTambahLembaga() {
            this.modalTambahLembaga = true
            this.getRefKecamatan()
        },
        getRefKecamatan() {
            this.$http.get('ref/kecamatan/browse').then((response) => {
                this.refKecamatan = response.data
                this.listKecamatan = this.refKecamatan.map(kecamatan => ({ kode_kecamatan: kecamatan.kode_kecamatan, nama_kecamatan: kecamatan.nama_kecamatan }));
                this.listKelurahan = this.refKecamatan.flatMap(kecamatan =>
                    kecamatan.kelurahan.map(kelurahan => ({ kode_kelurahan: kelurahan.kode_kelurahan, nama_kelurahan: kelurahan.nama_kelurahan }))
                )
            })
        },
        clearForm() {
            this.dataTambahLembaga.namaLembaga = '',
                this.dataTambahLembaga.jenjang = '',
                this.dataTambahLembaga.jenisLembaga = '',
                this.dataTambahLembaga.alamat = '',
                this.dataTambahLembaga.namaPimpinan = '',
                this.dataTambahLembaga.kerjaSama = '',
                this.dataTambahLembaga.nomorKontak = '',
                this.dataTambahLembaga.email = '',
                this.dataTambahLembaga.website = '',
                this.dataTambahLembaga.RW = '',
                this.dataTambahLembaga.RT = ''
        }
    },
    created() {
        this.browseLembaga()
    },
    computed: {
        filteredKelurahan() {
            const kecamatan = this.refKecamatan.find(kecamatan => kecamatan.kode_kecamatan === this.selectedKecamatan);
            return kecamatan ? kecamatan.kelurahan.map(kelurahan => ({
                kode_kelurahan: kelurahan.kode_kelurahan,
                nama_kelurahan: kelurahan.nama_kelurahan
            })) : [];
        }
    }
}
</script>