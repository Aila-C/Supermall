<template>
<!--  如何判断obj是一个空对象？
Object.keys(xxx).length是否为空
-->
<!--Object.keys()一个表示给定对象的所有可枚举属性的字符串数组-->
<!--(1)处理对象，返回可枚举的属性数组
    let person = {name:"张三",age:25,address:"深圳",getName:function(){}}
    Object.keys(person) // ["name", "age", "address","getName"]
    (2)处理数组，返回索引值数组
    let arr = [1,2,3,4,5,6]
    Object.keys(arr) // ["0", "1", "2", "3", "4", "5"]
    (3)处理字符串，返回索引值数组
    let str = "saasd字符串"
    Object.keys(str) // ["0", "1", "2", "3", "4", "5", "6", "7"]
-->
<div class="base-info" v-if="Object.keys(goods).length !== 0">
  <!--商品名称-->
  <div class="info-title">{{goods.title}}</div>
  <div class="info-price">
    <!--最新价格-->
    <span class="n-price">{{goods.newPrice}}</span>
    <!--旧的价格-->
    <span class="o-price">{{goods.oldPrice}}</span>
    <!--商品折扣-->
    <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
  </div>

  <div class="other-info">
    <span>{{goods.columns[0]}}</span>
    <span>{{goods.columns[1]}}</span>
    <span>{{goods.services[goods.services.length-1].name}}</span>
  </div>
  <div class="services-info">
    <!--v-for用在遍历数字的时候，是从1开始的-->
    <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
      <img :src="goods.services[index-1].icon">
      <span>{{goods.services[index-1].name}}</span>
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.info-title {
  margin: 10px 0;
  padding: 0 4px;
  font-size: 14px;
  line-height: 20px;
}
.info-price {
  display: flex;
  padding: 0 4px 10px;
}
.info-price .n-price {
  color: var(--color-high-text)
}
.info-price .o-price {
  color: #999;
  font-size: 12px;
  margin: 0 4px;
  text-decoration: line-through;
}
.discount {
  color: #fff;
  font-size: 12px;
  border-radius: 100px;
  padding: 2px 6px;
  background-color: var(--color-high-text);
}

.other-info {
  display: flex;
  color: #999;
  font-size: 12px;
  padding: 10px 5px;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
  border-top: 1px solid #ededed;

}

.services-info {
  display: flex;
  font-size: 12px;
  color: #333;
  padding: 10px 5px;
  justify-content: space-between;
  border-bottom: 4px solid #ededed;
}

.services-info img {
  width: 12px;
  height: 12px;
  vertical-align: middle;
}
</style>
