<template>
  <div class="profile-wrapper">
    <nav-bar class="profile-nav"><div slot="center">我的信息</div></nav-bar>
    <div class="pro-login">
      <div class="user" style="flex: 1">
        <img src="../../assets/images/profile/avatar.svg" alt="">
      </div>
      <div class="pro-center" style="flex: 4">
        <div class="others">
          <div class="login-register">登录/注册</div>
          <div class="phone">
            <img src="../../assets/images/profile/phone.svg" alt="">
            <span>暂无绑定手机号</span>
          </div>
        </div>
      </div>
      <div class="forward" style="flex: 1">
        <img src="../../assets/images/profile/forward.svg" alt="">
      </div>

    </div>

    <div class="pro-info">
      <div class="balance">
        <div><i>0.00</i>元</div>
        <span>我的余额</span>
      </div>
      <div class="discount">
        <div><i>0</i>个</div>
        <span>我的优惠</span>
      </div>
      <div class="point">
        <div><i>0</i>分</div>
        <span>我的积分</span>
      </div>
    </div>

    <div class="pro-message">
      <div class="mes">
        <img src="../../assets/images/profile/message.svg" alt="">
        <span>我的消息</span>
      </div>
      <div class="pointer-mall">
        <img src="../../assets/images/profile/pointer.svg" alt="">
        <span>积分商城</span>
      </div>
      <div class="vip">
        <img src="../../assets/images/profile/vip.svg" alt="">
        <span>会员卡</span>
      </div>
    </div>
    <div class="pro-shopping">
      <div class="cart">
        <img src="../../assets/images/profile/cart.svg" alt="">
        <span>我的购物车</span>
      </div>
      <div class="download">
        <img src="../../assets/images/profile/shopping.svg" alt="">
        <span>下载购物APP</span>
      </div>
    </div>

  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

    export default {
      name: "Profile",
      components: {
        NavBar
      }
    }
</script>

<style scoped>
.profile-wrapper {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.profile-nav{
  background-color: var(--color-tint);
  color: #fff;
}
.pro-login{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-tint);
  border-top: 3px solid #eee;
}
.user img{
  width: 50px;
  margin-left: 15px;
}

.forward img{
  width: 20px;
  margin-left: 15px;
}
.pro-center{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.others{
  margin-right: 75px;
  color: #eee;
  font-weight: bold;
}
.phone{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
.phone img{
  width: 20px;
}
.pro-info{
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  text-align: center;
  font-size: 12px;
}
.pro-info i{
  color: red;
  font-style:normal;
  font-weight: bold;
  font-size: 18px;
}
.pro-message div, .pro-shopping div{
  display: flex;
  height: 43px;
  align-items: center;
}
.pro-message img, .pro-shopping img{
  width: 18px;
  margin: 15px 7px 15px 15px;
}
.pro-message span, .pro-shopping span{
  flex: 2;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 7px 0;
}
.vip span, .download span{
  border-bottom: 0;
}
.mes{
  border-top: 15px solid #eee;
}
.vip{
  border-bottom: 15px solid #eee;
}

</style>
