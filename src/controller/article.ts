import * as path from 'path'
import * as fs from 'fs'

interface ArticleController {
  getList: any
  getArticle: any
  update: any
  getArticlesByTag: any
}

const article: ArticleController = {
  getList: async (ctx: any) => {
    const { knex } = ctx
    const articles = await knex.select('*').from('articles').orderBy('file_id')

    ctx.body = { data: articles }
  },

  getArticle: async (ctx: any, next) => {
    const id = ctx.query.id

    const result = await ctx.knex.first('*').from('articles').where('file_id', id)

    let filePath = path.resolve(__dirname, `../../doc/${id}.md`)
    result.content = fs.readFileSync(filePath, 'utf-8')

    let cur_count = result.view_count + 1
    await ctx.knex('articles').where('file_id', id).update('view_count', cur_count)
  
    ctx.body = { data: result }
  },

  update: async (ctx: any) => {
    ctx.body = {}
  }
}

export default article
