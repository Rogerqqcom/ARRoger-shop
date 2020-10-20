<!--读取展示-->
<template>
	<div>
		<input type='file' class="uploadphoto" @change="uploadphoto($event)" ref="inputer"
					 multiple accept="image/png,image/jpeg,image/gif,image/jpg">
				<div v-for="(item, index) in imgUrl"  :key="index">
					<img :src="item.imgStr[0]" alt="" style="width: 200px;height: 180px;">
				</div>
		<!--<div v-for="(item, index) in imgUrl"  :key="index">
			<div v-for="(img, index) in item.imgStr" :key="index">
				<img :src="img" alt="">
			</div>
		</div>-->
	</div>
</template>

<script>
  import {postProduct, getProduct} from "network/products";
  export default {
    name: "Cart",
    data() {
      return {
        imgUrl: []
      }
    },
    created() {
      getProduct().then(res => {
        // console.log(res);
        this.imgUrl = res.data
        console.log(this.imgUrl);
      })
    }

  }
</script>

<style scoped>

</style>
