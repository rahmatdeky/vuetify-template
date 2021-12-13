<template>
  <div class="home">
    <v-card elevation="2">
      <v-card-title> Upload File </v-card-title>
      <v-card-subtitle> latihan upload file</v-card-subtitle>
      <v-card-text>
        <div id="app">
          <div v-if="!image" class="">
            <h2>Select an image</h2>
            <!-- <input type="file"  /> -->
            <v-file-input
              show-size
              small-chips
              accept="image/*"
              truncate-length="18"
              prepend-icon="mdi-camera"
              @change="onFileChange"
              width="500"
            ></v-file-input>
          </div>
          <transition name="fade">
            <div v-if="imageUrl">
              <div
                class="d-flex flex-column justify-space-between align-center"
              >
                <v-slider
                  v-model="width"
                  class="align-self-stretch"
                  min="200"
                  max="500"
                  step="1"
                ></v-slider>

                <v-img :width="width" :src="imageUrl"></v-img>
                <v-spacer></v-spacer>
                <v-btn elevation="2" class="my-3" @click="removeImage"
                  >Remove image</v-btn
                >
              </div>
              <!-- <img :src="image" /> -->
            </div>
          </transition>
        </div>
      </v-card-text>
      <!-- <v-card-actions draggable>
      </v-card-actions> -->
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: "",
      imageUrl: "",
      width: "",
    };
  },
  methods: {
    onFileChange(files) {
      console.log(files);
      files == null ? this.removeImage() : this.createImage(files);
      //   if (files != null) {

      //   } else {
      //       this
      //   }
      //   var files = e.target.files || e.dataTransfer.files;
      //   if (!files.length) return;
    },
    createImage(file) {
      //   var image = new Image();
      var reader = new FileReader();
      //   var vm = this;

      reader.onload = (e) => {
        this.imageUrl = e.target.result;
        // console.log(e);
      };
      reader.readAsDataURL(file);
    },
    removeImage: function () {
      this.image = "";
      this.imageUrl = "";
    },
  },
};
</script>