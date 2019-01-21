const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const {page, size = 10} = ctx.request.query
    console.log(page, size)
    const mysqlSelect = mysql('lists')
                        .select('lists.*', 'threads.tid')
                        .join('threads', 'lists.title', 'threads.title')
    console.log('mysqlselect', mysqlSelect)
    let lists
    lists = await mysqlSelect.limit(size).offset(Number(page) * 10)

    ctx.state.data = {
        list: lists.map(v => {
            const tag = JSON.parse(v.tags)
            return Object.assign({}, v, {
                tags: tag
            })
        })
    }
}
