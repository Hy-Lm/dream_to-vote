// pages/details/details.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    dataId: '', //选手id
    tab: '',
    tanchuangShou: false, //默认弹窗隐藏
    balance: "0.00", //balance
    giftItem: [],
    gifts: {}, //选中的礼物
    ifShow: true,
    show: true,
    url: app.globalData.url,
    dataItem: {},
    code: '',
    appId: "",
    openid: "",
    session_key: "",
    borderColor: ["#FFf", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"],
    boxImgSrc: "" //大屏显示图片路径，往下可删除
  },
  tanchuanFal() {
    this.setData({
      tanchuangShou: false,
    })
  },
  // 点击赠送
  Mymony() {
    var that = this
    if (wx.getStorageSync('tab') == '') {
      this.setData({
        tanchuangShou: true,
      })
    } else {

      // console.log('赠送', that.data.gifts.gift_price)
      var giftPrice = that.data.gifts.gift_price; //赠送的礼物价钱
      if (wx.getStorageSync('price') < giftPrice) {
        wx.showToast({
          title: '梦币不足，请充值',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.request({
          url: that.data.url + 'give.php',
          data: {
            openid: wx.getStorageSync('tab'),
            id: that.data.dataId,
            gift_prices: giftPrice
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            if (res.data.code == 'ok') {
              wx.setStorageSync('price', res.data.prices)
              that.setData({
                balance: res.data.prices,
                ifShow: false,
              })
              that.requests(that.data.dataId)
              wx.showToast({
                title: '赠送成功',
                icon: 'none',
                duration:2000
              })
            }

          }
        })
      }

    }

  },
  // 音频播放
  audioPlay() {
    this.audioCtx.play()
    console.log("音频已经播放")
  },
  topUp() { //重置跳转页面
    if (wx.getStorageSync('tab') == '') {
      this.setData({
        tanchuangShou: true,
      })
    } else {
      this.setData({
        ifShow: false
      })
      wx.navigateTo({
        url: '../topUp/topup',
        success: function (res) {}
      })
    }
  },
  giftBtn() { //礼物按钮，请求礼物数据
    let that = this
    console.log(that.data.url, that.data.tab)
    wx.request({
      url: that.data.url + 'gift.php',
      data: {
        openid: that.data.tab
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          giftItem: res.data,
          ifShow: false,
        })
      }
    })

  },
  giftItemBtn(res) {
    console.log(res)
    let color = ["#FFf", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]
    color[res.currentTarget.dataset.indexs] = "#FF9200"
    this.setData({
      gifts: res.currentTarget.dataset.cap,
      borderColor: color
    })
  },
  getPhoneNumber(e) { //授权登录按钮
    this.setData({
      tanchuangShou: false,
    })

    wx.login({
      success: res => {
        var that = this
        var code = res.code
        var iv = e.detail.iv
        var encryptedData = e.detail.encryptedData
        wx.request({
          url: that.data.url + "demo.php",
          data: {
            code: code,
            iv: iv,
            encryptedData: encodeURIComponent(encryptedData)
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            // 在获取到手机号时将手机号缓存在本地
            wx.setStorageSync('tab', res.data.phoneNumber)
            that.setData({
              tab: res.data.phoneNumber,
            })

            if (res.data.phoneNumber) {
              wx.request({
                url: that.data.url + "phone.php",
                data: {
                  phone: res.data.phoneNumber,
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res)
                  wx.setStorageSync('price', res.data.price)
                  that.setData({
                    balance: res.data.price,
                  })
                  wx.showToast({
                    title: '登录成功',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            } else {
              wx.showToast({
                title: '网路故障请重新登录',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    })
  },
  btnName() { //点击投票按钮
    var that = this;
    wx.getStorage({
      key: 'tab',
      success: function (res) {
        console.log(res.data)
        if (!res.data) {
          that.setData({
            tanchuangShou: true,
          })
        } else {
          wx.request({
            url: that.data.url + 'user.php',
            data: {
              players_id: that.data.dataItem.id,
              user_openid: that.data.tab,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              console.log(res)
              if (res.data == "ok") {
                that.requests(that.data.dataItem.id)
                wx.showToast({
                  title: '投票成功',
                  icon: 'success',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '已投过',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })
        }
      }
    })

  },

  // 图片放大看
  styleShows(res) {
    console.log(res.currentTarget.dataset.cap)
    this.setData({
      boxImgSrc: res.currentTarget.dataset.cap,
      show: false
    })
    console.log(this.data.boxImgSrc, "boxImgSrc")
  },
  // 大屏显示点击事件，点击是大屏消失，
  boxImgs() {
    this.setData({
      show: true
    })
  },
  requests(val) {
    let that = this
    wx.request({
      url: that.data.url + 'click.php',
      data: {
        id: val
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          dataItem: res.data[0],
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData)
    // 获取音频的控件
    // // 视频音频播放

    // this.audioCtx = wx.createAudioContext('myAudio')
    // this.boxImgV= wx.createAudioContext('boxImgV')
    const eventChannel = this.getOpenerEventChannel()
    let that = this
    eventChannel.on('detailsRes', function (data) {
      // console.log(data)
      that.setData({
        dataId: data.data.id,
      })
      that.requests(that.data.dataId)
    })

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
    this.setData({
      balance: wx.getStorageSync('price')
    })
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
    console.log(11)
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