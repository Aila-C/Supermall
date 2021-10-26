export default{
  //想直接把这里的东西可以直接搬到computed计算里面做
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  }
}
