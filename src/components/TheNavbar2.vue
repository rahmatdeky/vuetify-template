<template>
  <div>
    <v-app-bar color="rgb(0, 128, 0)" dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <!-- <v-toolbar-title>Aplikasi Anya</v-toolbar-title> -->
      <v-btn link to="/page" text>
        <v-icon>mdi-home</v-icon> Home
      </v-btn>
      <v-btn link to="/struktur" text>
        Struktur Organisasi
      </v-btn>
      <v-btn link to="/berita" text>
        Berita
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn link to="/login" text>
        Login
      </v-btn>
      <v-btn link to="/login" text>
        Registrasi
      </v-btn>
    </v-app-bar>
    <!-- <router-view :key="$route.path"></router-view> -->
  </div>
</template>
<script>
export default {
  name: "TheNavbar2"
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>