// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    imageUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '识别详情'    //页面标题
    })
    // console.log("detail:"+options.historyData);
    // var historyData = JSON.parse(options.historyData);
    // console.log(options.imageUrl);
    this.setData({
      "listData" :  JSON.parse(options.historyData),
      "imageUrl" : options.imageUrl
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
    console.log(this.data.listData);
    console.log(this.data.imageUrl);
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