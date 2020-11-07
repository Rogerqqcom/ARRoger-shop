<template>
	<div class="setUp_bg">
		<min-toast class="toast" v-if="Toast"/>
		<alert-com v-if="isAlert" :title="title" :content="content" :cancelEvent="cancelEvent" :comfirmEvent="comfirmEvent"></alert-com>
		<!--顶部导航-->
		<nav-bar class="setup-nav">
			<div slot="left" class="left" @click="back">
				<img src="~assets/img/navbar/back.png" alt="">
			</div>
			<div slot="center" class="center">设置</div>
			<div slot="right" class="right">
				<img src="~assets/img/home/setUp.png" alt="">
			</div>
		</nav-bar>
		<!--修改内容区-->
		<div class="user-bg" @click="UpdateAddress">
			<span>地址管理</span>
			<span>查看>></span>
<!--			<edit-address  v-if="cAddress"></edit-address>-->
		</div>
		<div class="user-bg" @click="UpdateUser">
			<span>用户信息</span>
			<span>修改>></span>
		</div>
		<!--点击用户信息修改后展示的内容-->
		<div>
			<update-user v-if="cUser" :user="user" class="user-info"></update-user>
		</div>

		<!--用户退出操作-->
		<div class="but">
			<button class="button-one" v-if="user.name" @click="logout">退出登录</button>
			<button class="button-two" v-if="user.name" @click="toLogin">切换账号</button>

		</div>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";
	import minToast from "components/common/toast/minToast";
	import AlertCom from "components/common/confirm/AlertCom";

	import UpdateUser from "./childComps/UpdateUser";
  import EditAddress from "../profile/childComps/address/EditAddress";

  import {getOneUser} from "network/user";

  export default {
    name: "SetUp",
		data() {
      return {
        Toast: false,
        cUser: false,
        cAddress: false,

				//展示确认框信息
        title:"温馨提示！",
        content:"确认退出登录吗？",
        isAlert: false,

				//获取到的用户信息
				user: {}
			}
		},
		components: {
      EditAddress,
      minToast,
      NavBar,
      AlertCom,

      UpdateUser,
		},
    created() {
      if (this.$store.state.token || localStorage.getItem('token')) {
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
			}else {
        alert('请先登录')
				this.$router.push('/login')
			}
    },
		methods: {
      logout() {
				this.isAlert = true
        this.$store.state.token = ''
      },
      cancelEvent:function(){
        this.isAlert = false;
      },
      comfirmEvent(){
        if (this.isAlert) {
          this.$store.state.title = '退出成功'
          this.Toast = true
          let that = this
          setTimeout(function(){
            that.Toast = false
            //将token的值设置为空
            // localStorage.setItem('token', '')
            localStorage.clear()
            // if (localStorage.getItem('token') == '') {
            that.$router.push('/login')
            // }
          },1400)
        }
      },
      back() {
        this.$router.go(-1)
      },
      toSetUp() {
        this.$router.push('/setUp')
      },
      toLogin() {
        this.$router.push('/login')
      },
      UpdateUser() {
        if (this.$store.state.token || localStorage.getItem('token')) {
          this.cUser = !this.cUser
				}else {
          alert('请先登录')
				}
      },
      UpdateAddress() {
        if (this.$store.state.token || localStorage.getItem('token')) {
          this.$router.push('/address')
        }else {
          alert('请先登录')
        }
      }
		}
  }
</script>

<style scoped lang="less">
	.setup-nav {
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
	.user-bg {
		width: 94%;
		height: 1rem;
		margin: 0.1rem auto;
		background-color: #e6e6e6;
		box-shadow: 1px 1px #6e6e6e;
		color: #818181;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		/*text-align: center;*/
		span {
			display: block;
			align-self: center;
		}
		span:nth-child(1) {
			padding-left: 0.4rem;
			font-weight: bold;
			width: 3rem;
		}
		span:nth-child(2) {
			padding-right: 0.6rem;
		}
		.user-info {
			margin-top: 2rem;
			width: 100%;
			background-color: #ff0;
		}
	}
	.but {
		display: flex;
	}
	.button-one {
		/*display: block;*/
		/*width: 7rem;*/
		margin: 0 0.3rem;
		height: 0.9rem;
		width: 45%;
		font-size: 0.26rem;
		background-color: #f00;
		color: #fff;
		border: none;
		border-radius: 2rem;
		/*border: 1px solid #ff2742;*/
		position: fixed;
		bottom: 0;
	}
	.button-two {
		/*display: block;*/
		width: 45%;
		margin: 0 50%;
		height: 0.9rem;
		font-size: 0.26rem;
		background-color: #3f84e1;
		color: #fff;
		border: none;
		border-radius: 2rem;
		/*border: 1px solid #ff2742;*/
		position: fixed;
		bottom: 0;
	}
	.toast {
		margin-top: 3.7rem;
	}

</style>
