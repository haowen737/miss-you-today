const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

app.use(require('koa-static')(__dirname + '/client/build'));

app.listen(3302);