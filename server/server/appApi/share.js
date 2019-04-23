const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

// 添加食物信息
router.post('/addShare',async(ctx)=>{
    console.log(ctx.request.body)
    const Share = mongoose.model('Share')
    let newShare=new Share(ctx.request.body)
    await newShare.save().then(()=>{
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

// 获取所有食物信息
router.get('/getShare',async(ctx)=>{
    try{
        const Share=mongoose.model('Share')
        let result=await Share.find().sort({"_id":-1})
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



// 获取指定一个食物信息
router.post('/getOneShare',async(ctx)=>{
    try{
        let shareRecipe=ctx.request.body.shareRecipe
        const Share=mongoose.model('Share')
        let result=await Share.findOne({shareRecipe:shareRecipe}).exec()
        ctx.body={code:200,message:result} 
    }catch(err){
        ctx.body={
            code:500,
            message:err
        }
    }
})

module.exports=router;