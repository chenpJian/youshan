<template>
  <div id="Recipe">
    <van-nav-bar title="食膳搭配" left-text="返回" left-arrow fixed @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="search" slot="right" />
    </van-nav-bar>

    <div style="margin-top:45px;">
      <van-tabs v-model="active" animated >
        <van-tab title="养生菜谱">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="recipeMsg" v-for="(item, index) in recipesInfo1" :key="index">
              <div class="recipeImg"><img :src="item.recipePicture"></div>
              <div class="recipeMsg2" @click="goRecipeInfo(item.recipeName)">
                  <van-panel :title="item.recipeName" :desc="item.recipeEfficacy" style="text-align: left;"></van-panel>
              </div>
            </div>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="保健菜谱">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="recipeMsg" v-for="(item, index) in recipesInfo2" :key="index">
              <div class="recipeImg"><img :src="item.recipePicture"></div>
              <div class="recipeMsg2" @click="goRecipeInfo(item.recipeName)">
                  <van-panel :title="item.recipeName" :desc="item.recipeEfficacy" style="text-align: left;"></van-panel>
              </div>
            </div>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="调养菜谱">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="recipeMsg" v-for="(item, index) in recipesInfo3" :key="index">
              <div class="recipeImg"><img :src="item.recipePicture"></div>
              <div class="recipeMsg2" @click="goRecipeInfo(item.recipeName)">
                  <van-panel :title="item.recipeName" :desc="item.recipeEfficacy" style="text-align: left;"></van-panel>
              </div>
            </div>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serverAPI.config.js'
  import { Toast } from 'vant';
  export default {
    components: {
      Toast
    },
    data(){
      return{
        active: 0,
        recipesInfo1:[],
        recipesInfo2:[],
        recipesInfo3:[],
        isLoading: false,
        searchIcon:require('../../assets/images/搜索2.png'),
      }
    },
    created() {
      this.getRecipesInfo()
      // console.log(this.recipeName)
    },
    methods: {
      onClickLeft() {
        this.$router.push('/')
      },
      onClickRight() {
        this.$router.push('/RecipeSearch')
      },
      goRecipeInfo(recipeName){
        this.$router.push({name:'RecipeInfo',params:{recipeName:recipeName}})
      },
      getRecipesInfo(){
        this.recipesInfo1=[]
        this.recipesInfo2=[]
        this.recipesInfo3=[]
        axios({
          url:url.getRecipes,
          method:'get',
        }).then(response=>{
          if(response.data.code==200){
            for(var i=0;i<response.data.message.length;i++){
              let recipeCls=response.data.message[i].recipeCls
              if(recipeCls=="养生菜谱"){
                this.recipesInfo1.push(response.data.message[i])
              }else if(recipeCls=="保健菜谱"){
                this.recipesInfo2.push(response.data.message[i])
              }else if(recipeCls=="调养菜谱"){
                this.recipesInfo3.push(response.data.message[i])
              }
            }
          }else{
            Toast('数据获取失败')
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      //下拉刷新
      onRefresh() {
        setTimeout(() => {
          this.$toast('刷新成功');
          this.isLoading = false;
          this.getRecipesInfo()
        }, 500);
      },
    }
  }
</script>

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
