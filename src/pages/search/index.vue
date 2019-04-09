<template>
  <div class="search">
    <div class="input-box">
        <div class="search-input">
            <input type="text"
                    v-model="keyworld"
                    focus="true"
                    placeholder="搜索一下，你就知道"
                    placeholder-style="#ccc">
            <img @tap="clear" :class="{'block': showIcon}" :src="imgUrls.searchIcon" alt>
            <button class="search-btn" @click="handleClick" size="mini">搜索</button>
        </div>
    </div>
    <div class="search-hot" v-if="showTags">
        <h3>标签</h3>
        <div class="tags-box">
            <span class="tag" v-for="item in tags" :key="item" @tap="searchHandle(true, item, 1)">{{item}}</span>
        </div>
    </div>
    <div class="search-content">
        <Card v-for="item in lists" :key="item.id" :list="item"></Card>
    </div>
    <div class="search-empty" v-if="showNoData">
        <img :src="imgUrls.noData" alt="">
        没有找到你想要的东东...
    </div>
  </div>
</template>

<script>
import { post } from '@/util'
import Card from '@/components/card'

export default {
  data () {
    return {
      keyworld: '',
      imgUrls: {
        searchIcon: require('../../../static/images/close.png'),
        noData: require('../../../static/images/nodata.png')
      },
      page: 0,
      more: true,
      type: 0,
      lists: [],
      showNoData: false,
      tags: ['css', 'javascript', 'vue', 'react', 'sass', 'flexbox', 'svg'],
      showTags: true
    }
  },
  computed: {
    showIcon () {
      if (this.keyworld.trim().length) {
        return true
      } else {
        return false
      }
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
  onReachBottom () {
    if (!this.more) {
      return false
    }
    this.page = this.page + 1
    this.searchHandle()
  },
  onHide () {
    this.lists = []
    this.more = true
    this.page = 0
    this.keyworld = ''
    this.showNoData = false
    this.showTags = true
  },
  methods: {
    async searchHandle (init, value, type) {
      wx.showLoading({title: '加载中...'})
      this.showTags = false
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      if (value) {
        this.keyworld = value
        this.type = type
      }
      let world = this.keyworld.trim()
      let keyworld = this.formatBody(world)
      console.log(keyworld)
      let list = await post('/weapp/search', {keyworld, page: this.page, type: this.type})
      if (list.data.lists.length < 10 && this.page > 0) {
        this.more = false
      }
      if (Number(list.code) === 0) {
        wx.hideNavigationBarLoading()
        if (init) {
          this.lists = list.data.lists
          wx.stopPullDownRefresh()
          if (!list.data.lists.length) {
            this.showNoData = true
          } else {
            this.showNoData = false
          }
        } else {
          this.lists = this.lists.concat(list.data.lists)
        }
      }
      wx.hideLoading()
    },
    handleClick (e) {
      if (this.keyworld.trim()) {
        this.type = 0
        this.searchHandle(true)
      }
    },
    // 清空输入框
    clear () {
      this.keyworld = ''
      this.lists = []
      this.showTags = true
    },
    // 格式化post参数
    formatBody (str) {
      let _temp = ''
      let _arr = str.split(' ')
      if (str) {
        _arr.forEach((item, index) => {
          if (item !== '') {
            _temp += `%${item}`
          }
          if (index === _arr.length - 1) {
            _temp += '%'
          }
        })
      }
      return _temp
    }
  }
}
</script>

<style lang="scss">
.search {
    // padding: 0 10px;
    .block{
        opacity: 1 !important;
    }
    .input-box{
        position: fixed;
        top: 0;
        padding: 10px 0;
        width: 100%;
        background: #eee;
        box-shadow: 0 0px 10px rgba(0,0,0,.5);
    }
    .search-input{
        padding: 2px 10px 2px 10px;
        font-size: 0;
        border-radius: 2px;
        background: #fff;
        box-sizing: border-box;
        z-index: 2;
        .mark{
            position: absolute;
            content: '';
            top: -10px;
            left: 0;
            width: 100%;
            height: 56px;
            background: #eee;
            z-index: 1;
        }
        img,
        input,
        .search-btn{
            display: inline-block;
            vertical-align: middle;
        }
        img{
            margin: 0 5px;
            padding: 2px;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #ebebeb;
            z-index: 2;
            opacity: 0;
        }
        input{
            height: 32px;
            width: calc(100% - 70px);
            font-size: 14px;
            // background: #f66;
        }
        .search-btn{
            padding: 0;
            width: 44px;
            height: 26px;
            line-height: 26px;
            border-radius: 20px;
            border: none;
            color: #fff;
            background: #29B4F0;
            &:after{
                border:none;
            }
        }
    }
    .search-hot,
    .search-content,
    .search-empty{
        margin-top: 60px;
    }
    .search-hot{
        padding: 20px 10px;
        box-sizing: border-box;
        h3{
            font-size: 14px;
            color: #666;
        }
        .tags-box{
            margin: 8px 0;
            .tag{
                display: inline-block;
                margin: 5px;
                padding: 0 10px;
                height: 28px;
                line-height: 28px;
                font-size: 12px;
                color: #fff;
                background: rgba(41, 180, 240, .9);
                border-radius: 50px;
            }
        }
    }
    .search-empty{
        padding-top: 20px;
        width: 100%;
        font-size: 14px;
        text-align: center;
        color: #ccc;
        img{
            display: block;
            margin: 5px auto;
            width: 221px;
            height: 109px;
        }
    }
}
</style>

