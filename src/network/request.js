import axios from 'axios'

export function request(config) {
  //1.创建axios的实例
  const instance = new axios.create({
    baseURL:'',
    timeout:5000
  });
  //2.axios的拦截器
  // 2.1.请求拦截器的作用
  instance.interceptors.request.use(config => {//请求成功config
    //1.比如config中的一些信息不符合服务器的要求
    //2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    //3.某些网络请求（比如登录（token），必须携带一些特殊的信息）

    //拦截后需要将拦截下来的请求数据返回发送
    return config;
  }, err => {//请求失败err
    console.log(err);
  })

  // 2.2 响应拦截器（interceptors）
  instance.interceptors.response.use(res => {
    // 拦截后需要将拦截下来处理成的结果返回
    return res.data
  }, err => {
    console.log(err)
  })
  //3.发送真正的网络请求
  //return后面就是一个promise函数
  //instance(config) => promise,返回的就是一个promise
  return instance(config)
}
