const Router = require('koa-router')

const Todo = require('./db/Todo')
const User = require('./db/User')

let router = new Router()

router.post('/logins', async (ctx) => {
  console.log(ctx.session.user)
  let param = ctx.request.body
  let data = await User.findOne(param)
  if (data) {
    console.log('登陆成功')
    ctx.session.user = data
  } else {
    console.log('登陆失败')
  }
  ctx.body = {
    data,
    success: true
  }
})

router.get('/sess', async (ctx) => {
  let data = ''
  if (ctx.session.user) {
    console.log('已经登录')
    data = '已经登录'
  } else {
    console.log('没有登录')
    data = '没有登录'
  }
  ctx.body = {
    data,
    success: true
  }
})

router.get('/list', async (ctx) => {
  let todos = await Todo.find()
  ctx.response.type = 'application/json'
  ctx.body = {
    data: todos,
    success: true
  }
})

router.post('/add', async (ctx) => {
  let param = ctx.request.body
  console.log(param)
  let data = await Todo.create(param)
  ctx.body = {
    data,
    success: true
  }
})

router.delete('/delete/:id', async (ctx) => {
  let param = ctx.request.body
  let id = ctx.params.id
  let data = await Todo.findByIdAndRemove(id, param)
  ctx.body = {
    data,
    success: true
  }
})

router.put('/put/:id', async (ctx) => {
  let param = ctx.request.body
  let id = ctx.params.id
  let data = await Todo.findByIdAndUpdate(id, param)
  ctx.body = {
    data,
    success: true
  }
})

router.delete('/deleteif', async (ctx) => {
  let tiao = {
    completed: true
  }
  let todos = await Todo.find(tiao)
  let arr = []
  todos.forEach(item => arr.push(item._id))
  let condition = {
    _id: { $in: arr }
  }
  console.log(condition)
  let data = await Todo.remove(condition)
  ctx.body = {
    data,
    success: true
  }
})

module.exports = router
