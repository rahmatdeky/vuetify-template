<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="8">
                    <v-card elevation="2">
                        <v-card-title>Detail User</v-card-title>
                        <v-container>
                            <v-row>
                                <v-col>

                                </v-col>
                                <v-simple-table>
                                    <tbody>
                                        <tr>
                                            <td>Nama</td>
                                            <td>{{ dataUser.name }}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{{ dataUser.email }}</td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </v-row>
                            <v-row>
                                <v-col cols="2">
                                    <v-btn @click="openModalEditUser" class="primary">
                                        Edit User
                                    </v-btn>
                                </v-col>
                                <v-col cols="3">
                                    <v-btn @click="openModalGantiPassword" class="warning">
                                        Ganti Password
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card elevation="2">
                        <v-card-title>Akses</v-card-title>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-btn @click="openModalTambahAkses" outlined class="success float-right">
                                        Add Akses
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-simple-table>
                                        <thead>
                                            <tr>
                                                <th width="1">No</th>
                                                <th>Akses</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(akses, index) in dataUser.akses" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ akses.akses }}</td>
                                                <td>
                                                    <v-btn @click="deleteAkses(akses.id)" icon color="error">
                                                        <v-icon>mdi-delete</v-icon>
                                                    </v-btn>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </v-simple-table>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
            <v-dialog persistent max-width="600px" v-model="modalEditUser">
                <template>
                    <v-card>
                        <v-toolbar color="primary" dark>
                            Edit User
                        </v-toolbar>
                        <v-container>
                            <v-row align-self="center">
                                <v-col cols="4">Nama</v-col>
                                <v-col cols="8">
                                    <v-text-field dense v-model="editUser.nama"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row align-self="center">
                                <v-col cols="4">Email</v-col>
                                <v-col cols="8">
                                    <v-text-field dense v-model="editUser.email"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-btn @click="modalEditUser = false" color="secondary">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn @click="sendEditUser()" class="float-right" color="primary">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </template>
            </v-dialog>
            <v-dialog persistent max-width="600px" v-model="modalGantiPassword">
                <template>
                    <v-card>
                        <v-toolbar color="primary" dark>
                            Ganti Password
                        </v-toolbar>
                        <v-container>
                            <v-row align-self="center">
                                <v-col>
                                    <v-text-field
                                     label="Password Baru" 
                                     dense 
                                     v-model="gantiPassword.baru"
                                     :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                     :rules="[rules.required, rules.min]"
                                     :type="show1 ? 'text' : 'password'"
                                     @click:append="show1 = !show1"
                                     ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row align-self="center">
                                <v-col>
                                    <v-text-field
                                     label="Konfirmasi Password Baru"
                                     dense 
                                     v-model="gantiPassword.konfirmasi"
                                     :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                     :rules="[rules.required, rules.min]"
                                     :type="show2 ? 'text' : 'password'"
                                     @click:append="show2 = !show2"
                                     ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-alert
                                    class="px-3"
                                    v-if="notMatch"
                                    type="error"
                                    dismissible
                                    dense
                                    outlined
                                    >Password Baru dan Konfirmasi Password Baru tidak sama</v-alert
                                    >
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-btn @click="modalGantiPassword = false" color="secondary">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn @click="sendGantiPassword" class="float-right" color="primary">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </template>
            </v-dialog>
            <v-dialog max-width="600px" v-model="modalTambahAkses">
                <template>
                    <v-card>
                        <v-toolbar color="primary" dark>
                            Tambah Akses
                        </v-toolbar>
                        <v-container>
                            <v-row align-self="center">
                                <v-col>
                                    <v-select v-model="aksesAdded" :items="listAkses">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn @click="addAkses()" class="float-right" color="primary">
                                        <v-icon>mdi-check</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </template>
            </v-dialog>
        </v-container>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            show1: false,
            show2: false,
            modalEditUser: false,
            modalGantiPassword: false,
            modalTambahAkses: false,
            editUser: {
                nama: '',
                email: '',
                id: ''
            },
            gantiPassword: {
                baru: '',
                konfirmasi: ''
            },
            listAkses: [],
            dataUser: [],
            rules: {
                required: (value) => !!value || "Required.",
                min: (v) => v.length >= 6 || "Min 6 characters",
            },
            notMatch: false,
            aksesAdded: ''
        }
    },
    created() {
        this.getDataUser(),
        this.getListAkses()
    },
    methods: {
        openModalEditUser() {
            this.modalEditUser = true
            this.editUser.nama = this.dataUser.name
            this.editUser.email = this.dataUser.email
            this.editUser.id = this.dataUser.id
        },
        openModalGantiPassword() {
            this.modalGantiPassword = true
        },
        openModalTambahAkses() {
            this.modalTambahAkses = true
        },
        getDataUser() {
            this.$http.get('/getUser/detail/' + this.$route.params.id).then((response) => {
                this.dataUser = response.data
            })
        },
        getListAkses() {
            this.$http.get('/getUser/listAkses').then((response) => {
                this.listAkses = response.data
            })
        },
        sendEditUser () {
            this.$http.put('/user/updateData', this.editUser)
            .then((result) => {
                if(result) {
                    this.modalEditUser = false
                    Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data Berhasil Disimpan'
                    })
                }
            }).then(this.getDataUser)
        },
        sendGantiPassword () {
            if (this.gantiPassword.baru === this.gantiPassword.konfirmasi) {
                var data = {
                    id: this.dataUser.id,
                    baru :this.gantiPassword.baru
                }
                this.$http.put('/user/updatePwbyAdmin', data)
                .then(() => {
                    this.modalGantiPassword = false
                    Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data Berhasil Disimpan'
                    })
                })
            } else {
                this.notMatch = true
            }
        },
        addAkses () {
            var akses = {
                id: this.dataUser.id,
                email: this.dataUser.email,
                menu: this.aksesAdded
            }
            this.$http.post('user/addAkses', akses)
            .then(() => {
                this.modalTambahAkses = false
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data Berhasil Disimpan'
                    })
            }).then(this.getDataUser)
        },
        deleteAkses(id) {
            Swal.fire({
                title: 'Apa Anda Yakin?',
                text: "Anda Tidak Dapat Mengembalikannya lagi",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        var data = {
                            id_menu: id
                        }
                        this.$http.post('/user/akses/delete', data)
                        .then(() => {
                            Swal.fire({
                            icon: 'success',
                            title: 'Berhasil',
                            text: 'Data Berhasil Disimpan'
                            })
                        }).then(
                            this.getDataUser
                        )
                    }
                })
        }
    }
}
</script>