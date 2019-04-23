const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

// 添加食谱
router.post('/addRecipe',async(ctx)=>{
    console.log(ctx.request.body)
    const Recipe = mongoose.model('Recipe')
    let newRecipe=new Recipe(ctx.request.body)
    await newRecipe.save().then(()=>{
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

// 获取所有食谱
router.get('/getRecipes',async(ctx)=>{
    try{
        const Recipe=mongoose.model('Recipe')
        let result=await Recipe.find().sort({"_id":-1})
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




// 获取指定一个食谱
router.post('/getOneRecipe',async(ctx)=>{
    try{
        let recipeName=ctx.request.body.recipeName
        const Recipe=mongoose.model('Recipe')
        let result=await Recipe.findOne({recipeName:recipeName}).exec()
        ctx.body={code:200,message:result} 
    }catch(err){
        ctx.body={
            code:500,
            message:err
        }
    }
})

module.exports=router;