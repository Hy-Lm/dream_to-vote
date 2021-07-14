// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.setStorageSync('tab', '')
    wx.setStorageSync('price', '')

    // 登录
    wx.login({
      success: res => {
        // console.log(res)
      }
    })
    
  },
  globalData: {
    userInfo: null,
    openid:'121212',
    url:'http://192.168.7.108/dream_to-vote/php/'
  }
})
