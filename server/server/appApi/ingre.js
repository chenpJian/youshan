const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

// 添加食物营养成分
router.post('/addIngre',async(ctx)=>{
    console.log(ctx.request.body)
    const Ingre = mongoose.model('Ingre')
    let newIngre=new Ingre(ctx.request.body)
    await newIngre.save().then(()=>{
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

// 获取所有食物营养成分
router.get('/getIngres',async(ctx)=>{
    try{
        const Ingre=mongoose.model('Ingre')
        let result=await Ingre.find()
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


// 删除食物
router.post('/removeIngre',async(ctx)=>{
    const Ingre=mongoose.model('Ingre')
    
    const result=await Ingre.find({
        foodname:ctx.request.body.foodname
        
    }).remove()
    ctx.body={code:200,message:result}
    
})

// 获取指定一个食物营养成分
router.post('/getIngreInfo',async(ctx)=>{
    try{
        let foodname=ctx.request.body.foodname
        const Ingre=mongoose.model('Ingre')
        let result=await Ingre.findOne({foodname:foodname}).exec()
        ctx.body={code:200,message:result} 
    }catch(err){
        ctx.body={
            code:500,
            message:err
        }
    }
})

module.exports=router;