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
              <v-card height="505px" width="90%" elevation="2" style="background-image: linear-gradient(to top, #436850, #ffffff); border-radius: 4%;" :loading="loading"
      :disabled="loading">
                <v-container>
                  <v-row class="px-15">
                    <v-col>
                      <h3>Aplikasi Pengelolaan Data Lembaga Pendidikan NU di Kota Batam</h3>
                    </v-col>
                  </v-row>
                  <v-form ref="form" @submit.prevent="submit" method="POST">
                    <v-container>
                      <v-alert class="px-3" v-if="alert" type="error" dismissible dense outlined>Email/Password yang anda masukan salah</v-alert>
                      <v-row>
                        <v-col>
                          <v-text-field v-model="form.email" :rules="[rules.required]" counter large outlined placeholder="Masukkan Alamat Email..."></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-text-field v-model="form.password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" name="input-10-1" hint="At least 6 characters" counter @click:append="show = !show" large outlined placeholder="Masukkan Password..."></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols=4></v-col>
                        <v-col cols=4></v-col>
                        <v-col cols=4>
                          <v-btn type="submit" class="float-right" block x-large color="#436850">Login</v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
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
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      show: false,
      // isLoading: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
    loading() {
      return this.$store.getters["auth/isLoading"];
    },
    alert() {
      return this.$store.getters["auth/loginAlert"];
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    ...mapActions({
      login: "auth/login",
      handleClick: "handleClick",
    }),
    goRegister() {
      this.$router.push({ path: "register" });
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.login(this.form)
          .then(() => {
            this.$store.commit("auth/SET_LOADING", false);
            this.$router.push({ path: "home" });

          })
      }
      // this.$refs.form.validate(
      // )
      // // this.isLoading = true
      // //   setTimeout(() => (this.isLoading = false), 2000);
    },
  },
};
</script>
