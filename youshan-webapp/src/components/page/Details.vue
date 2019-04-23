<template>
  <div class="Details">

    <van-nav-bar :title="foodInfo.foodname" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div>
      <div class="backgrong-picture"><img :src="foodInfo.foodPicture" height="140px" width="100%"></div>

      <div class="food-details">
        <van-panel title="添加到饮食记录（单位：克）">
          <div class="amount"><input type="range" style="width:300px;" v-model="amount" min="10" max="500" step="10"></div>
          <div slot="footer">
            <input type="text" id="amount" v-model="amount" style="width:50px;">
            <van-button size="small" style="float: right;" @click="addRecord(foodInfo.foodEnergy)">添加</van-button>
          </div>
        </van-panel>
        <van-panel title="食物属性" :status="foodInfo.foodAtb"></van-panel>
        <van-panel title="" :desc="foodInfo.foodDatails"></van-panel>
        <van-panel title="食品功效" :desc="foodInfo.foodEfficacy"></van-panel>
        <van-panel title="营养价值" :desc="foodInfo.foodValue"></van-panel>
        <van-panel title="饮食注意" :desc="foodInfo.tabooCrowd"></van-panel>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';
  export default {
    name:'Details',
    components: {
      Toast
    },
    data(){
        return{
          amount: 100,
          foodname:'',
          foodInfo:{},
        }
    },
    created() {
      // this.meal= this.$route.query.meal ?this.$route.query.meal : this.$route.params.meal
      this.foodname= this.$route.query.foodname ?this.$route.query.foodname : this.$route.params.foodname
      // console.log(this.meal)
      console.log(this.foodname)
      this.getFoodInfo()
    },
    methods:{
      onClickLeft(){
        this.$router.push('/Foods')
      },
      getFoodInfo(){
        axios({
          url:url.getFoodInfo,
          method:'post',
          data:{
            foodname:this.foodname,
          }
        }).then(response=>{
          console.log(response)
          console.log(response.data.message)
          if(response.data.code==200){
            this.foodInfo=response.data.message
          }else{
            Toast('数据获取失败')
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      addRecord(foodEnergy){
        var amount=document.getElementById("amount").value; 
        // 时间
        let time=new Date()
        let year=time.getFullYear()
        let month=time.getMonth()+1
        let day=time.getDate()
        if(month<10){
            month="0"+month
        }
        if(day<10){
            day="0"+day
        }
        let nowTime=year+'-'+month+'-'+day
        //早、中、晚或宵夜
        let meal= this.$route.query.meal ?this.$route.query.meal : this.$route.params.meal
        //计算热量
        let oneEnergy=foodEnergy
        let recordEnergy=oneEnergy/100*amount
        //用户名
        let loginUser=localStorage.username
        axios({
          url:url.addRecord,
          method:'post',
          data:{
            username:loginUser,
            recordname:this.foodname,
            recordDate:nowTime,
            recordMeal:meal,
            recordSum:amount,
            recordEnergy:recordEnergy,
          }
        }).then(response=>{
          console.log(response)
          if(response.data.code==200){
            Toast('添加成功')
          }else{
            console.log(response.data.message)
            Toast('添加失败')
          }
          console.log(response.data.code)
        }).catch((error)=>{
          console.log(error)
          Toast('添加失败2')
        })
        this.$router.push({name:'Foods',params:{meal:meal}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.backgrong-picture{
  /* float: left; */
  margin-top: 44px;
}
.food-details{
    text-align: left;
    white-space: pre-line;   
}
.amount{
  margin-left: 10px;
}
.food-analysis{
    font-size: 14px;
    padding: 10px;
}
</style>
