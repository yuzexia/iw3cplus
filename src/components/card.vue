<template>
  <div class="item">
    <h3 class="item-title">{{list.title}}</h3>
    <div class="item-header">
      <span v-show="list.author">作者：{{list.author}}</span>
      <span v-show="list.release_date">日期：{{format}}</span>
      <span v-show="list.views">浏览：{{list.views}}</span>
    </div>
    <div class="item-tags">
      <span v-for="(itl, i) in list.tags" :key="i">{{itl}}</span>
    </div>
    <div class="item-content">{{list.summary}}</div>
    <div class="item-button">
      <a :href="detailUrl">阅读全文</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list'],
  computed: {
    detailUrl () {
      return `/pages/detail/main?id=${this.list.id}`
    },
    format () {
      let d = this.list.release_date || ''
      return d.slice(0, 10)
    }
  }
}
</script>

<style lang="scss">
$white: #fff;
$bg-color: #f7f7f7;
$text-default: #969fa9;
$button-primary: #409eff;
$text-sign: #999;
.item{
  margin: 15px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  .item-title{
    font-size: 18px;
  }
  .item-header{
    font-size: 12px;
    margin: 8px 0 5px;
    color: $text-sign;
    span{
      display:inline-block;
      margin: 0 5px;
      &:first-child{
        margin-left: 0;
      }
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .item-tags{
    font-size: 12px;
    color: $text-sign;
    span{
      display: inline-block;
      margin: 0 5px;
      padding: 1px 4px;
      height: 16px;
      line-height: 16px;
      border: 1px solid $text-sign;
      border-radius: 5px;
      &:first-child{
        margin-left: 0;
      }
      &:last-child{
        margin-right: 0;
      }
    }
  }
  .item-content{
    margin: 5px 0 8px;
    font-size: 16px;
    word-wrap:break-word;
    color: $text-default;
  }
  .item-button{
    height: 35px;
    line-height: 35px;
    a{
      width: 100%;
      height: inherit;
      font-size: 14px;
      color: $white;
      border-radius: 5px;
      text-align: center;
      background: $button-primary;
    }
  }
}
</style>
