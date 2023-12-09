// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[],//导航标签数据
    navId:'',//导航的标识
    videoList:[],//视频列表数据
    videoId:'',//视频id标识
    videoUpdateTime:[],//记录video播放时长
    isTrigger:false//标识是否触发刷新
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getVideoGroupListData();
  },
    //获取导航数据
  async getVideoGroupListData(){
      let videGroupListData=await request('/video/group/list');
      this.setData({
        videoGroupList:videGroupListData.data.slice(0,14),
        navId:videGroupListData.data[0].id
      })
      this.getVideoList(this.data.navId);
    },

    //点击切换导航的回调
    changeNav(event){
      this.setData({
        videoList:[]
      })
      // let navId=event.currentTarget.id;
      let navId =event.currentTarget.dataset.id;
      this.setData({
        navId:navId>>>0
      })  
          //显示正在加载
          wx.showLoading({
            title: '正在加载',
          })
          //动态获取当前对应导航视频数据
          this.getVideoList(navId);
    },

    //获取视频列表数据
    async getVideoList(navId){
      let videoListData=await request('/video/group',{id:navId});
      //关闭消息提示框
      wx.hideLoading();
      //关闭下拉刷新
      this.setData({
        isTrigger:false
      })
      let index=0;
      let videoList=videoListData.datas.map(item=>{
        item.id=index++;
        return item;
      })
      this.setData({
        videoList
      })
    },

    //点击播放/继续播放的回调
    handlePlay(event){
      console.log("af")
      /**
       * 问题：多个视频可以同时播放
       * 思路：
       *      1.在点击播放的事件需要找到上一个播放的视频
       *      2.在播放新的视频之前关闭上一个正在播放的视频
       *   关键：
       *      1.如何找到上一个视频的实例对象
       *      2.如何确认点击播放的视频和当前播放的视频不是同一个视频
       * 单例模式:
       *     1.需要创建多个对象的场景下，通过一个变量接收，始终只有一个对象
       */
      let vid=event.currentTarget.id;
      // this.vid!==vid&&this.videoContext&&this.videoContext.stop();
      // this.vid=vid;
      //更新data中videoId的状态数据
      this.setData({
        videoId:vid
      })
      //创建控制video标签的实例对象
      this.videoContext =wx.createVideoContext(vid); 

      //判断当前视频之前是否有播放记录，如果有，跳转到指定的播放位置
      let {videoUpdateTime}=this.data;
      let videoItem = videoUpdateTime.find(item=>item.vid===vid);
      if(videoItem){
        this.videoContext.seek(videoItem.currentTime);
      }
      this.videoContext.play();
    },

    //视频结束时调用
    handleEnded(event){
      let {videoUpdateTime}=this.data;
      videoUpdateTime.splice(videoUpdateTime.findIndex(item=>item.vid===event.currentTarget.id),1);
      this.setData({
        videoUpdateTime
      })
    },

    //自定义下拉刷新的回调
    handleFresher(){
      //再次发请求，获取数据
      this.getVideoList(this.data.navId);
    },

    //自定义上拉触底的回调
    handleTOLower(){
      //拿更多的数据显示。数据分页 1.前端分页 2.后端分页
      //模拟数据
      let newVideoList=[];
      let videoList=this.data.videoList;
      videoList.push(...newVideoList)
      console.log("触底啦！")
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
        //监听视频播放进度的回调
        handleTimeUpdate(event){
            let videoTimeObj={vid:event.currentTarget.id,currentTime:event.detail.currentTime};
            let {videoUpdateTime}=this.data;
            //判断记录播放时长的数组中是否有当前视频的播放记录
            /**
             * 1.如果有，在原有的播放记录中修改播放时间为当前的播放时间
             * 2.如果没有，需要在数组中添加当前视频的播放记录
             */
            let videoItem=videoUpdateTime.find(item=>item.vid===videoTimeObj.vid);
            if(videoItem){//之前有
              videoItem.currentTime=event.detail.currentTime;
            }
            else{//之前没有
              videoUpdateTime.push(videoTimeObj);
            }     
            this.setData({
              videoUpdateTime
            })
        },
              // 到搜索页面
              toSearch(){
                wx.navigateTo({
                  url: '/pages/search/search',
                })
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
    console.log("页面下拉")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage({from}) {
    if(from==='button'){
      return {
        title:'西瓜音乐',
        pape:'/pages/video/video',
        imageUrl:'../../static/tutu.jpg'
      }
    }else{
      return {
        title:'主菜单的转发',
        pape:'/pages/video/video',
        imageUrl:'../../static/tutu.jpg'
      }
    }

  }
})