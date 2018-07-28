let fs = require('fs')
let path = require('path')

const article = module.exports = {}

article.getList = async (ctx) => {
  const { knex } = ctx
  const articles = await knex.select('*').from('articles').orderBy('file_id')

  ctx.body = { data: articles }
}

article.getArticle = async (ctx, next) => {
  let id = ctx.params.id
  // let filePath = path.join(__dirname, '../doc/' + id + '.md')
  
  const result = await ctx.knex.select('*').from('articles').where('file_id', id)

  ctx.body = paper
}


article.update = async (ctx) => {
  ctx.body = true
}
