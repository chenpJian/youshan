<template>
  <div class="Physique">
    <van-nav-bar title="我的体质" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div style="margin-top:45px;">
        <div class="d1">您的体质为</div>
        <div class="d2">{{phyInfo.phyName}}</div>
        <van-button @click="goTest()" round type="danger" style="position:fixed; right:20px; bottom: 20px; z-index:999; opacity: 0.7;">测</van-button>
        <van-panel style="text-align:left;" :title="phyInfo.phyName" :desc="phyInfo.phyDetail"></van-panel>
        <van-panel style="text-align:left;" title="形成原因:" :desc="phyInfo.phyReason"></van-panel>
        <van-panel style="text-align:left;" title="饮食推荐:" :desc="phyInfo.phyAdjust"></van-panel>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';

  export default {
    name:'Physique',
    components: {
      Toast
    },
    data(){
      return{
        phyName:'平和体质',
        phyInfo:{}
      }
    },
    created() {
      this.getNewPhy()
      this.getPhy()
    },
    methods:{
      onClickLeft() {
        this.$router.push('/MyYoushan')
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
        this.phyName=phyName
      },
      goTest(){
        this.$router.push('/Test')
      },
      getPhy() {
        axios({
          url: url.getOnePhysique,
          method: "post",
          data: {
            phyName: this.phyName
          }
        })
        .then(response => {
          if (response.data.code == 200) {
            this.phyInfo = response.data.message;
          } else {
            Toast.fail("数据获取失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.d1{
    font-size: 14px;
    padding: 3px;
}
.d2{
    font-size: 20px;
    color: red;
    border-bottom: 1px solid #ccc;
    padding: 3px;
}
/* .d3{
    font-size: 14px;
    padding-top: 3px;
    padding-bottom: 3px;
    width: 100%;
    color: white;
    background-color: rgba(255, 0, 0, 0.493);
} */
</style>
