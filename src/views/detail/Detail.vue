<template>
<div class="detail">
  <!--因为这里的导航栏比较复杂所以不要在这里做,单独封装一个组件-->
  <!--<nav-bar><div slot="center">详情页</div></nav-bar>-->
  <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
  <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info ref="param" :paramInfo="paramInfo" />
    <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
    <goods-list ref="recommend" :goods="recommends"/>
  </scroll>
  <!--底部工具栏-->
  <detail-bottom-bar @addCart="addToCart"/>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from '@/views/detail/childComps/DetailGoodsInfo'
import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo'
import DetailBottomBar from '@/views/detail/childComps/DetailBottomBar'

import BackTop from '@/components/content/backTop/BackTop'
import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from '@/components/content/goods/GoodsList'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from '@/network/detail'
import {debounce} from '@/common/untils'
//映射
import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
  },
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      //这里不能写死，要根据每个主题对应的offsetTop，然后放进来
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      taboffsetTop: 0,
    }
  },
  // mounted(){
  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  //   // this.themeTopYs.push(Number.MAX_VALUE);
  //   console.log(this.themeTopYs)
  // },
  created(){
    // 1.保存传入的iid
    // console.log(this.$route.params)
    this.iid = this.$route.params.iid

    //2.根据传过来的iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
      //1. 获取数据
      const data = res.result;
      //2. 获取顶部的图片轮播图
      this.topImages = res.result.itemInfo.topImages

      //3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      //5.获取商品详细信息
      this.detailInfo = data.detailInfo

      //6.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //7.取出评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
      //1.第一次获取，值不对
      //值不对的原因:this.$refs.param.$el压根没有渲染
      // this.themeTopYs = []
      //
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs)
      //

      //等DetailNavBar渲染完才执行，就需要$nextTick
      // this.$nextTick(()=>{
      //   //2.第二次获取： 值不对
      //   //原因： 图片没有计算在内
      //   // 根据最新的数据，对应的dom已经被渲染出来了，
      //   //但是图片依然是没有加载完的，（目前获取到offsetTop不包含其中的图片）
      //   //offsetTop值不对的时候，都是因为图片的问题
      //   this.themeTopYs = []
      //
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)
      // })

    })

    //3.请求推荐数据
    // 如何展示数据？需要再建一个子组件吗？
    //不需要，因为之前已经封装过一个GoodsList，是用来展示数据的（传的就是数组），所以直接用GoodsList子组件就行
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.list
    })

    // 4.给getThemeTopy赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs)
    },500)
  },
  methods:{
    //映射，将actions.js里面的函数addCart映射到methods里面
    ...mapActions(['addCart']),

    imageLoad(){
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index){
      //把当前获取到的值取出来，定义一个属性 themeTopYs:[]
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)

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
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y
      //2.positionY和主题中的值进行对比
      //  假设主题的位置[ 0, 13405, 14080, 14310 ]
      //  positionY 在 0 和 13405 之间， index = 0
      //  positionY 在 13405 和  14080之间， index = 1
      //  positionY 在 14080 和 14310 之间， index = 2
      //  positionY 超过了 14310 ， index = 3
      let length = this.themeTopYs.length;
      for(let i=0; i<length-1; i++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //3.是否显示回到顶部
      // 1. BackTop的显示与隐藏
      // console.log(position)，获取到的y值为负的
      //当(-position.y) > 1500时，this.isShowBackTop为ture
      this.isShowBackTop = (-position.y) > 1500

      //2.决定tabControl是否吸顶（position： fixed）
      this.isTabSticky = (-position.y) > this.taboffsetTop
    },
    addToCart(){
      //1.获取商品信息,不需要所有的商品信息添加进去，只要获取购物车需要展示的信息
      //此时就需要Vuex
      // console.log('------')
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.商品添加到购物车里
      //修改state里面的东西都需要通过mutations

      //1.promise 2.mapActions
      //使用映射的方法调用AddCart，本质上它内部会去调用 this.$store.dispatch这个函数
      // eslint-disable-next-line no-unused-vars
      this.addCart(product).then(res => {
      //   this.show = true;
      //   this.message = res;
      //
      //   setTimeout(() => {
      //     this.show = false;
      //     this.message = ''
      //   }, 1500)
      //   console.log(this.$toast)
        this.$toast.show(res, 2000)
      })

      // dispatch里面有promise，如果你想要外面再知道你做了什么，就需要用到promise
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })

      //3.添加到购物车成功，不是单纯的点击这个按钮添加成功，而是里面完成的操作之后，才显示添加成功

    }
  }
}
</script>

<style scoped>
.detail{
  position: relative;
  /*直接让父元素等于视图高度*/
  height: 100vh;
  background-color: #fff;
   z-index: 99;
}
.detail-nav{
  position: relative;
  background-color: #fff;
  z-index: 99;
}
.content{
  height: calc(100% - 44px - 54px);
  overflow: hidden;
}
</style>
