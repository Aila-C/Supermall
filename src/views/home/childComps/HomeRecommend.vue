<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item, id) in recommends" :key="id">
      <a :href="item.link">
        <img :src="item.image" alt>
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item img{
  width: 65px;
  height: 65px;
}
</style>
