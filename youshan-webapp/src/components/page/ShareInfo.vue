<template>
  <div class="ShareInfo">
    <van-nav-bar :title="share.shareRecipe" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div class="share-msg">
      <div class="backgrong-picture"><img :src="share.file" height="140px" width="100%"></div>
      <van-panel :title="share.shareRecipe" :desc="share.sharePeople"></van-panel>
      <van-panel title="主料:" :desc="share.shareIngre"></van-panel>
      <van-panel title="制作步骤:" :desc="share.shareStep"></van-panel>
    </div>
    <van-button type="primary" @click="goCollectRecipe()" style="width:100%; height:40px; position:fixed; left:0; bottom: 0;">收藏</van-button>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';
  export default {
    name:'ShareInfo',
    components: {
      Toast
    },
    data(){
        return{
            shareRecipe:'',
            share:{},
        }
    },
    created() {
      this.shareRecipe= this.$route.query.shareRecipe ?this.$route.query.shareRecipe : this.$route.params.shareRecipe
      // console.log(this.shareRecipe+'测试')
      this.getOneShare()
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
    //   goCollectRecipe(){
    //     let recipeMsg = localStorage.recipeMsg?JSON.parse(localStorage.recipeMsg):[]
    //     let haveRecipe = recipeMsg.find(recope=>recope.shareRecipe==this.shareRecipe)
    //     console.log(haveRecipe)
    //     if(!haveRecipe){
    //         let newRecipe={
    //         recipeName:this.share.shareRecipe,
    //         recipeEfficacy:this.share.recipeEfficacy,
    //         count:1
    //         }
    //         recipeMsg.push(newRecipe)
    //         localStorage.recipeMsg=JSON.stringify(recipeMsg)
    //         Toast("收藏成功")
    //     }else{
    //         Toast("已收藏")
    //     }
    //     },
      getOneShare(){
        axios({
          url:url.getOneShare,
          method:'post',
          data:{
            shareRecipe:this.shareRecipe
          }
        }).then(response=>{
          if(response.data.code==200){
            this.share=response.data.message
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
.share-msg{
  margin-top: 45px;
  text-align: left;
  /* 后台数据前端显示换行 */
  white-space: pre-line;    
}
</style>
