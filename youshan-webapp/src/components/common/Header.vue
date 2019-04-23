<template>
  <div class="Header">
    <x-header
      :left-options="{backText: ''}"
      
      style="background-color:#DB4437;width: 100%;position:fixed;left:0;top:0;z-index:998;"
    >{{title}}</x-header>
  </div>
</template>

<script>
import {XHeader} from "vux";

export default {
    name:'Header',
    components:{
      XHeader        
    },
    data(){
        return{
            
        }
    },
    props:{
        title:String
    }
}
</script>

<style>

</style>