//数据模型

const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const shareSchema = new Schema({
    ShareId:{type:ObjectId},
    sharePeople:{type:String},  //分享的用户
    shareRecipe:{type:String},  //分享菜单名
    file:{type:String},        //图片
    shareIngre:{type:String},  //食材
    shareStep:{type:String},  //步骤
})

mongoose.model('Share',shareSchema)