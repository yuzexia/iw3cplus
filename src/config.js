// 配置项
// const host = 'http://localhost:5757' // 本地服务器
const host = 'https://www.xiayuze.com' // 线上服务器
const imgHost = 'https://www.w3cplus.com'
// const host = 'https://sjgdzm1y.qcloud.la' // 测试环境域名

const config = {
  imgHost,
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`
}

export default config
