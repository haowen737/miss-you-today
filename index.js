const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();

const api = require('./routes/api');

router.use('/api', api.routes(), api.allowedMethods());

app.listen(3000);