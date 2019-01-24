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
              console.log('this:::', this)
              console.log('this.userInfo:::', this.userInfo)
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
      wx.hideLoading()
    }
  },
  mounted () {
    this.getLists(true)
  }
}
</script>

<style lang="scss">
$white: #fff;
$bg-color: #f7f7f7;
$text-main: #262a2f;
$button-primary: #67c23a;
.item-box{
  padding: 0 30rpx;
  color: $text-main;
}
</style>
