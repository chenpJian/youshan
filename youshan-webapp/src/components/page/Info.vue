<template>
  <div class="Info">
    <van-nav-bar :title="Info.inforTitle" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div class="info-msga">
      <van-panel :title="Info.inforTitle" :desc="Info.inforLabel">
        <div class="info-detail">{{Info.inforDetail}}</div>
      </van-panel>
    </div>
    <van-button type="primary" @click="goCollection()" style="width:100%; height:40px; position:fixed; left:0; bottom: 0;">收藏</van-button>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';

export default {
  name: "Info",
  components: {
    Toast
  },
  data() {
    return {
        inforTitle:'',
        Info:{},
    };
  },
  created() {
    this.inforTitle= this.$route.query.inforTitle ?this.$route.query.inforTitle : this.$route.params.inforTitle
    // console.log(this.inforTitle);
    this.getInfo();
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    goCollection(){
      let infomsg = localStorage.infomsg?JSON.parse(localStorage.infomsg):[]
      let haveInfo = infomsg.find(collect=>collect.inforTitle==this.inforTitle)
      if(!haveInfo){
        let newInfo={
          inforTitle:this.Info.inforTitle,
          inforLabel:this.Info.inforLabel,
          count:1
        }
        infomsg.push(newInfo)
        localStorage.infomsg=JSON.stringify(infomsg)
        Toast("收藏成功")
      }else{
        Toast("已收藏")
      }
    },
    getInfo() {
      axios({
        url: url.getOneInfo,
        method: "post",
        data: {
          inforTitle: this.inforTitle
        }
      })
      .then(response => {
        // console.log(response);
        // console.log(response.data.message);
        if (response.data.code == 200) {
          this.Info = response.data.message;
        } else {
          Toast.fail("数据获取失败");
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
};
</script>

<style>
.info-msga{
  margin-top: 45px;
  text-align: left;
}
.info-detail{
  font-size: 14px;
  padding: 15px;
  white-space: pre-line;
}
</style>
