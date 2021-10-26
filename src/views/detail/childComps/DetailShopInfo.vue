<template>
<div class="shop-info">
  <div class="shop-top">
    <!--商品 logo 和名称-->
    <img :src="shop.logo">
    <span class="shop-name">{{shop.name}}</span>
  </div>

  <div class="shop-middle">
    <div class="shop-middle-item shop-middle-left">
      <div class="info-sells">
        <div class="sells-count">{{shop.sells|saveNum}}</div>
        <div class="sells-text">总销量</div>
      </div>
      <div class="info-goods">
        <div class="goods-count">{{shop.goodsCount}}</div>
        <div class="goods-text">全部宝贝</div>
      </div>
    </div>
    <div class="shop-middle-item shop-middle-right">
      <table>
        <tr v-for="(item, index) in shop.score" :key="index">
          <td>{{item.name}}</td>
          <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
          <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
        </tr>
      </table>
    </div>
  </div>

  <div class="shop-bottom">
    <div class="enter-shop">进店逛逛</div>
  </div>
</div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props:{
    shop:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  filters: {
    saveNum(value){
      if(value < 10000) return value;
      return (value/10000).toFixed(1)+'万'
    }
  }
}
</script>

<style scoped>

.shop-top {
  align-items: center;
  margin: 20px 10px;
}
.shop-top img{
  border-radius: 100%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  vertical-align: middle;
}

.shop-middle {
  display: flex;
  justify-content: space-around;
}
.shop-middle-item {

  font-size: 12px;
  line-height: 22px;
}
.shop-middle-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info-sells{
  padding-left: 20px;
}

.info-sells .sells-count{
  text-align: center;
  font-size: 16px;
}

.info-goods {
  border-right: 1px solid #ececec;
  padding: 0 20px;
}

.info-goods .goods-count {
  font-size: 16px;
  text-align: center;
}

.shop-middle-right {
  padding: 0 20px
}

.score {
  display: inline-block;
  width: 30px;
  color: #32CD32;
}
.better {
  background-color: #32CD32;
  color: #fff;
  padding: 0 3px;
  font-size: 12px;
}

.shop-bottom {
  text-align: center;
}

.enter-shop {
  display: inline-block;
  background-color: #f2f2f2;
  font-size: 12px;
  padding: 6px 30px;
  border-radius: 100px;
  margin: 10px;
}

.score-better {
  color: #FF0000;
}

.better-more{
  background-color: #FF0000;
}

</style>
