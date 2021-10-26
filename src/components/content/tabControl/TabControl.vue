<template>
<div class="tab-control">
  <div class="tab-control-item" v-for="(item, index) in titles" :key="index"
       :class="{active: index === currentIndex}"
       @click="itemClick(index)">
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index){
      this.currentIndex = index;
      //子传父，把内部的点击事件传到外面home组件去，根据点击的类型切换数据
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  height: 40px;
  line-height: 40px;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  font-size: 15px;
  background-color: #fff
}
.tab-control-item span {
  padding: 5px;
}
.active{
  color: var(--color-high-text)
}
.active span{
  border-bottom: 3px solid var(--color-tint)
}
</style>
