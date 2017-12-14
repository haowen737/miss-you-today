const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

// router.use('/api', api.routes(), api.allowedMethods());

// app.use(response_formatter('^/api'));
app.use(require('koa-static')(__dirname + '/client/build'));

app.listen(3302);