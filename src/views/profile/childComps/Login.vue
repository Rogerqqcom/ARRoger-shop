<template>
	<div class="form-bg">
		<!--提示框-->
		<loading-toast v-if="loadingToast"/>
		<min-toast v-if="minToast"/>
		<!--顶部导航-->
		<nav-bar>
			<div slot="left" class="left">
				<router-link to="/profile">
					<img src="~assets/img/navbar/back.svg" alt="">
				</router-link>
			</div>
			<div slot="center" class="center">
				欢迎登录！
			</div>
		</nav-bar>

		<!--登录输入-->
		<div class="login-bg">
			<div class="userName"><label for="1">账户 : </label><input id="1" type="text" placeholder="用户名" v-model="user.username"></div>
			<div class="passWord"><label for="2">密码 : </label><input id="2" type="password" placeholder="密码" v-model="user.password"></div>
		</div>
		<div class="login-button">
			<button @click="onSubmit">登录</button>
		</div>
		<router-link to="/register">
			<span class="NoUser">没有账号 ? 去注册>></span>
		</router-link>
	</div>
</template>

<script>
	import NavBar from "components/common/navbar/NavBar";
  import loadingToast from "components/common/toast/loadingToast";
  import minToast from "components/common/toast/minToast";

  import {getUser} from "network/user"
  export default {
    name: "Login",
		data() {
      return {
        user: {
          username: '123',
					password: '123'
				},
				userArr: [],
        minToast: false,
				loadingToast: false
			}
		},
		components: {
      NavBar,
      minToast,
      loadingToast
		},
		created() {
      getUser().then(res => {
        console.log('user-login数据请求成功',res);
        //请求到用户信息后保存在userArr数组中
				this.userArr = res.data
      })
    },

    methods: {
      onSubmit() {
        // 判断是输入的账号密码是否正确
        let userName = this.userArr.filter(item => item.userName === this.user.username)
        let password = this.userArr.filter(item => item.passWord === this.user.password)
        let that = this

				if (userName.length > 0 && password.length > 0) {
				  this.$store.state.title = '登录中...'
					this.loadingToast = true
          console.log('login success');
          setTimeout(function () {
            //本地存储用户信息
				    localStorage.setItem('token', JSON.stringify(userName[0]))
						//将用户信息保存在vuex中，但页面刷新后变成无登录状态
						that.$store.state.token = userName[0]
						//跳转前关闭弹窗
						that.loadingToast = false
            that.$router.push('/home')
          }, 1000)
				}else if(this.user.username === '' || this.user.password === ''){
				  this.$store.state.title = '输入不能有空 ！！'
					this.minToast = true
					setTimeout(function () {
					  //1400ms后关闭弹窗
					  that.minToast = false
          }, 1400)
          console.log('login fail');
        }else {
          this.$store.state.title = '账号或密码错误 ！！'
          this.minToast = true
          setTimeout(function () {
            //1400ms后关闭弹窗
            that.minToast = false
          }, 1400)
          console.log('login fail');
        }
			}
    }
  }

</script>

<style scoped lang="less">
	.left{
		img{
			width: 0.6rem;
			height: 0.55rem;
			margin-bottom: 0.1rem;
		}
	}
	.center{
		color: #fff;
		font-size: 0.5rem;
		height: 0.96rem;
		line-height: 0.96rem;
		/*设置字间距*/
		letter-spacing: 0.08rem;
		padding-top: 0.1rem;
		padding-left: 0.5rem;
	}
	.form-bg {
		width: 100%;
		height: 100vh;
		margin: 0 auto;
		/*background-color: #FFFFFF;*/
		background: url("~assets/img/profile/loginBg.png") repeat;
		position: absolute;
		bottom: 0;

		.login-bg {
			width: 100%;
			// height: 1rem;
			font-size: 0.3rem;
			margin-top: 3rem;
			.userName , .passWord {
				width: 90%;
				margin: 0 auto;

				label {
					color: #fff;
				}

				input {
					width: 5.6rem;
					height: 0.6rem;
					border-bottom: 1px solid #ccc;
					padding-left: 0.14rem;
					color: #666;
					font-size: 0.3rem;
				}
			}

			.passWord {
				margin-top: 0.2rem;
			}
		}
		.login-button {
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 1rem;
			button {
				width: 90%;
				height: 0.8rem;
				background-color: #1296db;
				font-size: 0.3rem;
				border: none;
				margin: 0;
				border-radius: 2rem;
				color: #fff;
				/*解决button点击后出现边框*/
				outline:0

			}
		}

		.NoUser {
			font-size: 0.3rem;
			float: right;
			margin-top: 0.3rem;
			color: #fdfdfd;
			margin-right: 0.4rem;
		}
	}
</style>
