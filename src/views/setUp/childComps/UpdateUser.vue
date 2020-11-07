<template>
	<div class="info-bg">
		<min-toast class="toast" v-if="Toast"></min-toast>
		<div class="content">
			<div>
				<label for="name">昵称：</label>
				<input type="text" id="name" v-model="user.name">
			</div>
			<div>
				<label for="password">密码：</label>
				<input :type="passWordStyle ? 'text': 'password'" id="password" v-model="user.passWord" >
				<img src="~assets/img/setUp/see.svg" alt="显示" v-show="passWordStyle" @click="passWordStyle = !passWordStyle">
				<img src="~assets/img/setUp/hide.svg" alt="隐藏" v-show="!passWordStyle" @click="passWordStyle = !passWordStyle">

			</div>
			<div>
				<button  class="update-but" @click="updateInfo">修改</button>
			</div>
		</div>

	</div>
</template>

<script>
	import minToast from "components/common/toast/minToast";

	import {putUser} from "network/user";

  export default {
    name: "updateUser",
		components: {
      minToast
		},
		props: {
      user: {
        default() {
          return {
            name: "",
						password: ""
					}
				}
			}
		},
		data() {
      return {
        passWordStyle: false,
        Toast: false
			}
		},
		methods: {
      updateInfo() {
        let token = this.$store.state.token || JSON.parse(localStorage.getItem('token'))
        putUser(token.id, this.user).then(res => {
          if (res.status === 200) {
            //将vuex里面的用户昵称修改
           this.$store.state.userData.name = this.user.name
            // console.log(this.$store.state.userData);
            this.$store.state.title = "修改成功！"
            this.Toast = true
            setTimeout(() => {
              this.Toast = false
              this.$router.push('/profile')
            }, 1000)
          }
        })
      }
		}

  }
</script>

<style scoped lang="less">
	.info-bg {
		background-color: #e6e6e6;
		color: #484848;
		box-shadow: 2px 2px #8b8b8b;
		font-weight: bold;
		height: 5rem;
		top: 0.8rem;
		width: 90%;
		margin: 0 auto;
		border-radius: 10px;
		.content {
			padding-top: 7%;
			padding-left: 15%;
			/*background-color: #f00;*/
			div {
				/*background-color: #fff;*/
				border-bottom: 2px #fff solid;
			}
			label{
				font-size: 0.45rem;
			}
			input{
				width: 3.5rem;
				height: 0.65rem;
				font-size: 0.35rem;
				border-radius: 8px;
			}
			img {
				width: 0.8em;
				height: 0.8em;
				padding-top: 0.4rem;
				/*background-color: #f00;*/
			}

		}
		button {
			display: inline-block;
			height: 0.85rem;
			width: 2.5rem;
			font-size: 0.45rem;
			margin-left: 1.5rem;
			background-color: #3f84e1;
			color: #fff;
			border: none;
			border-radius: 2rem;
			/*border: 1px solid #ff2742;*/
		}


		animation: myfirst 1s;
		position: relative;
		@keyframes myfirst {
			0% {
				background: #f00;
				left: 0;
				top: 0
			}
			50% {
				background-color: green;
				left: 0;
				top: 0.5rem;
			}
			100% {
				background-color: #1296db;
				left: 0;
				top: 0.8rem;
			}

		}
	}
	.toast {
		margin-top: 5.5rem;
	}
</style>
