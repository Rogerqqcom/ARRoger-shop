<template>
  <div>
<!--    //顶部导航-->
    <nav-bar class="profile-nav">
      <div slot="left" class="left" @click="back">
        <img src="~assets/img/navbar/back.png" alt="">
      </div>
      <div slot="center" class="center">个人信息</div>
      <div slot="right" class="right">
        <img @click="toSetUp" v-if="isLogin"  src="~assets/img/home/setUp.png" alt="">
        <span @click="toLogin" v-else>登录</span>
      </div>
    </nav-bar>
    <!--用户信息-->
    <my-info :userData="userData"></my-info>
    <!--订单信息-->
    <order-info/>
    <!--信息列表-->
    <normal-list-view :list-item="listItem"/>
<!--    <normal-list-view :list-item="serviceList"/>-->
  </div>
</template>
<script>
  import NavBar from "components/common/navbar/NavBar";

  import MyInfo from "./childComps/myInfo/MyInfo";
  import OrderInfo from "./childComps/OrderItem";
  import NormalListView from "./childComps/myInfo/NormalListView";

  import {getOneUser} from "network/user"

  export default {
    // inject: ['reload'],
    name:'Profile',
    components: {
      NavBar,
      MyInfo,
      OrderInfo,
      NormalListView
    },
    data () {
      return {
        isLogin: false,
        //获取到当前用户,作为用户展示的信息
        userData: {
          // name: "",
          // address: ""
        },
        //筛选得到的地址为默认状态的地址
        // address: '',
        //定义一些信息
        listItem: [
          {icon: 'message.svg', info: '我的消息'},
          {icon: 'integral.svg', info: '积分商城'},
          {icon: 'vip.svg', info: '会员卡'},
          {icon: 'collect.svg', info: '我的收藏夹'},
          {icon: 'shopping.svg', info: '下载购物APP  >>'},
        ],
    /*    serviceList: [
          {icon: 'collect.svg', info: '我的收藏夹'},
          {icon: 'shopping.svg', info: '下载购物APP'},
        ]*/
      }
    },
    created() {
      console.log("profile-create");
      //从本地浏览器获取到token信息后，将设置为登录状态
      if(this.$store.state.token || localStorage.getItem('token')){
        this.isLogin = true
        //获取需要展示在个人信息页的信息
        this.userData =  JSON.parse(JSON.stringify(this.$store.state.userData))
      }else {
        this.userData = 'null'
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      toSetUp() {
        this.$router.push('/setUp')
      },
      toLogin() {
        this.$router.push('/login')
      },
    },
    //如果想刷新部分内容要启用activated函数，用法同created，activated只有在被keep-alive包裹时会触发，activated函数一进入页面就触发
    activated() {
      // console.log("profile-activated");
      if (this.$store.state.token) {
        this.isLogin = true
        //获取需要展示在个人信息页的信息
        this.userData =  JSON.parse(JSON.stringify(this.$store.state.userData))
      }
    }

  }

</script>
<style scoped lang="less">
  .profile-nav {
    background-color: #58a7db;
    height: 1.05rem;
    .left{
      /*background-color: #f00;*/
      img {
        width: 0.5rem;
        height: 0.5rem;
        /*line-height: 0.1rem;*/
        margin-bottom: 0.16rem;
        color: #fff;

      }

    }
    .center {
      color: white;
      font-size: 0.5rem;
      height: 0.86rem;
      line-height: 0.86rem;
      /*设置字间距*/
      letter-spacing: 0.08rem;
      padding-top: 0.12rem;
    }
    .right{
      position: relative;
      img{
        width: 0.58rem;
        height: 0.55rem;
        position: absolute;
        top: 0.28rem;
        left: 0.36rem;
        /*padding-top: 0.3rem;*/
      }
      span{
        color: #f0f0f0;
        font-size: 0.38rem;
        text-align: center;
        position: absolute;
        top: 0.3rem;
        left: 0.2rem;
        letter-spacing: 0.04rem;
      }
    }
  }

</style>
