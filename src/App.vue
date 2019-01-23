<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  },
  onLaunch () {
    wx.showLoading({title: '加载中'})
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow () {
    wx.hideLoading()
  },
  onShareAppMessage () {
    return {
      title: 'w3cplus.com',
      path: 'pages/index/main'
    }
  }
}
</script>

<style lang="scss">
$bg-color: #fff;

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: $bg-color;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
page{
  background: #eee;
}
</style>
