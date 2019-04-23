<template>
  <div class="Test">
    <van-nav-bar title="评测" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

  <div style="margin-top:50px;" >
    <van-panel style="text-align:left;" title="" desc="体质评测可以帮助人们认识自身是何种体质，并从饮食、生活习惯、身体调养等方面帮您改善身体。"></van-panel>
  </div>
    <div>
      <van-radio-group v-for="(item,index) in radios" :key="index" v-model="item.radio" style="text-align:left; padding:10px;">
        {{item.question}}
        <van-radio checked-color="#07c160" name="1">没有</van-radio>
        <van-radio checked-color="#07c160" name="2">很少</van-radio>
        <van-radio checked-color="#07c160" name="3">有时</van-radio>
        <van-radio checked-color="#07c160" name="4">经常</van-radio>
      </van-radio-group>
    </div>

    <div>
      <van-radio-group v-for="(item,index) in radios2" :key="index"  v-model="item.radio2" style="text-align:left; padding:10px;">
        {{item.question2}}
        <van-radio checked-color="#07c160" name="1">没有</van-radio>
        <van-radio checked-color="#07c160" name="2">很少</van-radio>
        <van-radio checked-color="#07c160" name="3">有时</van-radio>
        <van-radio checked-color="#07c160" name="4">经常</van-radio>
      </van-radio-group>
    </div>
    <van-button @click="test()" round type="danger">评测</van-button>

  </div>
</template>

<script>
  import { XHeader } from 'vux'

  export default {
    name:'Test',
    components: {
      XHeader,
    },
    data(){
        return{
          // radio:'',
          radios:[
            {radio:'', question:'您容易精神紧张、焦虑不安吗？'},
            {radio:'', question:'您容易感到害怕或受到惊吓吗？'},
            {radio:'', question:'您感到胸闷或腹部胀满吗？'},
            {radio:'', question:'你会经常感到口渴或嘴唇干裂吗？'},
            {radio:'', question:'经常便秘或粪便干燥，尿液较少且偏黄？'},
            {radio:'', question:'会经常全身经常发热又怕热吗？'},
          ],
          radios2:[
            {radio2:'', question2:'您会经常腹泻吗？'},
            {radio2:'', question2:'您会经常感到疲劳吗？'},
            {radio2:'', question2:'您会经常感到手脚冰冷吗？'},
            {radio2:'', question2:'您口唇色淡吗？'},
            {radio2:'', question2:'您会面色苍白吗？'},
            {radio2:'', question2:'会经常腹痛、关节痛吗？'}
          ],
          sum:0,
          sum2:0,
          phyName:''
        }
    },
    created() {
      this.getPhy()
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      getPhy(){
        if(localStorage.phy){
          this.phy=JSON.parse(localStorage.phy)
        }
      },
      test(){
        localStorage.removeItem('phy')
        this.phy=[]
        this.test1()
        this.test2()
        if(this.sum<13 && this.sum2<13){
          this.phyName='平和体质'
        }else if(this.sum>=13 && this.sum>this.sum2){
          this.phyName='热性体质'
        }else{
          this.phyName='寒性体质'
        }
        let phyName=this.phyName
        let phy=localStorage.phy?JSON.parse(localStorage.phy):[]
        let onephy=phy.find(collect=>collect.phyName==phyName)
        if(!onephy){
          let newPhy={phyName:phyName,count:1}
          phy.push(newPhy)
          localStorage.phy=JSON.stringify(phy)
          this.$router.push('/Physique')
        }
      },
      test1(){
        this.sum=0
        for(var i=0;i<this.radios.length;i++){
          var a=parseInt(this.radios[i].radio)
          switch(a){
            case 1:
            this.sum=this.sum+=1
            break;
            case 2:
            this.sum=this.sum+=2
            break;
            case 3:
            this.sum=this.sum+=3
            break;
            case 4:
            this.sum=this.sum+=4
            break;
          }
      }
      },
      test2(){
        this.sum2=0
        for(var j=0;j<this.radios2.length;j++){
          var b=parseInt(this.radios2[j].radio2)
          switch(b){
            case 1:
            this.sum2=this.sum2+=1
            break;
            case 2:
            this.sum2=this.sum2+=2
            break;
            case 3:
            this.sum2=this.sum2+=3
            break;
            case 4:
            this.sum2=this.sum2+=4
            break;
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
