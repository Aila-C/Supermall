<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新歌', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabSticky"></tab-control>
    <!--把v-bind：probe-type的值传过去，实时监听-->
    <!--@scroll监听这个事件，意思是内容发送成功了-->
    <!--父组件通过this.$emit.scroll 获得scroll组件，进而拿到里面的scrollTo方法-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature/>
      <!--@tabClick根据TabControl发送的事件名称（tabClick），监听对应的事件名称@tabClick-->
      <tab-control :titles="['流行', '新歌', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2" ></tab-control>
      <!--子组件从data里面动态绑定数据，取出goods里面的list，然后子组件就可以获得父组件里面的goods数据-->
      <!--根据点击对应的类型更新数据,-->
      <!--因为index获取的是一个数字，不能直接放进goods[]，需要用字符串代替-->
      <!--<goods-list :goods="goods[currentType].list"/>-->
      <!--尽量表较长的东西不要出现在这里，放到computed里面-->
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--返回顶部不需要滚动-->
    <!--直接在父组件监听组件的点击事件，
    但是组件不能直接监听事件，需要添加原生修饰符.native-->
    <!--v-show控制 backTop显示和隐藏-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import HomeSwiper from '@/views/home/childComps/HomeSwiper'
import HomeRecommend from '@/views/home/childComps/HomeRecommend'
import HomeFeature from '@/views/home/childComps/HomeFeature'

import { getHomeMultiData, getHomeGoods } from "@/network/home"


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },

  //一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝
  data(){
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      //currentType默认值为pop
      currentType: 'pop',
      //默认设置为false隐藏
      isShowBackTop: false,
      taboffsetTop: 0,
      isTabSticky: false
    }
  },

  //什么时候用computed，什么时候用methods
  /**
   * computed是响应式的，methods并非响应式。
   *
   * 如果不需要经常变动的用computed，需要经常变动的用methods。
   * 另外一种情况，如果你需要传参数，就用methods
   * methods是个方法,比如你点击事件要执行一个方法，这时候就用methods,
   * computed是计算属性，实时响应的，比如你要根据data里一个值随时变化做出一些处理，就用computed。
   *
   * methods使用时，一般情况需要加括号，而computed则不需要。
   * methods每次调用时会重新执行函数，而computed在其内部变量不变或其返回值不变的情况下多次调用只会执行一次，
   * 后续执行时直接从缓存中获取该computed的结果。因此推断computed存在缓存机制。
   */
  computed: {
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  destroyed() {
    console.log('home destroyed')
  },

  //created只写主要逻辑，直接调用方法就行
  created() {
    //一定要加this，表示调用的是下面的methods方法，不然调用的还是上面导入进来的getHomeMultiData()
    //1.请求多个数据
    this.getHomeMultiData()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  //页面挂载完后，做的事情
  mounted() {
    //1.获取tabcontrol的offsetTop，但是组件没有offsetTop，所以应该去拿组件模板里面的元素，才有offsetTop
    //如何获取组件的元素，不能用document，因为不确定是哪里的元素。所有组件都有一个属性$el: 用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop)
    //此时拿到的offsetTop是不准确的，因为在mounted中（页面挂载完后），
    // 此时上面的图片还有可能还没加载出来，要等上面的图片加载完后，再去拿offsetTop才是准确的
    // this.taboffsetTop = this.$refs.tabControl.$el.offsetTop
  },

  //把具体的内容放在methods里面封装，然后created可以直接使用
  methods: {
    /**
     * 事件监听相关的方法
     */
    //拿到这个index
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    //返回顶部
    backClick(){
      // this.$refs.scroll,父访问子，要与属性ref=“scroll”绑定，可以直接访问子组件Scroll里面data的scroll数据,
      // 然后调用这个scroll属性里面的方法scrollTo(x,y,time)，但是这个看起来不容易懂
      // this.$refs.scroll.scroll.scrollTo(0, 0)

      // 所以应该在Scroll组件里面的methods封装一个方法scrollTo（x, y, time=300）
      // 然后就可以不用访问这个Scroll组件的scroll属性，就可以直接拿到这个组件里面的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0)
    },

    //监听滚动位置
    contentScroll(position){
      // 1. BackTop的显示与隐藏
      // console.log(position)，获取到的y值为负的
      //当(-position.y) > 1500时，this.isShowBackTop为ture
      this.isShowBackTop = (-position.y) > 1500

      //2.决定tabControl是否吸顶（position： fixed）
      this.isTabSticky = (-position.y) > this.taboffsetTop
    },

    //加载更多
    loadMore(){
      //1.先监听图片什么时候加载完
      this.getHomeGoods(this.currentType)
      //2.调用这个refresh方法
      //重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
      this.$refs.scroll.refresh()
    },

    swiperImageLoad(){
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        // console.log(res.data.banner);
        //保存数据，result和res都指向了同一个内存地址，在函数执行完前要把数据保存起来，因为res会被回收
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      //goods是对象，type是变量，对象获取的属性是变量时，只能用[]来获取。
      //对于已经存在的属性和方法，用.和用[]得到的结果一致，
      //对于不存在（未定义）的属性和方法，用.会创建这个新的属性或方法，而用[]的方式访问不会创建新的属性或方法。

      //请求复用，不能写死page，动态获取page，把data里面的goods里面的type（如pop）传进来，拿到对应type（pop）的page
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then (res => {
        this.goods[type].list.push(...res.data.list)
        //还要把数据传回给data里的page
        this.goods.type += 1

        //每次触发 pullingUp 钩子后，你应该主动调用 finishPullUp() 告诉 BetterScroll 准备好下一次的 pullingUp 钩子。
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav{

  /*在使用浏览器原生滚动时，为了让我们导航不跟随一起混动*/
  /*现在使用了better-scroll,是在<scroll>里面滚动的,所以这个就没用了*/
  /*position: sticky;*/
  /*left: 0;*/
  /*top: 0;*/
  /*right: 0;*/
  background-color: var(--color-tint);
  color: #fff;
  z-index: 99
}
.tab-control{
  position: relative;
  z-index: 99
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>
