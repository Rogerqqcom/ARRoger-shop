<template>
	<div>
		<!--    //顶部导航-->
		<nav-bar class="Add-nav">
			<div slot="left" class="left" @click="back">
				<img src="~assets/img/navbar/back.png" alt="">
			</div>
			<div slot="center" class="center">添加地址</div>
		<!--	<div slot="right" class="right">
				<img @click="toSetUp" v-if="isLogin"  src="~assets/img/home/setUp.png" alt="">
				<span @click="toLogin" v-else>登录</span>
			</div>-->
		</nav-bar>
		<!--添加地址-->
		<div class="address-bg">
			<div>
				<label for="name">姓名：</label>
				<input type="text" id="name" placeholder="收件人姓名" v-model="addressInfo.name">
			</div>
			<div>
				<label for="phone">电话：</label>
				<input type="text" id="phone" placeholder="收件人电话" v-model="addressInfo.tel">
			</div>
			<div>
				<label for="addr">地区：</label>
				<input type="text" id="addr" placeholder="省/市/区县" v-model="addressInfo.address">
			</div>
			<div>
				<label for="detailaddr">详细地址：</label>
				<input type="text" id="detailaddr" placeholder="街道/门牌号等信息" v-model="addressInfo.detailAddress">
			</div>
		</div>

		<div class="default-bg">
			<span>设置为默认地址</span>
			<span :class="slider == true ? 'slider-bg-Active' : 'slider-bg' " @click="changeSlider">
					<span class="slider"></span>
				</span>
		</div>

		<div class="addr-but" @click="submitAddr">
			提交
		</div>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";

	import {getOneUser, putUser} from "network/user";

  export default {
    name: "AddAddr",
		components: {
      NavBar
		},
		data() {
      return {
        //定义默认滑块状态
        slider: false,

				//用户地址
				addressInfo: {
          name: '',
					tel: '',
					address: '',
					isDefault: false,
					detailAddress: '',
					endAddress: '',
					id: ''
				},

				//用户信息
				user: {}
			}
		},
		created() {
      //获取当前的登录的用户
			// let token = JSON.parse(localStorage.getItem('token'))
      let token = this.$store.state.token || JSON.parse(localStorage.getItem('token'))

			//根据当前登录用户id获取当前的用户信息
      getOneUser(token.id)
			.then(res => {
			  if(res.status === 200) {
          // console.log(res.data);
          this.user = res.data
				}
			})
    },
    methods: {
      changeSlider() {
        this.slider = !this.slider
				//是否为默认地址
				this.addressInfo.isDefault = !this.addressInfo.isDefault
				if (this.addressInfo.isDefault == true) { //如果当前的地址信息设置为true
				  //则将user中的所有地址的状态设置false
					for (let i = 0; i < this.user.address.length; i++) {
					  this.user.address[i].isDefault = false
					}
				}
			},
      back() {
        this.$router.push('/setUp')
      },
			/*提交地址信息*/
      submitAddr() {
        let addr = this.addressInfo
				if(addr.name !== '' && addr.tel !== '' && addr.address !== '' && addr.detailAddress !== '') {
					this.addressInfo.endAddress = addr.address + ' ' + addr.detailAddress
					if (this.user.address.length > 0) {
						//如果用户地址长度大于0，则说明本身有地址，则让最新地址在原地址最后一个id的基础上加1
						this.addressInfo.id = this.user.address[this.user.address.length - 1].id + 1
					}else {
						this.addressInfo.id = 1
					}

					//将地址信息添加到用户地址信息内
					this.user.address.push(this.addressInfo)
					//根据当前用户id，使用put请求提交到服务器
					putUser(this.user.id,this.user).then(res => {
						if(res.status === 200) {
							this.$router.push('/address')
						}
					})
				} else {
				  alert("请填写完整的地址信息")
				}
			}
		}
  }
</script>

<style scoped lang="less">
	.Add-nav {
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

	.address-bg {
		width: 94%;
		height: 4.2rem;
		background-color: #fff;
		margin: 0.2rem auto;
		border-radius: 0.16rem;
		padding-top: 0.06rem;
		box-shadow: 2px 2px #e1e1e1;
		div {
			width: 88%;
			height: 0.8rem;
			margin: 0.12rem auto;
			// border: 1px solid red;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #eee;
			label {
				font-size: 0.3rem;
			}
			input {
				width: 4.6rem;
				font-size: 0.27rem;
			}
		}
	}
	.default-bg {
		width: 94%;
		height: 0.8rem;
		background-color: #fff;
		margin: 0.2rem auto;
		border-radius: 0.16rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.default-bg {
		width: 94%;
		height: 0.8rem;
		background-color: #fff;
		margin: 0 auto;
		border-radius: 0.16rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.2rem;

		.slider-bg{
			display: block;
			width: 1.1rem;
			height: 0.5rem;
			background-color: #fff;
			border: 1px solid #ddd;
			border-radius: 2rem;
			margin-right: 0.4rem;
			position: relative;
			animation: default-bg 0.3s infinite;
			animation-iteration-count:1;

			.slider{
				display: block;
				width: 0.5rem;
				height: 0.5rem;
				background-color: #fff;
				border-radius: 50%;
				box-shadow: 0.02rem 0.02rem  0.1rem #ccc;
				position: absolute;
				left: -0.4rem;
				animation: default-bgc 0.3s infinite;
				animation-iteration-count:1;
			}
			@keyframes default-bgc {
				from {
					left: 0.2rem;
				}

				to {
					left: -0.4rem;
				}
			}
		}
		@keyframes default-bg {
			from {
				background-color: #1989fa;
			}

			to {
				background-color: #fff;
			}
		}
		.slider-bg-Active{
			display: block;
			width: 1.1rem;
			height: 0.5rem;
			background-color: #1989fa;
			border: 1px solid #177ce1;
			border-radius: 2rem;
			margin-right: 0.4rem;
			position: relative;
			animation: active-big 0.3s infinite;
			animation-iteration-count:1;
			.slider{
				display: block;
				width: 0.5rem;
				height: 0.5rem;
				background-color: #fff;
				border-radius: 50%;
				box-shadow: 0.02rem 0.01rem  0.04rem #125292;
				position: absolute;
				left: 0.2rem;
				animation: active 0.3s infinite;
				animation-iteration-count:1
			}
			@keyframes active {
				from {
					left: -0.4rem;
				}

				to {
					left: 0.2rem;
				}
			}
		}
		@keyframes active-big {
			from {
				opacity: 0.1;
			}

			to {
				opacity: 1;
			}
		}


		span {
			margin-left: 0.4rem;
		}

		/*.icon {
			margin-right: 0.4rem;
		}*/
	}
	.addr-but {
		background-color: #1296db;
		width: 90%;
		height: 1rem;
		line-height: 1rem;
		color: white;
		font-size: 0.4rem;
		text-align: center;
		margin: 0.3rem  0.3rem;
		border-radius: 7vw;
	}
</style>
