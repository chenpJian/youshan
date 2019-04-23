<template>
  <div class="Comestible">
    <van-panel @click="choose()" style="text-align: left; width:100%;" :title="foodname" :desc="foodIntro" :status="foodAtb"></van-panel>
      <!-- <div class="foodMsg" @click="choose()">
            <div class="foodImg"><img :src="imageURL"></div>
            <div class="foodMsg2">
                <div class="foodName">
                    {{foodname}}
                    <div class="biaoqian"><van-tag round type="success">{{foodAtb}}</van-tag></div>
                </div>
                <div class="foodinfo">{{foodIntro}}</div>
            </div>
      </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI.config.js'

export default {
    name:'Comestible',
    props:['foodname','foodIntro','foodAtb','meal'],
    components:{    
    },
    data(){
        return{
            food:[],
            imageURL:require('../../assets/images/小麦.jpg'),
        }
    },
    methods: {
        choose() {
            // this.activeId = data.id;
            this.$router.push({name:'Details',query:{foodname:this.foodname}})
            // console.log(meal)
        },
    }
}
</script>

<style scoped>

.foodMsg{
    width: 100%;
    height: 60px;
    float: left;
    padding: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    text-align: left;
    box-shadow: 0px 1px 1px rgb(179, 179, 179);
}
.foodImg{
    height: 60px;
    width: 30%;
    float: left;
    padding-left: 5px;
}
.foodMsg2{
    width: 68%;
    height: 60px;
    float: left;
}
.foodName{
    height: 20px;
    width: 100%;
    float: left;
    font-size: 16px;
}
.foodinfo{
    height: 35px;
    padding-right: 10px;
    padding-top: 5px;
    font-size: 13px;
    float: left;
}
img{
    height: 56px;
    width: 76px;
    border-radius: 50%;
}
.biaoqian{
    margin-right: 25px;
    float: right;
}
</style>