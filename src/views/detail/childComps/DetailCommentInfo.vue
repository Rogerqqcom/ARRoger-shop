<template>
  <div class="comment-info">
    <div class="info-header">
      <div class="header-title">商品评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div v-if="commentInfo.length !== 0"  >
      <!--用户信息-->
      <div class="info-user">
        <!--      <img :src="commentInfo[0].avatar" alt="">-->
        <img src="~assets/img/detail/avatar.png" alt="">
        <span>{{commentInfo[0].userName}}</span>
      </div>
      <!--评论内容-->
      <div class="info-detail">
        <p>{{commentInfo[0].comment}}</p>
        <div class="info-other">
          <!--commentInfo.created为时间戳-->
          <!--        <span class="date">{{commentInfo.created | showDate}}</span>-->
          <span class="date">{{commentInfo[0].commentTime}}</span>
          <!--        <span>{{commentInfo[0].style}}</span>-->
        </div>
        <!--评论图片-->
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in commentInfo[0].commentImage" :key="index">
        </div>
      </div>
    </div>
    <div v-else class="comment-null">当前无用户评价</div>
  </div>
</template>

<script>
  import {formatDate} from "common/utils";

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Array,
        return() {

        }
      }
    },
    /*
    * 服务器不会返回正常格式的时间
    * 服务器返回的时间是：
    * 以Unix时间元年为起点，返回对应的时间戳
    * 1535694719（时间戳）
    *
    *如何将 时间戳 转成 时间格式化字符串（常用）
    * 时间戳：1535694719（秒）
    * 1.将时间戳转成Date对象
    *   const date = new Date(1535694719 * 1000) //乘以1000转成毫秒
    * 2.将date进行格式化，转成对应的字符串
    *   date.getYear() + date.getMonth()+1 //不常用
    *
    * date -> FormatString //封装： 将date转成格式化字符串（太常用）
    *   fmt.format(date, 'yyyy-MM-dd')  //'yyyy-MM-dd hh:mm:ss'：年-月（大写）-日 时:分（小写）:秒
    *
    * */
    //过滤器
    // filters: {
    //   showDate(value) {
    //     //1.将时间戳转成Date对象
    //     const date = new Date(value * 1000) //乘以1000转成毫秒
    //
    //     // 2.将date进行格式化，转成对应的字符串（很重要）
    //     return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    //
    //   }
    // }
  }
</script>

<style scoped lang="less">
  .comment-info {
    padding: 0.18rem 0.3rem;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
    background-color: #fff;
  }

  .info-header {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid rgba(0,0,0,.1);

    .header-title {
      float: left;
      font-size: 15px;
    }
    .header-more {
      float: right;
      margin-right: 0.05rem;
      font-size: 0.26rem;
    }
  }

  .info-user {
    padding: 10px 0 5px;

    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    span {
      position: relative;
      font-size: 15px;
      top: -15px;
      margin-left: 10px;
    }
  }


  .info-detail {
    padding: 0 5px 15px;

    p {
      font-size: 0.3rem;
      color: #777;
      line-height: 1.5;
    }
    .info-other {
      font-size: 0.28rem;
      margin-top: 0.2rem;
    }
    .date {
      color: #b1b1b1;
    }
  }

  .info-imgs {
    margin-top: 0.2rem;
    img {
      width: 1.28rem;
      height: 1.28rem;
      margin-right: 0.2rem;
    }
  }

  .comment-null {
    font-size: 0.4rem;
    color: #b1b1b1;
    height: 1.3rem;
    line-height: 1.3rem;
    text-align: center;
  }

</style>
