const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://localhost:3000/"

const URL={
    getFoods:BASEURL+'index',
    registerUser:LOCALURL+'user/Register',//用户注册接口
    bodydata:LOCALURL+'user/Bodydata',//用户注册接口
    login:LOCALURL+'user/Login',//用户登录接口
    getFood:LOCALURL+'food/getFoods',// 获取所有食物信息
    getFoodInfo:LOCALURL+'food/getFoodInfo',// 获取一个食物信息
    getIngres:LOCALURL+'ingre/getIngres',// 获取食物营养成分
    getIngreInfo:LOCALURL+'ingre/getIngreInfo',// 获取一个食物营养成分
    getInfor:LOCALURL+'information/getInfor',// 获取资讯
    getOneInfo:LOCALURL+'information/getOneInfo',// 获取一个资讯
    getRecipes:LOCALURL+'recipe/getRecipes',// 获取食谱
    getOneRecipe:LOCALURL+'recipe/getOneRecipe',// 获取一个食谱
    getKnows:LOCALURL+'know/getKnows',// 获取优膳小知识
    getOneKnow:LOCALURL+'know/getOneKnow',// 获取一个优膳小知识
    addRecord:LOCALURL+'record/addRecord',// 饮食记录
    getRecords:LOCALURL+'record/getRecords',// 获取饮食记录
    getOneRecord:LOCALURL+'record/getOneRecord',// 获取登录用户饮食记录
    getSomeRecord:LOCALURL+'record/getSomeRecord',// 获取登录用户某天饮食记录
    addShare:LOCALURL+'share/addShare',// 添加饮食分享
    getShare:LOCALURL+'share/getShare',// 获取饮食分享
    getOneShare:LOCALURL+'share/getOneShare',// 获取饮食分享信息
    getOnePhysique:LOCALURL+'physique/getOnePhysique',
}

module.exports = URL