<template>
  <div class="Menu">
    <van-nav-bar title="每百克食物营养表" left-text="返回" left-arrow fixed @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="search" slot="right" />
    </van-nav-bar>

    <div style="margin-top:45px;">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >

      <div class="menu-msg">
        <div class="menuName">食物</div>
        <div class="menuEnergy">每100克食物热量</div>
      </div>
      <div class="menu-msg" @click="goMenuInfo(item.foodname)" v-for="(item, index) in ingreInfo" :key="index">
        <div class="menuName">{{item.foodname}}</div>
        <div class="menuEnergy2">{{item.foodEnergy}}</div>
      </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serverAPI.config.js'
  import { Toast } from 'vant';
  export default {
    name:'Menu',
    components: {
      Toast
    },
    data(){
        return{
          value:'',
          ingreInfo:[],
          list: [],
          loading: false,
          finished: false,
        }
    },
    created() {
      this.getIngresInfo()
    },
    methods:{
      onClickLeft() {
        this.$router.push('/')
      },
      onClickRight() {
        this.$router.push('/MenuSearch')
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
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sousuo{
  margin-top: 45px;
}
.menu-msg{
  width: 100%;
  box-shadow: 0 1px 0.5px rgb(212, 212, 212);
  height: 30px;
}
.menuName{
  float: left;
  width: 30%;
  padding-top: 5px;
  text-align: left;
  font-size: 14px;
  padding-left: 30px;
}
.menuEnergy{
  float: left;
  width: 50%;
  padding-top: 5px;
  text-align: left;
  font-size: 14px;
}
.menuEnergy2{
  float: left;
  width: 50%;
  padding-top: 5px;
  color: rgb(126, 126, 126);
  text-align: left;
  font-size: 14px;
  padding-left: 30px;
}
</style>
