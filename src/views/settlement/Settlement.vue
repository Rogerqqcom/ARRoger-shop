<template>
	<div class="pay-bg">
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
			<div class="wx" @click="mode = '微信'">
			<span>
				<img src="~assets/img/settlement/wx.png" alt="">微信支付
			</span>
				<img src="~assets/img/settlement/Correct.png" alt="" class="icon-Correct" v-if="mode=='微信'">
			</div>
			<div class="alipay" @click="mode = '支付宝'">
			<span>
				<img src="~assets/img/settlement/alipay.png" alt="">
				支付宝
			</span>
				<img src="~assets/img/settlement/Correct.png" alt="" class="icon-Correct" v-if="mode=='支付宝'">
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
  import {getProduct, putProduct} from "../../network/products";
  import {getOrder, postOrder, putOrder} from "../../network/order";
  import {deleteCartList, getCartList} from "../../network/cartList";

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
        mode: '微信',
        Toast: false,
				minToast: false,
				//监听支付按钮是否点击
				isPay: false,
				//点击立即购买的商品
        payProduct: []
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
      console.log('settlement created');
      if (this.$store.state.commodity.sum) {
        //先获取到需要结算的订单
        this.commodity = this.$store.state.commodity
        console.log(this.commodity);
        // let token = JSON.parse(localStorage.getItem('token'))
        let token = this.$store.state.token || JSON.parse(localStorage.getItem('token'))

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

        //根据此商品id请求对应的商品数据
        //1.先获取到商品id
        let arr = []
        for (let i=0; i<this.commodity.arr.length; i++){
          arr.push(this.commodity.arr[i].productId)
        }
        for (let i=0; i<arr.length;i++){
          getProduct(this.commodity.arr[i].productId).then(res => {
            this.payProduct.push(res.data)
            console.log(this.payProduct);
          })
				}

      }
		},

    methods: {

      toSetUp() {
        this.$router.push('/setUp')
      },
      toLogin() {
        this.$router.push('/login')
      },
			//立即支付事件
      sub() {
        console.log('paynow');
        //如果点击了“立即支付”按钮，isPay改为true
				this.isPay = true

        //如果结算的商品中有flag，说明为在详情页点击“立即购买”后的商品
        if (this.$store.state.commodity.flag && !this.$route.query.id) {
          if (!this.address.name) {
            alert('请先选择地址！')
          }else {
            var myDate = new Date();
            let Order = {
              "commodity": this.commodity,
              "address": this.address,
              // 支付方式
              "mode": this.mode,
              //支付与否
              "is_pay": "待收货",
              "created_order":myDate.getFullYear() + '/' + myDate.getMonth() +'/' + myDate.getDate() + '/' + myDate.getHours() + ':' + myDate.getMinutes(),
							"userId": this.user.id
            }
            //将新的订单提交到用户订单列表栏
            // this.user.Order.push(Order)
						postOrder(Order).then(res => {
              if (res.status == 201) {
									this.$store.state.title = '正在支付'
									this.Toast = true
									setTimeout(() => {
										this.Toast = false
										this.$store.state.title = '支付成功, 不清除cartList'
										this.minToast = true
										setTimeout(()=> {
											this.minToast = false
											this.$router.push('/')
										},1000)
									},1000)
              	}
            })
            //商品销量+1，商品数量-1 （11/4）
            this.payProduct[0].[0].sale += 1
            this.payProduct[0].[0].totalNum -=1
            console.log(this.payProduct[0].[0]);
            let obj = this.payProduct[0].[0]

						putProduct(this.commodity.arr[0].productId, obj).then(res => {
							console.log("库存减一，销量加1",res.data);
						})
					}
				}
        //在购物车直接点去结算的商品
        else if (!this.$route.query.id) {
          if (!this.address.name) {
            alert('请先选择地址！')
          } else {
            var myDate = new Date();
            let Order = {
              "commodity": this.commodity,
              "address": this.address,
              // 支付方式
              "mode": this.mode,
              //订单状态
              "is_pay": "待收货",
              "created_order":myDate.getFullYear() + '/' + myDate.getMonth() +'/' + myDate.getDate() + '/' + myDate.getHours() + ':' + myDate.getMinutes(),
              "userId": this.user.id
            }

            //清除当前用户购物车列表为选中的状态的商品
						getCartList().then(res => {
              let arr = res.data.filter(item => item.checked == true && item.userId == this.user.id)
              console.log(arr);
              for(let i=0;i<arr.length;i++) {
                console.log(arr[i].id);
                deleteCartList(arr[i].id).then(res => {
                  console.log('删除订单成功',res.data);
                })
              }
            })

            //遍历所有结算的商品，让对应的商品销量加1，库存减一 （11/4）
            for (let i = 0; i < this.payProduct.length; i++) {
              this.payProduct[i].[0].sale += 1
              this.payProduct[i].[0].totalNum -= 1
            }
            // console.log(this.payProduct);
            for (let i = 0; i < this.payProduct.length; i++) {
              //如果商品有多个，则提交修改的商品的销量和库存
              if (this.payProduct[i].[0].id == this.commodity.arr[i].productId) {
                putProduct(this.commodity.arr[i].productId, this.payProduct[i].[0]).then(res => {
                  console.log("库存减一，销量加1", res.data);
                })
              }
            }
						//提交订单
            postOrder(Order).then(res => {
              if (res.status == 201) {
                this.$store.state.title = '正在支付'
                this.Toast = true
                setTimeout(() => {
                  this.Toast = false
                  this.$store.state.title = '支付成功'
                  this.minToast = true
                  setTimeout(()=> {
                    this.minToast = false
                    this.$router.push('/')
                  },1000)
                },1000)
              }
            })

          }
        }
        //在订单-待付款 点进来的，
        if (this.$route.query.id) {
          if (!this.address.name) {
            alert('请先选择地址！')
          } else {
            var myDate = new Date();
            let Order = {
              "commodity": this.commodity,
              "address": this.address,
              "mode": this.mode,
              //支付与否
              "is_pay": "待收货",
              "created_order": myDate.getFullYear() + '/' + myDate.getMonth() + '/' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes(),
              "userId": this.user.id
            }
            //遍历所有结算的商品，让对应的商品销量加1，库存减一 （11/4）
            for (let i = 0; i < this.payProduct.length; i++) {
              this.payProduct[i].[0].sale += 1
              this.payProduct[i].[0].totalNum -= 1
            }
            // console.log(this.payProduct);
            for (let i = 0; i < this.payProduct.length; i++) {
              //如果商品有多个，则提交修改的商品的销量和库存
              if (this.payProduct[i].[0].id == this.commodity.arr[i].productId) {
                putProduct(this.commodity.arr[i].productId, this.payProduct[i].[0]).then(res => {
                  console.log("库存减一，销量加1", res.data);
                })
              }
            }
            //如果查找到该订单，就替换新的内容
            getOrder(this.$route.query.id).then(res => {
              console.log(res.data);
              let newOrder = res.data.find(item => item.userId == this.user.id && item.id == this.$route.query.id)
              console.log(newOrder);
              putOrder(newOrder.id,Order).then(res => {
                console.log('修改订单状态成功，支付成功',res.data);
                this.$router.back()
              })
            })
          }
        }
      },
			//如果未点击立即支付按钮，点击了返回按钮同时又不是在待付款点进来（this.$route.query.id）的话，
			// 就让订单支付状态为 未支付
      back() {
        if (!this.isPay && !this.$route.query.id) {
          // if (this.user.Order.length > 0) {
            if (!this.address.name) {
              alert('请先选择地址！')
            } else {
              var myDateTwo = new Date();
              let Order = {
                "commodity": this.commodity,
                "address": this.address,
                "mode": this.mode,
                //支付与否
                "is_pay": "未支付",
                "created_order": myDateTwo.toLocaleDateString() + ' ' + myDateTwo.getHours() + ':' + myDateTwo.getMinutes(),
                "userId": this.user.id
              }
              // this.user.Order.push(Order)
              //清除购物车列表为选中的状态的商品
              getCartList().then(res => {
                if (res.status == 200) {
                  let arr = res.data.filter(item => item.checked == true && item.userId == this.user.id)
                  for(let i=0;i<arr.length;i++) {
                    deleteCartList(arr[i].id).then(res => {
                      console.log('删除订单成功',res.data);
                    })
                  }
								}
              })
              postOrder(Order).then(res => {
                if (res.status == 201) {
                  this.$store.state.title = '待付款'
									this.minToast = true
									setTimeout(() => {
										this.minToast = false
										this.$router.push('/cart')
										// this.$router.back()
									}, 1000)
                }
              })

            }
				}
        //如果路由携带参数的话，就让它返回到待付款界面
        if (this.$route.query.id) {
          this.$router.back()
				}
      },
    }
  }
</script>

<style scoped lang="less">
	.pay-bg {
		overflow: hidden;
	}
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
