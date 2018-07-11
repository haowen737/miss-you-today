const article = module.exports = {}

article.getList = async (ctx) => {
  const { knex } = ctx
  const articles = await knex.select('*').from('articles').orderBy('file_id')

  ctx.body = { data: articles }
}

article.getArticle = async (ctx, next) => {
  let id = ctx.params.id
  let paper = {}
  let fs = require('fs')
  let path = require('path')
  let filePath = path.join(__dirname, '../doc/' + id + '.md')
  paper = await ctx.knex.select('*').from('articles').where('file_id', id)
  paper = paper[0]
  paper.content = fs.readFileSync(filePath, 'utf-8')
  let cur_count = paper.view_count + 1
  await ctx.knex('articles').where('file_id', id).update('view_count', cur_count)
  ctx.body = paper
}


