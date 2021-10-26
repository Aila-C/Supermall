<template>
  <div class="shop-item">
    <div class="item-selector">
      <check-button :is-checked="product.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>

      <div class="info-bottom">
        <div class="item-price left">{{product.price}}</div>
        <div class="item-count right">×{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
  name: "CartListItem",
  components:{
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    checkClick(){
      this.product.checked = !this.product.checked
    }
  }
}
</script>

<style scoped>
.shop-item{
  display: flex;
  padding: 5px;
  width: 100%;
  font-size: 0;
  border-bottom: 1px solid #ccc
}
.item-selector{
  display : flex;
  width: 20px;
  justify-content: center;
  align-items: center;
}
.item-title, .item-desc{
  over-flow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img{
  padding: 5px
 }
.item-img img{
  display: block;
  width: 88px;
  height: 100px;
  border-radius: 5px;
}
.item-info{
  position: relative;
  overflow: hidden;
  padding: 5px 10px;
  font-size: 17px;
  color: #333;
}
.item-info .item-desc{
  margin-top: 15px;
  font-size: 14px;
  color: #666;
}
.info-bottom{
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  margin-top: 10px;
}
.info-bottom .item-price{
  color: orange;
}
</style>
