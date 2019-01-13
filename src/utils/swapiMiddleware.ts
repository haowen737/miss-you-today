export default async (ctx, next) => {
  const header = ctx.request.header
  ctx.logger.info(`request received host from ${header.host}, user-agent ${header['user-agent']}`)
  await next()
}
