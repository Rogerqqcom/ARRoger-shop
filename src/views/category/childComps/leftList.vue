<template>
  <div>
    <scroll  id="left-list" ref="scroll">
      <div class="menu-list">
        <div class="menu-list-item"  @click="AllItem" :class="active1 ? {active : true} : false">全部商品</div>
        <div class="menu-list-item"
             :class="active2 ? {active : index === currentIndex} : false"
             v-for="(item, index) in categoryName"
             :key="index"
             @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/content/scroll/Scroll";
  export default {
    name: "leftList",
    components: {
      Scroll
    },
    props: {
      categoryName: Array
    },
    data() {
      return {
        currentIndex: 0,
        active1: true,
        active2: false
      }
    },
    updated() {
      //刷新重新计算高度
      this.$refs.scroll.refresh()
    },
    methods: {
      //全部商品点击
      AllItem() {
        //发生点击后修改默认选中后的颜色
        this.active1 = true
        this.active2 = false
        this.$emit('AllItem')
      },
      //分类点击
      itemClick(index) {
        this.currentIndex = index
        //发生点击后修改默认选中后的颜色
        if (index === this.currentIndex) {
          this.active1 = false
          this.active2 = true
        }
        //先将当前的类名保存下来
        let itemName = this.categoryName[index]
        // console.log(itemName);
        //再把它传到父组件中
        this.$emit('selectItem', itemName)
      }
    }
  }
</script>

<style scoped>
  #left-list {
    background-color: #f6f6f6;
    height: 100%;
    width: 2rem;
    box-sizing: border-box;
  }
  .menu-list-item {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.3rem;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: #58a7db;
    background-color: #fff;
    border-left: 3px solid #1296db;
  }
</style>
