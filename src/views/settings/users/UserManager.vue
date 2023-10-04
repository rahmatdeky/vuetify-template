<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card elevation="2">
                      <v-card-title> User Manajer </v-card-title>
                      <v-container>
                          <v-row>
                            <v-col cols="3">
                                <v-text-field v-model="search" label="Pencarian"></v-text-field>
                            </v-col>
                            <!-- <v-col cols="2">
                                <v-text-field v-model="search" label="Email"></v-text-field>
                            </v-col> -->
                            <v-col align-self="center" cols="1">
                                <v-btn @click="getDataUser()" icon>
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn @click="openModalAddUser" class="float-end">
                                    <v-icon>mdi-plus</v-icon> Tambah User
                                </v-btn>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-simple-table>
                                <thead>
                                    <tr>
                                        <td>No</td>
                                        <td>Nama</td>
                                        <td>Email</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in user.data" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.email }}</td>
                                        <td>
                                            <v-list-item class="float-right">
                                                <v-btn link :to="`/setting/detailuser/` + item.id" outlined color="success">
                                                    <v-icon>mdi-magnify</v-icon>
                                                </v-btn>
                                                <v-btn @click="deleteUser(item.id)" outlined color="red">
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </v-list-item>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                          </v-row>
                          <v-row>
                            <v-col>
                                <v-btn-toggle rounded dense>
                                    <v-btn color="primary" @click="getDataUser(user.prev_page_url)" :disabled="!user.prev_page_url">
                                        prev
                                    </v-btn>
                                    <v-btn>
                                        {{ user.current_page + '/' + user.last_page}}
                                    </v-btn>
                                    <v-btn color="primary" @click="getDataUser(user.next_page_url)" :disabled="!user.next_page_url">
                                        next
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                          </v-row>
                      </v-container>
                    </v-card>
                </v-col>
                <v-dialog max-width="600" v-model="modalAddUser">
                    <v-card>
                        <v-toolbar color="primary" dark>
                            <h4>Tambah User</h4>
                        </v-toolbar>
                        <v-container>
                            <v-row>
                                <v-col align-self="center" cols="3">
                                    <p>Nama</p>
                                </v-col>
                                <v-col>
                                    <v-text-field 
                                     :rules="[rules.required]"
                                     v-model="dataAddUsers.nama" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col align-self="center" cols="3">
                                    <p>Email</p>
                                </v-col>
                                <v-col>
                                    <v-text-field 
                                     :rules="[rules.required]"
                                     v-model="dataAddUsers.email" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col align-self="center" cols="3">
                                    <p>Password</p>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                     :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                     :rules="[rules.required, rules.min]"
                                     :type="show1 ? 'text' : 'password'"
                                     @click:append="show1 = !show1"
                                     v-model="dataAddUsers.password" dense></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col align-self="center" cols="3">
                                    <p>Konfirmasi Password</p>
                                </v-col>
                                <v-col>
                                    <v-text-field 
                                     :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                     :rules="[rules.required, rules.min]"
                                     :type="show2 ? 'text' : 'password'"
                                     @click:append="show2 = !show2"
                                     v-model="dataAddUsers.konfirmPass" dense></v-text-field>
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
                                    >Password dan Konfirmasi Password tidak sama</v-alert
                                    >
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="2">
                                    <v-btn @click="submitAddUsers" color="primary">Submit</v-btn>
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
        user: [],
        // search: {
        //     nama: '',
        //     email: ''
        // }
        search: '',
        modalAddUser: false,
        dataAddUsers: {
            nama: '',
            email: '',
            password: '',
            konfirmPass: ''
        },
        rules: {
            required: (value) => !!value || "Required.",
            min: (v) => v.length >= 6 || "Min 6 characters",
        },
        show1: false,
        show2: false,
        notMatch: false
      }
    },
    created() {
        this.getDataUser()
    },
    methods: {
        getDataUser(page) {
            // console.log(this.search)
            if(typeof page === 'undefined') {
                page = '/getUser?page=1'
            }
            var auth = {
                search: this.search
            }
            this.$http.post(page, auth).then((response) => {
                this.user = response.data
            })
        },
        openModalAddUser () {
            this.modalAddUser = true
        },
        submitAddUsers () {
            if (this.dataAddUsers.password === this.dataAddUsers.konfirmPass) {
                this.$http.post('/user/adduser', this.dataAddUsers)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data Berhasil Disimpan'
                    })
                }).then(() => {
                    this.modalAddUser = false
                })
            } else {
                this.notMatch = true
                this.getDataUser
            }
        },
        deleteUser (id) {
            Swal.fire({
                title: 'Apa Anda Yakin?',
                text: "Anda Tidak Dapat Mengembalikannya lagi",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        var data = {
                            id_user: id
                        }
                        this.$http.post('user/delete', data)
                        .then(() => {
                            Swal.fire({
                            icon: 'success',
                            title: 'Berhasil',
                            text: 'Data Berhasil Disimpan'
                            })
                        }).then(
                            this.getDataUser()
                        )
                    }
                })
        }
    }
  }
</script>