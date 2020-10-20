<template>
    <div class="tab-bar-item " @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>
<script>
    export default {
      name: "TabBarItem",
      props: {
        path: String,
        activeColor: {
          type: String,
          default: '#1296db'
        }
      } ,
      data() {
          return {
            // isActve:true
          }
      },
      computed: {
        isActive() {
          //this.$route.path为当前处于活跃的path，而indexOf(this.path)为查找父级传过来path，
          // 返回值为字符所在的索引，总之要是有就返回一个非负数
          return this.$route.path.indexOf(this.path) !== -1  //不等于-1时isActive为true
        },
        activeStyle() {
          //当处于活跃时，动态改变文字颜色
          return this.isActive ? {color: this.activeColor} : {}
        }
      },
      methods:{
        itemClick() {
          //点击整个item组件时，切换到当前路径
          this.$router.replace(this.path).catch(err=>{})
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    width: 100%;
    height: 1.1rem;
    font-size: 0.3rem ;
  }
  .tab-bar-item img {
    width: 0.45rem;
    height: 0.45rem;
    margin-top: 0.1rem;
    /*padding-top: 0.06rem;*/
    vertical-align: middle;
    margin-bottom: 0.08rem;
  }
  /*.active {*/
  /*  color: blue;*/

  /*}*/
</style>
