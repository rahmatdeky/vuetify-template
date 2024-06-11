<template>
    <v-list-group activeClass="my-active-class" :prepend-icon="iconGroup">
        <template v-slot:activator>
          <v-list-item-title style="text-align: left;">{{ titleGroup }}</v-list-item-title>
        </template>
        <slot></slot>
        <!-- <SidebarListItem /> -->
        <!-- <v-list-item activeClass="my-active-class" link to="/setting/usermanager">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>User Manager</v-list-item-title>
        </v-list-item> -->
      </v-list-group>
</template>
<script>
// import SidebarListItem from './SidebarListItem.vue'
export default {
    name: 'SidebarListGroup',
    props: {
        iconGroup: {
            type: String,
            default: ''
        },
        titleGroup: {
            type: String,
            default: ''
        }
    },
    components: {
        // SidebarListItem
    }
}
</script>
<style>
.my-active-class {
  color: white !important
}
</style>