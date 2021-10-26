import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  //修改state里面的东西都需要通过mutations
  //mutations中的每个方法尽可能完成的时间比较单一一点
  //mutations最主要的操作就是可以跟踪

  //这里面的都是可以跟踪的
  [ADD_COUNTER](state, payload){
    payload.count++
  },
  [ADD_TO_CART](state, payload){
    //默认选中
    payload.checked = true
    state.cartList.push(payload)
  }
}
