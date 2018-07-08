const article = module.exports = {}

article.get = async (ctx) => {
  ctx.body = 'get dog ok'
}

article.put = async (ctx) => {
  ctx.status = 201;
  ctx.body = {
    name: 'post dog ok'
  }
}