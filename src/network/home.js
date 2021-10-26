import {request} from './request'

//获取首页多个数据
export function getHomeMultiData() {
  //return 后面的是返回一个promise
  return request({
    url:'/home/multidata'
  });
}
//获取商品类型和页数
export function getHomeGoods(type, page) {
  return request({
    url:'/home/data',
    params: {
      type,
      page
    }
  });
}
