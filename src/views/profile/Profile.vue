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
    <my-info :userData="userData" :address="address"></my-info>
    <!--订单信息-->
    <order-info>
    </order-info>
  </div>
</template>
<script>
  import NavBar from "components/common/navbar/NavBar";

  import MyInfo from "./childComps/myInfo/MyInfo";
  import OrderInfo from "../order/OrderInfo";

  import {getOneUser} from "network/user"

  export default {
    name:'Profile',
    components: {
      NavBar,
      MyInfo,
      OrderInfo
    },
    data () {
      return {
        isLogin: false,
        //获取到当前用户,作为用户展示的信息
        userData: {
          name: "",
          address: ""
        },
        //筛选得到的地址为默认状态的地址
        address: ''

      }
    },
    created() {
      //从本地浏览器获取到token信息后，将设置为登录状态
      if(localStorage.getItem('token')){
        this.isLogin = true
        let token = JSON.parse(localStorage.getItem('token'))
        // console.log(token);
        // console.log(token.id);
        getOneUser(token.id).then(res => {
          console.log(res.data);
          if (res.status === 200) {
            this.userData = res.data
            if (this.userData.address.length > 0) {
              //筛选得到的地址为默认状态的地址
              let DeAddress = this.userData.address.filter(item => item.isDefault == true)
              //获取到地区进行展示
              this.address = DeAddress[0].address
            }else {
              this.address = 'null'
            }
          }
          // this.userData.name = token.name
          // this.userData.address = token.address[0].endAddress
        })
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
