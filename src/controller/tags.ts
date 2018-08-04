const tags = {
  getTags: async (ctx) => {
    const articles = await ctx.knex.select('*').from('articles')
    let result = []
    articles.map((art) => {
      const tag = art.tags.split(',')
      result = result.concat(tag)
    })
    ctx.body = { data: [...new Set(result)] }
  },

  getArticles: async (ctx, next) => {
    const tag = ctx.query.tag
    console.log('tag----', tag)
    const searchTag = '%' + ctx.query.tag + '%'
    const articles = await ctx.knex.select('*').from('articles').where('tags', 'like', searchTag)
    ctx.body = { data: articles }
  }

}

export default tags
