const mongoose=require('mongoose')
const Schema=mongoose.Schema
let ObjectId=Schema.Types.ObjectId

const ingreSchema=new Schema({
    foodID:{type:ObjectId},
    foodname:{type:String},   //食物名称
    foodEnergy:{type:Number},   //每100克食物热量
    protein:{type:Number},   //蛋白质
    fat:{type:Number},   //脂肪
    Carbohydrate:{type:Number},   //碳水化合物
    DietaryFiber:{type:Number},   //膳食纤维
    VitaminA:{type:Number},   //维生素A
    Carotene:{type:Number},   //胡罗卜素
    Retinol:{type:Number},   //视黄醇当量
    Thiamine:{type:Number},   //硫胺素
    Riboflavin:{type:Number},   //核黄素
    niacin:{type:Number},   //烟酸
    VitaminC:{type:Number},   //维生素C
    VitaminE:{type:Number},   //维生素E
    cholesterol:{type:Number},   //胆固醇
    Potassium:{type:Number},   //钾
    sodium:{type:Number},   //钠
    calcium:{type:Number},   //钙
    magnesium:{type:Number},   //镁
    iron:{type:Number},   //铁
    manganese:{type:Number},   //锰
    Zinc:{type:Number},   //锌
    copper:{type:Number},   //铜
    phosphorus:{type:Number},   //磷
    selenium:{type:Number},   //硒
})

mongoose.model('Ingre',ingreSchema)