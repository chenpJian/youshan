<template>
  <div class="CollectRecipe">
    <van-nav-bar title="收藏" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div class="info-msg2">
      <div v-for="(item,index) in recipeMsg" :key="index" @click="goInfo(item.recipeName)">
      <van-panel :title="item.recipeName" :desc="item.recipeEfficacy"></van-panel>
    </div>
    </div>
    <van-button type="default" @click="removeCollect()" style="width:100%; height:40px; position:fixed; left:0; bottom: 0;">删除</van-button>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import axios from 'axios'
import url from '@/serverAPI.config.js'
export default {
  name:'CollectRecipe',
  components: {
    XHeader
  },
  data(){
    return{
      recipeMsg:[],
      isEmpty:false,
    }
  },
  created() {
    this.getInfo()
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    getInfo() {
      if(localStorage.recipeMsg){
        this.recipeMsg=JSON.parse(localStorage.recipeMsg)
      }
      // console.log('this.recipeMsg:'+JSON.stringify(this.recipeMsg))
      this.isEmpty=this.recipeMsg.length>0?true:false
    },
    onClickLeft() {
    this.$router.go(-1)  
    },
    goInfo(recipeName){
      this.$router.push({name:'RecipeInfo',params:{recipeName:recipeName}})
    },
    removeCollect(){
      localStorage.removeItem('recipeMsg')
      this.recipeMsg=[]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.info-msg2{
  margin-top: 45px;
  text-align: left;
}
</style>
