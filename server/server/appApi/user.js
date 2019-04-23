const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/',async(ctx)=>{
    ctx.body="用户操作首页"
})
router.post('/Register',async(ctx)=>{
    console.log(ctx.request.body)
    const User = mongoose.model('User')
    let newUser=new User(ctx.request.body)
    await newUser.save().then(()=>{
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(error=>{
        ctx.body={
            code:500,
            message:error
        }
    })
})

router.post('/Login',async(ctx)=>{
    let loginUser = ctx.request.body
    console.log(loginUser)
    let username=loginUser.username
    let password=loginUser.password
    const User=mongoose.model('User')
    await User.findOne({username:username}).exec().then(async(result)=>{
        console.log(result)
        if(result){
            let newUser=new User()
            if(password==result.password){
                ctx.body={
                    code:200,
                    message:result.username
                }
            }else{
                ctx.body={
                    code:500,
                    message:'密码错误'
                }
            }
        }else{
            ctx.body={
                code:500,
                message:'用户名不存在'
            }
        }
    }).catch(error=>{
        console.log(error)
        ctx.body={
            code:500,
            message:error
        }
    })
})

router.post('/Bodydata',async(ctx)=>{
    console.log(ctx.request.body)
    const User = mongoose.model('User')
    let newUser=new User(ctx.request.body)
    await newUser.save().then(()=>{
        ctx.body={
            code:200,
            message:'修改成功'
        }
    }).catch(error=>{
        ctx.body={
            code:500,
            message:error
        }
    })
})

router.get('/getUser',async(ctx)=>{
    // console.log()
    try{
        const User=mongoose.model('User')
        let result=await User.find()
        ctx.body={
            code:200,
            message:result
        }
    }catch(err){
        ctx.body={
            code:500,
            message:err
        }
    }
})

module.exports=router;