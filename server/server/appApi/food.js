const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

// 添加食物信息
router.post('/addFood',async(ctx)=>{
    console.log(ctx.request.body)
    const Food = mongoose.model('Food')
    let newFood=new Food(ctx.request.body)
    await newFood.save().then(()=>{
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
router.get('/getFoods',async(ctx)=>{
    try{
        const Food=mongoose.model('Food')
        let result=await Food.find()
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
router.post('/removeFood',async(ctx)=>{
    const Food=mongoose.model('Food')
    
    const result=await Food.find({
        foodname:ctx.request.body.foodname
        
    }).remove()
    ctx.body={code:200,message:result}
    
})

// 获取指定一个食物信息
router.post('/getFoodInfo',async(ctx)=>{
    try{
        let foodname=ctx.request.body.foodname
        const Food=mongoose.model('Food')
        let result=await Food.findOne({foodname:foodname}).exec()
        ctx.body={code:200,message:result} 
    }catch(err){
        ctx.body={
            code:500,
            message:err
        }
    }
})

module.exports=router;