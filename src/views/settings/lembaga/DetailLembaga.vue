<template>
    <div>
        <v-card>
            <v-container>
                <v-row>
                    <v-col>
                        <h4>Detail Pengurus</h4>
                    </v-col>
                    <v-col>
                        <v-btn class="float-right warning" v-if="isDisabled == true" @click="toggleEdit">
                            <v-icon>mdi-square-edit-outline</v-icon>
                        </v-btn>
                        <v-btn class="float-right success" v-if="isDisabled == false" @click="saveEdit">
                            <v-icon>
                                mdi-check
                            </v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Nama Lembaga</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.namaLembaga" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Jenjang</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.jenjang" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Jenis Lembaga</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.jenisLembaga" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2">Alamat (Jalan / Perum)</v-col>
                    <v-col cols="3">
                        <input :disabled="isDisabled" v-model="dataEdit.alamat" type="text" class="form-control">
                    </v-col>
                    <v-col cols="1">RT</v-col>
                    <v-col cols="2">
                        <input v-model="dataEdit.RT" :disabled="isDisabled" type="text" class="form-control">
                    </v-col>
                    <v-col cols="1">RW</v-col>
                    <v-col cols="2">
                        <input v-model="dataEdit.RW" :disabled="isDisabled" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2">Kecamatan</v-col>
                    <v-col cols="3">
                        <v-select :readonly="isDisabled" dense :items="listKecamatan" v-model="selectedKecamatan"></v-select>
                    </v-col>
                    <v-col cols="2">Kelurahan</v-col>
                    <v-col cols="3">
                        <v-select :readonly="isDisabled" dense :items="filteredKelurahan" v-model="selectedKelurahan"></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Nama Pimpinan</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.namaPimpinan" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Jenis Kerja Sama</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.kerjaSama" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Nomor Kontak</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.nomorKontak" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Email</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.email" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Website</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.website" type="text" class="form-control">
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    data () {
        return {
            detailLembaga: [],
            dataEdit: {
                idLembaga: '',
                namaLembaga: '',
                jenjang: '',
                jenisLembaga: '',
                alamat: '',
                namaPimpinan: '',
                kerjaSama: '',
                nomorKontak: '',
                email: '',
                website: '',
                RT: '',
                RW: ''
            },
            isDisabled: true,
            selectedKecamatan: null,
            selectedKelurahan: null,
            refKecamatan:[],
            listKecamatan: [],
            listKelurahan: []
        }
    },
    methods: {
        getDetailLembaga () {
            this.$http.get('/lembaga/detail/' + this.$route.params.id).then((response) => {
                this.detailLembaga = response.data
            }).then(() => {
                this.reconData()
            })
        },
        reconData () {
            this.dataEdit.idLembaga = this.detailLembaga.id_lembaga
            this.dataEdit.namaLembaga = this.detailLembaga.nama_lembaga
            this.dataEdit.jenjang = this.detailLembaga.jenjang
            this.dataEdit.jenisLembaga = this.detailLembaga.jenis_lembaga
            this.dataEdit.alamat = this.detailLembaga.alamat
            this.dataEdit.namaPimpinan = this.detailLembaga.nama_pimpinan
            this.dataEdit.kerjaSama = this.detailLembaga.jenis_kerjasama
            this.dataEdit.nomorKontak = this.detailLembaga.no_kontak
            this.dataEdit.email = this.detailLembaga.email
            this.dataEdit.website = this.detailLembaga.website
            this.dataEdit.RW = this.detailLembaga.RW
            this.dataEdit.RT = this.detailLembaga.RT
            this.selectedKecamatan = this.detailLembaga.kecamatan
            this.selectedKelurahan = this.detailLembaga.kelurahan
        },
        toggleEdit () {
            this.isDisabled = !this.isDisabled
        },
        saveEdit () {
            Swal.fire({
            title: 'Apa Anda Yakin?',
            text: "Anda Akan Menyimpan Perubahan ini",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then((result) => {
                if(result.isConfirmed) {
                    const data = {
                        idLembaga: this.dataEdit.idLembaga,
                        namaLembaga: this.dataEdit.namaLembaga,
                        jenjang: this.dataEdit.jenjang,
                        jenisLembaga: this.dataEdit.jenisLembaga,
                        alamat: this.dataEdit.alamat,
                        namaPimpinan: this.dataEdit.namaPimpinan,
                        kerjaSama: this.dataEdit.kerjaSama,
                        nomorKontak: this.dataEdit.nomorKontak,
                        email: this.dataEdit.email,
                        website: this.dataEdit.website,
                        RT: this.dataEdit.RT,
                        RW: this.dataEdit.RW,
                        kecamatan: this.selectedKecamatan,
                        kelurahan: this.selectedKelurahan
                    }
                    this.$http.post('/lembaga/detail/edit', data).then((response) => {
                        if (response) {
                            Swal.fire({
                            icon: response.data.icon,
                            title: response.data.title,
                            text: response.data.text
                            }).then(() => {
                                this.getDetailLembaga(),
                                this.toggleEdit()
                            })
                        }
                    })
                } else {
                    this.toggleEdit()
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
    created () {
        this.getDetailLembaga()
        this.getRefKecamatan()
    },
    computed: {
        filteredKelurahan () {
            const kecamatan = this.refKecamatan.find(kecamatan => kecamatan.nama_kecamatan === this.selectedKecamatan);
            return kecamatan ? kecamatan.kelurahan.map(kelurahan => kelurahan.nama_kelurahan) : [];
        }
    }
}
</script>