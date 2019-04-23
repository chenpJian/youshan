//数据模型

const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const adminSchema = new Schema({
    UserId:{type:ObjectId},
    adminName:{type:String},
    adminPass:{type:String},
})

mongoose.model('Admin',adminSchema)