<!--读取展示-->
<template>
	<div class="detail">
		<!--顶部导航-->
		<detail-nav-bar class="detail-nav"/>
		<scroll class="detail_scroll" ref="scroll" :probe-type="3" @scroll="contentScroll">
			<detail-swiper :top-images="topImages"/>
			<!--基本信息-->
			<detail-base-info :product="product"/>
			<!--评论-->
			<detail-comment-info ref="comment" :comment-info="commentInfo"/>
			<!--店铺-->
			<div class="info-header">
				<div class="header-title">店铺：{{shopName}}</div>
				<div class="header-more">
					进店逛逛
				</div>
			</div>
			<!--详情图片-->
			<div class="detail_xq_title">
				<p>详情信息</p>
			</div>
			<div class="detail_xq_img" v-for="(item, index) in product_xq" :key="index" >
				<img :src="item" alt="" @load="detailImageLoad"/>
			</div>
		</scroll>
		<back-top @click.native="backTop" v-show="isShowBackTop"/>

		<detail-bottom-bar :phone="phone" @addCart="addToCart" @goBuy="goBuy"/>
		<min-toast v-if="Toast"/>

	</div>
</template>

<script>
	import Scroll from "components/content/scroll/Scroll";
	import minToast from "components/common/toast/minToast";

	import DetailNavBar from "./childComps/DetailNavBar";
	import DetailSwiper from "./childComps/DetailSwiper";
	import DetailBaseInfo from "./childComps/DetailBaseInfo";
	import DetailBottomBar from "./childComps/DetailBottomBar";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import { getProduct} from "network/products";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import {mapActions, mapGetters} from 'vuex'
  import {getOneUser, putUser} from "network/user";
  import {getCartList, postCartList, putCartList} from "../../network/cartList";


  export default {
    name: "Cart",
    data() {
      return {
        imgUrl: [],
        productId: null,
				product: [],
				topImages: [],
				product_xq: [],
        Toast: false,
        token: {},
        oneUser: {},
				cartProduct: {},
        commentInfo: [],
        shopName: '',
				phone: ''
      }
    },
		components: {
      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo,
      DetailBottomBar,
      DetailCommentInfo,

      Scroll,
      minToast
		},
    created() {

      //1.获取处于活跃状态的id, 并保存
      // console.log(this.$route.params);
      this.productId = this.$route.params.id
      console.log(this.productId);

      //2.根据productId请求的详情数据
      getProduct(this.productId).then(res => {
        //获取到该条商品的数据
        this.product = res.data
        // console.log(this.product);
        //从中获取轮播图片
        this.topImages = this.product[0].imgStr
				//获取详情图片
        this.product_xq = this.product[0].product_xq
				//获取店铺名
				this.shopName = this.product[0].shopName
        //获取评论信息
				if (this.product[0].comments) {
          this.commentInfo = this.product[0].comments
				}
				//获取商家电话
				this.phone = this.product[0].phone
      })
			//3.获取购物车数据
			getCartList().then(res => {
			  this.cartProduct = res.data
        console.log(this.cartProduct);
      })

			//4.获取当前登录用户
      if (this.$store.state.token) {
        // let token = JSON.parse(localStorage.getItem('token'))
        let token = this.$store.state.token || JSON.parse(localStorage.getItem('token'))
        getOneUser(token.id).then(res => {
          this.oneUser = res.data
        })
			}


    },
    mixins:  [itemListenerMixin, backTopMixin],
    // computed: {
    //   //直接返回一个cartList
    //   ...mapGetters(['cartList'])
    // },
    methods: {
      detailImageLoad() {
        // this.$refs.scroll.refresh()
				this.$bus.$emit('itemImageLoad')
      },
      contentScroll(position) {
        //判断BackTop是否显示,
        // this.isShowBackTop = (-position.y) > BACk_POSITION
        //可以写在混入里面，再调用
        this.listenShowBackTop(position)
			},
			// 将 `this.addCart()` 映射为 `this.$store.dispatch('addCart')`
      // ...mapActions(['addCart']),
			//添加到购物车
      addToCart() {
        if(this.$store.state.token || localStorage.getItem('token')){
            // 1.获取购物车需要展示的信息
            var cartProduct = {}
            cartProduct.image = this.topImages[0]
            cartProduct.title = this.product[0].title
            cartProduct.desc = this.product[0].titleTwo
            cartProduct.Subtotal = this.product[0].price
            cartProduct.price = this.product[0].price
            cartProduct.productId = this.productId;
            cartProduct.shopName = this.product[0].shopName
            cartProduct.phone = this.product[0].phone
            cartProduct.businessAddress = this.product[0].businessAddress
            cartProduct.checked = true
            cartProduct.count = 1
            cartProduct.userId = this.oneUser.id
            // cartProduct.id = this.cartProduct.length > 0 ?  this.oneUser.cartList.length + 1 : cartProduct.id = 1
            // if (this.oneUser.cartList.length > 0) {
            //   // cartProduct.id = this.oneUser.cartList[this.oneUser.cartList.length - 1].id + 1
            //   cartProduct.id = this.oneUser.cartList.length + 1
            // }else {
            //   cartProduct.id = 1
						// }
            // if (res.status === 200) {
              //获取当前登录用户
              // this.oneUser = res.data
							//先在检索cartList中是否存在目前浏览的商品,相等就让商品数量+1，不相等就添加
              let productId = this.cartProduct.filter(item => item.productId == this.product[0].id && item.userId == this.oneUser.id)
              console.log(productId);
              if (productId.length > 0) {
								//让该商品的数量+1
                productId[0].count += 1
                productId[0].Subtotal = this.product[0].price * productId[0].count
                productId[0].checked = true
                // 同步数据到服务器
                putCartList(productId[0].id, productId[0]).then(res => {
                  if (res.status === 200) {
                    // localStorage.setItem('token', JSON.stringify(this.oneUser))
                    console.log('当前商品数量+1 !');
                    this.$store.state.title = '当前商品数量+1'
                    this.Toast = true
                    let _this = this
                    setTimeout(function () {
                      _this.Toast = false
                    }, 1000)
                  }

                })
              }else {
                //如果检索到购物车列表没有该商品，则添加进去
								postCartList(cartProduct).then(res => {
									if (res.status === 201) {
										// localStorage.setItem('token', JSON.stringify(this.oneUser))
										console.log('添加了新的商品 !');
										this.$store.state.title = '添加了新的商品 !'
										this.Toast = true
										let _this = this
										setTimeout(function () {
											_this.Toast = false
										}, 1000)
									}
								})
              }
						// }
          // })
				}else {
          alert('请先登录')
          this.$router.push('/login')
				}
			},
			goBuy() {
        if(this.$store.state.token || localStorage.getItem('token')){
          // 1.获取当前结算商品需要展示的信息
          let payProduct = {}
          payProduct.image = this.topImages[0]
          payProduct.title = this.product[0].title
          payProduct.desc = this.product[0].titleTwo
          payProduct.Subtotal = this.product[0].price
          payProduct.price = this.product[0].price
          payProduct.productId = this.productId;
          payProduct.shopName = this.product[0].shopName
          payProduct.phone = this.product[0].phone
          payProduct.businessAddress = this.product[0].businessAddress
          payProduct.checked = true
          payProduct.count = 1
          payProduct.id = 1


          let checkedItem = {
            arr: []
          }
          checkedItem.arr.push(payProduct)
          //实付款价格
          checkedItem.sum = this.product[0].price
          checkedItem.flag = 1
          // console.log(checkedItem);
          this.$store.state.commodity = checkedItem
          this.$router.push('/settlement')
				}else {
          alert('请先登录')
					this.$router.push('/login')
				}
			}
    },
		// destroyed() {
    //   console.log('xiaohui');
    // }

  }
