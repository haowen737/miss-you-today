export default async (ctx, next) => {
  ctx.logger.info('----enter swapi-----')
  await next()
}
