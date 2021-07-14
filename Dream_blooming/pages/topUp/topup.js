// pages/topUp/topup.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: app.globalData.url,
        price: '',
        checked: false,
        paParams: {},
        dataItem: [{
                money: "1",
                moneyS: "1"
            },
            {
                money: "10",
                moneyS: "9"
            },
            {
                money: "30",
                moneyS: "27"
            },
            {
                money: "100",
                moneyS: "88"
            },
            {
                money: "500",
                moneyS: "425"
            },
            {
                money: "1200",
                moneyS: "888"
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
    moneyBtn(e) {
       
        if (this.data.checked == false) {
            wx.showToast({
                title: '请阅读并同意充值服务协议',
                icon: 'none',
                duration: 500
            })
        } else {
            var mony = e.currentTarget.dataset.cal.money; //梦币
            var monyS = e.currentTarget.dataset.cal.moneyS; //充值金额
            console.log( e.currentTarget.dataset.cal)
            let that = this
            wx.request({
                url: that.data.url + 'payfee.php', //改成你自己的链接
                data: {
                    fee: monyS
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                success: function (res) {
                    console.log(res.data);
                    console.log('调起支付');
                    wx.requestPayment({
                        'timeStamp': res.data.timeStamp,
                        'nonceStr': res.data.nonceStr,
                        'package': res.data.package,
                        'signType': 'MD5',
                        'paySign': res.data.paySign,
                        'success': function (res) {
                            wx.showToast({
                                title: '支付成功',
                                icon: 'success',
                                duration: 500
                            });
                            wx.request({
                                url: that.data.url + 'menyPhone.php',
                                data: {
                                    phone: wx.getStorageSync('tab'),
                                    mony: mony,
                                },
                                header: {
                                    'content-type': 'application/json' // 默认值
                                },
                                success(res) {
                                    console.log(res)
                                    if (res.data.code == 'ok') {
                                        wx.setStorageSync('price', res.data.prices)
                                        that.setData({
                                            price: res.data.prices,
                                        })
                                    }

                                }
                            })
                        },
                        'fail': function (res) {
                            console.log('fail');
                        },
                        'complete': function (res) {
                            console.log('complete');
                        }
                    });
                },
                fail: function (res) {
                    console.log(res.data)
                }
            });
        }

    },
    // 切换
    cut() {
        this.setData({
            checked: !this.data.checked
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
    onLoad: function (options) {},

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
            price: wx.getStorageSync('price')
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