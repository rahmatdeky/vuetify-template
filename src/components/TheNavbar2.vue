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
            <a class="navbar-brand" href="#">
                <img src="" alt="">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#offcanvasDarkNavbar
            " aria-controls="offcanvasDarkNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
              <img src="@/assets/logoNU-removebg-preview.png" alt="">
            </span>
            </button>
            <div class="collapse navbar-collapse " id="offcanvasDarkNavbar">
                <div class="navbar-nav ">
                  <v-tabs background-color="#436850" centre dark>
                    <v-tabs-slider color="#fff"></v-tabs-slider>
                    <v-tab link to="/page">Home</v-tab>
                    <v-tab link to="/struktur">Struktur Organisasi</v-tab>
                    <v-tab link to="/berita">Berita</v-tab>
                  </v-tabs>
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
        body{
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
        
        h2:before ,
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
            .card{
                border: none;
                border-radius: 5px;
            }
            footer{
                background-color: #436850;
                
                bottom: 0;
                left: 0;
                text-align: center;
            }
            a{
                color: white;
            }
            a:hover{
                color: #33691E;
            }
            .card-footer {
                border:none;
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