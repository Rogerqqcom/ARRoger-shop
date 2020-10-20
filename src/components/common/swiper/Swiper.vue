<template>
	<div id="hy-swiper">
		<!--轮播图-->
		<div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
			<slot></slot>
		</div>
		<slot name="indicator">
		</slot>
		<!--轮播图上的小圆点-->
		<div class="indicator">
			<!--如果showIndicator为true和滑动的元素个数大于1-->
			<slot name="indicator"  v-if="showIndicator && slideCount>1">
				<div v-for="(item, index) in slideCount" class="indi-item"
						 :class="{active: index === currentIndex-1}" :key="index"></div>
			</slot>
		</div>
	</div>
</template>

<script>
  export default {
    name: "Swiper",
		props: {
      //定时器速率
			interval: {
			  type: Number,
				default: 3000
			},
			//动画过渡时间
			animDuration: {
			  type: Number,
				default: 300
			},
			//超过轮播图多少 滑动时可以切换
			moveRatio: {
			  type: Number,
				default: 0.25
			},
			//是否显示导航圆点
			showIndicator: {
			  type: Boolean,
				default: true
			}
		},
		data() {
      return {
        slideCount: 0, //元素个数
				totalWidth: 0, //单个轮播图的宽度
				playTimer: 0, //定时器id
				swiperStyle: {}, //swiper的样式
				currentIndex: 1, //当前的index下标
				scrolling: false, //是否正在滚动
        startX: 0,//手指刚接触屏幕的x坐标
				currentX: 0, //手指滑动时的x坐标
				distance: 0 //上面两个的差值 即偏移值
			}
		},

		//dom创建完成后执行
		created() {
			setTimeout(() => {
				// 1.操作DOM, 在前后添加Slide
				this.handleDom();

				// 2.开启定时器
				this.startTimer();
			}, 650)
		},
    methods: {
      /**
       * 操作DOM, 在数组前后添加Slide
       */
      handleDom() {
        // 1.获取要操作的元素
        let swiperEl = document.querySelector('.swiper');
        let slidesEls = swiperEl.getElementsByClassName('slide');

        // 2.保存slide的个数
        this.slideCount = slidesEls.length;

        //3.如果slide的元素大于1个，那么在前后分别添加一个slide
				if(this.slideCount > 1) {
				  //克隆slide元素中的第一个
				  let cloneFirst = slidesEls[0].cloneNode(true);
          //克隆slide元素中的最后一个
          let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
          //把复制到的最后一个元素插入到slide元素中的第一个的前面
          swiperEl.insertBefore(cloneLast, slidesEls[0])
          //把复制到的第一个元素添加到slide元素中的最后一个的后面
					swiperEl.appendChild(cloneFirst)
					//得到一张轮播图的实际宽度
					this.totalWidth = swiperEl.offsetWidth
					// 得到swiper里面的样式
          this.swiperStyle = swiperEl.style;

        }
        // 4.让swiper元素, 显示第一个(目前是显示前面添加的最后一个元素)，即显示第二张图
        this.setTransform(-this.totalWidth);//前面加个-负号代表向左滑动
			},
			/**
			* 设置滚动位置，
			* */
      setTransform(position) {
        //移动轮播图
        this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`; //在x轴方向的位移
        //兼容代码
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
        this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
      },
      /**
       * 定时器操作
       */
      //开始滑动
      startTimer() {
        this.playTimer = window.setInterval(() => {
          //currentIndex 确定第几张轮播图 从1开始 每次移动先自增1
          this.currentIndex++;
          //因为可能会滑动到我们复制的元素上，所以要进行判断并处理，-this.currentIndex * this.totalWidth为向左滚动距离
          this.scrollContent(-this.currentIndex * this.totalWidth);
        }, this.interval)
      },
			//停止滑动
      stopTimer() {
        window.clearInterval(this.playTimer);
      },
      /**
       * 滚动到正确的位置, 滑动方法
       */
      scrollContent(currentPosition) {
        // 1.设置正在滚动  下面自己手动滑动时需要用到
        this.scrolling = true;

        // 2.开始滚动动画, 过渡动画效果
        this.swiperStyle.transition ='transform '+ this.animDuration + 'ms';
        //先让其滑动一次
        this.setTransform(currentPosition);

        // 3.判断滚动到的位置
        this.checkPosition();

        // 4.滚动完成
        this.scrolling = false
      },
      /**
       * 校验正确的位置， 判断当前元素是否为自己增加的元素
       */
      checkPosition() {
        window.setTimeout(() => {
          // 1.校验正确的位置， 取消过渡效果
          this.swiperStyle.transition = '0ms';
          //判断当前下标 currentIndex 是否还在原先数组的范围内，例如原先是4 那么5和0就是复制元素
          if (this.currentIndex >= this.slideCount + 1) {
            //将对应图片的下标修改为1
            this.currentIndex = 1;
            //进行复位至对应真实位置 例如 5---1 0---4
            this.setTransform(-this.currentIndex * this.totalWidth);
          } else if (this.currentIndex <= 0) { //如果下标等于或者小于0
            this.currentIndex = this.slideCount; //将下标修改为4
            this.setTransform(-this.currentIndex * this.totalWidth);
          }
          // 2.结束移动后的回调
          // this.$emit('transitionEnd', this.currentIndex-1);
        }, this.animDuration)
      },
      /**
       * 拖动事件的处理：
			 * 从手指开始接触屏幕开始到实时移动手指
       开始接触需要判断是否在滑动 停止计时器 记录开始坐标
       实时移动时需要实时控制轮播图的移动 计算出偏移量则可以实现精确移动了
       */
      //手指开始接触屏幕
      touchStart(e) {
        // 1.如果正在滚动, 不可以拖动
        if (this.scrolling) return;

        // 2.停止定时器
        this.stopTimer();

        // 3.保存开始滚动的位置
        this.startX = e.touches[0].pageX;
      },
			//手指开始滑动
      touchMove: function (e) {
        // 1.计算出用户拖动的距离, 记录当前手指在屏幕的x坐标
        this.currentX = e.touches[0].pageX;
        // 计算与开始接触屏幕的x坐标
        this.distance = this.currentX - this.startX;
        let currentPosition = -this.currentIndex * this.totalWidth;
        //实时计算滑动距离
        let moveDistance = this.distance + currentPosition;

        // 2.设置当前的位置，实时滑动
        this.setTransform(moveDistance);
      },

			/**
			* 手指离开屏幕
				离开要判断偏移量是否大于自己设置的 大于则进行切换 再通过正负决定切换上一张或者下一张
				若小于设置的偏移量 则归为到当前轮播图 currindex不变就可以了
				为0则是没改变，那就不执行
				执行完需要重新启动定时器
			*
			* */
      touchEnd(e) {
        // 1.获取移动的距离
        let currentMove = Math.abs(this.distance);

        // 2.判断最终的距离
        if (this.distance === 0) {
          return
        } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) { // 向右移动超过0.5
          this.currentIndex--
        } else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio) { // 向左移动超过0.5
          this.currentIndex++
        }
        // 3.移动到正确的位置
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 4.移动完成后重新开启定时器
        this.startTimer();
      },
      /**
       * 附加方法 可添加左右按钮 pc端可以用 移动端一般不用， 控制上一个, 下一个
       */
      previous: function () {
        this.changeItem(-1);
      },

      next: function () {
        this.changeItem(1);
      },

      changeItem: function (num) {
        // 1.移除定时器
        this.stopTimer();

        // 2.修改index和位置
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 3.添加定时器
        this.startTimer();
      }
    }
  }
</script>

<style scoped>
	#hy-swiper {
		overflow: hidden;
		position: relative;
	}

	.swiper {
		display: flex;
	}

	.indicator {
		display: flex;
		justify-content: center;
		position: absolute;
		width: 100%;
		bottom: 0.35rem;
	}

	.indi-item {
		box-sizing: border-box;
		width: 0.2rem;
		height: 0.2rem;
		border-radius: 50%;
		background-color: #fff;
		line-height: 0.2rem;
		text-align: center;
		font-size: 0.25rem;
		margin: 0 0.1rem;
	}

	.indi-item.active {
		background-color: rgba(212,62,46,1.0);
	}
</style>
