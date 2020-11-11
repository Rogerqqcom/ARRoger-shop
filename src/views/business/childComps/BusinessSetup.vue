<template>
	<div class="business-setup" >
		<div v-if="isAlert == false && cancelBusiness == false">
			<div class="setup-title">个人设置</div>
			<div class="setup-content">
				<div class="shopInfo"><label >店铺 : </label><span  type="text" >{{business.shopName}}</span></div>
				<div class="shopInfo"><label >账号 : </label><span type="text" >{{business.businessName}}</span></div>
				<div class="passWord">
					<label for="5">密码 : </label>
					<input id="5" :type="passWordStyle ? 'text': 'password'" placeholder="请输入您的用户密码" v-model="business.businessPwd">
					<img
						src="~assets/img/setUp/see.svg" alt="显示"
						v-show="passWordStyle" @click="passWordStyle = !passWordStyle">
					<img src="~assets/img/setUp/hide.svg" alt="隐藏" v-show="!passWordStyle" @click="passWordStyle = !passWordStyle">
				</div>
				<div class="passWord"><label for="8">地址 : </label><input  id="8" type="text" placeholder="请输入您的发货地" v-model="business.businessAddress"></div>
				<div>
					<button  class="update-but" @click="updateInfo">修改</button>
				</div>
			</div>
			<div class="setup-bottom">
				<div class="cancel" @click="deleteBusiness">
					注销账号
				</div>
				<div class="logout" @click="logout">
					退出登录
				</div>
			</div>
		</div>
		<min-toast v-if="minToast"/>
		<alert-com v-if="isAlert" :title="title" :content="content" :cancelEvent="cancelEvent" :comfirmEvent="confirmEvent"></alert-com>
		<alert-com v-if="cancelBusiness" :title="title" :content="contentOut" :cancelEvent="cancelEvent" :comfirmEvent="confirmOut"></alert-com>

	</div>
</template>

<script>
	import minToast from "../../../components/common/toast/minToast";
	import AlertCom from "../../../components/common/confirm/AlertCom";
  import {deleteBusiness, putBusiness} from "../../../network/business";
  import {deleteProduct, getProduct} from "../../../network/products";

  export default {
    name: "businessSetup",
		data() {
      return {
        business: {},
        passWordStyle: false,
        minToast: false,
				isAlert: false,
        //展示确认框信息
        title:"温馨提示！",
        content:"确认退出登录吗？",
        cancelBusiness: false,
				contentOut: "您确定要注销此账号吗？"
			}
		},
		components: {
      minToast,
      AlertCom
		},
		created() {
      this.business = this.$store.state.business
      // console.log(this.business);
    },
		methods: {
      updateInfo() {
        putBusiness(this.business.id, this.business).then(res => {
          //让vuex里面的商家密码和地址也修改
          this.$store.state.business = this.business
          this.$store.state.title = '修改成功'
					this.minToast = true
          setTimeout(() => {
            this.minToast = false
					},500)
          console.log("修改成功",res.data);
        })
      },
      deleteBusiness() {
        this.cancelBusiness = true
			},
      logout() {
        this.isAlert = true
			},
      cancelEvent(){
        this.isAlert = false;
        this.cancelBusiness = false
      },
			//确认退出事件
      confirmEvent(){
        if (this.isAlert) {
          //将vuex里面的用户信息清空
          this.$store.state.business = ''
          this.$store.state.title = '退出成功'
          this.minToast = true
          setTimeout(() => {
            this.minToast = false
            this.$router.push('/login')
          },1000)
        }
      },
			//确认注销事件
      confirmOut() {
        if(this.cancelBusiness) {
          //删除当前商家
          deleteBusiness(this.business.id).then(res => {
            this.$store.state.title = '注销成功'
            this.minToast = true
            setTimeout(() => {
              this.minToast = false
              this.$router.push('/register')
            },500)
            console.log("注销成功",res.data);
            //删除商家对应的商品数据
            getProduct().then(res => {
              let arr = res.data.filter(item => item.shopName == this.business.shopName)
              for (let i=0; i<arr.length; i++) {
                deleteProduct(arr[i].id).then(res => {
                  console.log('删除商品数据成功',res.data);
                })
              }
            })
          })
				}
			}
		}
  }
</script>

<style scoped lang="less">
	/*个人设置从右向左进入*/
	.business-setup {
		width: 100%;
		height: 9.5rem;
		background-color: #eeeeee;
		border-top: 2px solid #757575;
		animation: right_in 1s;
		position: relative;
		overflow: hidden;
		@keyframes right_in {
			0% {
				right: -100%;
			}
			100% {
				right: 0;
			}
		}
		font-size: 0.5rem;
		.setup-title {
			text-align: center;
			color: #fff;
			background-image: linear-gradient(to bottom, #f3f3f3, #9b9b9b);
			/*border-bottom: 2px #9b9b9b solid;*/
		}
	}
	.setup-content {
		width: 90%;
		margin: 0.5rem auto 0;
		border-bottom: 1px solid #b1b1b1;
		position: relative;
		.shopInfo {
			span {
				font-size: 0.45rem;
			}
			margin-top: 0.3rem;
		}
		input {
			width: 70%;
			height: 0.7rem;
			margin-top: 0.3rem;
			padding-left: 0.1rem;
			font-size: 0.35rem;
			background-color: #fff;
		}
		img {
			width: 1.2em;
			/*background-color: #f00;*/
		}
		button {
			display: inline-block;
			height: 0.85rem;
			width: 80%;
			font-size: 0.45rem;
			margin: 0.3rem 0 0 0.6rem;
			background-color: #3f84e1;
			color: #fff;
			border: none;
			border-radius: 2rem;
		}

	}
	.setup-bottom {
		position: absolute;
		bottom: 0;
		/*background-color: #ffff00;*/
		display: flex;
		color: white;
		width: 100%;
		justify-content: space-evenly;

		.cancel, .logout {
			padding: 0.1rem 0.3rem;
			border-radius: 20px;
		}
		.cancel {
			background-color: #f00;
		}
		.logout {
			background-color: #1296db;
		}
	}
</style>
