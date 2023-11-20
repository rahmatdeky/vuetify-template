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
                    <v-col>NIK</v-col>
                    <v-col cols="10">
                        <input disabled v-model="dataEdit.nik" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Nama</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.nama" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2">Alamat (Jalan / Perum)</v-col>
                    <v-col cols="3">
                        <input :disabled="isDisabled" v-model="dataEdit.alamat" type="text" class="form-control">
                    </v-col>
                    <v-col cols="1">RT</v-col>
                    <v-col cols="2">
                        <input :disabled="isDisabled" v-model="dataEdit.RT" type="text" class="form-control">
                    </v-col>
                    <v-col cols="1">RW</v-col>
                    <v-col cols="2">
                        <input :disabled="isDisabled" v-model="dataEdit.RW" type="text" class="form-control">
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
                    <v-col>Organisasi</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.organisasi" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Jabatan</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.jabatan" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Nomor HP</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.nomorHp" type="text" class="form-control">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>Email</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.email" type="text" class="form-control">
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
            detailPengurus:[],
            dataEdit: {
                nik: '',
                nama: '',
                alamat: '',
                RW: '',
                RT: '',
                organisasi: '',
                jabatan: '',
                nomorHp: '',
                email: ''
            },
            isDisabled: true,
            listKecamatan: [],
            listKelurahan: [],
            selectedKecamatan: null,
            selectedKelurahan: null,
            refKecamatan: []
        }
    },
    methods: {
        getDetailPengurus () {
            this.$http.get('/pengurus/detail/' + this.$route.params.NIK).then((response) => {
                this.detailPengurus = response.data
            }).then(() => {
                this.connectData()
            })
        },
        connectData () {
            this.dataEdit.nik = this.detailPengurus.NIK
            this.dataEdit.nama = this.detailPengurus.nama_pengurus
            this.dataEdit.alamat = this.detailPengurus.alamat_pengurus
            this.dataEdit.organisasi = this.detailPengurus.organisasi
            this.dataEdit.jabatan = this.detailPengurus.jabatan
            this.dataEdit.nomorHp = this.detailPengurus.no_hp
            this.dataEdit.email = this.detailPengurus.email
            this.dataEdit.RW = this.detailPengurus.RW
            this.dataEdit.RT = this.detailPengurus.RT
            this.selectedKecamatan = this.detailPengurus.kecamatan
            this.selectedKelurahan = this.detailPengurus.kelurahan
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
                        nik: this.dataEdit.nik,
                        nama: this.dataEdit.nama,
                        alamat: this.dataEdit.alamat,
                        RW: this.dataEdit.RW,
                        RT: this.dataEdit.RT,
                        organisasi: this.dataEdit.organisasi,
                        jabatan: this.dataEdit.jabatan,
                        nomorHp: this.dataEdit.nomorHp,
                        email: this.dataEdit.email,
                        kecamatan: this.selectedKecamatan,
                        kelurahan: this.selectedKelurahan
                    }
                    this.$http.post('/pengurus/detail/edit', data).then((response) => {
                        if (response) {
                            Swal.fire({
                            icon: response.data.icon,
                            title: response.data.title,
                            text: response.data.text
                            }).then(() => {
                                this.getDetailPengurus(),
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
    created() {
        this.getDetailPengurus()
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