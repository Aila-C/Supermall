<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
  <!--  商品的列表-->
    <cart-list/>
  <!--  底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from '@/views/cart/childComps/CartBottomBar'

//mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
import { mapGetters } from 'vuex'

    export default {
      name: "Cart",
      components: {
        NavBar,
        CartList,
        CartBottomBar
      },
      computed:{
        // 1.使用对象展开运算符将 getter 混入 computed 对象中
        // ...mapGetters([
        //   'cartLength'
        //   ])
        // 2.如果你想将一个 getter 属性另取一个名字，使用对象形式：
        ...mapGetters({
          // 把 `this.cartLength` 映射为 `this.$store.getters.cartLength`
          length: 'cartLength'
        })

      }
    }
</script>

<style scoped>
.cart {
  /*视图高度*/
  height: 100vh;
}
.cart-nav{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
