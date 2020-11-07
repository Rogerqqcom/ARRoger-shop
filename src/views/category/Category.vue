<template>
  <div class="category">
    <!--    //顶部导航-->
    <nav-bar class="nav">
      <div slot="left" class="left" @click="toSearch">
        <img src="~assets/img/home/search.png" alt="">
      </div>
      <div slot="center" class="center">商品分类</div>
      <div slot="right" class="right">
        <img @click="toSetUp" v-if="isLogin"  src="~assets/img/home/setUp.png" alt="">
        <span @click="toLogin" v-else>登录</span>
      </div>
    </nav-bar>
    <!--搜索页-->
    <search v-if="isShow" @cancel="cancel" :goods="categories"></search>

    <div class="content" v-else>
      <!--侧边导航栏-->
      <left-list :categoryName="categoryName" @selectItem="selectItem" @AllItem="AllItem"/>
      <!--右侧内容-->
       <category-content :product="product" @goDetail="goDetail"/>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import GoodList from "../../components/content/goods/GoodList";
  import CategoryContent from "./childComps/CategoryContent";
  import Search from "../../components/content/search/Search";

  import leftList from "./childComps/leftList";

  import {getProduct} from "network/products";

  export default {
    name: "Category",
    data(){
      return{
        isLogin: false,
        //所有商品数据
        categories: [],
        //分类名称
        categoryName: [],
        currentIndex: -1,
        //右边展示的商品
        product: [],
        //显示搜索页
        isShow: false
      }
    },
    components: {
      NavBar,
      leftList,
      GoodList,
      CategoryContent,
      Search
    },
    created() {
      if(this.$store.state.token || localStorage.getItem('token')){
        this.isLogin = true
      }
    //  获取商品数据
      getProduct().then(res => {
        //this.categories为分类的所有数据
        this.categories = res.data
        //this.product为右边默认需要展示的全部商品的数据
        this.product = res.data
        // console.log(this.categories.length);
        for (let i=0; i<this.categories.length; i++) {
          // console.log(this.categories[i].category);
          //将所有商品的分类名称放到一个数组中
          this.categoryName.push(this.categories[i].category)
        }
        //this.categoryName此时数组里面出现了__ob__: Observer,拿不到里面的数据
        //里面的值,它是不可枚举的,这时候我们需要用JSON.parse(JSON.stringify(该数组))重新生成一个可枚举数组.
        this.categoryName =  JSON.parse(JSON.stringify([this.categoryName]))
        // console.log(this.categoryName[0]);
        //将可枚举的数组去重后，重新赋值给this.categoryName
        this.categoryName = Array.from(new Set(this.categoryName[0])) //ES6数组去重写法
        console.log(this.categoryName);
      })

    },
    // mixins: [backTopMixin],
    methods:{
      toSetUp() {
        this.$router.push('/setUp')
      },
      toLogin() {
        this.$router.push('/login')
      },
      AllItem() {
        console.log('全部商品点击');
        this.product = this.categories
      },
      selectItem(itemName) {
        console.log('分类点击');
        this.product = this.categories.filter(item => item.category == itemName)
        // for (let i in this.categories) {
        //   if (this.categories[i].category == itemName) {
        //     this.product.push(this.categories[i])
        //   }
        // }
        console.log(this.product[0]);
      },
      goDetail(index) {
        console.log('godetail');
        this.$router.push('/detail/' + this.product[index].id)
      },
      toSearch() {
        this.isShow = !this.isShow
        console.log('显示搜索页');
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
      //监听取消事件并隐藏展示
      cancel() {
        this.isShow = false
      }
    },
    //如果想刷新部分内容要启用activated函数，用法同created，activated只有在被keep-alive包裹时会触发，activated函数一进入页面就触发
    activated() {
      console.log("profile-activated");
      if (this.$store.state.token) {
        this.isLogin = true
      }
    }

  }

</script>

<style scoped lang="less">
  .category {
    height: 100vh;
    overflow: hidden;
  }
  /*顶部*/
  .nav {
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

  /*内容*/
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 1.05rem;
    bottom: 1rem;
    /*在滚动内容区关闭原生滚动*/
    overflow: hidden;
    display: flex;


    /*!*控制滚动内容高度*!*/
    /*#tab-content {*/
    /*  !*!/设置滚动区域的固定高度*!*/
    /*  overflow: hidden;*/
    /*  position: absolute;*/
    /*  top:0;*/
    /*  bottom: 0;*/
    /*  left: 2rem;*/
    /*  right: 0;*/
    /*  !*height: calc(100vh - 93 - 40);*!*/
    /*  !*height: 100%;*!*/
    /*  !*width: 100%;*!*/
    /*  flex: 1;*/
    /*  !*overflow: hidden;*!*/
    /*}*/
    /*.aaaaaaaaaa{*/
    /*  width: 6rem;*/
    /*}*/
  }

</style>

