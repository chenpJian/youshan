<template>
  <div class="MenuSearch">
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

    <div class="MSmsg" @click="goMenuInfo(item.foodname)" v-for="(item, index) in ingreInfo" :key="index" v-if="item.foodname.indexOf(value)!=-1&&value!=''">
        <div class="MSmenuName">{{item.foodname}}</div>
        <div class="MSmenuEnergy2">{{item.foodEnergy}}</div>
      </div>

  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';

  export default {
    name:'MenuSearch',
    components: {
        Toast,
    },
    data(){
        return{
            value:'',
            ingreInfo:[],
        }
    },
    created() {
      this.getIngresInfo()
    },
    methods:{
      onClickLeft(){
        this.$router.push('/Menu')
      },
      onCancel(){
          this.value=''
      },
      focus(){
          this.value=this.value
      },
      goMenuInfo(foodname){
          this.$router.push({name:'MenuInfo',params:{foodname:foodname}})
      },
      getIngresInfo(){
      axios({
        url:url.getIngres,
        method:'get',
      }).then(response=>{
        if(response.data.code==200){
          this.ingreInfo=response.data.message
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
.MSmsg{
  width: 100%;
  box-shadow: 0 1px 0.5px rgb(212, 212, 212);
  height: 30px;
}
.MSmenuName{
  float: left;
  width: 30%;
  padding-top: 5px;
  text-align: left;
  font-size: 14px;
  padding-left: 30px;
}
.MSmenuEnergy{
  float: left;
  width: 50%;
  padding-top: 5px;
  text-align: left;
  font-size: 14px;
}
</style>
