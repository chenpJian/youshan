const mongoose=require('mongoose')
const Schema=mongoose.Schema
let ObjectId=Schema.Types.ObjectId

const foodSchema=new Schema({
    foodID:{type:ObjectId},
    foodname:{type:String},   //食物名称
    foodCls:{type:String},   //食物分类
    foodAtb:{type:String},   //食物属性
    foodPicture:{type:String},   //食物图片
    foodIntro:{type:String},    //食物简介
    foodDatails:{type:String},    //食物详细信息
    foodEfficacy:{type:String},   //食物功效
    foodValue:{type:String},     //食物营养价值
    tabooCrowd:{type:String},     //饮食注意
    foodEnergy:{type:Number},   //每100克食物热量
})

mongoose.model('Food',foodSchema)