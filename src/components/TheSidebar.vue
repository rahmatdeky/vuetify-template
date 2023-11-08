<template>
  <v-list>
      <SidebarListItem url="/" icon="mdi-home" title="Home" />
      <SidebarListItem url="/about" icon="mdi-account-question" title="About" />
      <!-- <SidebarListGroup v-if="Menu.some( item => item.akses === 'manajemenUser')" iconGroup="mdi-cog" titleGroup="Setting">
        <template>
          <div>
            <SidebarListItem v-if="Menu.some( item => item.akses === 'manajemenUser')" url="/setting/usermanager" icon="mdi-account-multiple" title="User Manager" />
            <SidebarListItem v-if="Menu.some( item => item.akses === 'settingBerita')" url="/setting/berita" icon="mdi-newspaper" title="Manajemen Berita" />
          </div>
        </template>
      </SidebarListGroup> -->
      <SidebarListGroup v-if="Menu === 'admin'" iconGroup="mdi-cog" titleGroup="Setting">
        <template>
          <div>
            <SidebarListItem v-if="Menu === 'admin'" url="/setting/usermanager" icon="mdi-account-multiple" title="User Manager" />
            <SidebarListItem v-if="Menu === 'admin'" url="/setting/berita" icon="mdi-newspaper" title="News Management" />
            <SidebarListItem v-if="Menu === 'admin'" url="/setting/pengurus" icon="mdi-account-group" title="Pengurus" />
            <SidebarListItem v-if="Menu === 'admin'" url="/setting/lembaga" icon="mdi-home-group" title="Lembaga" />
          </div>
        </template>
      </SidebarListGroup>
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
import SidebarListItem from './SidebarListItem.vue'
import SidebarListGroup from './SidebarListGroup.vue'
export default {
  data() {
    return {
      menus: this.$store.getters["auth/user"]["menus"],
      Menu: this.$store.getters['auth/user']['otoritas']
    };
  },
  components: {
    SidebarListItem,
    SidebarListGroup
  }
};
</script>
<style>
.my-active-class {
  color: white !important
}
</style>