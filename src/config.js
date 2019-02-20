// 配置项

// const host = 'http://192.168.0.100:5757'
const host = 'http://localhost:5757'
const imgHost = 'https://www.w3cplus.com'
// const host = 'https://sjgdzm1y.qcloud.la' // 测试环境域名

const config = {
  imgHost,
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`
}

export default config
