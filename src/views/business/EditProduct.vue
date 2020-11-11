<template>
	<div class="EditProduct">
		<div v-if="!isAlert">
			<!--顶部导航-->
			<nav-bar class="nav-bg">
				<div slot="left" class="left" @click="back">
					<img src="~assets/img/navbar/back.png" alt="">
				</div>
				<div class="center" slot="center">
					商家管理
				</div>
			</nav-bar>
			<!--EditContent-->
			<!--上传商品展示栏-->
			<edit-content :product="product"
										:img-str="imgStr" :product_xq="product_xq"
										@upImgStr="upImgStr"
										@deleteImgStr="deleteImgStr"
										@subProduct="subProduct"
										@upProduct_xq="upProduct_xq"
										@deleteProduct_xq="deleteProduct_xq"
			/>
			<div class="deleteProduct" @click="deleteProduct">删除商品</div>
		</div>
		<min-toast v-if="minToast"/>
		<alert-com v-if="isAlert" :title="title" :content="content" :cancelEvent="cancelEvent" :comfirmEvent="confirmEvent"></alert-com>
	</div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import AlertCom from "../../components/common/confirm/AlertCom";

  import EditContent from "./childComps/EditContent";
  import {deleteProduct, getProduct, putProduct} from "../../network/products";
  import MinToast from "../../components/common/toast/minToast";
  import {deleteBusiness} from "../../network/business";
  export default {
    name: "EditProduct",
    data() {
      return {
        minToast: false,
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
        //展示确认框信息
        title:"温馨提示！",
        content:"确认删除此商品吗？",
				isAlert: false
      }
    },
    components: {
      MinToast,
      NavBar,
      EditContent,
      AlertCom
    },
		created() {
      // console.log(this.$route.params.id);
      getProduct(this.$route.params.id).then(res => {
        if (this.$store.state.business) {
        //获取属于当前登录商家的商品
        	this.product = res.data.filter(item => item.shopName == this.$store.state.business.shopName)
          this.imgStr = this.product[0].imgStr
          this.product_xq = this.product[0].product_xq
				}else {
					alert('请先登录')
					this.$router.push('/login')
				}
			})
    },
    methods: {
      back() {
        this.$router.back()
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
          putProduct(this.product[0].id, obj).then(res => {
            this.$store.state.title = '商品修改成功'
            this.minToast = true
            setTimeout(() => {
              this.minToast = false
							this.$router.back()
            },1000)
          })
        }else {
          alert('请先填写完整商品信息')
        }
      },
			/**
			 * 删除商品
			 * */
      deleteProduct() {
        this.isAlert = true
      },
      cancelEvent(){
        this.isAlert = false;
      },
      //确认删除事件
      confirmEvent(){
        if (this.isAlert) {
          deleteProduct(this.product[0].id)
          this.$store.state.title = '删除成功'
          this.minToast = true
          setTimeout(() => {
            this.minToast = false
            this.$router.back()
          },1000)
        }
      }
		}
  }
</script>

<style scoped lang="less">
	.nav-bg {
		width: 100%;
		height: 1.15rem;
		background-color: #1296db;
		.left{
			img {
				width: 0.6rem;
				height: 0.6rem;
				margin-bottom: 0.1em;
				color: #fff;
			}
		}
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
	.deleteProduct {
		background-color: #f00;
		width: 80%;
		padding: 0.1rem 2rem;
		font-size: 0.5rem;
		color: white;
		margin-left: 10%;
		margin-top: 0.1rem;
		border-radius:50px;
	}
</style>
