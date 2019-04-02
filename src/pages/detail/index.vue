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
        <div class="detail-signature">
          <a class="author" href="/pages/about/main" open-type="switchTab">
            <img :src="imgUrls.author" alt="">
          </a>
          <p>著作权归作者所有。</p>
          <p>商业转载请联系作者获得授权,非商业转载请注明出处。</p>
          <p><i>{{detail.titleurl}}</i></p>
        </div>
        <div class="detail-share">
          <div class="text">分享到</div>
          <div class="button-box">
            <button class="share-button" plain="true" type="default" open-type="share">
              <img :src="imgUrls.wx" alt="">
            </button>
            <!-- <button 
              class="share-button share-moments" 
              plain="true"
              type="default"
              open-type="share">
                <img :src="imgUrls.moments" alt="">
              </button> -->
          </div>
        </div>
        <div class="copyright">
          © w3cplus.com
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
      message: '',
      imageProp: {
        mode: 'aspectFit',
        padding: 0,
        lazyLoad: true,
        domain: 'www.w3cplus.com'
      },
      noData: `<div class="no-data">
                <div class="pic">
                    <span class="child"></span>
                    <span class="child"></span>
                    <span class="child"></span>
                    <span class="child"></span>
                    <span class="child"></span>
                </div>
              </div>`,
      imgUrls: {
        author: require('../../../static/images/airen.jpg'),
        wx: require('../../../static/images/wx_logo_icon.png'),
        moments: require('../../../static/images/wx_moments_icon.png')
      }
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
      return msg
    }
  },
  components: {
    wxParse
  },
  mounted () {
    // console.log('config', this.$root.$mp)
    this.tid = this.$root.$mp.query.id
    this.getDetail()
  },
  beforeDestroy () {
    this.detail = {}
    // console.log('销毁之前', this.detail)
  },
  onLoad () {
    // wx.showLoading({ title: '加载中...' })
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onUnload () {
    this.detail = {}
    // console.log('onUnload', this.detail)
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
      // console.log(detail)
      if (Number(detail.code) === 0 && detail.data) {
        this.detail = detail.data
        // wx.hideLoading()
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

$title-text: rgba(0,0,0,.84);
$content-text: rgba(0,0,0,.54);

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
    color: $title-text;
    font-weight: 600;
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
      // margin-top: 5px;
      opacity: 0.5;
      span{
        margin-top: 5px;
        margin-left: 0;
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
      .author{
        display:block;
        margin: 16px auto;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: 0 0 5px rgba(0,0,0,.5);
        overflow: hidden;
        img{
          display: inline-block;
          width: 100px;
          height: 100px;
        }
      }
      p{
        line-height: 28px;
        i{
          display: inline-block;
          color: $hover;
        }
      }
    }
    // no-data
    .no-data{
      position: relative;
      width: 100%;
      height: 200px;
      color: #00b7e9;
      text-align:center;
      .pic{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 40px;
        font-size: 0;
        .child{
          display: inline-block;
          margin: 0 2px;
          width: 6px;
          height: 40px;
          transform: scaleY(0.4);
          animation: loading 1s infinite;
          background: #e5e5e5;
          border-radius: 5px;
          &:nth-child(2) {
            animation-delay: 0.1s;
          }
          &:nth-child(3) {
            animation-delay: 0.2s;
          }
          &:nth-child(4) {
            animation-delay: 0.3s;
          }
          &:nth-child(5) {
            animation-delay: 0.4s;
          }
        }
      }
      @keyframes loading{
          0%, 40%, 100%{transform: scaleY(0.4)}
          20%{transform: scaleY(1)}
      }
    }
    // 分享
    .detail-share{
      // display: flex;
      margin: 20px auto 10px;
      padding: 10px;
      width: 50%;
      height: auto;
      // border: 1px solid rgba(9, 187, 7, .2);
      border-radius: 5px;
      box-sizing:border-box;
      .text{
        // display:none;
        margin: 0 auto 10px;
        text-align:center;
        font-size: 12px;
        color: #aaa;
      }
      .button-box{
        display: flex;
      }
      .share-button{
        padding: 0;
        display: inline-block;
        width: 50px;
        height: 50px;
        // border-radius: 50%;
        // background-image: url('../../../static/images/wx_logo_icon.png');
        // background-repeat: no-repeat;
        // background-position: center center;
        // background-size: 35px auto;
        // border: 1px solid rgba(9, 187, 7, .5);
        border: none;
      }
      img{
        display:inline-block;
        width: 50px;
        height: 50px;
      }
    }
    .copyright{
      font-size: 14px;
      color: $text-sign;
      text-align: center;
    }
  }
}
</style>
