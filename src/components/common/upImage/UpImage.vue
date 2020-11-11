<!--图片与Base64编码字符串 上传、预览-->
<template>
	<div>
		<input
			type="file"
			id="file"
			name="image"
			@change="shangc($event)"
			accept="image/jpg, image/jpeg, image/png"
			v-if="allowAddImg"
		/>
		<br/>
<!--		这里写转入的图片-->
		<!--展示/删除预览图-->
		<div class="img_box" v-for="(item,index) in picPath" :key="index">
			<div class="img_show_box">
				<img :src="item" alt="">
				<span class="img_delete" @click="deleteImg(index)">X</span>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        allowAddImg: true,
        picPath: []
      };
    },
    methods: {
      shangc(e) {
        let files = document.getElementById("file").files[0];
        // console.log(files);
        //转码base64
        let reader = new FileReader();
        let imgFile;
        reader.readAsDataURL(files);
        reader.onload =  e => {
          //这里的imgFile为'data:image/png;base64,'+ base64编码字符串拼接形成的图片
          imgFile = e.target.result;
          // console.log( imgFile);

				 //这里的 picPath 'data:image/png;base64,'+ base64为编码字符串拼接形成图片的
				  this.picPath.push(imgFile)
          console.log(this.picPath);
          if (this.picPath.length >= 5) {
            this.allowAddImg = false;
          }
        }
      },
      deleteImg: function(index){
        this.picPath.splice(index,1);
        console.log(this.picPath);

        if(this.picPath.length<5){
          this.allowAddImg = true;
        }
      },
    }
  };
</script>

<style  scoped>
	img{
		width: 40px;
		height: 40px;
		border: 1px solid red;
	}
</style>
