const router = require('koa-router')()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog') // 前缀

router.get('/list', async (ctx, next) => {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  if (ctx.query.isadmin) {
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel('未登录')
      return
    }

    // 强制查询自己的博客
    author = ctx.session.username
  }

  const result = await getList(author, keyword)
  ctx.body = new SuccessModel(result)
})

router.get('/detail', async (ctx, next) => {
  const result = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(result)
})

router.post('/new', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const result = await newBlog(body)
  console.log()
  ctx.body = new SuccessModel(result)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const result = await updateBlog(ctx.query.id, ctx.request.body)
  // 正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。
  if (result) ctx.body = new SuccessModel() 
  else ctx.body = new ErrorModel('更新失败') 
})

router.post('/del', loginCheck, async (req, res, next) => {
  const author = ctx.session.username
  const result = await delBlog(ctx.query.id, ctx.session.username)
  if (result) return ctx.body = new SuccessModel()
  else ctx.body = new ErrorModel()
})

module.exports = router
