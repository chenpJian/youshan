<template>
  <div id="app">
    <!-- <i class="icon iconfont icon-caidan2"></i> -->
    <transition name="fade" mode="out-in">
      <div class="main">
        <router-view></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity .5s;
}
.fade-leave{
  opacity: 1;
}
.fade-leave-active{
  opacity: 0;
  transition: opacity .5s;
}
/* .main{
  float: left;
  height: 95%;
} */
</style>
