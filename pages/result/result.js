// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
      {"code":"01","text":"text1","type":"type1"},
      {"code":"02","text":"text2","type":"type2"},
      {"code":"03","text":"text3","type":"type3"},
      {"code":"04","text":"text4","type":"type4"},
      {"code":"05","text":"text5","type":"type5"},
      ],
      listData2:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.imageUrl)
    this.setData({
      imageUrl : options.imageUrl
    })
    var str_res = '{"chinese_name": ["唇形科_鼠尾草属_一串红", "大戟科_大戟属_一品红", "唇形科_大青属_红萼龙吐珠", "茜草科_玉叶金花属_红纸扇", "天南星科_花烛属_花烛"], "latin_name": ["Salvia splendens", "Euphorbia pulcherrima", "Clerodendrum speciosum", "Mussaenda erythrophylla", "Anthurium andraeanum"], "probability": [0.16402585804462433, 0.06710167974233627, 0.03189494460821152, 0.019612321630120277, 0.01789679192006588]}';
    var identify_res = JSON.parse(options.identifyRes);
    //var identify_res = JSON.parse(str_res);
    //let list2 = this.data.listData2;
    var chinese_name_list = identify_res.chinese_name;
    var probability_list = identify_res.probability;
    //console.log("length="+chinese_name_list.length);
    var array=[];
    for (var i=0;i<chinese_name_list.length;i++){
      let obj = {};
      obj.plant_name = chinese_name_list[i];
      obj.identify_prob = (probability_list[i]*100).toFixed(2)+"%";
      array.push(obj);
    }
    this.setData({
      "listData2":array
    });
    console.log(this.data.listData2);
    wx.setNavigationBarTitle({
      title: '识别结果'    //页面标题
    })

    //从服务器获取识别的结果

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