<template>
	<div class="upProduct" >
		<div class="upProduct-title">编辑商品</div>
		<div class="upProduct-content">
			<div><label for="title">大标题：</label><input type="text" id="title" v-model="product[0].title"></div>
			<div><label for="titleTwo">小标题：</label><input type="text" id="titleTwo" v-model="product[0].titleTwo"></div>
			<div><label for="price">商品价：</label><input type="number" id="price" v-model="product[0].price"></div>
			<div><label for="totalNum">库存量：</label><input type="number" id="totalNum" v-model="product[0].totalNum"></div>
			<div><label for="category">商品类：</label><input type="text" id="category" v-model="product[0].category"></div>
			<div class="up-img">
				<!--上传轮播图片-->
				<div>
					<a class="file gradient" 	v-if="imgStr.length < 3">
						轮播图
						<input
							type="file"
							id="imgStr"
							name="image"
							@change="upImgStr($event)"
							accept="image/jpg, image/jpeg, image/png"
						/>
					</a>
					<span class="input_disabled" v-if="imgStr.length >= 3">轮播图</span>
				</div>
				<!--展示/删除预览图-->
				<div class="img_box" >
					<div class="img_block"  v-for="(item,index) in imgStr" :key="index">
						<img :src="item" alt="">
						<span class="img_delete" @click="deleteImgStr(index)">X</span>
					</div>
					<div class="img_null"  v-if="imgStr.length == 0" >
						请选择图片
					</div>
				</div>
			</div>
			<div class="up-img">
				<!--上传详情图片-->
				<div>
					<a class="file gradient" 	v-if="product_xq.length < 5">
						详情图
						<input
							type="file"
							id="product_xq"
							name="image"
							@change="upProduct_xq($event)"
							accept="image/jpg, image/jpeg, image/png"
						/>
					</a>
					<span class="input_disabled" v-if="product_xq.length >= 5">详情图</span>
				</div>
				<!--展示/删除预览图-->
				<div class="img_box" >
					<div class="img_block"  v-for="(item,index) in product_xq" :key="index">
						<img :src="item" alt="">
						<span class="img_delete" @click="deleteProduct_xq(index)">X</span>
					</div>
					<div class="img_null"  v-if="product_xq.length == 0" >
						请选择图片
					</div>
				</div>
			</div>
		</div>
		<div class="subProduct" @click="subProduct">
			提交商品
		</div>
	</div>
</template>

<script>
  export default {
    name: "EditContent",
		props: {
      product: Array,
			imgStr: Array,
      product_xq: Array
		},
		created() {
      console.log(this.product);
    },
		methods:{
      upImgStr(e) {
        this.$emit('upImgStr',e)
			},
      deleteImgStr(index) {
        this.$emit('deleteImgStr',index)
      },
      subProduct() {
        this.$emit('subProduct')
			},
      upProduct_xq(e) {
        this.$emit('upProduct_xq',e)
			},
      deleteProduct_xq(index) {
        this.$emit('deleteProduct_xq',index)
      }
		}
  }
</script>

<style scoped lang="less">
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
					width: 80%;
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
		margin-top: 0.2rem;
		border-radius:50px;
	}
</style>
