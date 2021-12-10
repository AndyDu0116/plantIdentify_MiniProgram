// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '植物识别',    //页面标题
    })

  },
  getUserProfile(){
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    if(wx.getStorageSync('userId_nickName')){
      app.globalData.userId = wx.getStorageSync('userId_nickName');
      return;
    }
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)

        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.userId = res.userInfo.nickName;
        wx,wx.setStorageSync('userId_nickName', res.userInfo.nickName);
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    console.log('index= '+e.detail.userInfo.nickName)
  },

  plantIdentify:function(){
    wx.chooseImage({
      count: 1,  //最多可以选择的图片总数
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 2000
        })
   
          wx.uploadFile({
            url: 'http://182.92.206.42:8080/uploadImage',
            filePath: tempFilePaths[0],
            name: 'image',
            formData: {
              userId:app.globalData.userId
              //userId:"id_444"
            },
            header: {
              "Content-Type": "multipart/form-data"
            },
            success: function (res) {
              //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }
              console.log("server idetify res:");
              console.log(res.data);
              wx.navigateTo({
                url: '/pages/result/result?imageUrl='+tempFilePaths[0]+'&identifyRes='+res.data
              })
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
      }
    })
  } , 

  tryConnectServer:function(){
    // console.log("1111112222")
    // wx.navigateTo({
    //   url: '/pages/result/result?imageUrl='+"http://182.92.206.42:8080/media/id_111_pBZFUES.png"+'&identifyres='+"123321"
    // })

    // console.log("1111111111")
    wx.request({
      url: 'http://182.92.206.42:8080/getHistory', //仅为示例，并非真实的接口地址
      method:'POST',
      data: {
        userId: "id_111",
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        console.log('--------------------');
        console.log(res.data);
      },
      fail(res){
        console.log("fail")
      }
    })
   }
})
