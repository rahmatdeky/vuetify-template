<template>
  <div class="home">
    <v-card elevation="2">
      <v-card-title> Menu Management </v-card-title>
      <v-card-subtitle> </v-card-subtitle>
      <v-card-text> asfsafas </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      tes: this.$store.getters["auth/user"],
    };
  },
  mounted() {
    // this.fungsi()
  },
  methods: {
    // fungsi () {
    // axios.get('/posts').then((response) => {
    //   this.tes = response.data})}
  },
};
</script>
