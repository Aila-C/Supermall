<template>
<div class="bottom-bar">
  <div class="bar-item bar-left">
    <div>
      <i class="icon service"></i>
      <span class="text">客服</span>
    </div>
    <div>
      <i class="icon shop"></i>
      <span class="text">商铺</span>
    </div>
    <div>
      <i class="icon select"></i>
      <span class="text">收藏</span>
    </div>
  </div>
  <div class="bar-item bar-right">
    <div class="cart" @click="addToCart">加入购物车</div>
    <div class="buy">购买</div>
  </div>
</div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart(){
      console.log('点击了添加到购物车')
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  position: relative;
  /*bottom: 49px;*/
  height: 54px;
  display: flex;
  text-align: center;
  background: #fff;
}
.bar-item{
  display: flex;
  flex: 1
}
.bar-item > div{
  flex: 1
}
.bar-left .text{
  font-size: 13px
}
.bar-left .icon{
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url('../../../assets/images/detail/detail_bottom.png') 0 0/100%;
}
.bar-left .service{
  background-position: 0 -54px;
}
.bar-left .shop{
  background-position: 0 -98px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 54px;
}
.bar-right .cart{
  background-color: #ffe817;
  color: #333
}

.bar-right .buy{
  background-color: #f69
}

</style>
