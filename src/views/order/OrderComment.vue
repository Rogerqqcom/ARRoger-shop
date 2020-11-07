<template>
	<div class="order-comment">
		<!--顶部导航-->
		<nav-bar class="comment-nav">
			<div slot="left" class="left" @click="back">
				<img src="~assets/img/navbar/back.png" alt="">
			</div>
			<div slot="center" class="center">订单详情</div>
			<div slot="right" class="right">
				<img @click="toSetUp" v-if="isLogin"  src="~assets/img/home/setUp.png" alt="">
				<span @click="toLogin" v-else>登录</span>
			</div>
		</nav-bar>
		<!--选择栏-->
		<div class="top-bg">
			<span :class="showProduct == true ? 'spanActive':''" @click="showProduct = true">商品列表</span>
			<span :class="showProduct == false ?'spanActive':''">编写评价</span>
		</div>
		<!--商品列表-->
		<div class="product-list" v-if="showProduct">
			<div class="product" v-for="(item, index) in productComment" :key="index">
				<img :src="item.image" alt="" class="img">
				<div class="right-bg">
					<p>{{item.title}}</p>
					<p>{{item.desc}}</p>
					<p>￥{{item.Subtotal}}
						<span>x{{item.count}}</span>
						<span class="goComment" @click="goComment(index)">评价>></span>


					</p>
				</div>
			</div>
		</div>
		<!--编写评价-->
		<div class="comment">
			<textarea v-model="comment" name="" id="" cols="50" rows="10"></textarea><br/>
			<button @click="subComment">提交评价</button>
		</div>
		<min-toast v-if="isToast"/>
	</div>
