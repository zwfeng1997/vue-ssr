const Koa = require('koa')
const send = require('koa-send')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const koaSession = require('koa-session')
let mongoose = require('mongoose')

const staticRouter = require('./routes/static')
// const apiRouter = require('./routes/api')

const My = require('./router')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/liu')
  .then(() => console.log('链接成功'))
  .catch((err) => console.log('Error:' + err))

const app = new Koa()

app.keys = ['vue ssr tech']
const CONFIG = {
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}
app.use(koaSession(CONFIG, app))
app.use(bodyParser())

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log('request with path' + ctx.path)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(My.routes(), My.allowedMethods())
// app.use(apiRouter.routes()).use(apiRouter.allowedMethods())
let pageRouter
if (isDev) {
  pageRouter = require('./routes/dev-ssr')
} else {
  pageRouter = require('./routes/ssr')
}
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

app.listen(PORT, HOST, () => {
  console.log('server is listening on' + HOST + ' ' + PORT)
})
