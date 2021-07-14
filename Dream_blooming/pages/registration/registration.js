// pages/registration/registration.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // url:'http://192.168.43.216/dream/php/',
    url:app.globalData.url,
    titles:"",
    types:'',
    role_name:"",
    role_number:"",
    formImgBoxImg:[],//上传的图片
    formImgBoxAudio:"",//上传的音频
    formImgBoxVideo:""//上传的视频

  },
  formSubmit(e) {//点击完成时上传服务牌
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let itemData=e.detail.value
    itemData.role_number=this.data.role_number
    itemData.player_video=this.data.formImgBoxVideo
    itemData.player_voice=this.data.formImgBoxAudio
    itemData.player_img=this.data.formImgBoxImg
    itemData.being_type=this.data.types
    itemData.player_role=this.data.role_name
    itemData.being_movie=this.data.titles
    console.log(itemData)
   
    for(let item in itemData){
      console.log(itemData[item])
      if(!itemData[item]){
        wx.showToast({
              title: '请将信息填写完全',
              icon: 'none',
              duration: 2000
            })
            return false
      }
    }




    wx.request({
      url: this.data.url+'role.php',
      data: {
        obj:JSON.stringify(itemData)
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        // console.log(res)
        if(res.data=="ok"){
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 2000
          })
        }else if(res.data=="tel"){
          wx.showToast({
            title: '该用户已报名',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '报名失败',
            duration: 2000
          })
        }
      }
    })







  },
  /**
   * 生命周期函数--监听页面加载
   */
  chooseImageTap: function (res) {
    let dataIndex=res.currentTarget.dataset.cap
    var self = this;
    wx.showActionSheet({
      itemList: ['从相册中选择'], // 按钮的文字数组，数组长度最大为 6
      itemColor: "#00000",             // 按钮的文字颜色
      success: function (res) {        // 接口调用成功的回调函数
        if (res.tapIndex == 0) {
          self.chooseWxImage('album',dataIndex);
        } else if (res.tapIndex == 1) {
          self.chooseWxImage('camera',dataIndex);
        }
      }
    })
  },
  chooseWxImage: function (type,dataIndex) {
    console.log(dataIndex)
    var self = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],   // 原图、压缩图
      sourceType: [type],                     // 选择图片的来源
      success: function (res) {
        console.log(res)
        self.upImgs(res.tempFilePaths[0],dataIndex) //调用上传方法
      }
    }) 
  },
  upImgs: function (imgurl,dataIndex) {
    console.log(dataIndex)
    var self = this;
    wx.uploadFile({
      url:this.data.url+'upload.php',   //后端接口地址
      filePath: imgurl,
      name: 'file',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        console.log(res)
        var data =res.data;      //接口返回网络路径
        if(dataIndex==1){
          let picPaths = self.data.formImgBoxImg;
          picPaths.push(data);
          console.log(picPaths)
          self.setData({
            formImgBoxImg:picPaths
          })
        }
        if(dataIndex==2){
          self.setData({
            formImgBoxAudio:data
          })
        }
        if(dataIndex==3){
          self.setData({
            formImgBoxVideo:data
          })
        }
      }
    })
  },
  previewImage: function(e){
    let picPaths = this.data.formImgBoxImg;
    wx.previewImage({
        current: e.currentTarget.id,   // 当前显示图片的http链接
        urls: picPaths                 // 需要预览的图片http链接列表
    })
  },
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    let that=this
    eventChannel.on('detailsRes', function(data){
      console.log(data.data)
      that.setData({
        titles:data.data.title,
        types:data.data.type,
        role_name:data.data.role_name,
        role_number:data.data.role_number,
      })
      console.log(that.data)
    } )
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