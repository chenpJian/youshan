const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.post('/addAdmin',async(ctx)=>{
    console.log(ctx.request.body)
    const Admin = mongoose.model('Admin')
    let newAdmin=new Admin(ctx.request.body)
    await newAdmin.save().then(()=>{
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

router.post('/',async(ctx)=>{
    let loginAdmin = ctx.request.body
    console.log(loginAdmin)
    let adminName=loginAdmin.adminName
    let adminPass=loginAdmin.adminPass
    const Admin=mongoose.model('Admin')
    await Admin.findOne({adminName:adminName}).exec().then(async(result)=>{
        console.log(result)
        if(result){
            let newAdmin=new Admin()
            if(adminPass==result.adminPass){
                ctx.body={
                    code:200,
                    message:'ok'
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

module.exports=router;