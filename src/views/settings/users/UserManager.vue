<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card elevation="2">
                      <v-card-title> User Manajer </v-card-title>
                      <v-container>
                          <v-row>
                            <v-col cols="9" lg="3" md="3" class="order-2 order-md-1">
                                <v-text-field v-model="search" label="Pencarian"></v-text-field>
                            </v-col>
                            <!-- <v-col cols="2">
                                <v-text-field v-model="search" label="Email"></v-text-field>
                            </v-col> -->
                            <v-col align-self="center" cols="1" class="order-3 order-md-2">
                                <v-btn @click="getDataUser()" icon>
                                    <v-icon>mdi-magnify</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col class="order-1 order-md-3">
                                <v-btn @click="openModalAddUser" class="float-end button-plus-1">
                                    <v-icon>mdi-plus</v-icon> Tambah User
                                </v-btn>
                                <v-btn @click="openModalAddUser" class="float-end button-plus-2" color="primary" dark title="Tambah User">
                                    <v-icon>mdi-plus</v-icon>
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
                                                <v-btn class="mx-1" link :to="`/setting/detailuser/` + item.id" outlined color="success">
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
                        <v-container class="form-tambah-1">
                            <v-form ref="formAddUser" @submit.prevent="submitAddUser()">

                                <v-row>
                                    <v-col align-self="center" cols="3">
                                        <p>Nama</p>
                                    </v-col>
                                    <v-col>
                                        <v-text-field 
                                         :rules="[rules.required, (v) => !!v || 'Required.']"
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
                                        <p>Role</p>
                                    </v-col>
                                    <v-col>
                                        <v-select :rules="[rules.required]" dense :items="listRole" v-model="dataAddUsers.role"></v-select>
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
                                    <v-col cols="4">
                                        <input type="file" class="form-control" @change="uploadGambar">
                                    </v-col>
                                    <v-col cols="8">
                                        <v-img v-if="previewImage" height="200" width="200" class="rounded-circle mx-auto" :src="previewImage"></v-img>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="2">
                                        <v-btn type="submit" @click="submitAddUsers()" color="primary">Submit</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                        <v-container class="form-tambah-2">
                            <v-form ref="formAddUser" @submit.prevent="submitAddUser()">

                                <v-row>
                                    <!-- <v-col align-self="center" cols="3"><p>Nama</p></v-col> -->
                                    <v-col>
                                        <v-text-field label="Nama"
                                         :rules="[rules.required, (v) => !!v || 'Required.']"
                                         v-model="dataAddUsers.nama" dense></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col align-self="center" cols="3">
                                        <p>Email</p>
                                    </v-col> -->
                                    <v-col>
                                        <v-text-field label="Email"
                                         :rules="[rules.required]"
                                         v-model="dataAddUsers.email" dense></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col align-self="center" cols="3">
                                        <p>Role</p>
                                    </v-col> -->
                                    <v-col>
                                        <v-select label="Role" :rules="[rules.required]" dense :items="listRole" v-model="dataAddUsers.role"></v-select>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col align-self="center" cols="3">
                                        <p>Password</p>
                                    </v-col> -->
                                    <v-col>
                                        <v-text-field label="Password"
                                         :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                         :rules="[rules.required, rules.min]"
                                         :type="show1 ? 'text' : 'password'"
                                         @click:append="show1 = !show1"
                                         v-model="dataAddUsers.password" dense></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <!-- <v-col align-self="center" cols="3">
                                        <p>Konfirmasi Password</p>
                                    </v-col> -->
                                    <v-col>
                                        <v-text-field label="Konfirmasi Password"
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
                                    <v-col cols="12">
                                        <input type="file" class="form-control" @change="uploadGambar">
                                    </v-col>
                                    <v-col cols="12">
                                        <v-img v-if="previewImage" height="200" width="200" class="rounded-circle mx-auto" :src="previewImage"></v-img>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-btn type="submit" @click="submitAddUsers()" color="primary">Submit</v-btn>
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
            konfirmPass: '',
            role: '',
            file: null
        },
        rules: {
            required: (value) => !!value || "Required.",
            min: (v) => v.length >= 6 || "Min 6 characters",
        },
        show1: false,
        show2: false,
        notMatch: false,
        listRole: [
            'admin',
            'pengurus'
        ],
        previewImage: null,
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
        // submitAddUsers () {
        //     if (this.$refs.formAddUser.validate()) {
        //         if (this.dataAddUsers.password === this.dataAddUsers.konfirmPass) {
        //             this.$http.post('/user/adduser', this.dataAddUsers)
        //             .then(() => {
        //                 Swal.fire({
        //                     icon: 'success',
        //                     title: 'Berhasil',
        //                     text: 'Data Berhasil Disimpan'
        //                 })
        //             }).then(() => {
        //                 this.modalAddUser = false
        //                 this.getDataUser()
        //                 this.clearFormAddUser()
        //             })
        //         } else {
        //             this.notMatch = true
        //             this.getDataUser()
        //         }
        //     }
        // },
        submitAddUsers () {
            if (this.$refs.formAddUser.validate()) {
                if (this.dataAddUsers.password === this.dataAddUsers.konfirmPass) {
                    const formData = new FormData()
                    formData.append('nama', this.dataAddUsers.nama)
                    formData.append('email', this.dataAddUsers.email)
                    formData.append('password', this.dataAddUsers.password)
                    formData.append('role', this.dataAddUsers.role)
                    if (this.dataAddUsers.file) {
                        formData.append('file', this.dataAddUsers.file);
                    }
                    Swal.fire({
                        title: 'Apa Anda Yakin?',
                        text: "Anda Akan Menyimpan ini",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$http.post('/user/adduser', formData)
                            .then((response) => {
                                if (response) {
                                    Swal.fire({
                                        icon: response.data.icon,
                                        title: response.data.title,
                                        text: response.data.text
                                    }).then(() => {
                                        this.modalAddUser = false
                                        this.getDataUser()
                                        this.clearFormAddUser()
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
                        .then((response) => {
                            if (response) {
                                Swal.fire({
                                    icon: response.data.icon,
                                    title: response.data.title,
                                    text: response.data.text
                                }).then(
                                    this.getDataUser()
                                )
                            }
                        })
                    }
                })
        },
        clearFormAddUser () {
            this.dataAddUsers.nama = ''
            this.dataAddUsers.email = ''
            this.dataAddUsers.password = ''
            this.dataAddUsers.konfirmPass = ''
            this.dataAddUsers.role = ''
            this.dataAddUsers.file = null
        },
        uploadGambar(e) {
            this.dataAddUsers.file = e.target.files[0]
            let preview = e.target.files[0]
            this.previewImage = URL.createObjectURL(preview)
        }
    }
  }
</script>