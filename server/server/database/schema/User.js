//数据模型

const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
    UserId:{type:ObjectId},
    username:{type:String},  //账号
    password:{type:String},   //密码
    userPhysical:{type:String},  //体质
})

mongoose.model('User',userSchema)