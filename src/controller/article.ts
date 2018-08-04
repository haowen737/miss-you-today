
interface ArticleController {
  getList?: any
  getArticle?: any
  update?: any
}

const article: ArticleController = {
  getList: async (ctx: any) => {
    const { knex } = ctx
    const articles = await knex.select('*').from('articles').orderBy('file_id')

    ctx.body = { data: articles }
  },

  getArticle: async (ctx: any, next) => {
    const id = ctx.params.id
    // let filePath = path.join(__dirname, '../doc/' + id + '.md')

    const result = await ctx.knex.select('*').from('articles').where('file_id', id)

    ctx.body = result
  },

  update: async (ctx: any) => {
    ctx.body = {}
  }
}

export default article
