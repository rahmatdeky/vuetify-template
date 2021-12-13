<template>
  <div class="home">
      <v-card elevation="2" :loading="!user">
        <v-card-title> {{ user.name }} </v-card-title>
        <v-card-subtitle> </v-card-subtitle>
        <v-card-text> {{ user }} </v-card-text>
        <v-card-actions draggable>
          <!-- <v-btn justify="end" text icon>
          <v-icon>mdi-reply</v-icon>
        </v-btn> -->
          <v-row class="mx-3 my-3" justify="end">
            <v-btn color="primary" to="/setting/users" fab small dark>
              <v-icon>mdi-reply</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$http
        .get("setting/users/" + this.$route.params.id)
        .then((response) => {
          this.user = response.data;
        });
    },
    back() {
      return this.$router.go(-1);
    },
  },
};
</script>
