<template>
  <div class="category-wrapper">
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <scroll class="list">

    </scroll>
    <scroll class="branchlist"></scroll>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Scroll from '@/components/common/scroll/Scroll'

    export default {
      name: "Category",
      components: {
        NavBar,
        Scroll
      }
    }

</script>

<style scoped>
.category-wrapper {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.category-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>
