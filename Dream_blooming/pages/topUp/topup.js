// pages/topUp/topup.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checked:false,
        paParams:{},
        dataItem:[
            {
                money:"1",
                moneyS:"0.1"
            },
            {
                money:"10",
                moneyS:"9"
            },
            {
                money:"30",
                moneyS:"27"
            },
            {
                money:"100",
                moneyS:"88"
            },
            {
                money:"500",
                moneyS:"425"
            },
            {
                money:"1200",
                moneyS:"888"
            }
        ]
    },
    // 事件处理函数
    doubt(res) { // 跳转充值页
        wx.navigateTo({
            url: '../doubt/doubt',
            success: function (res) {
                console.log(res)
            }
        })
    },
    moneyBtn(res){
        let that=this
        // 192.168.0.18
        // http://192.168.0.76/admin/php/php/payfee.php
        wx.request({
            　　url: "http://192.168.0.38:9005/pay/createNative.do",
               method: "POST",
               dataType: "json",
               header: {
                 'content-type': 'application/x-www-form-urlencoded'
               },
               data: {
               },
               success: function (res) {
                    // console.log(res.data)
                    that.xcxPay(res.data);  // 拿到统一下单的参数后唤起微信支付页面
               }
            })
        // wx.request({
            //  url: 'http://192.168.1.170/dream/php/payfee.php',//改成你自己的链接
            //  data:{
            //  openid: "oI9Ip4xlwhW47IYk3hBvlIqyWcx0",//获取用户openid
            //  prices:100 //商品价格
            //  },
            //  header: {
            //  'Content-Type': 'application/x-www-form-urlencoded'
            //  },
            //           method: 'POST',
            //           success: function (res) {
            //            console.log(res);
            //            wx.requestPayment({
            //             'timeStamp':String(res.data.timeStamp),
            //             'nonceStr': res.data.nonceStr,
            //             'openid':res.data.openid,
            //             'package': res.data.package,
            //             'signType': 'MD5',
            //             'paySign': res.data.paySign,
            //             'success': function (res) {
            //              console.log('success');
            //              wx.showToast({
            //               title: '支付成功',
            //               icon: 'success',
            //               duration: 3000
            //              });
            //             },
            //             'fail': function (res) {
            //              console.log(res);
            //             },
            //             'complete': function (res) {
            //              console.log('complete');
            //             }
            //            });
            //           },
            //           fail: function (res) {
            //            console.log(res.data)
            //           }
            //          });
    },
    xcxPay(val){
        console.log(val)
        let that=this
        wx.requestPayment({
            "provider": "wxpay",
            "appId":val.appId,
            "timeStamp":val.timeStamp,
            "nonceStr": val.nonceStr,
            "package": 'prepay_id='+val.prepay_id,
            "signType": "MD5",
            "paySign":val.paySign,
            "totalFee":val.total_fee,
            'success': function (res) { 
                   console.log(res)
                    console.log(1111)
            　　　　// 这里应该是 res.errMsg , 跟公众号的支付返回的参数不一样，公众号是 err_msg, 就因为没注意到这个，折腾了很长时间
            //    　　if(res.errMsg == "requestPayment:ok"){  // 调用支付成功
            //       　　wx.redirectTo({
            //               url: '../chargelist/chargelist'   // 充值成功后的处理，可以跳转，也可以根据自己的需要做其他处理
            //          })
            //       }else if(res.errMsg == 'requestPayment:cancel'){
            // 　　　　　　// 用户取消支付的操作
            // 　　　 }
               },
               'fail': function (res) {
                　　console.log(res,"123")
               },
               'complete': function (res) { 
                   console.log(res)
               }
            })
    },
    // 切换
    cut() { 
        this.setData({
            checked:!this.data.checked
        })
    },
    deal(res) { // 跳转充值页
        wx.navigateTo({
            url: '../deal/deal',
            success: function (res) {
                console.log(res)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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