<template>
  <div class="MyYoushan">
    <van-nav-bar title="我的优膳" left-text="返回" left-arrow fixed :z-index="zIndex" @click-left="onClickLeft"></van-nav-bar>
    
    <div style="margin-top:55px;">
        <transition name="fade">
          <div class="p1" v-if="showPhysique" @click="toPhysique()"><div class="p2">体质测试</div></div>
        </transition>
        <transition name="fade2">
          <div class="p4" v-if="showDiet" @click="toDiet()"><div class="p2">饮食记录</div></div>
        </transition>
        <transition name="fade3">
          <div class="p3" v-if="showShare" @click="toShare()"><div class="p2">饮食分享</div></div>
        </transition>

    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'

export default {
    name:'MyYoushan',
    components: {
        XHeader,
    },
    data(){
        return{
          zIndex:999,
          showPhysique:false,
          showDiet:false,
          showShare:false,
        }
    },
    methods:{
      onClickLeft() {
        this.$router.push('/')
      },
      toPhysique(){
        this.$router.push('/Physique')
      },
      toShare(){
        this.$router.push('/Share')
      },
      toDiet(){
        this.$router.push('/Diet')
      }
    },
    mounted() {
      this.showPhysique=true
      this.showDiet=true
      this.showShare=true
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.p1{
    width: 320px;
    height: 120px;
    position: relative;
    background: url(../../assets/images/1.jpg);
    box-sizing:border-box;
    z-index:1;
    background-size: cover;
    border-radius: 5%;
}
.p1:after{
    
    content: "";
    width:100%;
    height:120px;;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
}
.p4{
    width: 320px;
    height: 120px;
    position: relative;
    background: url(../../assets/images/3.jpg);
    box-sizing:border-box;
    z-index:1;
    background-size: cover;
    margin-top: 8px;;
    border-radius: 5%;
}
.p4:after{
    content: "";
    width:100%;
    height:120px;;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
}
.p3{
    width: 320px;
    height: 120px;
    position: relative;
    background: url(../../assets/images/2.jpg);
    box-sizing:border-box;
    z-index:1;
    background-size: cover;
    margin-top: 8px;;
    border-radius: 5%;
}
.p3:after{
    
    content: "";
    width:100%;
    height:120px;;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    filter: blur(2px);
    z-index: 2;
}

.p2{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    z-index: 11;
    color: white;
    font-size: 30px;
    text-align: center;
}


.fade-enter-active {
  animation: fade-in .5s;
}
.fade-leave-active {
  animation: fade-in .5s reverse;
}
@keyframes fade-in {
  0% {
    top: 50px;
    opacity: 0;
  }
  100% {
    top: 0;
    opacity: 1;
  }
}

.fade2-enter-active {
  animation: fade2-in .5s;
}
.fade2-leave-active {
  animation: fade2-in .5s reverse;
}
@keyframes fade2-in {
  0% {
    margin-top: 58px;
    opacity: 0;
  }
  100% {
    margin-top: 8;
    opacity: 1;
  }
}

.fade3-enter-active {
  animation: fade3-in .5s;
}
.fade3-leave-active {
  animation: fade3-in .5s reverse;
}
@keyframes fade3-in {
  0% {
    margin-top: 50px;
    opacity: 0;
  }
  100% {
    margin-top: 8;
    opacity: 1;
  }
}

</style>
