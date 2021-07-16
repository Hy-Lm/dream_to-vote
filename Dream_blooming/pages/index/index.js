// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    userInfo:[],
    holiday:'',//渲染规则
    url:app.globalData.url,
    tabContentHeight:0,
    background:[],
    bannerItem:{//轮播图
      // background: ['../img/谁的青春不迷茫banner2.png',  '../img/谁的青春不迷茫banner3.png', '../img/谁的青春不迷茫banner1.png'],
      background:[],
      indicatorDots: true,
      vertical: false,
      autoplay: true,
      interval: 2500,
      duration: 800,
      dots:true
    },
    contentTitle:"",
    end_time:'',//活动倒计时时间戳
    times:{
      day:1,
      hour:1,
      minute:1,
      seconds:1
    },
    masterData:0,//参赛选手
    accumulative:0,//累计总和
    volume:0,//访问量
    searchInt:"",
    color:["rgba(255,146,0,1)","#000","#000","#000"],
    current:'0',//主体切换值默认为第一页
    players:[],//全部选手
    introduces:'',//介绍的内容
    activity:"",//活动介绍
    pages:1,
    NotItem:"正在加载数据",
    playersShow:true,//默认可以加载数据，当请求数据小于请求个数时为false
    rankingItem:[],//排行榜数据
    rankingShow:false,//排行榜数据是否可以加载
    character:[],//角色报名数据
    characterShow:false,//角色报名是否可以加载
    characterHeight:[]
  },
  
  pageView(){//访问量自调用
    wx.request({
      url: this.data.url+'pageView.php',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)//浏览量的自增加
      }
    })
  },
  // 我要报名
  wantToBtn(res){
    let arrw=this.data.character
    let arrH=[]
    arrw.forEach(item=>{
      arrH.push("")
    })
    this.setData({
      characterHeight:arrH
    })
    let datas=res.currentTarget.dataset.cap
    wx.navigateTo({
      url: '../registration/registration',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('detailsRes', { data:datas})
      }
    })
  },
  // 角色报名数据
  characterItem(size,page){
    let that=this
    console.log(size,page)
    wx.request({
      url: this.data.url+'roles.php',
      data: {
        page_size:size,
        page:page,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {   
      if(res.data.all){
          that.setData({
            characterShow:false,
          })
        if(res.data.all.length<size){
          that.setData({
            characterShow:false,
            NotItem:"没有数据了"
          })
          let arrItem=that.data.character
            let datas=res.data.all
            datas.forEach(element => {
              arrItem.push(element)
            });
            console.log(that.data.character)
            that.setData({
              character:arrItem,
              characterShow:true,
            })
            if(that.data.character.length/2%1==1){
              let number=that.data.character.length/2
              that.setData({
                tabContentHeight:number*770+440
              })
            }else{
              let number=that.data.character.length/2+0.5
              that.setData({
                tabContentHeight:number*770+440
              })
            }
          return false
        }else{
          if(page==1){
            that.setData({
              character:res.data.all,
              characterShow:true,
            })
          }else{
            that.setData({
              pages:page,
              characterShow:true,
            })
            let arrItem=that.data.character
            let datas=res.data.all
            console.log(datas)
              datas.forEach(element => {
                arrItem.push(element)
              });
              that.setData({
                character:arrItem
              })
              console.log(that.data.pages)
          }
          let number=that.data.character.length/2
          that.setData({
            tabContentHeight:number*770+440
          })
       }
      }else{
        that.setData({
          playersShow:false,
          NotItem:"没有数据了"
        })
      }
      }
    })
  },
  characterBox(res){
    console.log(res)
    let arrw=this.data.character
    let arrH=[]
    arrw.forEach(item=>{
      arrH.push("")
    })
    arrH[res.currentTarget.dataset.cap]="580rpx"
    this.setData({
      characterHeight:arrH
    })
    console.log(arrH)
  },
  // 排行榜数据
  ranking(size,page){
    console.log(size)
    let that=this
    wx.request({
      url: this.data.url+'reserve_players.php',
      data: {
        page_size:size,
        page:page,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res)
        // that.setData({
        //   rankingItem:res.data
        // })
        if(res.data.length<size){
          that.setData({
            rankingShow:false
          })
          console.log(that.data.rankingShow,"rankingShow")
          let arrItem=that.data.rankingItem
            let datas=res.data
            datas.forEach(element => {
              arrItem.push(element)
            });
            that.setData({
              rankingItem:arrItem
            })
            let number=that.data.rankingItem.length
            that.setData({
              tabContentHeight:number*115
            })
          console.log(that.data.tabContentHeight,number)

          return false
        }else{
          if(page==1){
            that.setData({
              rankingItem:res.data
            })
          }else{
            that.setData({
              pages:page
            })
            let arrItem=that.data.rankingItem
            let datas=res.data
            console.log(datas)
            if(datas==undefined){
              that.setData({
                rankingShow:false
              })
              return false
            }else{
              datas.forEach(element => {
                arrItem.push(element)
              });
              that.setData({
                rankingItem:arrItem
              })
            }
            
          }
          let number=that.data.rankingItem.length
          that.setData({
            tabContentHeight:number*115
          })
          console.log(that.data.tabContentHeight,number)
       }


       
      }
    })
  },
   // 全部选手数据
