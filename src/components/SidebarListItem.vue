<template>
    <v-list-item activeClass="my-active-class" link :to="url">
        <v-list-item-icon>
          <v-icon> {{ icon }} </v-icon>
        </v-list-item-icon>

        <v-list-item-title> {{ title }} </v-list-item-title>
      </v-list-item>
</template>
<script>
export default {
    name: 'SidebarListItem',
    props: {
        url: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>
<style>
.my-active-class {
  color: white !important
}
</style>