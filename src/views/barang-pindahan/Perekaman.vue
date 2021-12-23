<template>
  <v-card class="mx-auto" max-width="1000">
    <v-card-title>Perekaman Baru</v-card-title>
    <v-card-subtitle>Pengajuan PPFTZ-01 Barang Pindahan</v-card-subtitle>
    <v-card-text>
      <v-stepper v-model="e1" alt-labels flat elevation="0">
        <!-- Label -->
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Data Pengajuan
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">
            Data Barang
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 3" step="3"> Lampiran</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4"> Name of step 3 </v-stepper-step>
        </v-stepper-header>

        <!-- Form step -->
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card flat class="mb-12">
              <v-form ref="form" @submit.prevent="submit">
                <v-container class="">
                  <v-text-field
                    v-model="nama_pemohon"
                    :rules="[rules.required]"
                    label="Nama Pemohon"
                    required
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="identitas_pemohon"
                    :rules="[rules.required, rules.ktp]"
                    :counter="16"
                    label="Identitas Pemohon (No. KTP)"
                    required
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-textarea
                    name="input-7-4"
                    label="Alamat Pemohon"
                    :rules="[rules.required]"
                    v-model="alamat_pemohon"
                    flat
                    outlined
                  ></v-textarea>
                  <v-switch
                    v-model="fl_ppjk"
                    label="Menggunakan PPJK?"
                    color="primary"
                    :value="true"
                    hide-details
                  ></v-switch>
                  <v-spacer></v-spacer>
                  <transition name="fade" mode="in-out">
                    <div v-if="fl_ppjk">
                      <v-text-field
                        v-model="nama_ppjk"
                        :rules="[rules.required]"
                        label="Nama PPJK"
                        required
                      ></v-text-field>
                      <v-spacer></v-spacer>
                      <v-text-field
                        v-model="identitas_ppjk"
                        :rules="[rules.required, rules.ktp]"
                        :counter="16"
                        label="Identitas PPJK (No. KTP)"
                        required
                      ></v-text-field>
                    </div>
                  </transition>
                  <v-spacer></v-spacer>
                  <v-select
                    :items="moda_angkutan_items"
                    v-model="moda_angkutan"
                    item-text="moda"
                    item-value="id"
                    label="Cara Pengangkutan"
                    :rules="[rules.required]"
                  ></v-select>
                  <v-autocomplete
                    label="Pelabuhan Muat"
                    v-model="pelabuhan_muat"
                    :items="pelabuhan_items"
                    item-text="nama_pelabuhan"
                    item-value="id_pelabuhan"
                    :rules="[rules.required, rules.pelabuhan]"
                  ></v-autocomplete>
                  <v-autocomplete
                    label="Pelabuhan Bongkar"
                    v-model="pelabuhan_bongkar"
                    :items="pelabuhan_items"
                    item-text="nama_pelabuhan"
                    item-value="id_pelabuhan"
                    :rules="[rules.required, rules.pelabuhan]"
                  ></v-autocomplete>
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
        <v-btn text @click="next()" v-if="e1 < 3">
          Next
          <v-icon right dark>mdi-arrow-right</v-icon>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      e1: 1,
      isEditing: true,
      valid: false,
      nama_pemohon: "",
      identitas_pemohon: "",
      alamat_pemohon: "",
      nama_ppjk: "",
      identitas_ppjk: "",
      alamat_ppjk: "",
      moda_angkutan: "",
      pelabuhan_muat: "",
      pelabuhan_bongkar: "",
      fl_ppjk: false,
      rules: {
        required: (value) => !!value || "Required.",
        ktp: (value) => value.length === 16 || "Nomor KTP harus 16 digit",
        min: (v) => v.length >= 6 || "Min 6 characters",
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        emailMatch: () => `The email and password you entered don't match`,
        pelabuhan: () =>
          this.pelabuhan_muat !== this.pelabuhan_bongkar ||
          "Pelabuhan muat dan bongkar tidak boleh sama",
      },
      email: "",
      //referensi
      moda_angkutan_items: [
        { id: 1, moda: "Angkutan Laut" },
        { id: 2, moda: "Angkutan Udara" },
      ],
      pelabuhan_items: [
        { id_pelabuhan: "IDBTH", nama_pelabuhan: "Hang Nadim" },
        { id_pelabuhan: "IDBTU", nama_pelabuhan: "Batu Ampar" },
      ],
    };
  },
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
  beforeRouteLeave(to, from, next) {
    if (this.isEditing) {
      if (!window.confirm("Leave without saving?")) {
        return;
      }
    }
    next();
  },
};
</script>