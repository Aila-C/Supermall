<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !== 0">
    <div class="comment-title">
      <div class="title">用户评价</div>
      <div class="comment-more">
        更多<i class="more">>></i>
      </div>
    </div>

    <div class="comment-user-info">
      <!--用户头像-->
      <img :src="commentInfo.user.avatar" alt="">
      <!--用户名字-->
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="comment-text">
      <!--评论-->
      <p>{{commentInfo.content}}</p>
      <div class="comment-goods-info">
        <!--日期-->
        <!--这里设置一个过滤器（filter），但是vue3已经没有过滤器了，官方推荐使用计算属性-->
        <span class="comment-date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <!--卖家秀图片-->
      <div class="comment-info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/common/untils'

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      //将时间戳转换成date对象
      const date = new Date(value * 1000);
      //将date进行格式化
      return formatDate(date, 'yyyy-MM-dd');
    }
  }
}
</script>

<style scoped>

.comment-info {
  padding: 0 8px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.comment-title {
  display: flex;
  justify-content: space-between;
  padding: 10px 4px;
  border-bottom: 2px solid #f2f5f8;

}
.comment-user-info {
  padding: 10px 0;
}
.comment-user-info img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  vertical-align: middle;
  border-radius: 100%;
}

.comment-text p{
  line-height: 20px;
}
.comment-text .comment-goods-info {
  color: #999;
  margin: 4px 0;
}
.comment-goods-info .comment-date {
  margin-right: 20px;
}

.comment-info-imgs img{
  width: 60px;
  height: 60px;
  margin-right: 6px;
}

</style>
