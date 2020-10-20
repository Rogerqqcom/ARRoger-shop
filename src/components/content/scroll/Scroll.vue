<template>
  <!--ref绑定在子组件上 则通过"this.$refs.refname"获取到的是一个组件对象,
  ref也可以绑定在普通标签元素上面-那么通过this.$refs.refname获取到的是一个元素对象-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      //传入数字2为滚动到手指松开时的距离，传入数字3为松开滚动后带有一定的惯性的距离
      probeType: {
        type: Number,
        default: 0
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      //上拉事件
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      //下拉刷新
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      setTimeout(this.initScroll, 20)
    },
    computed: {
      scrollY() {
        return this.scroll.y
      }
    },
    methods: {
      initScroll(){
        //better-scroll的初始化
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: this.click,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad
        })

        // 2.监听滚动位置
        if (this.probeType === 2 || this.probeType === 3) {
          this.scroll.on('scroll', (position) => {
            this.$emit('scroll', position)
          })
        }
        // this.scroll.refresh()

        // 3.监听上拉事件(scroll滚动到底部)
        if (this.pullUpLoad) {
          this.scroll.on('pullingUp', () => {
            // console.log('上拉加载更多');
            this.$emit('pullingUp')
          })
        }
        // 4.是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchEnd', (pos) => {
            // 下拉动作
            if (pos.y > 50) {
              console.log('下拉刷新');
              this.$emit('pulldown')
            }
          })
        }
      },
      //监听滚动到的具体位置
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      //调用 this.scroll.refresh 方法重新计算内容区域的高度，来确保滚动效果的正常。
      refresh() {
        //使用this.scroll && 先判断是否scroll组件挂载完成，再调用this.scroll.refresh()
        this.scroll && this.scroll.refresh && this.scroll.refresh()
        // console.log('refresh');
        console.log('refresh重新计算内容高度次数');
      },
      finishPullUp() {
        //等数据请求完成，并且将新的数据展示出来后, .finishPullUp()进行下一次的上拉加载
        this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
      },
      // getScrollY() {
      //   return this.scroll ? this.scroll.y : 0
      // }
    },
    watch: {
      // 监听数据的变化，延时20ms后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(this.refresh, 20)
      }
    }
  }
</script>

<style scoped>
  /*在滚动内容区关闭原生滚动*/
  .wrapper {
    overflow: hidden;
  }
</style>
