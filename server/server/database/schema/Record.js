const mongoose=require('mongoose')
const Schema=mongoose.Schema
let ObjectId=Schema.Types.ObjectId

const recordSchema=new Schema({
    recordID:{type:ObjectId},
    username:{type:String},//用户名
    recordname:{type:String},   //食物名称
    recordDate:{type:String},   //记录日期
    recordMeal:{type:String},   //记录三餐
    recordSum:{type:String},   //记录数量
    recordEnergy:{type:Number},   //食物热量

})

mongoose.model('Record',recordSchema)