players(size,page,all){
  // console.log(this.data.url)
  let that=this
  wx.request({
    url: this.data.url+'players.php',
    data: {
      page_size:size,
      page:page,
      all:all
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data.all,"212")
      // console.log(that.data.playersCount)
      if(res.data.all){
        that.setData({
          playersShow:false,
        })
      if(res.data.all.length<size){
        that.setData({
          playersShow:false,
          NotItem:"没有数据了"
        })
        let arrItem=that.data.players
          let datas=res.data.all
          datas.forEach(element => {
            arrItem.push(element)
          });
          console.log(that.data.players)
          that.setData({
            players:arrItem,
            playersShow:true,
          })
          if(that.data.players.length/2%1==1){
            let number=that.data.players.length/2
            that.setData({
              tabContentHeight:number*760
            })
          }else{
            let number=that.data.players.length/2+0.5
            that.setData({
              tabContentHeight:number*760
            })
          }
        return false
      }else{
        if(page==1){
          that.setData({
            players:res.data.all,
            playersShow:true,
          })
        }else{
          that.setData({
            pages:page,
            playersShow:true,
          })
          let arrItem=that.data.players
          let datas=res.data.all
          console.log(datas)
            datas.forEach(element => {
              arrItem.push(element)
            });
            that.setData({
              players:arrItem
            })
            console.log(that.data.pages)
        }
        let number=that.data.players.length/2
        that.setData({
          tabContentHeight:number*760
        })
     }
    }else{
      that.setData({
        playersShow:false,
        NotItem:"没有数据了"
      })
    }
    
    }
  })
},

