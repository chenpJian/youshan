const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.post('/addRecord',async(ctx)=>{
    console.log(ctx.request.body)
    const Record = mongoose.model('Record')
    let newRecord=new Record(ctx.request.body)
    await newRecord.save().then(()=>{
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

router.get('/getRecords',async(ctx)=>{
    try{
        const Record=mongoose.model('Record')
        let result=await Record.find()
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

//某个用户的饮食记录
router.post('/getOneRecord',async(ctx)=>{
    try{
        let username=ctx.request.body.username
        const Record=mongoose.model('Record')
        let result=await Record.find({username:username})
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


router.post('/getSomeRecord',async(ctx)=>{
    try{
        let username=ctx.request.body.username
        let recordDate=ctx.request.body.recordDate
        const Record=mongoose.model('Record')
        let result=await Record.find({username:username,recordDate:recordDate})
        ctx.body={
            code:200,
            message:result
        } 
    }
    catch(err){
        ctx.body={
            code:500,
            message:err
        }
    }
})
module.exports=router;