const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()


// 添加资讯信息
router.get('/',async(ctx)=>{
    ctx.body="用户操作首页"
})
router.post('/addInfor',async(ctx)=>{
    console.log(ctx.request.body)
    const Information = mongoose.model('Information')
    let newInformation=new Information(ctx.request.body)
    await newInformation.save().then(()=>{
        ctx.body={
            code:200,
            message:'添加成功'
        }
    }).catch(error=>{
        ctx.body={
            code:500,
            message:error
        }
    })
})

// 获取所有资讯信息
router.get('/getInfor',async(ctx)=>{
    // console.log()
    try{
        const Information=mongoose.model('Information')
        let result=await Information.find().sort({"_id":-1})
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

// 获取指定一个资讯信息
router.post('/getOneInfo',async(ctx)=>{
    try{
        let inforTitle=ctx.request.body.inforTitle
        const Information=mongoose.model('Information')
        let result=await Information.findOne({inforTitle:inforTitle}).exec()
        ctx.body={code:200,message:result} 
    }catch(err){
        ctx.body={
            code:500,
            message:err
        }
    }
})

module.exports=router;