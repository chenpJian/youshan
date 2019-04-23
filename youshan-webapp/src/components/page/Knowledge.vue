<template>
  <div class="Knowledge">
    <van-nav-bar title="优膳小知识" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>
    
    <div class="problem"><van-panel title="常见问题："></van-panel></div>
    <div v-for="(item, index) in knowInfo" :key="index">
      <van-panel style="text-align: left;" :title="item.knowTitle" @click="goKnowPage(item.knowTitle)"></van-panel>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  import url from '@/serverAPI.config.js'
  import { Toast } from 'vant';

  export default {
    name:'Knowledge',
    components: {
      Toast
    },
    data(){
        return{
          knowInfo:{}
        }
    },
    created() {
      this.getKnowInfo()
    },
    methods:{
      onClickLeft(){
        this.$router.push('/')
      },
      getKnowInfo(){
        axios({
          url:url.getKnows,
          method:'get',
        }).then(response=>{
          if(response.data.code==200){
            this.knowInfo=response.data.message
          }else{
            Toast('数据获取失败')
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      goKnowPage(knowTitle){
        this.$router.push({name:'KnowPage',params:{knowTitle:knowTitle}})
        // console.log(this.knowTitle)
      }
    }
  }
</script>

<style>
.problem{
  margin-top: 45px;
  text-align: left;
}
</style>
