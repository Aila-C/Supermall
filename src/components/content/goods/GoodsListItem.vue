<template>
  <div class="goods-item">
    <!--<img :src="showImage" alt="" @click="itemClick">-->
    <!--图片懒加载-->
    <img v-lazy="showImage" alt="" @click="itemClick">
    <div class="goods-info">
      <p >{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    //接收来自父组件GoodsList的goodsItem数据
    goodsItem: {
      type: Object,
      default() {
        return []
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    itemClick() {
      /**route和router的区别
       * this.$router是VueRouter的实例方法，
       * 当导航到不同url，可以使用this.$router.push方法，这个方法则会向history里面添加一条记录，
       * 当点击浏览器回退按钮或者this.$router.back()就会回退之前的url。
       * this.$route相当于当前激活的路由对象，包含当前url解析得到的数据，可以从对象里获取一些数据，如name,path等。
       **/
      //因为到时候要进行返回，所以用push，到时就可以用back
      this.$router.push('/detail/' + this.goodsItem.iid)
      // this.$router.push({
      //   path: '/detail/',
      //   query: {
      //     iid: this.goodsItem.iid,
      //   }
      // })
    }
  }
}
</script>

<style scoped>

.goods-item{
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}
.goods-info{
  position: absolute;
  overflow: hidden;
  font-size: 12px;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
}
.goods-info p{
  overflow: hidden;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-info .price{
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("../../../assets/images/common/collect.svg") 0 0/14px 14px;
}
</style>
