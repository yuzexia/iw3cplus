<template>
  <div class="item">
    <h3 class="item-title">{{list.title}}</h3>
    <div class="item-header">
      <span>作者：大漠</span>
      <span>日期：2019-01-15</span>
      <span>点击：1975</span>
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
    }
  }
}
</script>

<style lang="scss">
$white: #fff;
$bg-color: #f7f7f7;
$text-main: #333;
$button-primary: #67c23a;
.item{
  margin: 10px 0;
  padding: 8px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,.5);
  .item-title{
    font-size: 18px;
  }
  .item-header{
    font-size: 14px;
    margin: 8px 0 5px;
    opacity: 0.8;
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
    font-size: 14px;
    opacity: 0.5;
    span{
      display: inline-block;
      margin: 0 5px;
      height: 18px;
      line-height: 18px;
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
