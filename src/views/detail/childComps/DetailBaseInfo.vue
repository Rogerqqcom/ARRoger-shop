<template>
  <!--
  const obj = {
  }
  //如果
  Object.keys(obj).length === 0
  //说明obj里面没有对象
  -->
  <!--  页面显示正常，但还是会报错，
  原因：这个bug的意思是，它找不到索引为 ”title“ 的这一项，
  因为此时页面渲染的速度，快于 异步数据请求的速度，所以就会报错
  解决办法：
  -->
  <div class="base-info" v-if="Object.keys(product).length !== 0">
    <div>
      {{product[0].title}}
    </div>
    <div>{{product[0].titleTwo}}</div>
    <div>
      <span>￥{{product[0].price}}</span>
      <span>库存: &nbsp;{{product[0].totalNum}}</span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBaseInfo",
    props: {
      product: {
		    type: Array,
        default() {
          return []
        }

      }
    },
    updated() {
      console.log('详情数据获取成功', this.product);
    }
  }
</script>

<style scoped lang="less">
  .base-info {
    font-size: 0.3rem;
    background-color: #fff;
    /*border-bottom: 5px solid #f2f5f8;*/
    border-bottom: 1px solid #f2f5f8;

    div:nth-child(1) {
      padding: 0.2rem 0 0.05rem 0.19rem;
      color: black;
    }
    div:nth-child(2) {
      padding: 0 0 0.08rem 0.19rem;
    }
    div:nth-child(3) {
      padding: 0 0 0.08rem 0.19rem;
      span:nth-child(1) {
        margin-left:  0;
        font-size: 0.5rem;
        color: #1296db;
        font-weight: bolder;
      }
      span:nth-child(2) {
        margin-left:  4rem;
        color: #9e9e9e;
      }
    }

  }
</style>
