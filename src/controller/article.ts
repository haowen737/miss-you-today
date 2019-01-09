import * as fs from 'fs'
import * as path from 'path'

interface ArticleController {
  getList: any
  getArticle: any
  update: any
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
    const filePath = path.resolve(__dirname, `../../doc/${id}.md`)
    result.content = fs.readFileSync(filePath, 'utf-8')

    const currCount = result.view_count + 1
    await ctx.knex('articles').where('file_id', id).update('view_count', currCount)

    ctx.body = { data: result }
  },

  update: async (ctx: any) => {
    ctx.body = {}
  }
}

export default article
