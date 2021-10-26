<template>
<swiper>
  <swiper-item v-for="(item, id) in banners" :key="id">
    <a :href="item.link">
      <img :src="item.image" alt="" @load="imageLoad">
    </a>
  </swiper-item>
</swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"

export default {
  name: "HomeSwiper",
  //props 可以是数组或对象，用于接收来自父组件的数据。
  //接收来自Home的数据banners
  props: {
    //定义banners对象
    banners: {
      //type：可以是下列原生构造函数中的一种：String、Number、Boolean、Array、Object、
      // Date、Function、Symbol、任何自定义构造函数、或上述内容组成的数组。
      //会检查一个 prop 是否是给定的类型，
      //检测类型Array
      type: Array,
      //default:any 为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。
      // 对象或数组的默认值必须从一个工厂函数返回。
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad: false
    }
  },
  // Vue 实例可用组件
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad(){
     // 只需要发送一次，因为只需要加载一张图片就知道高度
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad =  true
      }

    }
  }
}
</script>
<!--scoped css样式只在当前组件生效-->
<style scoped>

</style>
