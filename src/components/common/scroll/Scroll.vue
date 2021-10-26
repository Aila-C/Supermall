<template>
  <!--如果ref绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象-->
  <!--如果ref绑定在普通元素中，那么通过this.$refs.refname获取到的是一个元素对象-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>

</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props:{
    /** 1. probeType 为 0，在任何时候都不派发 scroll 事件，
     * 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
     * 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
     * 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
     */

    //实时监听，决定是否派发 scroll 事件
    probeType: {
      type: Number,
      //default默认值为数组或对象时，使用函数，其他类型则是这种写法
      default: 0
    },
    //触发上拉事件
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll: null
    }
  },

  //页面渲染好的
  mounted() {
    // 1.创建BScroll对象
    //当有一些组件不想实时监听，所以probeType不要放在这里
    this.scroll = new BScroll(this.$refs.wrapper, {
      //BetterScroll 默认会阻止浏览器的原生 click 事件。当设置为 true，BetterScroll 会派发一个 click 事件
      click: true,
      observeDOM: true,
      observeImage: true,
      //probeType: 3;pullUpLoad: true,不要直接这样定义，因为不是每个组件都需要这些功能的，所以最好在props（属性）里面定义为一个属性
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,

    })

  //  2.监听滚动的位置,监听当前实例上的钩子函数。如：scroll、scrollEnd 等。
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position)，position里面有x, y
        // 当谁需要这个position这个东西的时候，需要把这个东西传出去，子组件自定义一个事件scroll发出去
        // 然后就在谁的里面对应的位置@这个事件
        this.$emit('scroll', position)
      })
    }

    //  3.监听上拉事件
    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
      })
    }




  },
  methods:{
    //es6里面可以传入一个默认值time，也可以不传，意思是到时候别人不传这个参数的时候，就会使用这个默认值
    scrollTo(x, y, time=300){
      //这里的this.scroll拿到的一定上面data里面的scroll
      this.scroll && this.scroll.scrollTo(x, y, time)
    },

    //每次触发 pullingUp 钩子后，你应该主动调用 finishPullUp() 告诉 BetterScroll 准备好下一次的 pullingUp 钩子。
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
