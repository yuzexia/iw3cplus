// 配置项

const host = 'http://localhost:5757'
const imgHost = 'https://www.w3cplus.com'
// const host = 'https://eeweou0j.qcloud.la' // 测试环境域名

const config = {
  imgHost,
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`
}

export default config
