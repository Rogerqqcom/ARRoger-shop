<template>
	<swiper>
		<swiper-item v-for="item in banners">
			<a :href="item.link">
				<img :src="item.image_src" alt="图片未找到" >
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper, SwiperItem} from 'components/common/swiper/index'

  export default {
    name: "HomeSwiper",
		components: {
      Swiper,
			SwiperItem
		},
		props: {
      banners: {
        type: Array,
				dafault() {
          return []
				}
			}
		}
  }
</script>

<style scoped>
	img{
		height: 4rem;
	}
</style>
