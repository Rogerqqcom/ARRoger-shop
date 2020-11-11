<template>
	<div class="business-bg">
		<min-toast v-if="minToast"/>
		<nav-bar class="nav-bg">
			<div class="center" slot="center">
				商家管理
			</div>
		</nav-bar>
		<!--管理选项-->
		<div class="business-admin">
			<!--1.上传商品-->
			<div class="admin" @click="upGoods">
				<img src="~assets/img/business/upProduct.svg" />
				<div class="title">上传商品</div>
			</div>
			<!--2.管理商品-->
			<div class="admin" @click="goAdminGoods">
				<img src="~assets/img/business/adminProduct.svg"/>
				<div class="title">管理商品</div>
			</div>
			<!--2.订单管理-->
			<div class="admin" @click="goAdminOrder">
				<img src="~assets/img/business/adminOrder.svg" />
				<div class="title">订单管理</div>
			</div>
			<!--2.个人设置-->
			<div class="admin" @click="bSetup">
				<img src="~assets/img/business/setup.svg" />
				<div class="title">个人设置</div>
			</div>
		</div>
		<!--上传商品展示栏-->
		<edit-content v-if="upProduct" :product="product"
									:img-str="imgStr" :product_xq="product_xq"
									@upImgStr="upImgStr"
									@deleteImgStr="deleteImgStr"
									@subProduct="subProduct"
									@upProduct_xq="upProduct_xq"
									@deleteProduct_xq="deleteProduct_xq"
		/>
		<!--设置栏-->
		<business-setup v-if="businessSetup"/>
	</div>
</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar";
	import minToast from "../../components/common/toast/minToast";

	import BusinessSetup from "./childComps/BusinessSetup";
	import EditContent from "./childComps/EditContent";

	import {postProduct} from "network/products";
  export default {
    name: "Business",
		data() {
      return {
        upProduct: false,
        businessSetup: false,
				//添加轮播图
        // allSwipePic: true,
				imgStr: [],
				//添加详情图
        // allDetailPic: true,
        product_xq: [],
				product: [{
          title: '',
					titleTwo: '',
          price: '',
          totalNum: '',
          category: ''
				}],
				minToast: false
			}
		},
		components: {
      NavBar,
			minToast,
      BusinessSetup,
      EditContent
		},
		methods: {
      upGoods() {
        //先关闭个人设置栏
        this.businessSetup = false
        this.upProduct = !this.upProduct
      },
      bSetup() {
        //先关闭上传商品栏
        this.upProduct = false
				this.businessSetup = !this.businessSetup
			},
      /**
			轮播图片上传
			* */
      upImgStr(e) {
        if (this.imgStr.length < 3) {
          let files = document.getElementById("imgStr").files[0];
          // console.log(files);
          //转码base64
          let reader = new FileReader();
          let imgFile;
          reader.readAsDataURL(files);
          reader.onload =  e => {
            //这里的imgFile为'data:image/png;base64,'+ base64编码字符串拼接形成的图片
            imgFile = e.target.result;
            // console.log( imgFile);

            //这里的 picPath 'data:image/png;base64,'+ base64为编码字符串拼接形成图片的
            this.imgStr.push(imgFile)
            // console.log(this.imgStr);
          }
				}else {
          alert('不能超过3张图')
				}
      },
      deleteImgStr(index){
        this.imgStr.splice(index,1);
      },
			/**
			详情图片上传
			* */
      upProduct_xq(e) {
        if (this.product_xq.length < 5) {
          let files = document.getElementById("product_xq").files[0];
          // console.log(files);
          //转码base64
          let reader = new FileReader();
          let imgFile;
          reader.readAsDataURL(files);
          reader.onload =  e => {
            //这里的imgFile为'data:image/png;base64,'+ base64编码字符串拼接形成的图片
            imgFile = e.target.result;
            // console.log( imgFile);

            //这里的 picPath 'data:image/png;base64,'+ base64为编码字符串拼接形成图片的
            this.product_xq.push(imgFile)
            // console.log(this.product_xq);
          }
				}else {
          alert('不能超过5张图')
				}
      },
      deleteProduct_xq(index){
        this.product_xq.splice(index,1);
      },
			/**
			 * 提交商品
			 * */
      subProduct() {
        if (this.product.title !== '' && this.product.titleTwo !== ''
					&& this.product.totalNum !== '' && this.product.price !== ''
					&& this.product.category !== '' && this.imgStr.length !== 0 && this.product_xq.length !== 0) {
          console.log(this.product);
          let obj = {
            "shopName": this.$store.state.business.shopName,
            "businessAddress": this.$store.state.business.businessAddress,
            "phone": this.$store.state.business.phone,
            "title": this.product[0].title,
						"titleTwo": this.product[0].titleTwo,
						"price": parseInt(this.product[0].price),
						"category": this.product[0].category,
						"totalNum": parseInt(this.product[0].totalNum),
						"sale": 0,
						"imgStr": this.imgStr,
						"product_xq": this.product_xq
					}
          console.log(obj);
          postProduct(obj).then(res => {
            this.$store.state.title = '上传商品成功'
						this.minToast = true
            setTimeout(() => {
              this.minToast = false
							this.upProduct = false
            },1000)
					})
				}else {
          alert('请先填写完整商品信息')
				}
			},
			//去管理商品页
      goAdminGoods() {
        this.$router.push('/adminGoods')
			},
			//去订单管理页
      goAdminOrder() {
        this.$router.push('/adminOrder')
      }
		}
  }
