<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view/>
    </keep-alive>
    <main-tab-bar v-show="this.$route.meta.isTab"></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/tabBar/MainTabBar";
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/reset.css";
</style>
