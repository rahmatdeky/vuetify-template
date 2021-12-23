<template>
  <v-card class="mx-auto" max-width="700">
    <v-card-title>Perekaman Baru</v-card-title>
    <v-card-subtitle>Pengajuan PPFTZ-01 Barang Pindahan</v-card-subtitle>
    <v-card-text>
      <v-stepper v-model="e1">
        <!-- Label -->
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Data Pengajuan
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">
            Lampiran
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3"> Name of step 3 </v-stepper-step>
        </v-stepper-header>

        <!-- Form step -->
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card flat class="mb-12">
              <v-form v-model="valid">
                <v-container>
                  <v-text-field
                    v-model="firstname"
                    :rules="nameRules"
                    :counter="10"
                    label="First name"
                    required
                  ></v-text-field>
                  <!-- <v-row>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="firstname"
                        :rules="nameRules"
                        :counter="10"
                        label="First name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="lastname"
                        :rules="nameRules"
                        :counter="10"
                        label="Last name"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row> -->
                </v-container>
              </v-form>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="200px"
            ></v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between">
      <div>
        <v-btn class="" text @click="back()" v-if="e1 > 1">
          <v-icon right dark>mdi-arrow-left</v-icon>
          &nbsp;Back
        </v-btn>
      </div>
      <div>
        <v-btn text @click="submit" v-if="e1 < 3">
          Next
          <v-icon right dark>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    e1: 1,
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    next() {
      if (this.$refs.form.validate()) {
        this.e1++;
      }
    },
    back() {
      this.e1--;
    },
  },
};
</script>