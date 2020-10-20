<template>
	<div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
<!--        <div class="icon"></div>-->
      </div>
      <div slot="center" class="title">
        商品详情
      </div>
      <div v-if="isLogin"   slot="right" class="right"  @click="toSetUp">
        <img src="~assets/img/home/setUp.png" alt="">
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        isLogin: false
      }
    },
    created() {
      if (localStorage.getItem('token')) {
        this.isLogin = true
      }
    },
    methods: {
      backClick() {
        // this.$router.go(-1)
        this.$router.back()
      },
      toSetUp() {
        if (localStorage.getItem('token')) {
          this.$router.push('/setup')
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .title{
    display: flex;
    font-size: 0.4rem;
    /*color: #333333;*/
    color: #fff;
    justify-content: center;
    align-self: center;

  }
  .title-item {
    flex: 1;
  }
  .active {
    color: #fff;
  }
  .back {
    img {
      width: 0.65rem;
      height: 0.65rem;
    }
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    /*.icon {*/
    /*  height: 0.01rem;*/
    /*  border: 0.3rem solid #6e6e6e;*/
    /*  border-left: 0;*/
    /*  border-top: 0.3rem solid transparent;*/
    /*  border-bottom: 0.3rem solid transparent;*/
    /*  width: 0;*/
    /*  margin-top: 0.15rem;*/
    /*}*/
  }
  .right {
    position: relative;

    img {
      width: 0.58rem;
      height: 0.55rem;
      position: absolute;
      top: 0.28rem;
      left: 0.36rem;
      /*padding-top: 0.3rem;*/
    }
  }
</style>
