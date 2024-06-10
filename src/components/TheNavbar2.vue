<template>
  <div>
    <!-- <v-app-bar color="rgb(0, 128, 0)" dark>
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
    </v-app-bar> -->
    <!-- <router-view :key="$route.path"></router-view> -->
    <nav class="navbar navbar-expand-lg fixed-top">
  <div class="container">
    <v-img class="navbar-logo" max-width="120px" src="@/assets/logoNU-removebg-preview.png"></v-img>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#offcanvasDarkNavbar"
        aria-controls="offcanvasDarkNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="offcanvasDarkNavbar">
        <div class="navbar-nav col-lg-12 col-md-12">
            <v-tabs background-color="#436850" center dark class="d-none d-md-flex">
                <v-tabs-slider color="#fff"></v-tabs-slider>
                <v-tab link to="/page">Home</v-tab>
                <v-tab link to="/struktur">Struktur Organisasi</v-tab>
                <v-tab link to="/berita">Berita</v-tab>
            </v-tabs>
            <v-list class="d-flex d-md-none flex-column">
                <v-list-item link to="/page">Home</v-list-item>
                <v-list-item link to="/struktur">Struktur Organisasi</v-list-item>
                <v-list-item link to="/berita">Berita</v-list-item>
            </v-list>
        </div>
    </div>
  </div>
</nav>
  </div>
</template>
<script>
export default {
  name: "TheNavbar2"
};
</script>
<style>
.navbar-logo {
    max-height: 100%;
  }

  @media (max-width: 768px) {
    .navbar-logo {
      max-height: 50px; /* Adjust the value as needed to fit within the navbar */
      width: auto;
    }
  }

  .navbar-nav {
    flex-direction: column;
  }

  .v-tabs {
    display: none;
  }

  .v-list {
    width: 100%;
  }

  .v-list-item {
    text-align: center;
  }
body {
  font-family: 'Poppins', sans-serif;
  padding-top: 56px;
  background-color: #fff;
}



.background-header {
  height: 900px;
  background: url('/images/HeroBanner.png');
  padding-top: 56px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.background-header .mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.background-header .text-white {

  z-index: 1;
}

.navbar {
  background-color: #436850;
  height: 80px;
}

.nav-link {
  font-weight: 600;
  color: white;
  margin-right: 50px;
}

.nav-link:hover {
  color: black;
  transform: scale3d(1.1, 1.1, 1.1);
}

h2:before,
/* h2:after 
            {
                background-color: black;
                content: "";
                display: inline-block;
                height: 3px;
                margin-left: 10px;
                margin-right: 10px;
                vertical-align: middle;
                width: 25%;
            } */
.card {
  border: none;
  border-radius: 5px;
}

footer {
  background-color: #436850;

  bottom: 0;
  left: 0;
  text-align: center;
}

a {
  color: white;
}

a:hover {
  color: #33691E;
}

.card-footer {
  border: none;
}

.medsos p span i {
  padding: 10px;

}

.social-buttons {
  padding: 1.5rem;
  padding-top: 0.6rem;
  padding-left: 0.9rem;

}

.social-buttons button {
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.social-buttons button:focus {
  outline: 0;
}

.social-buttons button:hover i {

  transform: scale(1.5);
}
</style>