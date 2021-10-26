<template>
<div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
  <div class="info-desc">
    <div class="text-top-style"></div>
    <div class="desc info-text-desc">{{detailInfo.desc}}</div>
    <div class="text-bot-style"></div>
  </div>
  <div class="info-key" v-for="(item, index) in detailInfo.detailImage" :key="index">
    <div class="desc">{{item.key}}</div>
    <div class="info-list" v-for="(item, index) in item.list" :key="index">
      <img :src="item" alt="" class="img" @load="imageLoad">
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    imageLoad(){
      this.$emit('imageLoad')
    }
  }
}
</script>

<style scoped>
.info-desc {
  position: relative;
}
.text-top-style {
  width: 60px;
  height: 1px;
  background-color: #333;
  margin-left: 4px;
}
.text-top-style::before{
   position: absolute;
   left: 4px;
   top: -2.5px;
   display: block;
   content: '';
   width: 5px;
   height: 5px;
   background-color: #333;
 }

.text-bot-style {
  width: 60px;
  height: 1px;
  background-color: #333;
  position: absolute;
  right: 4px;
  bottom: 0;
}
.text-bot-style::after{
   position: absolute;
   right: 0;
   top: -2.5px;
   display: block;
   content: '';
   width: 5px;
   height: 5px;
   background-color: #333;
 }

.info-text-desc {
  padding: 10px 4px;
}


.desc {
  font-size: 14px;
  padding-bottom: 6px;
  line-height: 20px;
  margin: 4px 0;
  text-indent: 10px;
}
.info-list{
  border-bottom: 5px solid #f2f5f8;
}

.info-list img {
  width: 100%;
}
</style>
