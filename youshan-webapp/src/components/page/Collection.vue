<template>
  <div class="Collection">

    <van-nav-bar title="收藏" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div class="info-msg2">
      <div v-for="(item,index) in infomsg" :key="index" @click="goInfo(item.inforTitle)">
      <van-panel :title="item.inforTitle" :desc="item.inforLabel"></van-panel>
    </div>
    </div>
    <van-button type="default" @click="removeCollect()" style="width:100%; height:40px; position:fixed; left:0; bottom: 0;">删除</van-button>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
export default {
  name:'Collection',
  components: {

  },
  data(){
    return{
      infomsg:[],
      isEmpty:false,
    }
  },
  created() {
    this.getInfo()
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    getInfo() {
      if(localStorage.infomsg){
        this.infomsg=JSON.parse(localStorage.infomsg)
      }
      // console.log('this.infomsg:'+JSON.stringify(this.infomsg))
      this.isEmpty=this.infomsg.length>0?true:false
    },
    onClickLeft() {
    this.$router.go(-1)  
    },
    goInfo(inforTitle){
      this.$router.push({name:'Info',params:{inforTitle:inforTitle}})
    },
    removeCollect(){
      localStorage.removeItem('infomsg')
      this.infomsg=[]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.info-msg2{
  margin-top: 45px;
  text-align: left;
}
</style>
