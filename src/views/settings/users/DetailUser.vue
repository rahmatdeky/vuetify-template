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
                                            <td>Deky</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>deky@gmail.com</td>
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
                                            <tr>
                                                <td>1</td>
                                                <td>BrowseSiswa</td>
                                                <td>
                                                    <v-btn icon color="error">
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
                                    <v-btn class="float-right" color="primary">
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
                                    <v-text-field label="Password Baru" dense v-model="gantiPassword.baru"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row align-self="center">
                                <v-col>
                                    <v-text-field label="Konfirmasi Password Baru" dense v-model="gantiPassword.konfirmasi"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-btn @click="modalGantiPassword = false" color="secondary">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col cols="6">
                                    <v-btn class="float-right" color="primary">
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
                                    <v-select :items="listAkses">
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn class="float-right" color="primary">
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
export default {
    data() {
        return {
            modalEditUser: false,
            modalGantiPassword: false,
            modalTambahAkses: false,
            editUser: {
                nama: '',
                email: ''
            },
            gantiPassword: {
                baru: '',
                konfirmasi: ''
            },
            listAkses: [
                'manajemenUser',
                'browseSiswa'
            ],
            dataUser: []
        }
    },
    created() {
        this.getDataUser()
    },
    methods: {
        openModalEditUser() {
            this.modalEditUser = true
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
        }
    }
}
</script>