<template>
    <v-app style="background-image: linear-gradient(to top right, #000000, #436850);">
      <v-container fill-height>
        <v-row>
          <v-col class="text-center" cols="7">
            <div class="d-flex justify-center align-center">
              <v-img src="@/assets/logoNU-removebg-preview.png"></v-img>
            </div>
          </v-col>
          <v-col class="" cols="5">
            <div class="d-flex justify-center align-center">
              <v-card height="505px" width="90%" elevation="2" style="background-image: linear-gradient(to top, #436850, #ffffff); border-radius: 4%;">
                <v-container>
                  <v-row class="px-15">
                    <v-col>
                      <h3>Aplikasi Pengelolaan Data Lembaga Pendidikan NU di Kota Batam</h3>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field large outlined placeholder="Masukkan Alamat Email..."></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field large outlined placeholder="Masukkan Password..."></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols=4></v-col>
                    <v-col cols=4></v-col>
                    <v-col cols=4>
                      <v-btn class="float-right" block x-large color="#436850">Login</v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
</template>
<style>
  body {
    background-image: linear-gradient(to top right, #000000, #436850);
  }
</style>
