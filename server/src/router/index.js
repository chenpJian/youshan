import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '@/components/AdminLogin'
import AddFood from '@/components/AddFood'
import ManageFood from '@/components/ManageFood'
import AddIngre from '@/components/AddIngre'
import AddRecipe from '@/components/AddRecipe'
import ManageUser from '@/components/ManageUser'
import AddInfor from '@/components/AddInfor'
import ManageInfor from '@/components/ManageInfor'
import AddKnow from '@/components/AddKnow'
import AddPhy from '@/components/AddPhy'
import addAdmin from '@/components/addAdmin'
import tu from '@/components/tu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AdminLogin',
      component: AdminLogin
    },{
      path: '/AddFood',
      name: 'AddFood',
      component: AddFood
    },{
      path: '/ManageFood',
      name: 'ManageFood',
      component: ManageFood
    },{
      path: '/AddIngre',
      name: 'AddIngre',
      component: AddIngre
    },{
      path: '/AddRecipe',
      name: 'AddRecipe',
      component: AddRecipe
    },{
      path: '/ManageUser',
      name: 'ManageUser',
      component: ManageUser
    },{
      path: '/AddInfor',
      name: 'AddInfor',
      component: AddInfor
    },{
      path: '/ManageInfor',
      name: 'ManageInfor',
      component: ManageInfor
    },{
      path: '/AddKnow',
      name: 'AddKnow',
      component: AddKnow
    },{
      path: '/AddPhy',
      name: 'AddPhy',
      component: AddPhy
    },{
      path: '/addAdmin',
      name: 'addAdmin',
      component: addAdmin
    },{
      path: '/tu',
      name: 'tu',
      component: tu
    }
  ]
})
