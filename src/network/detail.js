import {request} from "./request";

//网络请求获取iid
export function getDetail(iid){
  return  request({
    url: '/detail',
    params:{
      iid
    }
  })
}
//推荐,是在一个新的接口
export function getRecommend(){
  return request({
    url: '/recommend'

  })
}

  //整合数据，放在一个对象里面，再传给组件
  /**给组件传数据的时候，尽量把数据整合好，把杂乱无章的数据整合成一个对象，
  *然后再把这一个对象传给组件，然后这个组件面向某一个数据开发的时候，只需要面向这一个对象就好了
  **/
 //es5是用函数的
//function GoodsInfo(){}

//Es6可以直接创建一个类class，
export class Goods{
  //类里面有一个构造函数constructor
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.discountBgcolor = itemInfo.discountBgcolor
    this.columns = columns
    this.services = services
    //这里先写死价格，一般情况下是根据用户选择商品的颜色大小来判断价格
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

//参数信息
export class GoodsParam {
  constructor(info, rule) {
    //注：image可能没有值（某些商品有值，某些没有值）
    this.image = info.image ? info.image[0] : '';
    this.info = info.set;
    this.rule = rule.tables;
  }
}


