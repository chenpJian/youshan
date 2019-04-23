<template>
  <div class="hello">

    <van-nav-bar title="身体数据" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div class="picture"><img src="../../assets/images/背景.jpg" height="180px" width="100%"></div>
    <div class="date">
      <group>
        <popup-picker title="性别" :data="list1" v-model="userSex" value-text-align="right"></popup-picker>
        <popup-picker title="年龄" :data="list2" v-model="userAge" value-text-align="right"></popup-picker>
        <!-- <popup-picker title="身高" :data="list3" v-model="userHeight"></popup-picker>
        <popup-picker title="体重" :data="list4" v-model="userWeight"></popup-picker> -->
        <popup-picker title="体质" :data="list5" v-model="userPhysical"></popup-picker>
      </group>
      <van-button class="alter" type="danger" @click="changeData()">确定</van-button>
      <!-- <div class="alter">确定</div> -->
    </div>
</div>
</template>

<script>
  import { XHeader, Datetime, Group, PopupPicker } from 'vux'
  import axios from 'axios'
  import url from '@/serverAPI.config.js'
  import {Toast} from 'vant'

  export default {
    components: {
      XHeader,
      Datetime,
      Group,
      PopupPicker
    },
    data(){
      return{
        value:'',
        userSex:[],
        userAge:[],
        userHeight:['','','','CM'],
        userWeight:['','','','KG'],
        userPhysical:[],
        list1:[['男','女']],
        list2:[['10-16','17-21','22-32','33-40','40-50','50-60','60+',]],
        // list3:[['0','1','2'],['0','1','2','3','4','5','6','7','8','9'],['0','1','2','3','4','5','6','7','8','9']],
        // list4:[['0','1','2','3','4','5'],['0','1','2','3','4','5','6','7','8','9'],['0','1','2','3','4','5','6','7','8','9']],
        list5:[['弱','中等','强']],
      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      log (str1, str2 = '') {
        // console.log(str1, str2)
      },
      onConfirm (val) {
        // console.log('on-confirm arg', val)
        // console.log('current value', this.userSex)
      },
      change (value) {
        // console.log('change', value)
      },
      changeData(){
        axios({
          url:url.bodydata,
          method:'post',
          data:{
            userSex:this.userSex,
            userAge:this.userAge,
            // userHeight:this.userHeight,
            // userWeight:this.userWeight,
            userPhysical:this.userPhysical
        }
        }).then(response=>{
          // console.log(response)
          if(response.data.code==200){
            Toast.success('修改成功')
            this.$router.push('/')
          }else{
            // console.log(response.data.message)
            Toast.fail('修改失败，服务器错误')
          }
          // console.log(response.data.code)
        }).catch((error)=>{
          console.log(error)
          Toast.fail('修改失败2，服务器错误')
        })
      }
    }
  }
</script>

<style scoped lang="less">
.picture{
  float: left;
  margin-top: 45px;
}
.date{
  float: left;
}
a{
  text-decoration:none; 
}
.date{
  width: 100%;
  text-align: left;
}
.alter{
  height: 50px;
  width: 100%;
  background-color: red;
  position: absolute;
  bottom: 0px;
  left: 0px;
  z-index:999;
  font-size: 20px;
  text-align: center;
  line-height: 50px;
}
</style>
