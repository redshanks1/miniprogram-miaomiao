// miniprogram/pages/index/index.js
//const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1983859018,2231507513&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3714403727,1867044269&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4082698746,1581979947&fm=26&gp=0.jpg'
    ],
    listData:[],
    current:'links'
  },

  handleLinks(ev){
    let id = ev.target.dataset.id;
    wx.cloud.callFunction({
      name:'update',
      data: {
        collection: 'users',
        doc: id,
        data:"{links: _.inc(1)}"
      }
    }).then((res)=>{
      let updated = res.result.stats.updated;
      if(updated){
        let cloneListData = [...this.data.listData];
        for(let i = 0;i < cloneListData.length;i++){
          if(cloneListData[i]._id == id){
            cloneListData[i].links++;
          }
        }
        this.setData({
          listData: cloneListData
        })
      }
    })
  },
  handleCurrent(ev){
    let current = ev.target.dataset.current;
    if(current == this.data.current){
      return false
    }
    this.setData({
      current
    },()=>{
      this.getListData()
    })
    
  },
getListData(){
  db.collection('users').field({
    userPhoto:true,
    nickName:true,
    links:true
  }).orderBy(this.data.current,'desc')
  .get().then((res)=>{
    this.setData({
      listData: res.data
    })
  })
},
handleDetail(ev){
  let id = ev.target.dataset.id;
  wx.navigateTo({
    url: '../detail/detail?userId=' + id,
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
    this.getListData()
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