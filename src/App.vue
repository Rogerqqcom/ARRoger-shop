<template>
  <div id="app">
    <keep-alive include="Home,Profile,Order">
<!--    <keep-alive exclude="Detail,Cart">-->
      <router-view v-if="isRouterAlive"/>
    </keep-alive>
    <main-tab-bar v-show="this.$route.meta.isTab"></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/tabBar/MainTabBar";
  export default {
    name: 'App',
    /**
    * 通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载，这边定义了
     isRouterAlive //true or false 来控制
     然后在需要当前页面刷新的页面中注入App.vue组件提供（provide）的 reload 依赖，然后直接用this.reload来调用就行
    * */
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    },
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/reset.css";
</style>
