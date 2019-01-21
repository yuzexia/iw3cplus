<template>
  <div class="detail">
    <div class="detail-title">
      <h3>{{detail.title}}</h3>
    </div>
    <div class="detail-header">
      <div class="detail-basic">
        <span>作者：大漠</span>
        <span>日期：2019-01-15</span>
        <span>点击：1975</span>
      </div>
      <div class="detail-tags">
        <span v-for="itl in detail.tags" :key="itl">{{itl}}</span>
      </div>
    </div>
    <div class="detail-content">
        <!-- <div v-html="detail.message"></div> -->
        <wxParse :content="formatMessage"></wxParse>
    </div>
  </div>
</template>
<script>
import { get } from '@/util'
import config from '@/config'
import wxParse from 'mpvue-wxparse'
export default {
  data () {
    return {
      tid: 0,
      detail: {}
    }
  },
  computed: {
    // 格式化html片段
    formatMessage () {
      let msg = ''
      let reg = /src="[^"]*/g
      if (this.detail.message) {
        msg = this.detail.message.replace(reg, (item, index, str) => {
          // 给图片添加域名
          return `src="${config.imgHost}${item.slice(5)}`
        })
      }
      return msg
    }
  },
  components: {
    wxParse
  },
  mounted () {
    console.log('config', config)
    this.tid = this.$root.$mp.query.id
    console.log('=====', this.tid)
    this.getDetail()
  },
  methods: {
    // 获取详情
    async getDetail () {
      let detail = await get('/weapp/detail', { tid: this.tid })
      console.log(detail)
      if (Number(detail.code) === 0 && detail.data) {
        this.detail = detail.data
      }
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
$button-primary: #67c23a;
.detail {
  padding: 0 30rpx;
  color: $text-main;
  background: $white;
  .detail-title {
    font-size: 18px;
  }
  .detail-header {
    margin: 8px 0;
    font-size: 14px;
    opacity: 0.8;
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
      margin-top: 5px;
      opacity: 0.5;
    }
  }
  .detail-content {
    opacity: 0.75;
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
}
</style>

