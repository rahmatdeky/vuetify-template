<template>
  <!-- <transition name="fade"> -->
  <div>
    <v-card class="mx-auto" width="600">
      <v-card-text class="mx-auto text-center">
        <div v-if="!user">
          <v-skeleton-loader
            type="list-item@2"
            class="mx-auto"
            max-width="100"
          ></v-skeleton-loader>
        </div>
        <transition name="fade" mode="out-in">
          <div v-if="user">
            <v-avatar color="info" size="56" class="my-5"></v-avatar>
            <h2 class="">{{ user.name }}</h2>
            <h5 class="">{{ user.email }}</h5>
          </div>
        </transition>
        <v-divider class="my-5"></v-divider>
        <v-skeleton-loader
          type="table-tbody"
          class="mx-auto"
        ></v-skeleton-loader>
      </v-card-text>
      <v-card-actions class="pb-2">
        <v-flex align-self-end>
          <v-btn text @click="back()">
            Kembali
            <v-icon right dark> mdi-reply </v-icon>
          </v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
  </div>
  <!-- </transition> -->
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
