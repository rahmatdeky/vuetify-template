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
                                <v-btn class="float-end">
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
                                            <v-btn link :to="`/setting/detailuser/` + item.id" class="float-right" outlined color="success">
                                                <v-icon>mdi-magnify</v-icon>
                                            </v-btn>
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
            </v-row>
        </v-container>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        user: [],
        // search: {
        //     nama: '',
        //     email: ''
        // }
        search: ''
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
        }
    }
  }
</script>