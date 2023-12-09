import Pubsub from 'pubsub-js';
import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:'',//天
    month:'',//月
    recommendList:[],//推荐列表数据
    index:0//用于标记点击歌曲小标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //判断用户是否登录
    // let userInfo=wx.getStorageSync('userInfo');
    // if(!userInfo){
    //   wx.showToast({
    //     title: '请先登录',
    //     icon:'none',
    //     success:()=>{
    //       //跳转到登录界面
    //       wx.reLaunch({
    //         url: '/pages/login/login',
    //       })
    //     }
    //   })
    // }
    this.setData({
      day:new Date().getDate(),
      month:new Date().getMonth()+1
    })
    //获取每日推荐的数据
    this.getRecommendList() ;
    //订阅来自songDetail页面发布的消息
    Pubsub.subscribe('switchType',(msg,type)=>{
      let {recommendList,index}=this.data;
      if(type==='pre'){//上一首
        if(index===0 )
        index=recommendList.length;
        index-=1;
      }
      else{
        if(index===recommendList.length-1)
        index=-1;
        index+=1;
      }
      //更新下标值
      this.setData({
        index
      })
      let musicId=recommendList[index].id;
      //将这个音乐Id回传给songDetail页面
      Pubsub.publish('musicId',musicId);
    });
  },
    //用于获取用户每日推荐数据
    async getRecommendList(){
     let recommendListData=await request('/recommend/songs');
     this.setData({
       recommendList:recommendListData.recommend
     })
    },
        //跳转到SongDetail页面的回调
        toSongDetail(event){
          let {song,index}=event.currentTarget.dataset;
          this.setData({
            index
          })
          //如何路由传参：query参数
          wx.navigateTo({
            // url: '/pages/songDetail/songDetail?song='+JSON.stringify(song) ,
             url: '/songPackage/pages/songDetail/songDetail?musicId='+song.id ,
          })
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