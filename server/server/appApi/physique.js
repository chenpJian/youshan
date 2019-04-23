const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.post('/addPhysique',async(ctx)=>{
    console.log(ctx.request.body)
    const Physique = mongoose.model('Physique')
    let newPhysique=new Physique(ctx.request.body)
    await newPhysique.save().then(()=>{
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
router.get('/getPhysique',async(ctx)=>{
    // console.log()
    try{
        const Physique=mongoose.model('Physique')
        let result=await Physique.find().sort({"_id":-1})
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
router.post('/getOnePhysique',async(ctx)=>{
    try{
        let phyName=ctx.request.body.phyName
        const Physique=mongoose.model('Physique')
        let result=await Physique.findOne({phyName:phyName}).exec()
        ctx.body={code:200,message:result} 
    }catch(err){
        ctx.body={
            code:500,
            message:err
        }
    }
})

module.exports=router;