<template>
  <div class="Choose">
    <x-header
      :left-options="{backText: ''}"
      title="添加"
      style="width: 100%;position:fixed;left:0;top:0;z-index:998;"
    ></x-header>


  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    name:'Choose',
    components: {
      XHeader,
    },
    data(){
        return{

        }
    },
    methods:{

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
