// pages/index/index.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    recommendList:[],
    toplist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad : async function(options) {
    let bannerListData=await request('/banner', {type:2});
    this.setData({
      bannerList:bannerListData.banners
    })

    //获取推荐歌单数据   
    let recommendListData=await request('/personalized', {limit:10});
    this.setData({
      recommendList:recommendListData.result
    })
    //获取排行榜数据
    /**
     * 需求分析：
     * 1.需求根据idx的值获取对应的数据
     * 2.idx的取值范围是0-20，我们需要0-4
     * 3.需要返送5次请求
     */
    let index=0;
    let resultArr=[];
    while(index<5){
      let toplistDate=await request("/top/list",{idx:index++});
      //splice(修改原数组，可以对指定的数组进行增删改) slice
      let topListItem={name:toplistDate.playlist.name,tracks:toplistDate.playlist.tracks.slice(0,3)};
      resultArr.push(topListItem);
          //更新toplist值
        this.setData({
          toplist:resultArr
        })
    }
  },
  //跳转到RecommendSong页面的回调
  toRecommendSong(){
      wx.navigateTo({
        url: '/songPackage/pages/recommendSong/recommendSong',
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