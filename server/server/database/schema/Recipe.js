const mongoose=require('mongoose')
const Schema=mongoose.Schema
let ObjectId=Schema.Types.ObjectId

const recipeSchema=new Schema({
    recipeID:{type:ObjectId},
    recipeName:{type:String},   //食谱名称
    recipeCls:{type:String},   //食谱分类
    recipePicture:{type:String},   //食谱图片
    recipeEfficacy:{type:String},    //功效
    recipeMate:{type:String},    //主料
    recipeGive:{type:String},    //制作步骤
})

mongoose.model('Recipe',recipeSchema)