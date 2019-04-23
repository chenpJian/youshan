<template>
  <div id="Foods">
    <van-nav-bar title="食材指南" left-text="返回" left-arrow fixed @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="search" slot="right" />
    </van-nav-bar>

    <div style="margin-top:45px;">

      <van-tabs v-model="active" animated >
        
        <van-tab title="谷物类">
            <div v-for="(item, index ) in food1" :key="index">
              <transition name="bounce" tag="div">
                <van-panel v-if="showPanel" style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
              </transition>
          </div>
          
        </van-tab>
        <van-tab title="肉类">
          <div v-for="(item, index) in food2" :key="index">
            <van-panel style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
          </div>
        </van-tab>
        <van-tab title="蔬菜">
          <div v-for="(item, index) in food3" :key="index">
            <van-panel style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
          </div>
        </van-tab>
        <van-tab title="蛋类">
          <div v-for="(item, index) in food4" :key="index">
            <van-panel style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
          </div>
        </van-tab>
        <van-tab title="奶类">
          <div v-for="(item, index) in food5" :key="index">
            <van-panel style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
          </div>
        </van-tab>
        <van-tab title="水果">
          <div v-for="(item, index) in food6" :key="index">
            <van-panel style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
          </div>
        </van-tab>
        <van-tab title="豆类">
          <div v-for="(item, index) in food7" :key="index">
            <van-panel style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
          </div>
        </van-tab>
        <van-tab title="饮料">
          <div v-for="(item, index) in food8" :key="index">
            <van-panel style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
          </div>
        </van-tab>
        <van-tab title="小吃">
          <div v-for="(item, index) in food9" :key="index">
            <van-panel style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
          </div>
        </van-tab>
        <van-tab title="其他">
          <div v-for="(item, index) in food10" :key="index">
            <van-panel style="text-align: left; width:100%;" @click="goDetails(item.foodname)" :title="item.foodname" :desc="item.foodIntro" :status="item.foodAtb"></van-panel>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';
import { setTimeout } from 'timers';

  export default {
    components: {
      Toast
    },
    data(){
      return{
        active: 0,
        searchIcon:require('../../assets/images/搜索2.png'),
        phyName:'平和体质',
        food1:[],
        food2:[],
        food3:[],
        food4:[],
        food5:[],
        food6:[],
        food7:[],
        food8:[],
        food9:[],
        food10:[],
        showPanel: false
      }
    },
    created() {
      this.getNewPhy()
      this.getFoodMsg()
    },
    methods: {
      onClickLeft() {
        this.$router.push('/')
      },
      onClickRight() {
        this.meal= this.$route.query.meal ?this.$route.query.meal : this.$route.params.meal
        this.$router.push({name:'FoodSearch',params:{meal:this.meal}})
      },
      getNewPhy(){
        if(localStorage.phy){
          this.phy=JSON.parse(localStorage.phy)
        }
        // console.log('this.phy:'+JSON.stringify(this.phy))
        this.isEmpty=this.phy.length>0?true:false
        let bbb=JSON.stringify(this.phy)
        let ccc=eval(bbb)
        let phyName=ccc[0].phyName
        // console.log(phyName)
        this.phyName=phyName
      },
      goDetails(foodname){
        this.meal= this.$route.query.meal ?this.$route.query.meal : this.$route.params.meal
        this.$router.push({name:'Details',params:{foodname:foodname,meal:this.meal}})
      },
      getFoodMsg(){
      axios({
        url:url.getFood,
        method:'get',
      }).then(response=>{
          if(response.data.code==200){
            for(var i=0;i<response.data.message.length;i++){
              let foodAtb=response.data.message[i].foodAtb
              let foodCls=response.data.message[i].foodCls
          
              let phyName=this.phyName
              if(phyName=='平和体质'){
                if(foodAtb=="性平类"){
                  response.data.message[i].foodAtb="推荐"
                }else if(foodAtb=="性热类" || foodAtb=="性寒类 "){
                  response.data.message[i].foodAtb="少吃"
                }else if(foodAtb=="性温类" || foodAtb=="性凉类"){
                  response.data.message[i].foodAtb=""
                }
              }else if(phyName=='寒性体质'){
                if(foodAtb=="性温类" || foodAtb=="性平类"){
                  response.data.message[i].foodAtb="推荐"
                }else if( foodAtb=="性寒类 "|| foodAtb=="性凉类"){
                  response.data.message[i].foodAtb="建议少吃"
                }else if(foodAtb=="性热类"){
                  response.data.message[i].foodAtb=""
                }
              }else if(phyName=='热性体质'){
                if(foodAtb=="性凉类" || foodAtb=="性平类"){
                  response.data.message[i].foodAtb="推荐"
                }else if(foodAtb=="性热类" || foodAtb=="性温类"){
                  response.data.message[i].foodAtb="建议少吃"
                }else if(foodAtb=="性寒类 "){
                  response.data.message[i].foodAtb=""
                }
              }
              if(foodCls=="谷物类"){
                this.food1.push(response.data.message[i])
              }else if(foodCls=="肉类"){
                this.food2.push(response.data.message[i])
              }else if(foodCls=="蔬菜"){
                this.food3.push(response.data.message[i])
              }else if(foodCls=="蛋类"){
                this.food4.push(response.data.message[i])
              }else if(foodCls=="奶类"){
                this.food5.push(response.data.message[i])
              }else if(foodCls=="水果"){
                this.food6.push(response.data.message[i])
              }else if(foodCls=="豆类"){
                this.food7.push(response.data.message[i])
              }else if(foodCls=="饮料"){
                this.food8.push(response.data.message[i])
              }else if(foodCls=="小吃"){
                this.food9.push(response.data.message[i])
              }else if(foodCls=="其他"){
                this.food10.push(response.data.message[i])
              }
              setTimeout(() => {
                this.showPanel = true
              })
            }
          }else{
            Toast('数据获取失败')
          }
        }).catch(error=>{
            console.log(error)
        })
      },
    },
  }
</script>

<style>
.sub-item {
  color: #888;
}
.foods{
  margin-top: 1px;
  box-shadow: 0px 1px 1px #888;
}
.ifm{
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index:999;
}
.determine{
  background-color: red;
  height: 50px;
  width: 20%;
  text-align: center;
  float: left;
  line-height: 50px;
}
.information{
  width: 80%;
  height: 50px;
  float: left;
  margin: 0px;
  box-shadow: 0px 1px 2px #000;
  opacity: 1;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    margin-top: 50px;
    opacity: 0;
  }
  100% {
    margin-top: 0;
    opacity: 1;
  }
}
</style>
