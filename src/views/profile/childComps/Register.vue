<template>
	<div class="form-bg">
		<!--提示框-->
		<min-toast v-if="minToast"/>
		<loading-toast v-if="loadingToast"/>
		<!--顶部导航-->
		<nav-bar>
			<div slot="left" class="left">
				<router-link to="/login">
					<img src="~assets/img/navbar/back.svg" alt="">
				</router-link>
			</div>
			<div slot="center" class="center">
				欢迎注册！
			</div>
		</nav-bar>
		<!--选择栏-->
		<div class="top-bg">
			<span :class="showUser == true ? 'spanActive':''" @click="userRegister">用户注册</span>
			<span :class="showUser == false ?'spanActive':''"  @click="businessRegister">商家注册</span>
		</div>
		<!--注册信息-->
		<div class="register-bg" v-if="showUser == true">
					<div class="userName"><label for="1">账号 : </label><input id="1" @blur="blurUserName($event)" type="text" placeholder="请输入您的用户账号" v-model="user.username"></div>
					<div class="passWord"><label for="2">密码 : </label><input id="2" type="password" placeholder="请输入您的用户密码" v-model="user.password"></div>
					<div class="passWord"><label for="3">密码 : </label><input id="3" type="password" placeholder="请再次输入您的密码" v-model="user.passwordAgain"></div>
		</div>
		<div class="register-bg" v-if="showUser == false">
					<div class="userName"><label for="4">账号 : </label><input id="4" @blur="blurUserName($event)" type="text" placeholder="请输入您的商家账号" v-model="user.username"></div>
					<div class="passWord"><label for="5">密码 : </label><input id="5" type="password" placeholder="请输入您的用户密码" v-model="user.password"></div>
					<div class="passWord"><label for="6">密码 : </label><input id="6" type="password" placeholder="请再次输入您的密码" v-model="user.passwordAgain"></div>
					<div class="passWord"><label for="7">店铺 : </label><input id="7" @blur="blurShopName($event)" type="text" placeholder="请输入您的店铺名" v-model="user.shopName"></div>
					<div class="passWord"><label for="8">地址 : </label><input id="8" type="text" placeholder="请输入您的发货地" v-model="user.businessAddr"></div>
					<div class="passWord"><label for="9">地址 : </label><input id="9" type="text" placeholder="请输入您的电话" v-model="user.phone"></div>
		</div>
		<div class="register-button">
			<button @click="onSubmit">注册</button>
		</div>
	</div>
</template>

