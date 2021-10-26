<template>
  <div class="bottom-bar">
    <div class="check">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span class="text"> 全部</span>
    </div>
    <div class="total">合计：
      <span class="price">{{totalPrice}}</span>
    </div>
    <div class="calculate" @click="calcClick">结算({{checkLength}}件)</div>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice(){
      //先做一个过滤
      return '￥' + this.$store.getters.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength(){
      return this.$store.getters.cartList.filter(item => item.checked).length
      },
    isSelectAll(){
      if(this.$store.getters.cartList.length === 0) return false
      //1.使用every（）
      //默认一开始是选中了全选的状态，判断item是否都选中了，全部选中了就全选状态
      return this.$store.getters.cartList.every(item => item.checked)
    //  3.普通的遍历
    //   for (let item of this.cartList) {
    //     if(!item.checked) {
    //       return false
    //     }
    //   }
    //   return true
         }
    },
  methods: {
    checkClick(){
      if(this.isSelectAll){//全部选中
        this.$store.getters.cartList.forEach(item => item.checked = false)//遍历将所有的东西的取消选中
      }else{//部分或全部不选中
        this.$store.getters.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick(){
      if(!this.isSelectAll){
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar{
  position: fixed;
  display: flex;

  bottom: 49px;
  left:0;
  right: 0;

  padding: 0 10px;

  font-size: 13px;
  height: 40px;

  align-items: center;
  justify-content: space-between;

  background-color: #fff;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
}
.check {
  display:flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  line-height: 20px;
}
.total .price{
  font-weight: bold
}
.calculate{
  font-weight: 700;
  display: block;
  width: 81px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  font-size: 13px;
  border-radius: 20px;
  background-color: #f2270c;
  color: #fff;
  font-size: .7rem;
}

</style>
