// pages/introduces/introduces.js
var time = require('../../utils/time.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataItem:"",
    start_time:'',
    end_time:'',
    marWidth: 0,
    mainWidth: 0,
    move: 0,
    timer: "",
    holiday:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initMarquee()
    var that=this
    // console.log(options.query)
    const eventChannel = this.getOpenerEventChannel()
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data.data)
      that.setData({
        dataItem:data.data.introduces,
        holiday:data.data.holiday,
        start_time:time.formatTime(data.data.introduces.start_time,'Y-M-D h:m:s'),
        end_time:time.formatTime(data.data.introduces.endTime,'Y-M-D h:m:s')
      })
    })
  },
  initMarquee() {
    let query = wx.createSelectorQuery();
    // 获取装载体、文字的宽度
    query.select('.marquee').boundingClientRect((res) => {
      this.data.marWidth = parseInt(res.width)
    }).exec()
    query.select('.main').boundingClientRect((res) => {
      this.data.mainWidth = parseInt(res.width)
      this.moveText()
    }).exec()
  },
  moveText() {
    this.data.timer = setInterval(() => {
      // 每50毫秒移动0.5px
      this.setData({
        move: this.data.move - 0.5
      })
      // 如果完全移动，重新到后移
      if (parseInt(this.data.move) == -this.data.mainWidth) {
        this.setData({
          move: this.data.marWidth
        })
        clearInterval(this.data.timer)
        this.moveText()
      }
    }, 50);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})