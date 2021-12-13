<template>
    <v-list>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/about">
        <v-list-item-icon>
          <v-icon>mdi-account-question</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Tentang</v-list-item-title>
      </v-list-item>
      <!-- <v-list-item link to="/browse">
        <v-list-item-icon>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-icon>

        <v-list-item-title>Browse</v-list-item-title>
      </v-list-item> -->
      <v-list-group :value="false" v-for="menu in menus" :key="menu.id" :prepend-icon="menu.icon" no-action color="light">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{menu.nama_menu}}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-for="sub in menu.submenus" :key="sub.id" :value="true" :to="sub.url" link>
          <!-- <v-list-item-icon>
            <v-icon v-text="sub.icon"></v-icon>
          </v-list-item-icon> -->
          <v-list-item-title v-text="sub.nama_submenu" ></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
</template>

<script>
export default {
  data() {
    return {
      menus: this.$store.getters["auth/user"]["menus"]
    };
  },
  // data: () => ({

  // }),
};
</script>