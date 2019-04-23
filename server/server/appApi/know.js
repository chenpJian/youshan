const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

// 添加优膳小知识信息
router.post('/addKnow',async(ctx)=>{
    console.log(ctx.request.body)
    const Know = mongoose.model('Know')
    let newKnow=new Know(ctx.request.body)
    await newKnow.save().then(()=>{
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

// 获取所有优膳小知识信息
router.get('/getKnows',async(ctx)=>{
    try{
        const Know=mongoose.model('Know')
        let result=await Know.find()
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


// 删除优膳小知识
router.post('/removeKnow',async(ctx)=>{
    const Know=mongoose.model('Know')
    
    const result=await Know.find({
        knowTitle:ctx.request.body.knowTitle
        
    }).remove()
    ctx.body={code:200,message:result}
    
})

// 获取指定一个优膳小知识信息
router.post('/getOneKnow',async(ctx)=>{
    try{
        let knowTitle=ctx.request.body.knowTitle
        const Know=mongoose.model('Know')
        let result=await Know.findOne({knowTitle:knowTitle}).exec()
        ctx.body={code:200,message:result} 
    }catch(err){
        ctx.body={
            code:500,
            message:err
        }
    }
})

module.exports=router;