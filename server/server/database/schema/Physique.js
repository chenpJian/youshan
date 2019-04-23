const mongoose=require('mongoose')
const Schema=mongoose.Schema
let ObjectId=Schema.Types.ObjectId

const phySchema=new Schema({
    phyID:{type:ObjectId},
    phyName:{type:String},  //体质名称
    phyDetail:{type:String}, //体质介绍
    phyReason:{type:String}, //形成原因
    phyAdjust:{type:String}, //饮食推荐
})

mongoose.model('Physique',phySchema)