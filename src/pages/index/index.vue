<template>
  <div class="container">
    <div class="item-box">
      <Card v-for="item in lists" :key="item.id" :list="item"></Card>
    </div>
  </div>
</template>

<script>
import {get} from '@/util'
import Card from '@/components/card'

export default {
  data () {
    return {
      userInfo: {},
      index: 1,
      page: 0,
      more: true,
      lists: []
    }
  },
  components: {
    Card
  },
  onShareAppMessage () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onPullDownRefresh () {
    this.getLists(true)
  },
  onReachBottom () {
    if (!this.more) {
      return false
    }
    this.page = this.page + 1
    this.getLists()
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              // console.log('this:::', this)
              // console.log('this.userInfo:::', this.userInfo)
            }
          })
        }
      })
    },
    // 获取列表
    async getLists (init) {
      wx.showLoading({title: '加载中...'})
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const list = await get('/weapp/lists', {page: this.page, size: 10})
      // console.log(list)

      if (list.data.list.length < 10 && this.page > 0) {
        this.more = false
      }

      if (init) {
        this.lists = list.data.list
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      } else {
        this.lists = this.lists.concat(list.data.list)
      }
      wx.hideLoading()
    },
    // 获取扇贝每日一句
    getShanbay () {
      wx.request({
        url: 'https://rest.shanbay.com/api/v2/quote/quotes/today/',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success (res) {
          console.log('res:::', res)
        },
        error (err) {
          console.log('error:::', err)
        }
      })
    }
  },
  mounted () {
    this.getLists(true)
    // this.getShanbay()
  },
  onLoad () {
    wx.showLoading({title: '加载中'})
  }
}
</script>

<style lang="scss">
$white: #fff;
$bg-color: #F1F1F1;
$text-main: #262a2f;
$button-primary: #67c23a;
.item-box{
  padding: 0 10px;
  color: $text-main;
  background: $bg-color;
}
</style>
