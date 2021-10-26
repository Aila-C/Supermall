import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  //payload新添加的商品
  addCart(context, payload){
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
      //当我点击加入购物车的时候，需要将商品添加到cartList，但是不能直接加进去，要进行判断
      //查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //2.判断oldProduct
      if(oldProduct){
        //这里是数量加1
        //这个count是后台数据里的
        //这个操作最好不要在这里做
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      }else{
        //这里是添加新的商品
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}
