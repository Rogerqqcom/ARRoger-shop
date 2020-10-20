<!--读取展示-->
<template>
	<div class="detail">
		<!--顶部导航-->
		<detail-nav-bar class="detail-nav"/>
		<scroll class="detail_scroll" ref="scroll" :probe-type="3" @scroll="contentScroll">
			<detail-swiper :top-images="topImages"/>
			<!--基本信息-->
			<detail-base-info :product="product"/>
			<div class="detail_xq_title">
				<p>详情信息</p>
			</div>
			<div class="detail_xq_img" v-for="(item, index) in product_xq" :key="index" >
				<img :src="item" alt="" @load="detailImageLoad"/>
			</div>
			<ul>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
				<li>sdkjdsik</li>
			</ul>
		</scroll>
		<back-top @click.native="backTop" v-show="isShowBackTop"/>

		<detail-bottom-bar @addCart="addToCart"/>
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

  import { getProduct} from "network/products";
  import {itemListenerMixin, backTopMixin} from "common/mixin";

  import {mapActions, mapGetters} from 'vuex'
  import {getOneUser, putUser} from "network/user";


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
				cartProduct: {}
      }
    },
		components: {
      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo,
      DetailBottomBar,

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
        // console.log(this.product_xq);
      })

     /* if (localStorage.getItem('token')) {
        //获取当前的登录的用户
        let token = JSON.parse(localStorage.getItem('token'))
        //根据当前登录用户id获取当前的用户信息
        getOneUser(token.id)
        .then(res => {
          // console.log(res.data);
          this.oneUser = res.data
        })
      }*/
    },
    mixins:  [itemListenerMixin, backTopMixin],
    computed: {
      //直接返回一个cartList
      ...mapGetters(['cartList'])
    },
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
      ...mapActions(['addCart']),
      addToCart() {
        if (localStorage.getItem('token')) {
          this.oneUser = JSON.parse(localStorage.getItem('token'))
					getOneUser(this.oneUser.id).then(res => {
            // 1.获取购物车需要展示的信息
            let cartProduct = this.cartProduct
            cartProduct.image = this.topImages[0]
            cartProduct.title = this.product[0].title
            cartProduct.desc = this.product[0].titleTwo
            cartProduct.Subtotal = this.product[0].price
            cartProduct.productId = this.productId;
            cartProduct.checked = true
            cartProduct.num = 1
            if (this.oneUser.cartList.length > 0) {
              cartProduct.id = this.oneUser.cartList[this.oneUser.cartList.length - 1].id + 1
            }else {
              cartProduct.id = 1
						}

            if (res.status === 200) {
              //获取当前登录用户
              this.oneUser = res.data
              // 判断是否存在目前浏览的商品,不相等就添加
              let productId = this.oneUser.cartList.filter(item => item.productId == this.product[0].id)
              if ( productId.length > 0) {
                this.$store.state.title = '购物车已有该商品'
                this.Toast = true
                setTimeout(() => {
                  this.Toast = false
                  // this.$router.push('/cart')
                },1600)

/*
              	this.oneUser.cartList.push(this.product)
                putUser(this.oneUser.id, this.oneUser).then(res => {
                  if (res.status === 200) {
                    // localStorage.setItem('token', JSON.stringify(this.oneUser))
                    console.log('加入成功 !');
                    this.$store.state.title = '1111111加入成功 !'
                    this.Toast = true
                    let _this = this
                    setTimeout(function () {
                      _this.Toast = false
                      _this.$router.push('/cart')
                    }, 1000)
                  }

                })*/
              }else {
                //
                this.oneUser.cartList.push(cartProduct)
                putUser(this.oneUser.id, this.oneUser).then(res => {
                  if (res.status === 200) {
                    localStorage.setItem('token', JSON.stringify(this.oneUser))
                    console.log('加入成功 !');
                    this.$store.state.title = '加入成功 !'
                    this.Toast = true
                    let _this = this
                    setTimeout(function () {
                      _this.Toast = false
                      _this.$router.push('/cart')
                    }, 1000)
                  }

                })
              }
						}
          })

/*          // 1.获取购物车需要展示的信息
          const product = {}
          product.image = this.topImages[0]
          product.title = this.product[0].title
          product.desc = this.product[0].titleTwo
          product.price = this.product[0].price
          product.productId = this.productId;
          product.id

          //2.将商品加到购物车（先将商品保存到vuex中）
          // this.$store.cartList.push(product) //此法不建议，应该通过mutations修改
          // this.$store.commit('addCart', product); //此方法不能很好的跟踪添加方法的变化
          /!*!//a.
					this.$store.dispatch('addCart', product).then(res => {
						console.log(res);
					})*!/
          //b.可以使用mapActions映射到方法里面，
          this.addCart(product).then(res => {
            console.log(res);
            this.$store.state.title = res
            this.Toast = true
            setTimeout(() => {
              this.Toast = false
              // this.$router.push('/cart')
            },1000)
          })

          //3.然后将vuex中的cartList提交到服务器中
					this.oneUser.cartList.push(product)
          putUser(this.oneUser.id, this.oneUser).then(res => {
            if (res.status === 200) {
              localStorage.setItem('token', JSON.stringify(this.oneUser))
              console.log('加入成功 !');
              /!*this.$store.state.title = '加入成功 !'
              this.Toast = true
              let _this = this
              setTimeout(function () {
                _this.Toast = false
                _this.$router.push('/cart')
              }, 1000)*!/
            }

					})*/


				}
			}

    }
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
	}
</style>
