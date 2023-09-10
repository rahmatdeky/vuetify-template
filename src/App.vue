<template>
  <!-- App.vue -->
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
import { ChartPlugin } from '@syncfusion/ej2-vue-charts';
import Vue from 'vue';

Vue.use(ChartPlugin);
export default {
  name: 'App'
  // components: {
  //   Navbar,
    // Sidebar,
  // }
}
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
