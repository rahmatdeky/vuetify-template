<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="4">
                    <v-card elevation="2" min-height="460px">
                        <v-container>
                            <v-row class="text-center ma-auto mt-5 justify-center">
                                <v-col cols="12">
                                    <v-btn color="warning" @click="openFilePicker()" style="position: absolute; top: 50px; right: 110px; z-index: 1;">
                                        <v-icon>mdi-pencil</v-icon>
                                    </v-btn>
                                    <input type="file" ref="changeGambar" style="display: none;" @change="gantiGambar()">
                                    <v-img height="200px" width="200px" class="rounded-circle mx-auto"
                                        :src="UrlGambar + dataUser.url_foto">
                                    </v-img>
                                </v-col>
                            </v-row>
                            <v-row class="mx-7">
                                <v-col>
                                    <table width="100%" class="table">
                                        <tr>
                                            <td width="20%">
                                                <h5>Nama</h5>
                                            </td>
                                            <td width="1%">
                                                <h5>:</h5>
                                            </td>
                                            <td>
                                                <h5>{{ dataUser.name }}</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>Email</h5>
                                            </td>
                                            <td>
                                                <h5>:</h5>
                                            </td>
                                            <td>
                                                <h5>{{ dataUser.email }}</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h5>Role</h5>
                                            </td>
                                            <td>
                                                <h5>:</h5>
                                            </td>
                                            <td>
                                                <h5>{{ dataUser.role }}</h5>
                                            </td>
                                        </tr>
                                    </table>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
                <v-col cols="8">
                    <v-card elevation="2" min-height="460px">
                        <v-container>
                            <v-row>
                                <v-col>
                                    <!-- alternatif pakai tabs -->
                                    <v-tabs>
                                        <v-tab @click="toggleEdit">Profile</v-tab>
                                        <v-tab @click="togglePassword">Ubah Password</v-tab>
                                    </v-tabs>

                                    <!-- alternatif pakai button -->
                                    <!-- <v-btn x-large text @click="toggleEdit2" :color="!isEdit ? 'primary' : ''">Edit
                                        Profile</v-btn>
                                    <v-btn x-large class="float-right" text @click="togglePassword"
                                        :color="isPassword ? 'primary' : ''">Ubah Password</v-btn>
                                    <hr> -->
                                </v-col>
                            </v-row>
                            <v-row class="mt-0" v-if="!isPassword">
                                <v-col class="mt-0 pt-0">
                                    <v-container class="mt-0 pt-0">
                                        <v-form ref="formEditUser">
                                            <v-row>
                                                <v-col class="pb-0" cols="12">
                                                    <h5 class="ml-1">Nama : </h5>
                                                    <v-text-field v-model="editUser.nama" outlined dense :disabled="isDisabled" :rules="[rules.required]"></v-text-field>
                                                    <!-- <div class="input-group input-group-lg">
                                                        <input type="text" class="form-control" :disabled="isDisabled"
                                                            v-model="editUser.nama">
                                                    </div> -->
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="py-0" cols="12">
                                                    <h5 class="ml-1">Email : </h5>
                                                    <v-text-field v-model="editUser.email" outlined dense :disabled="isDisabled" :rules="[rules.required]"></v-text-field>
                                                    <!-- <div class="input-group input-group-lg">
                                                        <input type="email" class="form-control" value="adsadasd"
                                                            :disabled="isDisabled" v-model="editUser.email">
                                                    </div> -->
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="pt-0" cols="12">
                                                    <h5 class="ml-1">Role : </h5>
                                                    <v-select dense v-model="editUser.role" :items="listRole" :disabled="isDisabled" outlined></v-select>
                                                    <!-- <div class="input-group input-group-lg">
                                                        <select name="" id="" class="form-control" :disabled="isDisabled"
                                                            v-model="editUser.role">
                                                            <option value="admin">Admin</option>
                                                            <option value="user">User</option>
                                                        </select>
                                                    </div> -->
                                                </v-col>
                                            </v-row>
    
                                            <!-- alternatif tombol didalam card -->
                                            <v-row class="mt-0">
                                                <v-col cols="12">
                                                    <v-btn rounded @click="toggleDisabled" color="primary" class="float-right">{{ !isDisabled ? 'Simpan' : 'Edit' }}</v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-container>
                                </v-col>
                            </v-row>
                            <v-row class="mt-0" v-if="isPassword">
                                <v-col class="mt-0 pt-0">
                                    <v-container class="mt-0 pt-0">
                                        <v-form ref="formGantiPassword">
                                            <v-row>
                                                <v-col cols="12">
                                                    <h5 class="ml-1">Password Baru : </h5>
                                                    <!-- <div class="input-group input-group-lg">
                                                        <input type="password" class="form-control">
                                                    </div> -->
                                                    <v-text-field v-model="gantiPassword.baru" outlined dense
                                                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                        :rules="[rules.required, rules.min]"
                                                        :type="show2 ? 'text' : 'password'"
                                                        @click:append="show2 = !show2"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12">
                                                    <h5 class="ml-1">Konfirmasi Password Baru : </h5>
                                                    <!-- <div class="input-group input-group-lg">
                                                        <input class="form-control" type="password">
                                                    </div> -->
                                                    <v-text-field v-model="gantiPassword.konfirmasi" outlined dense
                                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                        :rules="[rules.required, rules.min]"
                                                        :type="show1 ? 'text' : 'password'"
                                                        @click:append="show1 = !show1"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-alert class="px-3" v-if="notMatch" type="error" dense
                                                        outlined>Password Baru dan Konfirmasi Password Baru tidak
                                                        sama</v-alert>
                                                </v-col>
                                            </v-row>
    
                                            <!-- alternatif tombol didalam card -->
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-btn @click="sendGantiPassword()" rounded color="primary" class="float-right">Simpan</v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>

            <!-- alternatif tombol diluar card -->
            <!-- <v-row v-if="!isDisabled">
                <v-col cols="12">
                    <v-btn rounded color="primary" class="float-right">Simpan</v-btn>
                </v-col>
            </v-row>
            <v-row v-if="isPassword">
                <v-col cols="12">
                    <v-btn rounded color="primary" class="float-right">Simpan</v-btn>
                </v-col>
            </v-row> -->
        </v-container>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            isPassword: false,
            isDisabled: true,
            isEdit: true,
            show1: false,
            show2: false,
            editUser: {
                nama: '',
                email: '',
                id: '',
                role: ''
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
            aksesAdded: '',
            listRole: [
                'admin',
                'user'
            ],
            UrlGambar: window.UrlGambarBerita,
            editGambar: null
        }
    },
    methods: {
        toggleEdit() {
            this.isPassword = false
            this.isEdit = !this.isEdit
            this.isDisabled = true
        },

    // alternatif pakai tombol
        toggleEdit2() {
            this.isPassword = false
            this.isEdit = !this.isEdit
            this.isDisabled = !this.isDisabled
        },
        togglePassword() {
            this.isPassword = true
            this.isEdit = true
            this.isDisabled = true
        },
        toggleDisabled() {
            if (this.isDisabled) {
                this.isDisabled = !this.isDisabled
            } else {
                if (this.$refs.formEditUser.validate()) {
                    Swal.fire({
                        title: 'Apa Anda Yakin?',
                        text: "Anda Akan Merubah ini",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.saveEdit()
                            this.isDisabled = !this.isDisabled
                        } else {
                            this.isDisabled = !this.isDisabled
                        }
                    })
                }
            }
        },
        getDataUser() {
            this.$http.get('/getUser/detail/' + this.$route.params.id).then((response) => {
                this.dataUser = response.data
            }).then(() => {
                this.reconData()
            })
        },
        reconData() {
            this.editUser.nama = this.dataUser.name
            this.editUser.email = this.dataUser.email
            this.editUser.id = this.dataUser.id
            this.editUser.role = this.dataUser.role
        },
        saveEdit() {
            this.$http.put('/user/updateData', this.editUser)
            .then((response) => {
                if(response) {
                    this.modalEditUser = false
                    Swal.fire({
                        icon: response.data.icon,
                        title: response.data.title,
                        text: response.data.text
                    })
                }
            }).then(this.getDataUser)
        },
        sendGantiPassword () {
            if (this.$refs.formGantiPassword.validate()) {
                if (this.gantiPassword.baru === this.gantiPassword.konfirmasi) {
                    Swal.fire({
                        title: 'Apa Anda Yakin?',
                        text: "Anda Akan Merubah ini",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            var data = {
                            id: this.dataUser.id,
                            baru :this.gantiPassword.baru
                        }
                        this.notMatch = false
                        this.$http.put('/user/updatePwbyAdmin', data)
                        .then((response) => {
                            if(response) {
                                this.clearFormPassword()
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
        openFilePicker() {
            this.$refs.changeGambar.click()
        },
        gantiGambar() {
            this.editGambar = this.$refs.changeGambar.files[0]
            const formData = new FormData()
            formData.append('file', this.editGambar)
            formData.append('id', this.dataUser.id)
            this.$http.post('/user/gantiGambar', formData)
            .then(this.getDataUser)
        },
        clearFormPassword() {
            this.gantiPassword.baru = ''
            this.gantiPassword.konfirmasi = ''
        }
    },
    created() {
        this.getDataUser()
    }
}
</script>