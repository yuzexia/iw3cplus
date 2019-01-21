const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    console.log('ctx.request', ctx.request)
    let {tid} = ctx.request.query
    console.log('id::::::', tid)
    let detail = await mysql('threads')
                      .select('threads.*')
                      .where('tid', tid)
                      .first()
    console.log('detail', detail)
    ctx.state.data = Object.assign({}, detail, {
        tags: JSON.parse(detail.tags)
    })
}