<script>
	//公共组件
  import NavBar from "components/common/navbar/NavBar";
  import minToast from "components/common/toast/minToast";
  import loadingToast from "components/common/toast/loadingToast";

  //导入请求相关
  import {getUser, postUser} from "network/user";
  import {getBusiness, postBusiness} from "../../../network/business";

  //md5加密（不可逆转，不使用）, npm install --save blueimp-md5
  // import md5 from 'blueimp-md5';
  export default {
    name: "Register",
		data() {
      return {
        user: {
          username: '123',
					password: '123',
					passwordAgain: '123',
					shopName: '',
					businessAddr: '',
          phone: ''
				},
        minToast: false,
        loadingToast: false,
        userArr: [],
        //显示用户登录还是商家登录
        showUser: true,
				business: []
			}
		},
    components: {
      NavBar,
      minToast,
      loadingToast
    },
		created() {
      // this.$axios.get('/api/user')
      getUser().then(res => {
				console.log('user-register数据请求成功',res);
				//请求到用户信息后保存在userArr数组中
				this.userArr = res.data
			})
      getBusiness().then(res => {
        if (res.status == 200) {
          this.business = res.data
          console.log('business-register数据请求成功',res);
        }else {
          console.log('服务器无此数据');
        }
      })
		},
		methods: {
      //失去焦点事件
      blurUserName(e) {
        if(e.target.value === '') {
          this.$store.state.title = '请先输入账号!'
          this.minToast = true
          setTimeout(() => {
            this.minToast = false
          }, 1400)
				}else if(this.showUser){
          //把获取到的用户名和输入的用户名比对，如果用户名一致，则过滤后赋值给userName变量
          let userName = this.userArr.filter(item => item.userName === this.user.username)
          let that = this
          if(userName.length > 0) { //即用户名重复了
            this.$store.state.title = '当前账号已被注册!'
            this.minToast = true
            setTimeout(function () {
              that.minToast = false
            }, 1400)
          }
				}else {
          //把获取到的用户名和输入的用户名比对，如果用户名一致，则过滤后赋值给userName变量
          let businessName = this.business.filter(item => item.businessName === this.user.username)
          let that = this
          if(businessName.length > 0) { //即用户名重复了
            this.$store.state.title = '当前账号已被注册!'
            this.minToast = true
            setTimeout(function () {
              that.minToast = false
            }, 1400)
          }
				}
			},
			//店铺名失去焦点事件
      blurShopName(e) {
        if(e.target.value === '') {
          this.$store.state.title = '请先输入店铺名!'
          this.minToast = true
          setTimeout(() => {
            this.minToast = false
          }, 1400)
        }else {
          let shopName = this.business.filter(item => item.shopName == this.user.shopName)
          console.log(shopName);
          let that = this
          if(shopName.length > 0) { //即用户名重复了
            this.$store.state.title = '该店铺名已经存在'
            this.minToast = true
            setTimeout(function () {
              that.minToast = false
            }, 1400)
          }
				}

			},
      userRegister() {
        this.showUser = true
			},
      businessRegister() {
        this.showUser = false
      },
			//注册事件
      onSubmit() {
        //判断输入是否为空
        if (this.user.username === '' || this.user.password === '' || this.user.passwordAgain === '') {
          let that = this
          that.$store.state.title = '输入不能有空！'
          that.minToast = true
					setTimeout(function () {
            that.minToast = false
          }, 1400)
				}
        //如果两次输入密码一样
        else if(this.user.password === this.user.passwordAgain) {
          //如果点击用户注册
          if (this.showUser) {
          //把获取到的用户名和输入的用户名比对，如果用户名一致，则过滤后赋值给userName变量
						let userName = this.userArr.filter(item => item.userName === this.user.username)
						let that = this
						if(userName.length > 0) { //即用户名重复了
							this.$store.state.title = '当前账号已被注册!'
							this.minToast = true
							setTimeout(function () {
								that.minToast = false
							}, 1400)
						}else {
              //定义用户信息
              let obj = {
                "name": "未命名",
                "userName": that.user.username,
                "passWord": that.user.password,
                "address": []
              }

              //发送post请求将obj对象信息传到服务器
              postUser(obj).then(res => {
                console.log(res);
                if (res.status === 201) {
                  that.$store.state.title = '注册成功，将自动登录！'
                  that.loadingToast = true
                  setTimeout(function () {
                    //本地保存用户信息到token
                    // localStorage.setItem('token', JSON.stringify(obj))
                    // that.$store.state.token = obj
                    //1500ms后跳转到首页后关闭toast
                    that.loadingToast = false
                    that.$router.push('/login')
                  }, 1500)
                }
              })
            }
					}else {
						//把获取到的用户名和输入的用户名比对，如果用户名一致，则过滤后赋值给userName变量
            let businessName = this.business.filter(item => item.businessName === this.user.username)
            let shopName = this.business.filter(item => item.shopName === this.user.shopName)
            let that = this
            if(businessName.length > 0 || shopName.length > 0) { //即用户名重复了
              this.$store.state.title = '账号或店铺已注册!'
              this.minToast = true
              setTimeout(function () {
                that.minToast = false
              }, 1400)
            }else {
							//定义商家信息
							let obj_business = {
								"shopName": this.user.shopName,
								"businessName": this.user.username,
								"businessPwd": this.user.password,
								"businessAddress": this.user.businessAddr,
								"phone": this.user.phone
							}
							//发送post请求将obj对象信息传到服务器
							postBusiness(obj_business).then(res => {
								// console.log(res);
								if (res.status === 201) {
									this.$store.state.title = '注册成功，将去登录！'
									this.loadingToast = true
									setTimeout(() => {
										//本地保存用户信息到token
										// localStorage.setItem('token', JSON.stringify(obj))
										// that.$store.state.token = obj
										//1500ms后跳转到首页后关闭toast
										this.loadingToast = false
										this.$router.push('/login')
									}, 1500)
								}
							})
        		}}
				}else {
          let that = this
          that.$store.state.title = '前后密码不一样哦！'
          that.minToast = true
					setTimeout(function () {
            that.minToast = false
          },1400)
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
		background: url("../../../assets/img/profile/loginBg.png") repeat;
		position: absolute;
		bottom: 0;

		.register-bg {
			width: 100%;
			// height: 1rem;
			font-size: 0.3rem;
			margin-top: 0.3rem;

			.userName, .passWord {
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

		.register-button {
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
		/*选择栏*/
		.top-bg{
			width: 90%;
			height: 0.8rem;
			background-color: rgba(55, 113, 196, 0.1);
			display: flex;
			justify-content: space-around;
			margin: 2.5rem auto 0;
			/*border-radius: 2rem;*/

			span{
				display: block;
				width: 2.4rem;
				text-align: center;
				line-height: 0.8rem;
				color: #9a9a9a;
			}
			.spanActive{
				display: block;
				width: 2.4rem;
				color: #fff;
				border-bottom: 1px solid #fff;
				text-align: center;
				line-height: 0.8rem;
			}
		}
	}
</style>
