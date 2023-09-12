<template>
    <div>
        <v-card>
            <v-toolbar color="primary" dark>Change Password</v-toolbar>
            <v-container>
                <v-row>
                    <v-col align-self="center" cols="4">
                        <p>Password Sekarang</p>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field v-model="dataPassword.currentPass" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                     :rules="[rules.required, rules.min]"
                                     :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" dense></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col align-self="center" cols="4">
                        <p>Password Baru</p>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field v-model="dataPassword.newPass" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                     :rules="[rules.required, rules.min]"
                                     :type="show2 ? 'text' : 'password'" @click:append="show2 = !show2" dense></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col align-self="center" cols="4">
                        <p>Konfirmasi Password Baru</p>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field v-model="dataPassword.confirmNewPass" :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                     :rules="[rules.required, rules.min]"
                                     :type="show3 ? 'text' : 'password'" @click:append="show3 = !show3" dense></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                    </v-col>
                    <v-col cols="8">
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
                    <v-col>
                        <v-btn @click="submitPass()" color="primary">
                            Submit
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            dataPassword: {
                currentPass: '',
                newPass: '',
                confirmNewPass: ''
            },
            rules: {
                required: (value) => !!value || "Required.",
                min: (v) => v.length >= 6 || "Min 6 characters",
            },
            show1: false,
            show2: false,
            show3: false,
            notMatch: false
        }
    },
    methods: {
        submitPass () {
            if (this.dataPassword.newPass === this.dataPassword.confirmNewPass) {
                var data = {
                    id: this.user.id,
                    currentPass: this.dataPassword.currentPass,
                    newPass: this.dataPassword.newPass
                }
                this.$http.post('/gantiPw', data).then(() => {
                    Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Data Berhasil Disimpan'
                    })
                    this.cleanForm
                })
                // console.log(data)
            } else {
                this.notMatch = true
            }
        },
        cleanForm () {
            this.dataPassword.currentPass = ''
            this.dataPassword.newPass = ''
            this.dataPassword.confirmNewPass = ''
        }
    },
    computed: {
        ...mapGetters({
            user: "auth/user"
        }),
    }
}
</script>