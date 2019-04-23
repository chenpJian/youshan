const Koa = require('koa')
const app = new Koa()
const {connect, initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser') //打通前后端
const cors = require('koa2-cors') //解决跨域
const serve = require('koa-static')//静态资源加载
const Router = require('koa-router')


//引入模块
// const {connect, initSchemas} = require('./database/init.js')

app.use(bodyParser())
app.use(cors())
app.use(serve('./assets'))

let user = require('./appApi/user.js')
let food = require('./appApi/food.js')
let recipe = require('./appApi/recipe.js')
let ingre = require('./appApi/ingre.js')
let information = require('./appApi/information.js')
let know = require('./appApi/know.js')
let admin = require('./appApi/admin.js')
let record = require('./appApi/record.js')
let share = require('./appApi/share.js')
let physique = require('./appApi/physique.js')

let router = new Router()
router.use('/user',user.routes())
router.use('/food',food.routes())
router.use('/recipe',recipe.routes())
router.use('/ingre',ingre.routes())
router.use('/information',information.routes())
router.use('/know',know.routes())
router.use('/admin',admin.routes())
router.use('/record',record.routes())
router.use('/share',share.routes())
router.use('/physique',physique.routes())

//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
;(async ()=>{
    await connect()
    initSchemas()
})()

app.use(async(ctx)=>{
    ctx.body='<h1>Home</h1>'
})

app.listen(3000,()=>{
    console.log('sever starting at http://localhost:3000')
})