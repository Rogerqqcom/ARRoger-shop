<template>
<!--  <div class="goods-item" @click="itemClick">-->
<!--  <div class="goods-item" v-if="goodsItem.imgStr[0]" @click="itemClick" onload="imageLoad">-->
  <div class="goods-item" v-if="goodsItem.imgStr[0]" @click="itemClick">
    <!--vue中通过@load监听图片是否加载完成,以便在scroll.vue进行refresh()刷新计算可滚动高度 {-->
<!--   支持使用onload事件的标签 <body>, <frame>, <iframe>, <img>, <input type="image">, <link>, <script>, <style>-->
<!--    图片展示-->
<!--    <img :src="goodsItem.imgStr[0]" alt="" @load="imageLoad">-->
    <!--不监听图片加载-->
<!--    <img v-lazy="showImg"  alt="">-->
    <!--监听图片加载-->
    <img v-lazy="showImg"  alt="" @load="imageLoad">
<!--    标题、价格、总量展示-->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥ {{goodsItem.price}}</span>
      <span class="totalNUm">销量{{goodsItem.sale}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImg() {
        //在首页商品数据中获取到每条数据的第一张图片
        return this.goodsItem.imgStr[0]
      }
    },
/*    mounted() {
      //1.等页面所有东西挂载完后，发送一次事件进行refresh重新计算高度，但是计算的滚动内容高度不准确
      window.onload = function () {
        this.imageLoad()
      }
    },*/
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      itemClick() {
        // console.log('跳转到详情页'); //并传递商品id
        this.$router.push('/detail/' + this.goodsItem.id)
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 1rem;
    /*margin: 1rem 0 1rem;*/
    position: relative;
    width: 48%;
  }
  .goods-item img{
    width: 100%;
    height: 4.2rem;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 0.3rem;
    position: absolute;
    bottom: 0.35rem;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    /*超出文本显示..*/
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 0;
  }
  .goods-info .price{
    color: #1296db;
    margin-right: 0.8rem;
  }

  .goods-info .totalNUm {
    position: relative;
  }
  /*销量前面的小图标*/
  .goods-info .totalNUm::before {
    content: '';
    position: absolute;
    top: 0.025rem;
    left: -0.3rem;
    width: 0.3rem;
    height: 0.3rem;
    background: url("~assets/img/common/totalNum.svg") 0 0/14px 14px ;
    /*上面的 0 0/14px 14px ：第一个数字0表示背景颜色；
    第二个0/14px的含义：0 是background-position的属性简写。
    background-position 属性设置背景图像的起始位置。
    14px 是background-size的属性简写。background-size 属性规定背景图像的尺寸。；
    最后14px和前面14px共同构成background-size：（这个14px可省略）
    */
  }

</style>
