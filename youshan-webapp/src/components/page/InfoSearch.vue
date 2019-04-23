<template>
  <div class="InfoSearch">
    <van-nav-bar title="搜索" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div style="margin-top:45px;">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @cancel="onCancel"
      >
      </van-search>
    </div>

    <div>
      <div @click="goInfo(item.inforTitle)" v-for="(item, index) in info" :key="index" v-if="item.inforTitle.indexOf(value)!=-1&&value!=''">
        <van-panel :title="item.inforTitle" :desc="item.inforLabel" style="text-align: left;"></van-panel>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant'

  export default {
    name:'InfoSearch',
    components: {
      Toast,
    },
    data(){
        return{
          value:'',
          info:[],
          common:''
        }
    },
    created() {
      this.getInforMsg()
    },
    methods:{
      onClickLeft(){
        this.$router.push('/')
      },
      onCancel(){
        this.value=''
      },
      goInfo(inforTitle){
        this.$router.push({name:'Info',params:{inforTitle:inforTitle}})
      },

      //获取资讯
      getInforMsg(){
        axios({
            url:url.getInfor,
            method:'get',
        }).then(response=>{
            // console.log(response)
            // console.log(response.data.message)
            if(response.data.code==200){
                this.info=response.data.message
            }else{
              this.$toast({
                message: '数据获取失败'
              })
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

</style>