</script>

<style scoped lang="less">
	.business-bg {
		overflow: hidden;
		.nav-bg {
			width: 100%;
			height: 1.15rem;
			background-color: #1296db;
			.center{
				color: #fff;
				font-size: 0.6rem;
				height: 0.96rem;
				line-height: 0.96rem;
				/*设置字间距*/
				letter-spacing: 0.08rem;
				padding-top: 0.1rem;
				/*padding-left: 0.5rem;*/
			}
		}

		.business-admin {
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			.admin{
				background-color: #fff;
				box-shadow: 1px 1px 1px 1px #eaeaea;
				/*width: 24%;*/
				/*margin-left: 1%;*/
				img {
					width: 1.8rem;
					height: 1.8rem;
					/*background-color: #fff;*/
					padding-bottom: 0;
				}
				.title {
					/*background-color: #f00;*/
					padding-left: 0.2rem;
					padding-top: 0;
					font-size: 0.35rem;
				}
			}

		}

		/*商品上传从左向右进入*/
		.upProduct {
			width: 100%;
			height: 9.5rem;
			background-color: #f3f3f3;
			border-top: 2px solid #1296db;
			animation: left_in 1s;
			position: relative;
			@keyframes left_in {
				0% {
					left: -100%;
				}
				100% {
					left: 0;
				}
			}

			font-size: 0.5rem;
			.upProduct-title {
				text-align: center;
				color: #fff;
				background-image: linear-gradient(to bottom, #f3f3f3, #9b9b9b);
				/*border-bottom: 2px #9b9b9b solid;*/
			}
			.upProduct-content {
				div {
					margin-top: 0.2rem;
				}
				input{
					height: 0.6rem;
					width: 70%;
				}
				.up-img {
					display: flex;
					/*选择商品*/
					.file {
						position: relative;
						display: inline-block;
						background: #1296db;
						padding: 0.06rem 0.2rem;
						overflow: hidden;
						text-decoration: none;
						text-indent: 0;
						width: 1.4rem;
						border-radius: 1rem;
						box-shadow: 1px 1px #9b9b9b;
						color: #fff;
						font-size: 0.3rem;
						input {
							position: absolute;
							right: 0;
							top: 0;
							opacity: 0;
						}
					}
					.input_disabled {
						position: relative;
						display: inline-block;
						background: #b1b1b1;
						padding: 0.06rem 0.2rem;
						overflow: hidden;
						text-decoration: none;
						text-indent: 0;
						width: 1.4rem;
						border-radius: 1rem;
						box-shadow: 1px 1px #9b9b9b;
						color: #fff;
						font-size: 0.3rem;
					}
					/*预览商品*/
					.img_box {
						width: 100%;
						background-color: #f7f7f7;
						border: 1px #58a7db solid;
						/*margin-left: 0.1rem;*/
						height: 1.2rem;
						display: flex;
						.img_block {
							display: inline-block;
							width: 18%;
							position: relative;
							margin-top: 0.1rem;
							margin-left: 0.1rem;
							img {
								width: 0.85rem;
								height: 0.85rem;
							}
							span {
								color: red;
								font-size: 0.4rem;
								position: absolute;
								top: 0.1rem;
							}
						}
						.img_null {
							font-size: 0.45rem;
							padding:3% 30%;
							color: #b1b1b1;
						}
					}
				}

			}
		}
		.subProduct {
			background-color: #1296db;
			width: 80%;
			padding: 0.1rem 2rem;
			color: white;
			margin-left: 10%;
			margin-top: 0.1rem;
			border-radius:50px;
		}
	}
</style>
