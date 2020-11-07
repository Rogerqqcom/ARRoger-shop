<template>
  <div id="home">
    <!--顶部导航-->
    <nav-bar class="home-nav">
      <div slot="left" class="left" @click="toSearch">
        <img src="~assets/img/home/search.png" alt="">
      </div>
      <div slot="center" class="center">购物街</div>
      <div slot="right" class="right">
        <img @click="toSetUp" v-if="isLogin" src="~assets/img/home/setUp.png" alt="">
        <span @click="toLogin" v-else>登录</span>
      </div>
    </nav-bar>
    <!--搜索页-->
    <search  v-if="isShow" @cancel="cancel" :goods="goods"></search>
    <scroll v-else
            class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            :pulldown="true"
            @pulldown="pulldown"
    >
      <!--轮播图-->
      <home-swiper :banners="banners"/>
      <!--推荐分类-->
      <recommend-view :recommends="recommends"/>
      <!--商品展示-->
      <good-list :goods="goods"/>
      <!--底线-->
      <p v-if="isLoadMore">~没有更多数据啦~</p>
    </scroll>

    <!--    监听整个组件(加监听原生事件时的修饰符 .native)-->
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <!--刷新提示-->
    <loading-toast class="toast" v-if="toast"/>
  </div>
</template>

<script>
  //公共组件
  import NavBar from "components/common/navbar/NavBar";
  import GoodList from "components/content/goods/GoodList";
  import Scroll from "components/content/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import loadingToast from "components/common/toast/loadingToast";

  //子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import Search from "../../components/content/search/Search";
  import RecommendView from "./childComps/RecommendView";

  //方法或数据
  import {getBanner} from "network/home"
  import {getProduct} from "network/products"
  import {itemListenerMixin} from "common/mixin";
  import BScroll from 'better-scroll'

  export default {
    // inject: ['reload'],
    name: "Home",
    components: {
      NavBar,
      GoodList,
      Scroll,
      BackTop,
      loadingToast,

      HomeSwiper,
      Search,
      RecommendView
    },
    data() {
      return {
        isLogin: false,
        isShow: false,
        banners: [],
        recommends: [
          {
            icon: 'fruit.svg',
            link: '/fruit',
            title: '水果特卖'
          },
          {
            icon: 'clothing.svg',
            link: '/clothes',
            title: '秋装上新'
          },
          {
            icon: 'shoes.svg',
            link: '/shoes',
            title: '精品好鞋'
          },
          {
            icon: 'phone.svg',
            link: '/phone',
            title: '爆款手机'
          }
        ],
        goods: [],
        isShowBackTop: false,
        saveY: 0,
        //上拉展示的数据
        num: 10,
        isLoadMore: false,
        posMoreThen: false,
        oldGoods: [],
        toast: false
      }
    },
    created() {
      //从本地浏览器获取到token信息后，将设置为登录状态
      // console.log(this.$store.state.token);
      if(this.$store.state.token || localStorage.getItem('token')){
        // this.reload()
        // console.log(this.$store.state.token);
        this.isLogin = true
      }
      /*测试vuex存储时的代码
      * if(this.$store.state.token){
          console.log(this.$store.state.token);
          this.isLogin = true
        }
      * */
      //1.请求banner数据
      // getBanner().then(res => {
      //   console.log('banners数据请求成功',res.data.banners);
      //   this.banners = res.data.banners;
      // })
      //2.请求商品数据
      // getProduct().then(res => {
      //   console.log("商品数据获取成功",res.data);
      //   this.goods = res.data
      // })
      //请求首页默认展示数据
      this.getHomeGoods()
    },
/*    mounted() {
      //监听不使用防抖函数的情况下+不监听每张图片加载完的情况下
      this.$bus.$on('contentOnload', this.contentOnload= () => {
        this.$refs.scroll.refresh()
      })
    },*/
    //混入
    mixins: [itemListenerMixin],
    methods: {
      /**
       * 按钮点击
       * */
      toSearch() {
        this.isShow = !this.isShow
        console.log('跳到搜索页');

      },
      toSetUp() {
        this.$router.push('/setUp')
      },
      toLogin() {
        this.$router.push('/login')
      },
      //监听取消事件并隐藏展示
      cancel() {
        this.isShow = false
      },
      /**
       *置顶
       **/
      backTop() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000
      },
      /**
       * 加载更多(此方法只能说是分页展示，还是一次性请求全部数据)
      * */
      // loadMore(){
      //   //当this.isLoadMore为false时即页面未发生下拉刷新时，再触发加载更多
      //  if (!this.isLoadMore) {
      //    getProduct().then(res => {
      //      // 如果num的大小小于或等于data.length， 则让界面每次上拉加载10条数据
      //      if (this.num <= res.data.length) {
      //        // console.log('as',this.num);
      //        //Math.floor(res.data.length / 10) * 10 先让数字变成小数然后向下取整后再乘以10倍
      //        let Snum =   Math.floor(res.data.length / 10) * 10
      //        //如果num的大小等于 商品数据长度向下取整为10的倍数
      //        if (this.num ===  Snum) {
      //          // console.log('最高整10倍数', this.num);
      //          //从商品数据长度向下取整为10的倍的数开始 遍历完商品数据为止，依次添加数据到goods数组中
      //          /*比如： 商品数据长度为23， 则在this.num = 商品数据长度向下取整为10的倍数（即20） 时，
			// 				 让商品的数据遍历完后面剩下的3条数据
			// 				 */
      //          for (let i = this.num; i < res.data.length; i++) {
      //            let old_good = this.goods
      //            //利用concat函数连接新数据与旧数据
      //            this.goods = old_good.concat(res.data[i])
      //          }
      //          console.log('加载完成');
      //          this.isLoadMore = true
      //          //获取完后重新计算内容滚动高度
      //          this.$refs.scroll.refresh()
      //        }
      //        if (this.num <  Snum) {
      //          for (let i = this.num; i < this.num + 10; i++) {
      //            // 先保存旧的商品数据
      //            let old_goods = this.goods
      //            //利用concat函数连接新数据与旧数据
      //            this.goods = old_goods.concat(res.data[i])
      //          }
      //          console.log('上拉加载10条数据');
      //          //获取完后重新计算内容滚动高度
      //          this.$refs.scroll.refresh()
      //          //等数据请求完成，并且将新的数据展示出来后, .finishPullUp()进行下一次的上拉加载
      //          this.$refs.scroll.finishPullUp()
      //        }
      //        //每上拉依次，让num每次增加10
      //        this.num += 10
      //      }
      //      //等数据请求完成，并且将新的数据展示出来后, .finishPullUp()进行下一次的上拉加载
      //      this.$refs.scroll.finishPullUp()
      //
      //    })
      //  }
      // },
      /**
       * 数据请求
       * */
      getHomeGoods() {
        //1.请求banner数据
        getBanner().then(res => {
          console.log('banners数据请求成功',res.data.banners);
          this.banners = res.data.banners;
        })
        //2.请求商品数据
        getProduct().then(res => {
          console.log(res.data.length);
          // if (this.num <= res.data.length) {
          //   for (let i=0; i<10; i++) {
          //     this.goods.push(res.data[i])
          //   }
          //   //等数据请求完成，并且将新的数据展示出来后, .finishPullUp()进行下一次的上拉加载
          //   this.$refs.scroll.finishPullUp()
          // }else {
            //当数据总数为个位数时的请求
            this.goods.push(...res.data)
            this.isLoadMore = true
          // }
          console.log("商品数据请求成功:",this.goods);
        })
      },
      pulldown() {
        /**
         * 下拉刷新一次性请求全部数据
         * */
        //1.请求banner数据
        getBanner().then(res => {
          console.log('banners数据请求成功',res.data.banners);
          this.banners = res.data.banners;
        })
        //2.请求商品数据
        getProduct().then(res => {
          console.log(res.data.length);
         //重新请求页面数据，先把之前的数据清空，再请求
          this.goods = []
          this.goods = this.goods.concat(...res.data)
          console.log("商品数据请求成功:",this.goods);
          this.isLoadMore = true

        })
        this.$refs.scroll.refresh()
        this.$store.state.title = '刷新中~'
        this.toast = true
        setTimeout(() => {
          this.toast = false
        }, 500)
      }
    },
    destroyed() {
      console.log('home destrory');
    },
    //如果想刷新部分内容要启用activated函数，用法同created，activated只有在被keep-alive包裹时会触发，activated函数一进入页面就触发
    activated() {
      //默认进来时请求10条商品数据
      // getProduct().then(res => {
      //   console.log(res.data.length);
      //   // if (this.num <= res.data.length) {
      //     for (let i=0; i<10; i++) {
      //       //重新请求页面数据，先把之前的数据清空，再请求
      //       this.goods = []
      //       this.goods.push(res.data[i])
      //       // this.goods.push(res.data[i])
      //     }
      //     //等数据请求完成，并且将新的数据展示出来后, .finishPullUp()进行下一次的上拉加载
      //     // this.$refs.scroll.finishPullUp()
      //   // }else {
      //     //当数据总数为个位数时的请求
      //     // this.goods.push(...res.data)
      //     // this.isLoadMore = true
      //   // }
      //   console.log("1111商品数据请求成功:",this.goods);
      // })
      // console.log('activated');
      //当搜索框不显示时
      if (this.isShow != true) {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        this.$refs.scroll.refresh()
      }
     if (this.$store.state.token) {
       this.isLogin =true
     }
    },
    //离开时保存位置信息
    deactivated() {
      //1.保存Y值
      if (this.isShow != true) {
        this.saveY = this.$refs.scroll.scrollY

      }

      //2. 离开当前组件时要 取消 混入的事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped lang="less">
  #home {
    background-color: #fff;
    .toast {
      position: absolute;
      top: 5rem;
      left: 50%;
    }
  }
  .home-nav{
    background-color: #58a7db;
    height: 1.05rem;
    .left{
      /*background-color: #f00;*/
      img {
        width: 0.5rem;
        height: 0.5rem;
        /*line-height: 0.1rem;*/
        margin-bottom: 0.16rem;

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

  .content {
    /*//设置滚动区域的固定高度*/
    overflow: hidden;
    position: absolute;
    top:1.05rem;
    bottom: 1.1rem;
    left: 0;
    right: 0;

    p {
      text-align: center;
      color: #1296db;
      /*width: 100%;*/
      /*height: 1rem;*/
      /*background-color: #f00;*/
      position: absolute;
      left: 35% ;

      /*border-top: 1px solid #1296db;*/
      /*margin-top: 0;*/
      /*position: absolute;*/
      /*!*float: bottom;*!*/
      /*left: 35% ;*/
    }
  }




</style>
