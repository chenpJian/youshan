const mongoose=require('mongoose')
const Schema=mongoose.Schema
let ObjectId=Schema.Types.ObjectId

const knowSchema=new Schema({
    knowID:{type:ObjectId},
    knowTitle:{type:String},   //知识标题
    knowAlt:{type:String},   //知识文章

})

mongoose.model('Know',knowSchema)