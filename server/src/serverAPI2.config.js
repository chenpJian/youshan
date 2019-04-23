const BASEURL = "https://www.easy-mock.com/mock/5ae2eeb23fbbf24d8cd7f0b6/SmileVue/"
const LOCALURL = "http://localhost:3000/"

const URL={
    getFood:BASEURL+'index',
    addFood:LOCALURL+'food/addFood',
    getFood2:LOCALURL+'food/getFoods',
    addInfor:LOCALURL+'information/addInfor',
    getInfor:LOCALURL+'information/getInfor',
    addAdmin:LOCALURL+'admin/addAdmin',
    adminLogin:LOCALURL+'admin/',
    getUser:LOCALURL+'user/getUser',
    addIngre:LOCALURL+'ingre/addIngre',
    addRecipe:LOCALURL+'recipe/addRecipe',
    addKnow:LOCALURL+'know/addKnow',
    addPhysique:LOCALURL+'physique/addPhysique',

    removeFood:LOCALURL+'food/removeFood'
}

module.exports = URL