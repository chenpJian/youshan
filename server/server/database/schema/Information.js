const mongoose=require('mongoose')
const Schema=mongoose.Schema
let ObjectId=Schema.Types.ObjectId

const inforSchema=new Schema({
    inforID:{type:ObjectId},
    inforTitle:{type:String},//标题
    inforLabel:{type:String},//标签
    inforDetail:{type:String},//内容
})

mongoose.model('Information',inforSchema)
