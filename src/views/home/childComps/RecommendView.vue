<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <router-link :to="item.link">
        <img :src="imgUrl(item)" alt="">
        <div>{{item.title}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      imgUrl(item) {
        //根据item.image去文件夹中导入图标
        return require('assets/img/home/' + item.icon)
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 0.25rem;

    padding: 0.05rem 0 0.3rem;
    border-bottom: 0.2rem solid #e6e6e6;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 1.3rem;
    height: 1.3rem;
    margin-bottom: 0.1rem;
    background-color: #e6dbfa;
    border-radius: 50%;
  }
</style>
