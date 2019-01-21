<template>
  <div class="container">
    <div class="item-box">
      <Card v-for="item in lists" :key="item.id" :list="item"></Card>
      <!-- <div class="item">
        <h3>聊聊重学前端</h3>
        <div class="item-header">
          作者：大漠 日期：2019-01-15点击：1975
        </div>
        <div class="item-tags">
          CSS  JavaScript  HTML5
        </div>
        <div class="item-content">
          这两天票圈被@Winter大大在极客时间平台推出的《重学前端》刷屏了，而且在微信群和知乎上都有相关讨论。讨论中各种声音都有，可算是热闹了。今天我也凑个热闹，来聊聊我对这个课程的看法。
        </div>
        <div class="item-button">
          <a href="javascript:;">阅读全文</a>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import {get} from '@/util'
import Card from '@/components/card'
// import { setTimeout } from 'timers'

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
  onPullDownRefresh () {
    this.getLists(true)
  },
  onReachBottom () {
    console.log('触底了.....')
    if (!this.more) {
      return false
    }
    this.page = this.page + 1
    this.getLists()
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              console.log('this:::', this)
              console.log('this.userInfo:::', this.userInfo)
            }
          })
        }
      })
    },
    // 获取数据
    loadData () {
      console.log('获取数据.....')
      console.log('index:::', this.index)
    },
    // 获取列表
    async getLists (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const list = await get('/weapp/lists', {page: this.page})
      console.log(list)

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
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  mounted () {
    this.getLists(true)
  }
}
</script>

<style lang="scss">
$white: #fff;
$bg-color: #f7f7f7;
$text-main: #333;
$button-primary: #67c23a;
.item-box{
  padding: 0 30rpx;
  color: $text-main;
}
</style>
