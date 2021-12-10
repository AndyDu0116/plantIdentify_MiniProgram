// pages/history/history.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    plants2:[],
    userId:"",
    historyData:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '识别历史'    //页面标题
    })
    
    if(wx.getStorageSync('userId_nickName')){
      getApp().globalData.userId = wx.getStorageSync('userId_nickName');
      this.setData({
        userId: wx.getStorageSync('userId_nickName')
      })
      console.log(wx.getStorageSync('userId_nickName'));
    }else{
      var that = this;
      console.log("zhixing else");
      wx.showModal({
        title: '提示',
        content: '使用本功能需要您的用户信息，是否允许获取您的用户信息',
        success (res) {
          if (res.confirm) {
            wx.getUserProfile({
              desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
              success: (res) => {
                console.log(res)
                console.log('index= '+res.userInfo.nickName);
                getApp().globalData.userId = res.userInfo.nickName;
                that.setData({
                  userId:res.userInfo.nickName
                })
                wx.setStorageSync('userId_nickName', res.userInfo.nickName);
              },
              fail:(res)=>{
                console.log("fail");
              }
            })
          } else if (res.cancel) {
            
          }
        }
      })
  }
  console.log('history '+getApp().globalData.userId)
    
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
    //请求服务器获取识别历史
    var that = this;
    wx.request({
      url: 'http://182.92.206.42:8080/getHistory', //仅为示例，并非真实的接口地址
      method:'POST',
      data: {
        //userId: getApp().globalData.userId,
        //userId: "id_444"
        userId:that.data.userId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        //console.log(res.data)
        that.setData({
          historyData:res.data
        })
        var array = [];
        for(var i=0;i<res.data.category.length;i++){
          var obj = {};
          obj.imageUrl = "http://"+res.data.imageUrl[i];
          obj.plantName = res.data.category[i].chinese_name[0];

          array.push(obj);
        }
        that.setData({
          "plants2":array
        });
        console.log(that.data.plants2);
      }
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

  },

  preview(e){
    //console.log(e.currentTarget.dataset.url)
    var previewUrl = e.currentTarget.dataset.url;
    var originalUrl=[];
    var strLen = previewUrl.length;
    var orgUrlTmp = previewUrl.substring(0,strLen-4)+"_original"+previewUrl.substring(strLen-4,strLen);
    //console.log(orgUrlTmp)
    originalUrl.push(orgUrlTmp);
    wx.previewImage({
      current: previewUrl, // 当前显示图片的http链接
      urls: originalUrl // 需要预览的图片http链接列表
    })
  },
  detialClick(e){
    //console.log(this.data.historyData);
    var historyData = this.data.historyData;
    //console.log(e.currentTarget.dataset.plant)
    var imageUrl = e.currentTarget.dataset.plant.imageUrl;
    var strLen = imageUrl.length;
    var origainImageUrl = imageUrl.substring(0,strLen-4)+"_original"+imageUrl.substring(strLen-4,strLen);
    //console.log(origainImageUrl);
    var sendData = [];
    for(var i=0;i<historyData.imageUrl.length;i++){
      console.log("bijiao:"+imageUrl+" "+historyData.imageUrl[i]);
      if(imageUrl == "http://"+historyData.imageUrl[i]){//是该条数据，加进来
        for(var j=0;j<historyData.category[i].chinese_name.length;j++){
          var obj = {};
          obj.plant_name = historyData.category[i].chinese_name[j];
          obj.identify_prob = (historyData.category[i].probability[j]*100).toFixed(2)+"%";//(probability_list[i]*100).toFixed(2)+"%"
          obj.latin_name = historyData.category[i].latin_name[j];
          sendData.push(obj);
        }
      }
    }
    
    //console.log('sendData:'+JSON.stringify(sendData));
    wx.navigateTo({
      url: '/pages/detail/detail?'+'historyData='+JSON.stringify(sendData)+'&imageUrl='+origainImageUrl
    })
    
  },
  upper(e) {
    console.log(e)
  },

  lower(e) {
    console.log(e)
  },

  scroll(e) {
    console.log(e)
  },

  scrollToTop() {
    this.setAction({
      scrollTop: 0
    })
  },
})