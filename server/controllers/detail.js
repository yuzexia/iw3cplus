const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    console.log('ctx.request', ctx.request)
    let {tid} = ctx.request.query
    console.log('id::::::', tid)
    let detail = await mysql('lists')
                      .select('threads.*', 'lists.titleurl', 'lists.author', 'lists.views', 'lists.release_date')
                      .join('threads', 'threads.tid', 'lists.id')
                      .where('tid', tid)
                      .first()
    console.log('detail', detail)
    ctx.state.data = Object.assign({}, detail, {
        tags: JSON.parse(detail.tags),
        msg: 'success'
    })
}

