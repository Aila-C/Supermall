<template>
  <!--需要 home把商品数据给到 goodsList，才能把商品展示出来-->
  <div class="goods">
    <!--{{goods}}-->
  <!--封装goodsListItem组件，把我们对应的数据进行展示-->
  <!--  自动加载的数据没法用插槽，结构不同采用插槽，只是数据不同，传参数替代就行-->
    <goods-list-item v-for="(item, id) in goods" :key="id" :goods-item="item"/>
  </div>
</template>

<script>
// 需要遍历Item，就要把Item拿过来
import GoodsListItem from '@/components/content/goods/GoodsListItem'

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  //父传子用props ，接收来自父组件home的商品数据
  // 可以是数组或对象，用于接收来自父组件的数据。
  props: {
    goods: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  padding: 2px;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

</style>
