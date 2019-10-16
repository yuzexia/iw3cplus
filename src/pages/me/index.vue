
<template>
  <div class="me">
    <button @click="getToken">获取</button>
    <a href="/pages/index/main" open-type="switchTab">回首页</a>
    <a href="/pages/about/main" open-type="switchTab">回关于</a>
    <img :src="_src" alt="">
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data () {
    return {
      appid: 'wx5cfea44e3c9b8f5d',
      appS: '9f19fff313bc0017c9202a440fad65cd',
      scene: '',
      _src: ''
    }
  },
  onLoad(query) {
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    console.log('query:::', query)
    this.scene = decodeURIComponent({tid: 155})
  },
  mounted () {
      this.$nextTick(() => {
          this.getToken()
      })
  },
  methods: {
    getToken () {
      let token = new Promise((resolve, reject) => {
        wx.request({
            url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.appS}`,
            method: 'get',
            data: {},
            success (res) {
                console.log(res)
                if (Number(res.statusCode) === 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            },
            error (err) {
                console.log(err)
            }
        })
      })
      token.then((res) => {
        let {access_token} = res
        this.getCode(access_token)
      }).catch()
    },
    getCode (token) {
      console.log('this:::', this)
     let _this = this
      wx.request({
        url: `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${token}`,
        method: 'POST',
        responseType: 'arraybuffer', //指定返回数据的格式为blob
        header: { 
            'content-type': 'application/json' 
        }, 
        dataType: 'json',
        data: {
            path: "?foo=bar"
        },
        success (res) {
          console.log('getCode', res)
          
          let data = res.data
          console.log('data:::', new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
          _this._src = data
        //   var _src='data:image/jpg;base64,'+ btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        //   console.log('_src:::', _src)
        },
        error (err) {
          console.log('getCode:::err', err)
        }
      })
    }
  }
}
</script>