// 轮播，活动详情
details(){
  let that=this
  wx.request({
    url: this.data.url+'dream_title.php',
    data: {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data)
      that.setData({
        activity:res.data.content,
        introduces:res.data,//介绍的内容
        background: res.data.banner_imgs,//轮播
        contentTitle: res.data.title,//标题
        volume:res.data.pageView,//访问量
        masterData:res.data.players,//参赛选手
        accumulative:res.data.vote,//累计总和
      })
      that.endTime(res.data.end_time)
    }
  })
},
endTime(val){
  if(val){
    let that=this
    setTimeout(function(){
      that.endTime(val-1)
    },1000)
    var t=parseInt(Math.abs(val/60/60/24));t=t<10?'0'+t:t;
    var s=parseInt(Math.abs(val/60/60%24));s=s<10?'0'+s:s;
    var f=parseInt(Math.abs(val/60%60));f=f<10?'0'+f:f;
    var m=parseInt(Math.abs(val%60));m=m<10?'0'+m:m;
    this.setData({
      times:{
        day:t,
        hour:s,
        minute:f,
        seconds:m
      }
    })
    }
},
  // 事件处理函数
  detailsBtn(res){//点击事件跳转选手详情页
    let datas=res.currentTarget.dataset.cap
    wx.navigateTo({
      url: '../details/details',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('detailsRes', { data:datas})
      }
    })
  },
  introduceBtn() { //点击事件跳转
    var that = this
    var obj={}
    obj['introduces']=that.data.introduces
    obj['holiday']=that.data.holiday
    // console.log(obj,'22222222222222222222')
    wx.navigateTo({
      url: '../introduces/introduces',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data:obj })

      }
    })
  },
  // 搜索框
  bindKeyInput: function (e) {//时时获取文本框的值
    // console.log(e.detail.value)
      this.setData({
        searchInt: e.detail.value
      })
  },
  myBtn(){
    // 在点击我要报名的时候跳转第三页
    this.setData({
      current:2
    })
  },
  searchBtn(){//点击搜索，将值传到数据库并返回相对应的参数
    console.log(this.data.searchInt)
    let that=this
    this.setData({
      current:0
    })
    if(this.data.searchInt!=""){
      wx.request({
        url: this.data.url+'search_player.php',
        data: {
          name:this.data.searchInt
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          let number=res.data.length/2
          if(number<1){
            number=number+0.5
          }
          if(res.data!="err"){
            that.setData({
              players:res.data,
              playersShow:false,
              NotItem:"没有数据了",
              tabContentHeight:number*740
            })
          }else{
            that.setData({
              pages:1,
              players:[],
              rankingItem:[],//排行榜数据
              character:[],//角色报名数据
            })
            that.players(4,that.data.pages,"all")
            wx.showToast({
              title: '该选手还未报名',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }else{
      console.log(1212)
      this.setData({
        pages:1,
        playersShow:true,
        NotItem:"正在加载数据",
        rankingShow:false,
        characterShow:false
      })
      this.players(4,this.data.pages,"all")
    }

  },
  bindchanges(res){//滑动组件
    console.log(res.detail.current)
    if(res.detail.current==0){
      this.setData({
        color:["rgba(255,146,0,1)", "#000", "#000", "#000"],
        pages:1,
        playersShow:true,
        NotItem:"正在加载数据",
        rankingShow:false,
        characterShow:false

      })
      this.players(4,this.data.pages,"all")
    }
    if(res.detail.current==1){
      this.setData({
        color:[ "#000","rgba(255,146,0,1)", "#000", "#000"],
        pages:1,
        playersShow:false,
        NotItem:"没有数据了",
        rankingShow:true,
        characterShow:false
      })
      this.ranking(10,this.data.pages)

    }
    if(res.detail.current==2){
      this.setData({
        color:[ "#000", "#000","rgba(255,146,0,1)", "#000"],
        playersShow:false,
        rankingShow:false,
        pages:1,
        characterShow:true
        
      })
      this.characterItem(4,this.data.pages)
    }
    if(res.detail.current==3){
      this.setData({
        color: ["#000", "#000", "#000","rgba(255,146,0,1)"],
        playersShow:false,
        rankingShow:false,
        characterShow:false
      })
      this.holiday()
    }
  },
  tabClick(res){//点击切换
    this.setData({
      current:res.currentTarget.dataset.cap
    })
  },
//  活动规则
  holiday(){
    var that=this
      wx.request({
        url: this.data.url+'holiday.php',
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          console.log(res.data)
          that.setData({
            holiday:res.data[0],
            tabContentHeight:1950,
            rankingShow:false,
            playersShow:false
          })
        }
      })
  },
  onShow: function () {//页面打开
    this.details()
    this.pageView()
    this.holiday()
    this.setData({
      pages: 1
    })
    console.log(this.data.current)
    if(this.data.current==0){
      this.players(4,this.data.pages,"all")
    }
    if(this.data.current==1){
      this.ranking(10,this.data.pages)
    }
    if(this.data.current==2){
      this.characterItem(4,this.data.pages)
    }

  },
  onLoad() {
    // console.log(app.globalData.openid)
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.players(4,this.data.pages,"all")
    this.details()
    this.pageView()
    this.holiday()
    // this.ranking(10,this.data.pages)//在初始化是排行榜数据不能请求
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.playersShow){//全部选手数据
      console.log(this.data.playersShow)
      this.players(4,this.data.pages+1,"all")
    }
    if(this.data.rankingShow){//排行榜数据
      console.log(this.data.rankingShow)
      this.ranking(10,this.data.pages+1)
    }
    if(this.data.characterShow){
      console.log(this.data.characterShow)
      this.characterItem(4,this.data.pages+1)
    }

  },
  // getUserProfile(e) {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //       console.log(res.userInfo)
  //     }
  //   })
  // }
})
