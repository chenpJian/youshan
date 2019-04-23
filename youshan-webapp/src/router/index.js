import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/Home'
import Menu from '@/components/page/Menu'  //食物成分表
import MenuInfo from '@/components/page/MenuInfo'  //食物成分表详细数据
import MenuSearch from '@/components/page/MenuSearch'  //食物成分搜索
import Diet from '@/components/page/Diet'  //饮食记录
import Foods from '@/components/page/Foods'  //食物列表
import Recipe from '@/components/page/Recipe' //食膳搭配
import RecipeInfo from '@/components/page/RecipeInfo' //食膳搭配详细数据
import MyYoushan from '@/components/page/MyYoushan' //我的优膳
import Share from '@/components/page/Share' //饮食分享
import Details from '@/components/page/Details' //食物信息详细数据
import Info from '@/components/page/Info' //资讯信息详细数据
import BodyData from '@/components/page/BodyData' //用户身体数据
import CollectRecipe from '@/components/page/CollectRecipe' //食膳搭配收藏
import Collection from '@/components/page/Collection' //资讯收藏
import Knowledge from '@/components/page/Knowledge' //优膳小知识
import KnowPage from '@/components/page/KnowPage' //优膳小知识详细信息
import Setting from '@/components/page/Setting' //设置
import Login from '@/components/page/Login' //用户登录
import Register from '@/components/page/Register' //用户注册
import InfoSearch from '@/components/page/InfoSearch' //资讯搜索
import RecipeSearch from '@/components/page/RecipeSearch' //食膳搭配搜索
import FoodSearch from '@/components/page/FoodSearch' //食物搜索
import ShareInfo from '@/components/page/ShareInfo'//分享菜谱详情页
import Physique from '@/components/page/Physique'//体质评估结果页
import Test from '@/components/page/Test'//体质评估页
import Change from '@/components/page/Change'//个人信息
import Statistical from '@/components/page/Statistical'//饮食分析


import { NumberKeyboard, Toast, Tab, Tabs, TreeSelect, Search, Tag, Card ,Sku ,Panel, Button, List, Cell, NavBar,
   Slider, Actionsheet, DatetimePicker, PullRefresh, Collapse, CollapseItem, Uploader, Icon, Field, CellGroup,
    RadioGroup, Radio, Popup, Dialog, Loading  } from 'vant';
Vue.use(NumberKeyboard).use(Toast).use(Tab).use(Tabs).use(TreeSelect).use(Search).use(Tag).use(Card)
.use(Sku).use(Panel).use(Button).use(List).use(Cell).use(NavBar).use(Slider).use(Actionsheet)
.use(DatetimePicker).use(PullRefresh).use(Collapse).use(CollapseItem).use(Uploader).use(Icon)
.use(Field).use(CellGroup).use(RadioGroup).use(Radio).use(Popup).use(Dialog).use(Loading);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/Menu',
      name: 'Menu',
      component: Menu
    },{
      path: '/MenuInfo',
      name: 'MenuInfo',
      component: MenuInfo
    },{
      path: '/MenuSearch',
      name: 'MenuSearch',
      component: MenuSearch
    },{
      path: '/Diet',
      name: 'Diet',
      component: Diet
    },{
      path: '/Foods',
      name: 'Foods',
      component: Foods
    },{
      path: '/Recipe',
      name: 'Recipe',
      component: Recipe
    },{
      path: '/RecipeInfo',
      name: 'RecipeInfo',
      component: RecipeInfo
    },{
      path: '/MyYoushan',
      name: 'MyYoushan',
      component: MyYoushan
    },{
      path: '/Share',
      name: 'Share',
      component: Share
    },{
      path: '/Details',
      name: 'Details',
      component: Details
    },{
      path: '/Info',
      name: 'Info',
      component: Info
    },{
      path: '/BodyData',
      name: 'BodyData',
      component: BodyData
    },{
      path: '/CollectRecipe',
      name: 'CollectRecipe',
      component: CollectRecipe
    },{
      path: '/Collection',
      name: 'Collection',
      component: Collection
    },{
      path: '/Knowledge',
      name: 'Knowledge',
      component: Knowledge
    },{
      path: '/KnowPage',
      name: 'KnowPage',
      component: KnowPage
    },{
      path: '/Setting',
      name: 'Setting',
      component: Setting
    },{
      path: '/Login',
      name: 'Login',
      component: Login
    },{
      path: '/Register',
      name: 'Register',
      component: Register
    },{
      path: '/InfoSearch',
      name: 'InfoSearch',
      component: InfoSearch
    },{
      path: '/RecipeSearch',
      name: 'RecipeSearch',
      component: RecipeSearch
    },{
      path: '/FoodSearch',
      name: 'FoodSearch',
      component: FoodSearch
    },{
      path: '/ShareInfo',
      name: 'ShareInfo',
      component: ShareInfo
    },{
      path: '/Physique',
      name: 'Physique',
      component: Physique
    },{
      path: '/Test',
      name: 'Test',
      component: Test
    },{
      path: '/Change',
      name: 'Change',
      component: Change
    },{
      path: '/Statistical',
      name: 'Statistical',
      component: Statistical
    }
  ]
})
