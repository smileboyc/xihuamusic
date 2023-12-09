// 发送ajax请求
/*
* 1. 封装功能函数
*   1. 功能点明确
*   2. 函数内部应该保留固定代码(静态的)
*   3. 将动态的数据抽取成形参，由使用者根据自身的情况动态的传入实参
*   4. 一个良好的功能函数应该设置形参的默认值(ES6的形参默认值)
* 2. 封装功能组件
*   1. 功能点明确
*   2. 组件内部保留静态的代码
*   3. 将动态的数据抽取成props参数，由使用者根据自身的情况以标签属性的形式动态传入props数据
*   4. 一个良好的组件应该设置组件的必要性及数据类型
*     props: {
*       msg: {
*         required: true,
*         default: 默认值，
*         type: String
*       }
*     }
*
* */

// import { resolve } from "path";

 import config from './config'
export default  (url, data={}, method='GET') => {
  return new Promise((resolve,reject)=>{
    // 1. new Promise初始化promise实例的状态为pending
    wx.request({
      url: config.mobileHost+url,
      data,
      method,
      //首先要判断cookie有值
      //cookie:wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item=>item.indexof('MUSIC_U')!==-1):''
      header:{
        cookie:"MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/eapi/feedback;;MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/weapi/feedback;;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/api/feedback;;__remember_me=true; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/;;MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/neapi/feedback;;MUSIC_U=00357CD4F37A661EA6369C955A59086586E5F64D51768D1C1E80F7D1924429C62FA655FF092E453C6B17E059EA7F61298C4B9D47409EEB4A3D3E0621399E8C289B021E09110760F38ED11D64EBA2166B745A192A22BADD99029F6C2C7009DA5F93B517326D30A0A10E85C10B3B0DD1619F641867D0D205FA3F4150C13ED44A694F31BFB2F4AAA277714DC392B6CF6AB2820D7EEB78AD63290D7A9C57CB95A5706C019E82957DBD0922AC7C146E96DB34F0798826F2714D832DDE2BD7E20739B0351F3B960ACC8B26E52DA9037271474CEA3AE07D09ED5773A347324C400574C851EC679165A2F826357E374717F4413BF688A38FDDF09808967AA3A96D5196626B06392369469DA83C6CC1E3D5420B8E5EBC06106CFA998BEDA3AF41C4CD0771A2B978DE87BBCD49E780B20E4FCC8E140DBC9AEB15375519030A6B65EF15F708EEEBAD1F0688096F57FC9590F10ACEDA60; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/;;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/eapi/feedback;;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/wapi/feedback;;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/neapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Tue, 05 Dec 2023 13:35:12 GMT; Path=/;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/api/clientlog;;MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/api/clientlog;;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/weapi/feedback;;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/neapi/feedback;;__csrf=0d55cc08e86bc6267469fcab97e76403; Max-Age=1296010; Expires=Wed, 20 Dec 2023 13:35:22 GMT; Path=/;;MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/wapi/feedback;;MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/wapi/clientlog;;MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/weapi/clientlog;;MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/openapi/clientlog;;MUSIC_R_T=1609133154472; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1609133154461; Max-Age=2147483647; Expires=Sun, 23 Dec 2091 16:49:19 GMT; Path=/api/feedback;"
      },
      success: (res) => {

        resolve(res.data);
      },
      fail: (err) => {
        reject(err); // reject修改promise的状态为失败状态 rejected
      }
    })
  })
}