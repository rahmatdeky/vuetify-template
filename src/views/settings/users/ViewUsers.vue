<template>
  <div class="home">
    <v-card elevation="2" min-height="400px">
      <v-card-title> User Management </v-card-title>
      <v-card-subtitle> </v-card-subtitle>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="items"
          :loading="!items.length"
          multi-sort
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn :to="'/setting/users/' + item.id" text icon>
              <v-icon small> mdi-magnify </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: "Home",
  data() {
    return {
      items: [],
      headers: [
        {
          text: "Nama",
          align: "start",
          // sortable: false,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.$http.get("/setting/users").then((response) => {
        this.items = response.data;
      });
    },
  },
};
</script>
