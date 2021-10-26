<template>
<div id="app">
  <!--因为需要让详情页每次一进去都希望建一个新的组件，所以不要把Detail设置为keep-alive-->
  <keep-alive exclude="Detail">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view/>
  </keep-alive>
<main-tar-bar></main-tar-bar>
</div>
</template>

<script>
import MainTarBar from '@/components/content/maintarbar/MainTarBar'
export default {
  name: 'app',
  components: {
    MainTarBar
  }
}
</script>

<style>
/*css 引入方式*/
@import "assets/css/base.css";
</style>