</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar";
	import minToast from "../../components/common/toast/minToast";
  import {getProduct, putProduct} from "../../network/products";
  import {getOneUser, putUser} from "../../network/user";
  import {getOrder, putOrder} from "../../network/order";
  export default {
    name: "OrderComment",
		data() {
      return {
        isLogin: false,
				//显示商品还是显示评价页
        showProduct: true,
				//商品数据
				productComment: [],
				//记录跳转后的商品id
				productId: '',
				//服务器请求的对应商品
				product: [],
				//页面输入的评价信息
				comment: '',
				//用户信息
				oneUser: [],
				//提示弹窗
				isToast: false,
			}
		},
		components: {
      NavBar,minToast
		},
		created() {
      if (this.$store.state.token || localStorage.getItem('token')) {
        this.isLogin = true
				this.productComment = this.$store.state.productComment.commodity.arr
        // this.products = this.products.commodity.arr
        console.log(this.$store.state.productComment);
        console.log(this.$store.state.productComment.id);

        //获取当前登录用户
				let token = this.$store.state.token || JSON.parse(localStorage.getItem('token'))
				getOneUser(token.id).then(res => {
				  this.oneUser = res.data
          console.log(this.oneUser);
        })
      }
    },
		methods: {
      back() {
        this.$router.push('/profile')
      },
      toSetUp() {
        this.$router.push('/setUp')
      },
      toLogin() {
        this.$router.push('/login')
      },
      goComment(index) {
          this.showProduct = false
          //保存跳转后的商品id
          this.productId = this.productComment[index].productId
          console.log("commnet",this.productId);
      },
      subComment() {
        if (this.comment) {
          //用户是否评价过
          //根据跳转后的商品id获取对应的商品数据
          getProduct(this.productId).then(res => {
            // console.log(res.data);
            this.product = res.data
            this.product = this.product[0]
            console.log(this.product);
              let myDate = new Date()
							// 定义一些关于评论的信息
							let obj = {
								userName: this.oneUser.name,
								userId: this.oneUser.id,
								orderId: this.$store.state.productComment.id,
								mobile: this.$store.state.productComment.address.tel,
								buyTime: this.$store.state.productComment.created_order,
								commentTime: myDate.getFullYear() + '/' + myDate.getMonth() +'/' + myDate.getDate() + ' '
									+ myDate.getHours() + ':' + myDate.getMinutes(),
								comment: this.comment
							}
							//商品评论为空
              if (!this.product.comments) {
                //定义一方评论信息的空数组
                let comments = []
                //将空数组入product对象中s
                this.product['comments'] = comments
                //将评论信息评论信息加入product对象中
                this.product.comments.push(obj)
                console.log(this.product);
                putProduct(this.productId, this.product).then(res => {
                  console.log("评论成功",res.data);
                  // /!*修改订单状态*!/
                  getOrder(this.$store.state.productComment.id).then(res => {
                    let obj = res.data
                    console.log(obj);
                    // if (obj.userId == this.oneUser.id) {
                    //   if (this.product.comments.find(item => item.orderId == this.$store.state.productComment.id)) {
                    //
										// 	}
                    // }
                    // console.log(obj[0]);
                    obj[0].is_pay = "已评价"

                    putOrder(this.$store.state.productComment.id, obj[0]).then(res => {
                      console.log('订单状态修改成功');
                      this.isToast = true
											this.$store.state.title = '评价成功'
                      setTimeout(() => {
                        this.isToast = false
                        this.showProduct = true
                      }, 800)
                    })
                  })
                  // //1.先检索当前订单
                  // let userOrder = this.oneUser.Order.filter(item => item.id == this.$store.state.productComment.id)
                  // console.log(userOrder);
                  // //2.修改订单状态为待评价
                  // userOrder[0].is_pay = "已评价"
                  // console.log(userOrder);
                  // //替换订单栏中的信息
                  // // let OrderId
                  // // for (let i=0; i<this.user.Order.length;i++) {
                  // //   if (this.user.Order[i].id == this.dataInfo.id) {
                  // //     OrderId = i
                  // //   }
                  // // }
                  // let OrderId
                  // //获取当前商品的下标
                  // for (let i=0; i<this.oneUser.Order.length; i++) {
                  //   if (this.oneUser.Order[i].id == this.$store.state.productComment.id) {
                  //     OrderId = i
                  //   }
                  // }
                  // this.oneUser.Order.splice(OrderId, 1, userOrder[0])
									//
                  // //提交到服务器
                  // putUser(this.oneUser.id, this.oneUser).then(res => {
                  //   console.log("订单状态修改为已评价");
                  //   this.isToast = true
                  //   this.$store.state.title = '首次评价成功'
                  //     setTimeout(() => {
                  //       this.isToast = false
                  //       this.showProduct = true
                  //     },1000)
                  // })
                })

              }else {
                console.log('商品评论内容不为空');
                //商品评论内容不为空
								//先判断是不是同一个订单id，如果不是同一个订单id的评论，则在商品评论追加一条评论内容
                  let arr = this.product.comments.find(item => item.orderId ==  this.$store.state.productComment.id	&& item.userId == this.oneUser.id)
									if (arr) {
                    alert('此商品已经评价过')
                    this.showProduct = true
                  }else {
									  //查找评论数组中的评论用户id是否等于当前登录的id
									  let brr = this.product.comments.find(item => item.userId !=  this.oneUser.id)
										if (brr) {
                      this.product.comments.push(obj)
                      console.log(this.product);
                      putProduct(this.productId, this.product).then(res => {
                        this.showProduct = true
                        console.log("此商品为不同用户订单评价",res.data);
                        // /!*修改订单状态*!/
                        getOrder(this.$store.state.productComment.id).then(res => {
                          let obj = res.data
                          console.log(obj);
                          obj[0].is_pay = "已评价"
                          // console.log(obj[0]);
                          putOrder(this.$store.state.productComment.id, obj[0]).then(res => {
                            this.isToast = true
                            this.$store.state.title = '评价成功'
                            setTimeout(() => {
                              this.isToast = false
                              this.showProduct = true
                            }, 800)
                          })
                        })
                        // //1.先检索当前订单
                        // let userOrder = this.oneUser.Order.filter(item => item.id == this.$store.state.productComment.id)
                        // console.log(userOrder);
												//
                        // //2.修改订单状态为待评价
                        // userOrder[0].is_pay = "已评价"
                        // console.log(userOrder);
                        // //替换订单栏中的信息
                        // let OrderId
                        // //获取当前商品的下标
                        // for (let i=0; i<this.oneUser.Order.length; i++) {
                        //   if (this.oneUser.Order[i].id == this.$store.state.productComment.id) {
                        //     OrderId = i
                        //   }
                        // }
                        // this.oneUser.Order.splice(OrderId, 1, userOrder[0])
                        // //提交到服务器
                        // putUser(this.oneUser.id, this.oneUser).then(res => {
                        //   console.log("订单状态修改为已评价");
                        //   this.isToast = true
                        //   this.$store.state.title = '不同用户订单评价'
                        //   setTimeout(() => {
                        //     this.isToast = false
                        //     this.showProduct = true
                        //   },1000)
                        // })
                      })
										}else {
                      this.product.comments.push(obj)
                      putProduct(this.productId, this.product).then(res => {
                        this.showProduct = true
                        console.log("此商品为同一用户不同订单评价",res.data);
                        // /!*修改订单状态*!/
                        //1.先检索当前订单
                        // let userOrder = this.oneUser.Order.filter(item => item.id == this.$store.state.productComment.id)
                        // console.log(userOrder);

                        //2.修改订单状态为待评价
                        getOrder(this.$store.state.productComment.id).then(res => {
                          let obj = res.data
                          obj[0].is_pay = "已评价"
                          // console.log(obj[0]);
                          putOrder(this.$store.state.productComment.id, obj[0]).then(res => {
                            console.log('修同一用户订单状态成功');
                            this.isToast = true
                            this.$store.state.title = '评价成功'
                            setTimeout(() => {
                              this.isToast = false
                              this.showProduct = true
                            }, 800)
                          })
                        })

                        // userOrder[0].is_pay = "已评价"
                        // console.log(userOrder);
                        // let OrderId
                        // //获取当前商品的下标
                        // for (let i=0; i<this.user.Order.length;i++) {
                        //   if (this.oneUser.Order[i].id == this.$store.state.productComment.id) {
                        //     OrderId = i
                        //   }
                        // }
                        // //替换订单栏中的信息
                        // this.oneUser.Order.splice(OrderId, 1, userOrder[0])
                        // //提交到服务器
                        // putUser(this.oneUser.id, this.oneUser).then(res => {
                        //   console.log("订单状态修改为已评价");
                        //   this.isToast = true
                        //   this.$store.state.title = '同一用户不同订单评价'
                        //   setTimeout(() => {
                        //     this.isToast = false
                        //     this.showProduct = true
                        //   },1000)
                        // })
                      })
										}
									}
              }
          })
				}else {
          alert('请先输入评价内容！')
				}
      }
		}
  }
