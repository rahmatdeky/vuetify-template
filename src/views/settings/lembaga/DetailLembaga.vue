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
                    <v-col>Alamat</v-col>
                    <v-col cols="10">
                        <input :disabled="isDisabled" v-model="dataEdit.alamat" type="text" class="form-control">
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
                website: ''
            },
            isDisabled: true
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
                    this.$http.post('/lembaga/detail/edit', this.dataEdit).then((response) => {
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
        }
    },
    created () {
        this.getDetailLembaga()
    }
}
</script>