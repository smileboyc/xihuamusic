import Pubsub from 'pubsub-js';
import request from '../../../utils/request'
import moment from "moment"
//获取全局实例
const appInstance=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isPlay:false,//音乐是否播放
      song:{},//歌曲详细对象
      musicId:'',//当前音乐id
      musicLink:'',//音乐链接
      currentTime:'00:00',
      durationTime:'04:20',
      currentWidth:0//实时进度条的宽度
  },
    //点击或者播放的回调
    handleMusicPlay(){
        let isPlay=!this.data.isPlay;
        let {musicId,musicLink}=this.data;
        this.musicControl(isPlay,musicId,musicLink);
},
    //获取歌曲详细信息回调
    async getMusicInfo(musicId){
      let songData=await request("/song/detail",{ids:musicId});
      let durationTime=moment(songData.songs[0].dt).format('mm:ss')
      this.setData({
        song:songData.songs[0],
        durationTime
      })
      //动态修改窗口标题
      wx.setNavigationBarTitle({
        title:this.data.song.name
      })
    },

    //控制音乐播放/暂停的功能函数
    async musicControl(isPlay,musicId,musicLink){    
      if(isPlay){//音乐播放
        if(!musicLink){
        //获取歌曲src
        let musicLinkData=await request('/song/url',{id:musicId})
        musicLink=musicLinkData.data[0].url;
        this.setData({
          musicLink
        })
        }  
        this.backgroundAudioManager.src=musicLink;
        this.backgroundAudioManager.title=this.data.song.name
      }else{//音乐暂停
        this.backgroundAudioManager.pause();
      }
    },
      //修改播放状态的功能函数
      changePlayState(isPlay){
        this.setData({
          isPlay
        })
        //修改全局音乐播放的状态
        appInstance.globalData.isMusicPlay=isPlay;
      },
        //切换歌曲
        handleSwitch(event){
          let type=event.currentTarget.id;
          //关闭当前播放的音乐
          this.backgroundAudioManager.stop();
          //订阅来自recommendSong页面
          Pubsub.subscribe('musicId',(msg,musicId)=>{
            //获取音乐详情信息
            this.getMusicInfo(musicId);
            //自动播放当前的音乐
            this.musicControl(true,musicId);
            //取消订阅
            Pubsub.unsubscribe('musicId')
          })
          //发布消息数据给recommendSong页面
          Pubsub.publish('switchType',type);
        },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
          //创建控制音乐播放的实例对象
          this.backgroundAudioManager= wx.getBackgroundAudioManager();
        let musicId=options.musicId;
        this.setData({
          musicId
        })

      //获取歌曲详细信息
      this.getMusicInfo(musicId);
    /**
     * 问题：如果用户操作系统的控制音乐播放/暂停的按钮，页面不知道，导致页面显示是否播放的状态和真实的音乐播放状态不一致
     * 解决方案：
     *   1.通过控制音频的实例去监视音乐播放/暂停
     */
    //监视音乐播放/暂停
    //判断当前页面音乐是否在播放
    if(appInstance.globalData.isMusicPlay&&appInstance.globalData.musicId!==musicId){
      // this.setData({
      //   isPlay:true
      // })
      //歌曲不同，重新进入时，直接播放新的音乐
      //关闭当前播放的音乐
      this.backgroundAudioManager.stop();
      //自动播放当前的音乐
      this.musicControl(true,musicId); 
      this.changePlayState(true);
      appInstance.globalData.musicId=musicId;
    }
    else{//歌曲相同不进行操作

    }

      this.backgroundAudioManager.onPlay(()=>{
        this.changePlayState(true);
        //修改全局音乐播放的状态
        appInstance.globalData.musicId=musicId;
      });
      this.backgroundAudioManager.onPause (()=>{
        this.changePlayState(false);
      });
      this.backgroundAudioManager.onStop(()=>{
        this.changePlayState(false);
      });
      //监听音乐实时播放的进度
      this.backgroundAudioManager.onTimeUpdate(()=>{
        //格式化实时的播放时间
        let currentTime=moment(this.backgroundAudioManager.currentTime*1000).format("mm:ss")
        let currentWidth=this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration*470;
        this.setData({
          currentTime,
          currentWidth
        })
      })
      //监听音乐播放自然结束(有bug)
      this.backgroundAudioManager.onEnded(()=>{
        //自动切换至下一首音乐，并且自动播放
        Pubsub.publish('switchType','next');
        //将实时进度条的长度还原为0
        this.setData({
          currentWidth:0,
          currentTime:0
        })
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