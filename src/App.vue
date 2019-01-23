<script>
export default {
  created () {},
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