</script>

<style scoped lang="less">
	.detail {
		width: 100%;
		img {
			width: 100vw;
		}
		.detail_xq_title {
			border-bottom: 0.1rem solid #dcdfe2;
			p {
				padding: 0.2rem 40%;
				font-weight: bold;
				letter-spacing: 0.05rem;
			}
		}
		.detail_xq_img {
			img {
				width: 100%;
				/*height: 7.5rem;*/
			}
		}
		.detail-nav {
			position: relative;
			z-index: 9;
			background-color: #58a7db;
			height: 1rem;
			line-height: 1rem;
		}
		.detail_scroll {
			//设置滚动区域高度
			overflow: hidden;
			position: absolute;
			top:1rem;
			bottom: 1rem;
			left: 0;
			right: 0;
		}
		.info-header {
			height: 1rem;
			line-height: 1rem;
			background-color: #fff;
			border-bottom: 1px solid rgba(0,0,0,.1);
			overflow: hidden;

			.header-title {
				float: left;
				font-size: 0.45rem;
				margin-left: 0.3rem;
				color: black;
			}
			.header-more {
				float: right;
				border-radius: 10px;
				width: 1.5rem;
				height: 0.6rem;
				margin-right: 0;
				font-size: 0.26rem;
				font-style: italic;
			}
		}
	}
</style>
