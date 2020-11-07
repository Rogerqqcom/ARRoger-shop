<template>
	<div>
		<!--    //顶部导航-->
		<nav-bar class="profile-nav">
			<div slot="left" class="left" @click="back">
				<img src="~assets/img/navbar/back.png" alt="">
			</div>
			<div slot="center" class="center">地址管理</div>
			<div slot="right" class="right">
				<img @click="toSetUp" v-if="isLogin"  src="~assets/img/home/setUp.png" alt="">
				<span @click="toLogin" v-else>登录</span>
			</div>
		</nav-bar>

		<!--获取到的所有地址展示-->
		<div class="address-show" v-for="(item, index) in user.address" :key="index">
			<img src="~assets/img/icon/CheckedBoxActive.svg" alt=""
					 v-if="defaultAddressId === user.address[index].id">
			<img src="~assets/img/icon/CheckedBox.svg" alt="" v-else  @click="select(index)">

			<div class="content"  @click="select(index)">
				<div>{{item.name}} {{item.tel}}
					<span v-if="defaultAddressId === user.address[index].id">默认</span>
				</div>
				<div>{{item.endAddress}}</div>
			</div>
			<img src="~assets/img/icon/change.svg" alt="" @click="editAddr(index)">
		</div>

		<!--添加地址-->
		<div class="addr-but" @click="addAddr">
				添加收货地址
		</div>
	</div>

</template>

<script>
	import NavBar from "components/common/navbar/NavBar";

  import {getOneUser, putUser} from "network/user"

  export default {
    name: "Address",
		data() {
      return {
        isLogin: false,
				//当前用户信息
				user: {},
				//显示的默认地址的id
				defaultAddressId: ''
			}
		},
    created() {
      //从本地浏览器获取到token信息后，将设置为登录状态
      if( this.$store.state.token || localStorage.getItem('token')){
        this.isLogin = true
        // let token = JSON.parse(localStorage.getItem('token'))
        let token = this.$store.state.token || JSON.parse(localStorage.getItem('token'))

        getOneUser(token.id).then(res => {
          // console.log(res.data);
          if (res.status === 200) {
            this.user = res.data
						//筛选得到的地址为默认状态的地址
						let DeAddress = this.user.address.filter(item => item.isDefault == true)

						if (DeAddress.length > 0) {
						  this.defaultAddressId = DeAddress[0].id
						}
          }
        })

      }else {
        alert('请先登录')
      }
    },

		components: {
      NavBar
		},
		methods: {
      addAddr() {
        if (this.user.address.length < 5) {
          this.$router.push('/addAddress')
				}else {
          alert('最多只能存五条地址')
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
      select(index) {
        //根据当前的点击修改为默认状态
				//首先根据id找到当前点击的address
				let address = this.user.address.filter(item => item.id === this.user.address[index].id)
				if (address.length > 0) {
				  //将当前点击地址的状态改为true
				  address[0].isDefault = true
          this.defaultAddressId = address[0].id
        }
        //然后将其他的address的状态设置为false
				for (let i = 0; i < this.user.address.length; i++) {
          if(this.user.address[i].id !== this.user.address[index].id){
            this.user.address[i].isDefault = false
          }
				}
				//然后将修改后的对象put到服务器
        let token = this.$store.state.token || JSON.parse( localStorage.getItem('token'))
        putUser(token.id, this.user).then(res => {
          console.log(res.data);
        })
      },
			//根据当前点击跳转到对应的地址信息页
      editAddr(index) {
        this.$store.commit('editAddr', index)
        // this.$store.state.addressId = index + 1

        if (this.$store.state.addressId) {
				  this.$router.push('/editAddress')
				}
      }

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
	.address-show {
		width: 94%;
		height: 1.5rem;
		border-radius: 8px;
		display: flex;
		margin: 0.3rem auto;
		align-items: center;
		align-content: center;
		align-self: center;
		background-color: #e6e6e6;
		box-shadow: 1px 1px #6e6e6e;
		color: #818181;

		img:nth-child(1) {
			width: 0.5rem;
			height: 0.5em;
			margin-left: 0.3rem;
		}
		img:nth-child(2) {
			width: 0.5rem;
			height: 0.5em;
			margin-left: -0.5rem;
		}
		.content {
			width: 75%;
			flex-wrap: wrap;
			/*background-color: #f00;*/
			font-size: 0.3rem;
			margin-left: 0.2rem	;
			div:nth-child(1) {
				font-weight: bold;
				color: #505050;
				display: flex;
				span{
					display: block;
					width: 0.8rem;
					height: 0.3rem;
					background-color: #1296db;
					color: white;
					font-weight: normal;
					text-align: center;
					line-height: 0.3rem;
					font-size: 0.2rem;
					margin-left: 0.1rem;
					border-radius: 2rem;
				}
			}

		}
		img:nth-child(3) {
			width: 0.6rem;
			height: 0.5em;
			margin-right: 0.3rem;
		}
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
		/*float: bottom;*/
		position: fixed;
		bottom: 0;

	}
</style>
