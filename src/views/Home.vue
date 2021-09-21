<template>
  <div class="home">
    <v-card elevation="2">
      <v-card-title> Dashboard </v-card-title>
      <v-card-subtitle> Dasbor </v-card-subtitle>
      <v-card-text>
        <p>
          Selamat datang di Aplikasi Koperasi Bina Cipta
        </p>
        <!-- <p> {{ tes }}</p> -->
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      tes: ''
    }
  },
  mounted () {
    this.fungsi()
  },
  methods:{
    fungsi () {
    axios.get('/posts').then((response) => {
      this.tes = response.data})}
  }
}
</script>
