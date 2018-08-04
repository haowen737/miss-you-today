const tags = {
  getTags: async (ctx) => {
    let articles = await ctx.knex.select('*').from('articles')
    let tags = []
    articles.map((art) => {
      let tag = art.tags.split(',')
      tags = tags.concat(tag)
    })
    ctx.body = { data: [...new Set(tags)] }
  },

  getArticles: async (ctx, next) => {
    const tag = ctx.query.tag
    console.log('tag----', tag)
    const searchTag = '%' + ctx.query.tag + '%'
    let articles = await ctx.knex.select('*').from('articles').where('tags', 'like', searchTag)
    ctx.body = { data: articles }
  },

}

export default tags
