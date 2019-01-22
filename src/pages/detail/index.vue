<template>
  <div class="detail">
    <div class="detail-title">
      <h3>{{detail.title}}</h3>
    </div>
    <div class="detail-header">
      <div class="detail-basic">
        <span v-show="detail.author">作者：{{detail.author}}</span>
        <span v-show="detail.release_date">日期：{{format}}</span>
        <span v-show="detail.views">浏览：{{detail.views}}</span>
      </div>
      <div class="detail-tags">
        <span v-for="itl in detail.tags" :key="itl">{{itl}}</span>
      </div>
    </div>
    <div class="detail-content">
        <!-- <div v-html="detail.message"></div> -->
        <wxParse className="detail-message" :content="detail.message" @preview="preview" @navigate="navigate" :imageProp="imageProp" :noData="noData"></wxParse>
        <!-- <wxparser class="detail-message" :rich-text="formatMsg"></wxparser> -->
        <div class="detail-share">
          <button type="default" open-type="share">分享</button>
        </div>
        <div class="detail-signature">
          <p>著作权归作者所有。</p>
          <p>商业转载请联系作者获得授权,非商业转载请注明出处。</p>
          <p>原文: <i>{{detail.titleurl}}</i> © w3cplus.com</p>
        </div>
    </div>
  </div>
</template>
<script>
import { get } from '@/util'
import {formatTime} from '@/utils/index.js'
import config from '@/config'
import wxParse from 'mpvue-wxparse'
export default {
  data () {
    return {
      tid: 0,
      detail: {},
      imageProp: {
        mode: 'aspectFit',
        padding: 0,
        lazyLoad: false,
        domain: 'www.w3cplus.com'
      },
      noData: '<div style="color: #00b7e9;text-align:center;">Loading...</div>'
    }
  },
  computed: {
    format () {
      let d = this.detail.release_date || ''
      return d.slice(0, 10)
    },
    // 格式化html片段
    formatMessage () {
      let msg = ''
      let reg = /src="[^"]*/g
      if (this.detail.message) {
        msg = this.detail.message.replace(reg, (item, index, str) => {
          // 给图片添加域名
          return `src="${config.imgHost}${item.slice(5)}`
        }).replace(/\\/g, '').replace(/\n/g, '')
      }
      console.log('msg:::', msg)
      return msg
    }
  },
  components: {
    wxParse
  },
  mounted () {
    console.log('config', this.$root.$mp)
    this.tid = this.$root.$mp.query.id
    console.log('=====', this.tid)
    this.getDetail()
  },
  beforeDestroy () {
    this.detail = {}
    console.log('销毁之前', this.detail)
  },
  onLoad () {
    wx.showLoading({ title: '加载中...' })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onUnload () {
    this.detail = {}
    console.log('onUnload', this.detail)
  },
  onShareAppMessage () {
    return {
      title: this.detail.title,
      path: this.$root.$mp
    }
  },
  methods: {
    formatTime,
    // 获取详情
    async getDetail () {
      let detail = await get('/weapp/detail', { tid: this.tid })
      console.log(detail)
      if (Number(detail.code) === 0 && detail.data) {
        this.detail = detail.data
        console.log('this.detail:::', this.detail)
        wx.hideLoading()
      }
    },
    preview (src, e) {
      console.log('previes:::', src)
      console.log('previes:::', e)
    },
    navigate (href, e) {
      console.log('navigate:::', href)
      console.log('navigate:::', e)
    }
  }
}
</script>

<style lang="scss">
@import url("~mpvue-wxparse/src/wxParse.css");
$white: #fff;
$bg-color: #f7f7f7;
$title-color: #00b7e9;
$text-main: #333;
$text-sign: #999;
$button-primary: #409eff;
$hover: #29B4F0;
.detail {
  padding: 0 30rpx;
  color: $text-main;
  background: $white;
  .detail-title {
    font-size: 18px;
  }
  .detail-header {
    margin: 8px 0;
    font-size: 12px;
    opacity: 0.5;
    span {
      display: inline-block;
      margin: 0 5px;
      height: 18px;
      line-height: 18px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    .detail-basic {
    }
    .detail-tags {
      font-size: 12px;
      margin-top: 5px;
      opacity: 0.5;
      span{
        padding: 1px 4px;
        display: inline-block;
        height: 16px;
        line-height: 16px;
        border: 1px solid $text-sign;
        border-radius: 5px;
      }
    }
  }
  .detail-content {
    padding-bottom: 50px;
    .detail-message{
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        color: $title-color;
      }
      img{
          width: 100%;
          height: auto;
      }
    }
    .detail-signature{
      font-size: 14px;
      color: $text-sign;
      p{
        line-height: 28px;
        i{
          color: $hover;
        }
      }
    }
  }
}
</style>

