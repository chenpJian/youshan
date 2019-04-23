<template>
  <div class="Home">
    <div>
      <van-nav-bar title="优膳" left-text="我" fixed @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="search" slot="right" />
      </van-nav-bar>
    </div>

    <div class="theme">
      <img :src="themeImg" alt="" height="180px" width="100%" style="border-radius: 0 0 10% 10%;">
    </div>

    <div class="energy">
      <div class="home-foodmsg" @click="goMenu()">
        <img :src="menuPageIcon" height="30px" width="30px" style=" margin-top: 10px; margin-left: 3px;"><br>
        <span class="a">食物成分</span>
      </div>
      <div class="home-foodmsg" @click="goMyYoushan()">
        <img :src="dietPageIcon" height="30px" width="30px" style=" margin-top: 10px; margin-left: 3px;"><br>
        <span class="a">我的优膳</span>
      </div>
      <div class="home-foodmsg" @click="goFoods()">
        <img :src="foodsIcon" height="30px" width="30px" style=" margin-top: 10px;"><br>
        <span class="a">食材指南</span>
      </div>
      <div class="home-foodmsg" @click="goRecipe()">
        <img :src="recipeIcon" height="30px" width="30px" style=" margin-top: 10px;"><br>
        <span class="a">膳食搭配</span>
      </div>
    </div>

    <!-- 资讯 -->
    <div class="home-info">
      <van-tabs v-model="active" animated >
        <van-tab title="资讯">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div @click="goInfo(item.inforTitle)" v-for="(item, index) in info" :key="index"><van-panel :title="item.inforTitle" :desc="item.inforLabel" style="text-align: left;"></van-panel></div>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="菜谱">
          <van-pull-refresh  v-model="isLoading" @refresh="onRefresh2">
            <div @click="toShare(item.shareRecipe)" v-for="(item, index) in shareMsg" :key="index"><van-panel :title="item.shareRecipe" :desc="item.sharePeople" style="text-align: left;"></van-panel></div>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 菜单 -->
    <div v-transfer-dom class="aaa"
      <popup v-model="show" position="left" width="60%">
        <div class="position-horizontal-demo">
          <div class="personal-information">
            <img :src="imgSrc" width="60px" height="60px" style="border-radius:50%; float: left; margin-left:68px; margin-top:10px;" />
            <div class="hOperat">
              <Poptip placement="bottom">
                <div><Icon type="md-add" size='24'/></div>
                <div class="api" slot="content" style="width:60px;">
                  <p class="hp" @click="goChange()">个人资料</p>
                  <p class="hp" @click="toLogin()">登录</p>
                  <p class="hp" @click="removeCollect()">退出登录</p>
                </div>
              </Poptip>
            </div>
            <div class="hLoginUser">{{loginUser}}</div>
          </div>
          <router-link to="BodyData">
             <div class="bodyData"><img :src="bodyDataIcon" height="20px" width="20px" style="vertical-align:middle; float: left; margin-left: 6px; margin-right: 6px;" />身体数据</div>
          </router-link>
          <router-link to="CollectRecipe">
            <div class="collection"><img :src="collectIcon" height="20px" width="20px" style="vertical-align:middle; float: left; margin-left: 6px; margin-right: 6px;">收藏菜单</div>
          </router-link>
          <router-link to="Collection">
            <div class="collection"><img :src="infoIcon" height="20px" width="20px" style="vertical-align:middle; float: left; margin-left: 6px; margin-right: 6px;">收藏资讯</div>
          </router-link>
          <router-link to="Knowledge">
            <div class="collection"><img :src="knowIcon" height="20px" width="20px" style="vertical-align:middle; float: left; margin-left: 6px; margin-right: 6px;">优膳小知识</div>
          </router-link>
          <router-link to="Setting">
            <div class="setUp"><img :src="setIcon" height="20px" width="20px" style="vertical-align:middle; float: left; margin-left: 6px; margin-right: 6px;">设置</div>
          </router-link>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import {Popup, Popover} from "vux";
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast, Dialog } from 'vant';

