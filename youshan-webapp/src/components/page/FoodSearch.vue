<template>
  <div class="FoodSearch">
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

    <div v-for="(item, index) in food" :key="index" v-if="item.foodname.indexOf(value)!=-1&&value!=''">
        <van-panel style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';

  export default {
    name:'FoodSearch',
    components: {
      Toast
    },
    data(){
        return{
          value:'',
          food:[],
        }
    },
    created() {
      this.getFoodMsg()
    },
    methods:{
      onClickLeft() {
        this.$router.push('/Foods')
      },
      onCancel(){
        this.value=''
      },
      goDetails(foodname){
        this.meal= this.$route.query.meal ?this.$route.query.meal : this.$route.params.meal
        this.$router.push({name:'Details',params:{foodname:foodname,meal:this.meal}})
      },

      //获取资讯
      getFoodMsg(){
        axios({
            url:url.getFood,
            method:'get',
        }).then(response=>{
            // console.log(response)
            // console.log(response.data.message)
            if(response.data.code==200){
                this.food=response.data.message
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
