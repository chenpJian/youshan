<template>
  <div class="KnowPage">
    <van-nav-bar :title="know.knowTitle" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div class="info-msg">
      <van-panel :title="know.knowTitle">
        <div class="info-detail">{{know.knowAlt}}</div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';

export default {
  name: "KnowPage",
  components: {
    Toast
  },
  data() {
    return {
        knowTitle:'',
        know:{},
    };
  },
  created() {
    this.knowTitle= this.$route.query.knowTitle ?this.$route.query.knowTitle : this.$route.params.knowTitle
    // console.log(this.knowTitle);
    this.getKnow();
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    getKnow() {
      axios({
        url: url.getOneKnow,
        method: "post",
        data: {
          knowTitle: this.knowTitle
        }
      }).then(response => {
        if (response.data.code == 200) {
          this.know = response.data.message;
        } else {
          Toast("数据获取失败");
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
.info-msg{
  margin-top: 45px;
  text-align: left;
}
.info-detail{
  font-size: 14px;
  padding: 15px;
  white-space: pre-line;
}
</style>
