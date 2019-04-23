<template>
  <div class="RecipeSearch">
    <van-nav-bar title="搜索" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div style="margin-top:45px;">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @cancel="onCancel"
        @onblur="focus"
      >
      </van-search>
    </div>

    <div>
        <div class="recipeMsg" v-for="(item, index) in recipesInfo" :key="index" v-if="item.recipeName.indexOf(value)!=-1&&value!='' || item.recipeEfficacy.indexOf(value)!=-1&&value!=''">
          <div class="recipeImg"><img :src="item.recipePicture"></div>
          <div class="recipeMsg2" @click="goRecipeInfo(item.recipeName)">
              <van-panel :title="item.recipeName" :desc="item.recipeEfficacy" style="text-align: left;"></van-panel>
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';

  export default {
    name:'RecipeSearch',
    components: {
      Toast,
    },
    data(){
        return{
          value:'',
          recipesInfo:[],
        }
    },
    created() {
      this.getRecipesInfo()
    },
    methods:{
      onClickLeft(){
        this.$router.push('/Recipe')
      },
      onCancel(){
        this.value=''
      },
      focus(){
        this.value=this.value
      },
      goRecipeInfo(recipeName){
        this.$router.push({name:'RecipeInfo',params:{recipeName:recipeName}})
      },
      getRecipesInfo(){
        axios({
          url:url.getRecipes,
          method:'get',
        }).then(response=>{
          if(response.data.code==200){
            this.recipesInfo=response.data.message
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
<style scoped>
.recipeMsg{
    width: 100%;
    height: 60px;
    float: left;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: left;
    box-shadow: 0px 1px 1px rgb(179, 179, 179);
}
.recipeImg{
    height: 60px;
    width: 60px;
    float: left;
    padding-left: 5px;
}
.recipeMsg2{
    width: 68%;
    height: 60px;
    float: left;
}
.recipeName{
    height: 20px;
    width: 100%;
    float: left;
    font-size: 16px;
}
.recipeinfo{
    height: 35px;
    padding-right: 10px;
    padding-top: 5px;
    font-size: 13px;
    float: left;
}
img{
    height: 60px;
    width: 60px;
    border-radius: 50%;
}
</style>
