<template>
  <div class="about">
    <img class="bgimg" :src="imgArr.logoUrl"/>
    <div
      class="text"
    >W3cplus是一个致力于推广国内前端行业的技术博客。它以探索为己任，不断活跃在行业技术最前沿，努力提供高质量前端技术博文；其文章范围广泛，主要以CSS3、HTML5、JavaScript、Vue、React、Mobile、动画等教程、译文和案例为主。</div>
    <div class="text">W3cplus提供相关广告展示与招聘发布，有需要的请联系：微信号w3cplus，E-mail:airenliao@gmail.com</div>
    <img class="bgimg author" :src="imgArr.authorUrl"/>
    <div class="text">常用昵称“大漠”，
      <i>W3CPlus</i>创始人，目前就职于淘宝。对HTML5、CSS3和CSS处理器等前端脚本语言有非常深入的认识和丰富的实践经验，尤其专注对CSS3和动画的研究，是国内最早研究和使用CSS3和CSS处理器技术的一批人。现在主要在探讨学习JavaScript、React和Vue相关技术知识。CSS3、CSS处理器和Drupal中国布道者。2014年出版《图解CSS3：核心技术与案例实战》。
    </div>
    <div class="group">
      期待各位大佬进群交流开发心得=。=
      <img :src="imgArr.wechatGroup" alt="" @tap="previewImage">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgArr: {
        logoUrl: require('../../../static/images/logo.jpeg'),
        authorUrl: require('../../../static/images/airen.jpg'),
        wechatGroup: require('../../../static/images/wx-qcode.png')
      }
    }
  },
  onShareAppMessage () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  methods: {
    previewImage () {
      wx.previewImage({
        current: 'http://www.xiayuze.com/wxtools/wechatGroup.png', // 当前显示图片的http链接
        urls: ['http://www.xiayuze.com/wxtools/wechatGroup.png'] // 需要预览的图片http链接列表
      })
    }
  }
}
</script>

<style lang="scss">
.about {
  padding-top: 16px;
  font-size: 12px;
  color: #aaa;
  .bgimg {
    margin: 0 auto;
    display:block;
    width: 100px;
    height: 100px;
    text-align: center;
    // background-color: #36363d;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% auto;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
  .text {
    margin: 8px 0;
    padding: 0 16px;
    text-indent: 16px;
    i {
      text-indent: 0;
      display: inline-block;
      color: #29b4f0;
      font-style: normal;
    }
  }
  .author {
    background-color: transparent;
    // border-radius: 50%;
  }
  .group{
    text-align: center;
    img{
      margin:8px auto 16px;
      display: block;
      width: 144px;
      height: 144px;
    }
  }
}
</style>
