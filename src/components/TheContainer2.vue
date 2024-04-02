<template>
    <!-- App.vue -->
  
    <v-app style="background-color: #f1f1f8;">
      <Navbar2 />
      <router-view :key="$route.path"></router-view>
      <footer class="container-fluid" style="padding:10px">
        <div class="text-center">
            <p class="text-white"> <img src="" class="navbar-brand" alt=""> Copyright &copy; PCNU Kota Batam</p>
        </div>
      </footer>
      <!-- <Sidebar /> -->
  
      <!-- Sizes your content based upon application components -->
      <!-- Provides the application the proper gutter -->
      <!-- If using vue-router -->
      <!-- <transition name="fade" mode="out-in"> -->
          <!-- </transition> -->
          <!-- <v-main>
            <v-container>
        </v-container>
      </v-main> -->
  
      <!-- <v-footer app>
      </v-footer> -->
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
  