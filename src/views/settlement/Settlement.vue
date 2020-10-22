<template>
	<div class="bg">
		<!--    //顶部导航-->
		<nav-bar class="nav">
			<div slot="left" class="left" @click="back">
				<img src="~assets/img/navbar/back.png" alt="">
			</div>
			<div slot="center" class="center">结算</div>
			<div slot="right" class="right">
				<img @click="toSetUp" v-if="isLogin"  src="~assets/img/home/setUp.png" alt="">
				<span @click="toLogin" v-else>登录</span>
			</div>
		</nav-bar>

		<!--收货地址-->
		<pay-address :address="address"/>

		<!--商品列表-->
		<product-list :commodity="commodity"/>

		<!--支付方式-->
<!--		<pay-method :mode="mode"/>-->
		<div class="pay-method">
			<div class="wx" @click="mode = '1'">
			<span>
				<img src="~assets/img/settlement/wx.png" alt="">微信支付
			</span>
				<img src="~assets/img/settlement/Correct.png" alt="" class="icon-Correct" v-if="mode=='1'">
			</div>
			<div class="alipay" @click="mode = '2'">
			<span>
				<img src="~assets/img/settlement/alipay.png" alt="">
				支付宝
			</span>
				<img src="~assets/img/settlement/Correct.png" alt="" class="icon-Correct" v-if="mode=='2'">
			</div>
		</div>

		<!--立即支付-->
		<pay-now :commodity="commodity" @sub="sub"/>

		<loadingToast v-if="Toast"/>
		<minToast v-if="minToast"/>

	</div>
</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar";
	import loadingToast from "../../components/common/toast/loadingToast";
	import minToast from "../../components/common/toast/minToast";

	import PayAddress from "./childComps/PayAddress";
	import ProductList from "./childComps/ProductList";
	// import PayMethod from "./childComps/PayMethod";
	import PayNow from "./childComps/PayNow";

	import {getOneUser, putUser} from "../../network/user";

  export default {
    name: "Settlement",
		data() {
      return {
        isLogin: false,
        // 商品信息
        commodity: {},
        // 用户信息
        user: {},
        // 地址
        address: {},
        // 支付方式
        mode: '1',
        Toast: false,
				minToast: false
			}
		},
		components: {
      NavBar,
      PayAddress,
      ProductList,
      // PayMethod,
      PayNow,
      loadingToast,
      minToast
		},
		created() {
      if (this.$store.state.commodity.sum) {
        //先获取到需要结算的订单
        this.commodity = this.$store.state.commodity
        let token = JSON.parse(localStorage.getItem('token'))
				getOneUser(token.id).then(res => {
          if (res.status === 200) {
            this.isLogin = true
            this.user = res.data
            for (let i = 0; i < this.user.address.length; i++) {
              if (this.user.address[i].isDefault === true) {
                //获取默认地址
                this.address = this.user.address[i]
              }
            }
          }
				})
      }
		},
    methods: {
      back() {
        this.$router.back()
      },
      toSetUp() {
        this.$router.push('/setUp')
      },
      toLogin() {
        this.$router.push('/login')
      },
			//立即支付事件
      sub() {
        console.log('paynow');
        if (this.user.Order.length > 0) {
          var myDate = new Date();
          let Order = {
            commodity: this.commodity,
            address: this.address,
            mode: this.mode,
            created_order:myDate.getFullYear() + '/' + myDate.getMonth() +'/' + myDate.getDate() + '/' + myDate.getHours() + ':' + myDate.getMinutes(),
            id: this.user.Order[0].id + 1
          }
          //在数组前面添加
          this.user.Order.unshift(Order)

          //清除购物车列表为选中的状态的商品
          this.user.cartList = this.user.cartList.filter(item => item.checked == false)
					putUser(this.user.id, this.user).then(res => {
					  if (res.status === 200) {
					    this.$store.state.title = '正在支付'
							this.Toast = true
							setTimeout(() => {
							  this.Toast = false
                this.$store.state.title = '支付成功'
								this.minToast = true
								setTimeout(()=> {
								  this.minToast = false
									this.$router.push('/cart')
								},1000)
              },1000)
						}
					})

        }else {
          var myDateTwo = new Date();
          let Order = {
            commodity: this.commodity,
            address: this.address,
            mode: this.mode,
            created_order:myDateTwo.toLocaleDateString() + '/' + myDateTwo.getHours() + ':' + myDateTwo.getMinutes(),
            id: 1
          }
          this.user.Order.push(Order)
					//清除购物车列表为选中的状态的商品
          this.user.cartList = this.user.cartList.filter(item => item.checked == false)
          putUser(this.user.id, this.user).then(res => {
            if (res.status == 200) {
              if (res.status === 200) {
                this.$store.state.title = '正在支付'
                this.Toast = true
                setTimeout(() => {
                  this.Toast = false
                  this.$store.state.title = '支付成功'
                  this.minToast = true
                  setTimeout(()=> {
                    this.minToast = false
                    this.$router.push('/cart')
                  },1000)
                },1000)
              }
            }
					})
				}
      }
    }
  }
</script>

<style scoped lang="less">
	/*顶部*/
	.nav {
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

	/*支付方式*/
	.pay-method {
		.icon-Correct{
			width: 0.38rem;
			margin-right: 0.3rem;
		}

		.wx {
			height: 1rem;
			line-height: 1rem;
			background-color: #fff;
			font-size: 0.3rem;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-between;

			span {
				display: flex;
				align-items: center;

				img {
					width: 0.38rem;
					margin-right: 0.12rem;
					margin-left: 0.2rem;
				}
			}

			.icon {
				margin: 0.2rem;
			}
		}

		.alipay {
			height: 1rem;
			line-height: 1rem;
			font-size: 0.3rem;
			background-color: #fff;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-between;

			span {
				display: flex;
				align-items: center;

				img {
					width: 0.38rem;
					margin-right: 0.12rem;
					margin-left: 0.2rem;
				}
			}

			.icon {
				margin: 0.2rem;
			}
		}
	}

</style>