</script>

<style scoped lang="less">
	.order-comment {
		height: 100vh;
		background-color: #f3f3f3;
		overflow: hidden;
	}
	/*顶部*/
	.comment-nav {
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
	/*选择栏*/
	.top-bg{
		width: 100%;
		height: 0.8rem;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		span{
			display: block;
			width: 2.4rem;
			text-align: center;
			line-height: 0.8rem;
		}
		.spanActive{
			display: block;
			width: 2.4rem;
			color: #1296db;
			border-bottom: 1px solid #1296db;
			text-align: center;
			line-height: 0.8rem;
		}
	}
	/*商品信息栏*/
	.product-list {
		width: 100%;
		height: 100vh;
		background-color: #fff;
		/*border-bottom: 1px solid #eee;*/
		border-bottom: 5px solid #eeee;
		border-top: 2px solid#eee;
		overflow: scroll;
		overflow-x: hidden;

		.product {
			width: 100%;
			height: 1.8rem;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.img {
				width: 1.6rem;
				margin-left: 0.2rem;
			}

			.right-bg {
				width: 5.2rem;
				height: 1.5rem;
				margin-right: 0.2rem;

				p:nth-child(1) {
					font-size: 0.3rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				p:nth-child(2) {
					font-size: 0.26rem;
					margin-top: 0.02rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				p:nth-child(3) {
					font-size: 0.3rem;
					margin-top: 0.3rem;
					color: #1296db;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					position: relative;
				  span:nth-child(1) {
						/*margin-left: 0.5rem;*/
						position: absolute;
						left: 1.8rem;
						top: 0.05rem;
					}
					span:nth-child(2) {
						font-size: 0.35rem;
						width: 1rem;
						height: 0.8em;
						position: absolute;
						right: 0.1rem;
						top: 0;
						color: #58a7db;
					}
				}
			}


		}
	}
	/*编写评价*/
	.comment {
		margin: 1rem 7%;
		button {
			height: 0.8rem;
			width: 100%;
			background-color: #1296db;
			border-radius: 30px;
			border-style: none;
			outline: none;
			color: white;
		}
	}
</style>
