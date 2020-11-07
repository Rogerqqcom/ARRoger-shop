<template>
  <div class="normal-list">
    <div class="item"  v-for="(item, index) in listItem" :key="index">
      <span class="icon">
        <!--动态绑定图标-->
        <img :src="imgUrl(item)" alt="">
      </span>
      <div class="info" @click="jump(index)">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NormalListView",
    props: {
      listItem: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imgUrl(item) {
        // 根据item.icon去导入图标
        return require('assets/img/profile/' + item.icon)
      },
      jump(index) {
        if (index === 4) {
          console.log(index,'go');
          //如果点击下载软件，跳转至指定链接
          location.href = 'http://www.baidu.com'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .normal-list {
    background-color: #e4e4e4;
    margin-top: 0.3rem;
  }
  .item {
    width: 100%;
    height: 1rem;
    background-color: #fff;
    display: flex;
  }
  .item .icon {
    width: 10%;
  }
  .item .icon img{
    width: 0.5rem;
    height: 0.5rem;
    margin-left: 0.3rem;
    margin-top: 0.25rem;

  }
  .item .info {
    width: 90%;
    margin-left: 0.3rem;
    margin-top: 0.3rem;
    border-bottom: 1px solid #eee;
    color: #6e6e6e;
    font-size: 0.3rem;
  }
</style>
