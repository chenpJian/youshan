<template>
  <div class="Setting">
    <van-nav-bar title="设置" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>
    <div style="margin-top:45px;">

    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { Popover } from 'vux'
  export default {
    name:'Setting',
    components: {
      Popover
    },
    data(){
        return{
            
        }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
