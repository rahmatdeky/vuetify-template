<template>
    <!-- App.vue -->
  
    <v-app>
      <Navbar2 />
      <!-- <Sidebar /> -->
  
      <!-- Sizes your content based upon application components -->
      <router-view :key="$route.path"></router-view>
      <!-- Provides the application the proper gutter -->
      <!-- If using vue-router -->
      <!-- <transition name="fade" mode="out-in"> -->
          <!-- </transition> -->
          <!-- <v-main>
            <v-container>
        </v-container>
      </v-main> -->
  
      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </template>
  
  <script>
  import Navbar2 from "./TheNavbar2";
  // import Sidebar from "./components/Sidebar";
  export default {
    name: "Container",
    components: {
      Navbar2,
      // Sidebar,
    },
  };
  </script>
  <style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
  </style>
  