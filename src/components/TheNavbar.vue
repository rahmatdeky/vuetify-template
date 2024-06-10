<template>
  <div>
    <v-navigation-drawer app clipped v-model="drawer" dark>
      <!-- -->
      <Sidebar />
    </v-navigation-drawer>
    <v-app-bar app clipped-left elevate-on-scroll color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <img width="120px" src="../assets/logoNU-removebg-preview.png" alt="">
        <span class="ml-5">
          <strong>PCNU KOTA BATAM</strong>
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->

      <v-btn icon @click="toggle_dark_mode" v-if="this.$vuetify.theme.dark" title="Switch to light mode">
        <v-icon>mdi-brightness-7</v-icon>
      </v-btn>
      <v-btn icon @click="toggle_dark_mode" v-else title="Switch to dark mode">
        <v-icon>mdi-brightness-3</v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Dropdown
          </v-btn> -->
          <v-btn icon v-bind="attrs" v-on="on">
            <v-avatar color="">
              <v-img height="100%" width="100%" class="rounded-circle mx-auto"
              :src="UrlGambar + user.url_foto"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link :to="`/profile/` + user.id" style="cursor: pointer;">
            <v-list-item-title>{{ this.user.name }}</v-list-item-title>
          </v-list-item>
          <v-list-item style="cursor: pointer" link to="/changepassword">
            <!-- <v-list-item-title @click="logout()" link></v-list-item-title> -->
            <!-- <v-list-item-icon>
              <v-icon>mdi-square-edit-outline</v-icon>
            </v-list-item-icon> -->
            <v-list-item-title >Change Password</v-list-item-title>
          </v-list-item>
          <v-list-item style="cursor: pointer" @click="logout()" link>
            <!-- <v-list-item-title @click="logout()" link></v-list-item-title> -->
            <!-- <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon> -->
            <v-list-item-title >Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template> 
<script>
import Sidebar from "./TheSidebar";
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    drawer: null,
    group: null,
    mini: false,
    UrlGambar: window.UrlGambarBerita
  }),
  components: {
    Sidebar,
  },
  mounted() {
    console.log(localStorage.getItem("dark_theme"));
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
  methods: {
    toggle_dark_mode: function () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    ...mapActions({
      signOut: "auth/logout",
    }),
    logout() {
      this.signOut().then(() => {
        this.$router.push({ path: "/" });
      });
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  }
};
</script>