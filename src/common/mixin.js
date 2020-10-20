import {debounce} from "./utils";

import BackTop from 'components/content/backTop/BackTop'


//图片加载的监听，可以用到任意组件中
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
/*
    //1.没有使用防抖函数的情况下+不监听每张图片加载完的情况下
    this.$bus.$on('itemImageLoad', this.itemImgListener = () => {
      this.$refs.scroll.refresh()
    })
*/


    //2.将refresh函数传入到debounce函数中, 生成一个新的函数.
    // 之后在调用非常频繁的时候, 就使用新生成的函数.
    this.refresh = debounce(this.$refs.scroll.refresh, 100)
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh()
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)

  }
}
//返回顶部
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
