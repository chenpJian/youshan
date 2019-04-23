<template>
  <div class="RecipeInfo">
    <van-nav-bar :title="recipe.recipeName" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div class="recipe-msg">
      <div class="backgrong-picture"><img :src="recipe.recipePicture" height="140px" width="100%"></div>
      <van-panel :title="recipe.recipeName"></van-panel>
      <van-panel title="功效:" :desc="recipe.recipeEfficacy"></van-panel>
      <van-panel title="主料:" :desc="recipe.recipeMate"></van-panel>
      <van-panel title="制作步骤:" :desc="recipe.recipeGive"></van-panel>
    </div>
    <van-button type="primary" @click="goCollectRecipe()" style="width:100%; height:40px; position:fixed; left:0; bottom: 0;">收藏</van-button>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';
  export default {
    name:'RecipeInfo',
    components: {
      Toast
    },
    data(){
        return{
            recipeName:'',
            recipe:{},
        }
    },
    created() {
      this.recipeName= this.$route.query.recipeName ?this.$route.query.recipeName : this.$route.params.recipeName
      console.log(this.recipeName)
      this.getRecipeInfo()

    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      goCollectRecipe(){
      let recipeMsg = localStorage.recipeMsg?JSON.parse(localStorage.recipeMsg):[]
      let haveRecipe = recipeMsg.find(recope=>recope.recipeName==this.recipeName)
      // console.log(haveRecipe)
      if(!haveRecipe){
        let newRecipe={
          recipeName:this.recipe.recipeName,
          recipeEfficacy:this.recipe.recipeEfficacy,
          count:1
        }
        recipeMsg.push(newRecipe)
        localStorage.recipeMsg=JSON.stringify(recipeMsg)
        Toast("收藏成功")
      }else{
        Toast("已收藏")
      }
    },
      getRecipeInfo(){
        axios({
          url:url.getOneRecipe,
          method:'post',
          data:{
            recipeName:this.recipeName
          }
        }).then(response=>{
          // console.log(response)
          // console.log(response.data.message)
          if(response.data.code==200){
            this.recipe=response.data.message
          }else{
            Toast('数据获取失败')
          }
        }).catch(error=>{
          console.log(error)
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.recipe-msg{
  margin-top: 45px;
  text-align: left;
  /* 后台数据前端显示换行 */
  white-space: pre-line;    
}
</style>