export default {
  name:'Home',
  props:['inforTitle','inforLabel','inforDetail'],
  components: {
    Popup,
    Popover,
    Toast,
    Dialog
  },
  data() {
    return {
      active: 0,
      themeImg:require('../../assets/images/谷雨.jpg'),
      menuPageIcon:require('../../assets/images/成分.png'),
      dietPageIcon:require('../../assets/images/饮食记录.png'),
      foodsIcon:require('../../assets/images/食材.png'),
      recipeIcon:require('../../assets/images/食膳搭配.png'),
      bodyDataIcon:require('../../assets/images/身体数据.png'),
      collectIcon:require('../../assets/images/收藏菜单.png'),
      infoIcon:require('../../assets/images/资讯.png'),
      knowIcon:require('../../assets/images/知识.png'),
      setIcon:require('../../assets/images/设置.png'),
      show: false,
      isLoading: false,
      activeNames: [''],
      info:[],
      shareMsg:[],
      isEmpty:false,
      loginUser:'未登录',
      // value:'',
      imgSrc:''
    };
  },
  created() {
    this.getLocalUser()
    this.getInforMsg()
    this.getShare()
  },
  methods: {
    onClickLeft() {
      this.show=true
    },
    onClickRight() {
      this.$router.push('/InfoSearch')
    },
    //检验用户登录状态
    getLocalUser(){
      this.imgSrc=localStorage.imgSrc
      if(!localStorage.username){
        Dialog.confirm({
          title: '用户未登录',
          message: '您还没有登录本APP，请到登录页面登录。'
        }).then(() => {
          this.$router.push('/Login')
        }).catch(()=>{
          
        })
      }else{
        this.loginUser=localStorage.YSname
      }
    },
    onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.getInforMsg()
      }, 500);
    },
    onRefresh2() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.getShare()
      }, 500);
    },
    goChange(){
      this.$router.push('/Change')
    },
    goMenu(){
      this.$router.push('/Menu')
    },
    goMyYoushan(){
      this.$router.push('/MyYoushan')
    },
    goFoods(){
      this.$router.push('/Foods')
    },
    goRecipe(){
      this.$router.push('/Recipe')
    },
    toLogin(){
      this.$router.push('/Login')
    },

    //获取菜谱
    getShare(){
      axios({
        url:url.getShare,
        method:'get',
      }).then(response=>{
        if(response.data.code==200){
          this.shareMsg=response.data.message
        }else{
          Toast('服务器错误，数据获取失败')
        }
      }).catch(error=>{
        console.log(error)
      })
    },

    //获取资讯
    getInforMsg(){
      axios({
          url:url.getInfor,
          method:'get',
      }).then(response=>{
          if(response.data.code==200){
              this.info=response.data.message
          }else{
            this.$toast({
              message: '数据获取失败'
            })
          }
      }).catch(error=>{
          console.log(error)
      })
    },

    //退出登录
    removeCollect(){
      localStorage.removeItem('username')
      localStorage.removeItem('YSname')
      this.$router.push('/Login')
    },
    goInfo(inforTitle){
      this.$router.push({name:'Info',params:{inforTitle:inforTitle}})
    },
    toShare(shareRecipe){
      this.$router.push({name:'ShareInfo',params:{shareRecipe:shareRecipe}})
    },
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/close.less";
.theme{
  float: left;
  width: 100%;
  height: 180px;
  background-color: aqua;
  margin-top: 45px;
}
.a{
  text-align: center;
  margin-top: 3px;
  font-size: 14px;
}
.position-horizontal-demo {
  position: relative;
  height: 100%;
}
.energy {
  position: absolute;
  left: 3%;
  top: 180px;
  width: 94%;
  height: 80px;
  border: 1px solid rgb(223, 223, 223);
}
.home-foodmsg{
  float: left;
  width: 25%;
  height: 80px;
  background-color: white;
}
.home-energymsg{
  float: left;
  width: 49.7%;
  height: 150px;
  background-color: white;
  margin-right: 0.3%;
  margin-top: 1px;
}

//资讯
.home-info{
  width: 100%;
  float: left;
  // background-color: aquamarine;
  margin-top: 35px;
}

// 菜单
.aaa{
  z-index:998;
}
.hOperat{
  float: right;
  margin-top: 10px;
  margin-right: 10px;
  width: 24px;
}
.popover-demo-content {
  padding: 5px 10px;
}
.hp{
  text-align: left;
  padding-left: 5px;
  padding-top: 5px;
}
.hLoginUser{
  float: left;
  width: 100%;
  text-align: center;
  font-size: 14px;
  margin-top: 12px;
}
.personal-information{
  float: left;
  width: 100%;
  height: 120px;
  box-shadow: 0px -1px 5px #000;
  margin-bottom: 8px;
}
.toLogin{
  font-size: 12px;
}
.bodyData{
  padding-top: 20px;
  padding-bottom: 10px;
  float: left;
  width: 100%;
  text-align: left;
  font-size: 14px;
}
.collection{
  padding-top: 10px;
  padding-bottom: 10px;
  float: left;
  width: 100%;
  text-align: left;
  font-size: 14px;
}
.setUp{
  padding-top: 10px;
  padding-bottom: 10px;
  float: left;
  width: 100%;
  text-align: left;
  font-size: 14px;
}
a{
  text-decoration:none; 
  color: #333;
}
//菜谱
.shareInfo{
    width: 100%;
    height: 60px;
    float: left;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: left;
    box-shadow: 0px 1px 1px rgb(179, 179, 179);
}
.shareImg{
    height: 60px;
    width: 60px;
    float: left;
    padding-left: 5px;
}
.recipeMsg2{
    width: 68%;
    height: 60px;
    float: left;
}
</style>
