import request from '../../utils/request'
/**
 * 1.登录流程
 * 2.前端验证
 *    验证用户信息是否合法（账号，密码是否合法）
 *    如果前端验证不通过就提示用户，不需要发请求给后端
 *    前端验证通过了，发请求（携带账号，密码）给服务器端
 * 3.后端验证
 *    验证用户是否存在
 *    用户不存在直接返回，告诉前端用户不存在
 *    用户存在需要验证密码是否正确
 *    密码不正确，告诉前端密码不正确
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
    captcha:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  login:async function (){
    let res =await request('/user/detail', {uid:4022935974});
    wx.setStorageSync('userInfo',JSON.stringify(res.profile));
    wx.reLaunch({
      url: '/pages/personal/personal',
    })
    //后端验证
    // let result =await request('/captcha/verify', {phone:this.data.phone,captcha:this.data.captcha})
    //  if(result.code === 200){ // 登录成功
    //    console.log(result);
    //    wx.showToast({
    //      title: '登录成功'
    //    })  
      
      
    //  }
    //  else if(result.code === 400){
    //    wx.showToast({
    //      title: '手机号错误',
    //      icon: 'none'
    //    })
    //  }
    //  else if(result.code === 502){
    //    wx.showToast({
    //      title: '验证码错误',
    //      icon: 'none'
    //    })
    //  }
    //  else {
    //    wx.showToast({
    //      title: '登录失败，请重新登录',
    //      icon: 'none'
    //    })
    //  }
  },
  //表单项内容发生改变的回调
  handleInput(event){
  console.log(event)
  let type=event.currentTarget.id;
  console.log(type,event.detail.value);
  this.setData({
    [type]:event.detail.value
  })
  },
// 点击发送验证码按钮
async sendCaptcha(){
  if(!this.data.phone){
    // 提示用户
    wx.showToast({
      title: '手机号不能为空',
      icon: 'none'
    })
    return;
  }
  let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
  if(!phoneReg.test(this.data.phone)){
    wx.showToast({
      title: '手机号格式错误',
      icon: 'none'
    })
    return;
  }
  // 手机号码验证通过，发送验证码
  let result = await request('/captcha/sent', {phone:this.data.phone})
  if(result.code==200){
    wx.showToast({
      title:'验证码发送成功！',
      icon:'success'
    })
  }
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})