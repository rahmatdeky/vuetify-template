<template>
    <div>
        <v-card>
            <v-container>
                <v-form ref="formEditWarga">
                    <v-row>
                        <v-col>
                            <h4>Detail Warga</h4>
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
                        <v-col class="pb-0">NIK</v-col>
                        <v-col cols="10" class="pb-0">
                            <!-- <input disabled v-model="dataEdit.nik" type="text" class="form-control"> -->
                            <v-text-field disabled outlined dense v-model="dataEdit.nik"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0">Nama</v-col>
                        <v-col cols="10" class="py-0">
                            <!-- <input :disabled="isDisabled" v-model="dataEdit.nama" type="text" class="form-control"> -->
                            <v-text-field :disabled="isDisabled" outlined dense v-model="dataEdit.nama" :rules="[rules.required]"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0">Alamat (Jalan / Perum)</v-col>
                        <v-col cols="10" class="py-0">
                            <!-- <input :disabled="isDisabled" v-model="dataEdit.alamat" type="text" class="form-control"> -->
                            <v-text-field :disabled="isDisabled" outlined dense v-model="dataEdit.alamat" :rules="[rules.required]"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2" class="py-0">Kecamatan</v-col>
                        <v-col class="py-0">
                            <v-select outlined :disabled="isDisabled" dense :items="listKecamatan" v-model="selectedKecamatan" item-text="nama_kecamatan" item-value="kode_kecamatan" :rules="[rules.required]"></v-select>
                        </v-col>
                        <v-col cols="2" class="py-0">Kelurahan</v-col>
                        <v-col class="py-0">
                            <v-select outlined :disabled="isDisabled" dense :items="filteredKelurahan" item-text="nama_kelurahan" item-value="kode_kelurahan" v-model="selectedKelurahan" :rules="[rules.required]"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0">Organisasi</v-col>
                        <v-col cols="10" class="py-0">
                            <!-- <input :disabled="isDisabled" v-model="dataEdit.organisasi" type="text" class="form-control"> -->
                            <v-text-field :disabled="isDisabled" outlined dense v-model="dataEdit.organisasi"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0">Jabatan</v-col>
                        <v-col cols="10" class="py-0">
                            <!-- <input :disabled="isDisabled" v-model="dataEdit.jabatan" type="text" class="form-control"> -->
                            <v-select outlined :disabled="isDisabled" dense :items="listJabatan" v-model="dataEdit.jabatan" :rules="[rules.required]"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0">Nomor HP</v-col>
                        <v-col cols="10" class="py-0">
                            <!-- <input :disabled="isDisabled" v-model="dataEdit.nomorHp" type="text" class="form-control"> -->
                            <v-text-field :disabled="isDisabled" outlined dense v-model="dataEdit.nomorHp"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="py-0">Email</v-col>
                        <v-col cols="10" class="py-0">
                            <!-- <input :disabled="isDisabled" v-model="dataEdit.email" type="text" class="form-control"> -->
                            <v-text-field :disabled="isDisabled" outlined dense v-model="dataEdit.email"></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
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
            refKecamatan: [],
            listJabatan: [
                'Pengurus',
                'Warga'
            ],
            rules: {
                required: value => !!value || 'Required.',
                min: (v) => v.length >= 6 || "Min 6 characters",
            },
        }
    },
    methods: {
        getDetailPengurus () {
            this.$http.get('/warga/detail/' + this.$route.params.NIK).then((response) => {
                this.detailPengurus = response.data
            }).then(() => {
                this.connectData()
            })
        },
        connectData () {
        this.dataEdit.nik = this.detailPengurus.nik;
        this.dataEdit.nama = this.detailPengurus.nama;
        this.dataEdit.alamat = this.detailPengurus.alamat;
        this.dataEdit.organisasi = this.detailPengurus.organisasi;
        this.dataEdit.jabatan = this.detailPengurus.jabatan;
        this.dataEdit.nomorHp = this.detailPengurus.no_hp;
        this.dataEdit.email = this.detailPengurus.email;
        this.selectedKecamatan = this.detailPengurus.kelurahan.kode_kecamatan; // Update to use kode_kecamatan
        this.selectedKelurahan = this.detailPengurus.kelurahan.kode_kelurahan;
    },
        toggleEdit () {
            this.isDisabled = !this.isDisabled
        },
        saveEdit () {
            if (this.$refs.formEditWarga.validate()) {
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
                            organisasi: this.dataEdit.organisasi,
                            jabatan: this.dataEdit.jabatan,
                            nomorHp: this.dataEdit.nomorHp,
                            email: this.dataEdit.email,
                            kecamatan: this.selectedKecamatan,
                            kelurahan: this.selectedKelurahan
                        }
                        this.$http.post('/warga/detail/edit', data).then((response) => {
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
            }
        },
        getRefKecamatan() {
            this.$http.get('ref/kecamatan/browse').then((response) => {
                this.refKecamatan = response.data
                this.listKecamatan = this.refKecamatan.map(kecamatan => ({kode_kecamatan: kecamatan.kode_kecamatan, nama_kecamatan: kecamatan.nama_kecamatan}));
                this.listKelurahan = this.refKecamatan.flatMap(kecamatan =>
                    kecamatan.kelurahan.map(kelurahan => ({ kode_kelurahan: kelurahan.kode_kelurahan, nama_kelurahan: kelurahan.nama_kelurahan }))
                )
            })
        }
    },
    created() {
        this.getDetailPengurus()
        this.getRefKecamatan()
    },
    computed: {
    filteredKelurahan () {
        const kecamatan = this.refKecamatan.find(kecamatan => kecamatan.kode_kecamatan === this.selectedKecamatan);
        return kecamatan ? kecamatan.kelurahan.map(kelurahan => ({
            kode_kelurahan: kelurahan.kode_kelurahan,
            nama_kelurahan: kelurahan.nama_kelurahan
        })) : [];
    }
}

}
</script>