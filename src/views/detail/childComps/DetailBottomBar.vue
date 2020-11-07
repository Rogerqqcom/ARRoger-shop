<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
<!--        <span class="text">客服</span>-->
        <a class="text" href="tel:18200892850">客服</a>

      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="goCart">
        <i class="icon cart"></i>
        <span class="text">进购</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="goBuy">立即购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addCart')
      },
      goCart() {
        // this.$emit('addCart')
        // setTimeout(() => {
          this.$router.push('/cart')
        // },500)
      },
      goBuy() {
        this.$emit('goBuy')

      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    background-color: #fff;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    text-align: center;
  }

  .bar-item {
    flex: 1;
    display: flex;
  }

  .bar-item>div {
    flex: 1;
  }

  .bar-left .text {
    font-size: 0.2rem;
    position: absolute;
    bottom: 0;
    margin: 0 0.2rem 0.05rem -0.2rem;
  }

  .bar-left .icon {
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    /*margin: 10px auto 3px;*/
    margin: 0.1rem auto 0.3rem;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    /*background-position:0 -1.7rem;*/
    background-position:0  -11.8rem;
  }

  .bar-left .shop {
    background-position:0 -15.45rem;
  }
  .bar-left .cart {
    background-position:0 0.05rem;
  }

  .bar-right {
    font-size: 0.3rem;
    color: #fff;
    line-height: 1rem;
  }

  .bar-right .cart {
    background-color: #ff8198;
    color: #ffffff;
  }

  .bar-right .buy {
    background-color: #1296db;
  }

</style>
