<template>
  <div class="Statistical">
    <van-nav-bar title="饮食分析" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>
    <div style="margin-top:45px;">
        <van-loading v-if="loading"/>
        <div id="chartmain"></div>
        <div class="stChart"><div id="chartmain2"></div></div>
        其他营养素摄入量
        <Table border :columns="columns1" :data="data1"></Table>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { Toast,Dialog} from 'vant';
  import axios from 'axios'
  import url from '@/serverAPI.config.js'
  import { setTimeout } from 'timers';
  export default {
    name:'Statistical',
    components: {
      
    },
    data(){
        return{
            loading:false,
            take1:0,
            take2:0,
            take3:0,
            take4:0,
            take5:0,
            take6:0,
            take7:0,
            eatName:[],
            eatSum:[],

            columns1: [
                {
                    title: '营养素',
                    key: 'name'
                },
                {
                    title: '需摄入量',
                    key: 'should'
                },
                {
                    title: '已摄入量',
                    key: 'already'
                }
            ],
            data1: [
                {
                    name: '维生素A',
                    should: '0.8-1.1mg',
                    already: '0',
                },
                {
                    name: '维生素C',
                    should: '100mg',
                    already: '0',
                },
                {
                    name: '维生素E',
                    should: '12mg',
                    already: '0',
                },
                {
                    name: '钠',
                    should: '2200g',
                    already: '0',
                },
                {
                    name: '钙',
                    should: '800-1000mg',
                    already: '0',
                },
                {
                    name: '磷',
                    should: '700mg',
                    already: '0',
                },
                {
                    name: '钾',
                    should: '2000mg',
                    already: '0',
                },
                {
                    name: '镁',
                    should: '350mg',
                    already: '0',
                },
                {
                    name: '铁',
                    should: '15mg',
                    already: '0',
                },
                {
                    name: '锌',
                    should: '15mg',
                    already: '0',
                },
                {
                    name: '铜',
                    should: '2mg',
                    already: '0',
                },
                {
                    name: '硒',
                    should: '50ug',
                    already: '0',
                },
            ]
        }
    },
    mounted() {
        
        this.haveCharts()
        setTimeout(() => {
            this.haveCharts2()
            setTimeout(()=>{
                this.haveCharts3()
            })
        },1000)
    },
    methods:{
        haveCharts(){ 
            var data1=(new Date).getTime()-144* 60 * 60 * 1000
            var time1=new Date(data1)
            var day1=((time1.getMonth()+1)>9?(time1.getMonth()+1):"0"+(time1.getMonth()+1))+'-'+(time1.getDate()>9?time1.getDate():"0"+time1.getDate())
            time1=time1.getFullYear()+'-'+((time1.getMonth()+1)>9?(time1.getMonth()+1):"0"+(time1.getMonth()+1))+'-'+(time1.getDate()>9?time1.getDate():"0"+time1.getDate())

            var data2=(new Date).getTime()-125* 60 * 60 * 1000
            var time2=new Date(data2)
            var day2=((time2.getMonth()+1)>9?(time2.getMonth()+1):"0"+(time2.getMonth()+1))+'-'+(time2.getDate()>9?time2.getDate():"0"+time2.getDate())
            time2=time2.getFullYear()+'-'+((time2.getMonth()+1)>9?(time2.getMonth()+1):"0"+(time2.getMonth()+1))+'-'+(time2.getDate()>9?time2.getDate():"0"+time2.getDate())

            var data3=(new Date).getTime()-96* 60 * 60 * 1000
            var time3=new Date(data3)
            var day3=((time3.getMonth()+1)>9?(time3.getMonth()+1):"0"+(time3.getMonth()+1))+'-'+(time3.getDate()>9?time3.getDate():"0"+time3.getDate())
            time3=time3.getFullYear()+'-'+((time3.getMonth()+1)>9?(time3.getMonth()+1):"0"+(time3.getMonth()+1))+'-'+(time3.getDate()>9?time3.getDate():"0"+time3.getDate())

            var data4=(new Date).getTime()-72* 60 * 60 * 1000
            var time4=new Date(data4)
            var day4=((time4.getMonth()+1)>9?(time4.getMonth()+1):"0"+(time4.getMonth()+1))+'-'+(time4.getDate()>9?time4.getDate():"0"+time4.getDate())
            time4=time4.getFullYear()+'-'+((time4.getMonth()+1)>9?(time4.getMonth()+1):"0"+(time4.getMonth()+1))+'-'+(time4.getDate()>9?time4.getDate():"0"+time4.getDate())

            var data5=(new Date).getTime()-48* 60 * 60 * 1000
            var time5=new Date(data5)
            var day5=((time5.getMonth()+1)>9?(time5.getMonth()+1):"0"+(time5.getMonth()+1))+'-'+(time5.getDate()>9?time5.getDate():"0"+time5.getDate())
            time5=time5.getFullYear()+'-'+((time5.getMonth()+1)>9?(time5.getMonth()+1):"0"+(time5.getMonth()+1))+'-'+(time5.getDate()>9?time5.getDate():"0"+time5.getDate())

            var data6=(new Date).getTime()-24* 60 * 60 * 1000
            var time6=new Date(data6)
            var day6=((time6.getMonth()+1)>9?(time6.getMonth()+1):"0"+(time6.getMonth()+1))+'-'+(time6.getDate()>9?time6.getDate():"0"+time6.getDate())
            time6=time6.getFullYear()+'-'+((time6.getMonth()+1)>9?(time6.getMonth()+1):"0"+(time6.getMonth()+1))+'-'+(time6.getDate()>9?time6.getDate():"0"+time6.getDate())

            var data7=(new Date).getTime()
            var time7=new Date(data7)
            var day7=((time7.getMonth()+1)>9?(time7.getMonth()+1):"0"+(time7.getMonth()+1))+'-'+(time7.getDate()>9?time7.getDate():"0"+time7.getDate())
            time7=time7.getFullYear()+'-'+((time7.getMonth()+1)>9?(time7.getMonth()+1):"0"+(time7.getMonth()+1))+'-'+(time7.getDate()>9?time7.getDate():"0"+time7.getDate())
            // 获取饮食记录
            var username=localStorage.username
            axios({
                url:url.getOneRecord,
                method:'post',
                data:{
                    username:username
                }
            }).then(response=>{
                if(response.data.code==200){
                    for(var i=0;i<response.data.message.length;i++){
                        var recordDate=response.data.message[i].recordDate
                        var recordEnergy=response.data.message[i].recordEnergy
                        if(time1==recordDate){
                            this.take1=Math.round(this.take1+=recordEnergy)
                        }else if(time2==recordDate){
                            this.take2=Math.round(this.take2+=recordEnergy)
                        }else if(time3==recordDate){
                            this.take3=Math.round(this.take3+=recordEnergy)
                        }else if(time4==recordDate){
                            this.take4=Math.round(this.take4+=recordEnergy)
                        }else if(time5==recordDate){
                            this.take5=Math.round(this.take5+=recordEnergy)
                        }else if(time6==recordDate){
                            this.take6=Math.round(this.take6+=recordEnergy)
                        }else if(time7==recordDate){
                            this.take7=Math.round(this.take7+=recordEnergy)
                        }
                    }

                    var option={
                        title:{
                            text:'近一周热量摄入折线图',
                            subtext: '适中的热量摄入是保证身体健康的关键',
                        },
                        legend:{
                            data:['日期']
                        },
                        xAxis:{
                            type: 'category',
                            data:[day1,day2,day3,day4,day5,day6,day7]
                        },
                        yAxis:{
                            type:'value'
                        },
                        series:[{
                            name:'摄入量',
                            type:'line',
                            stack:'摄入总量',
                            label:{
                                normal:{
                                    show:true,
                                    position:'top'
                                }
                            },
                            areaStyle:{normal:{}},
                            data:[this.take1,this.take2,this.take3,this.take4,this.take5,this.take6,this.take7]
                        }]
                    }
                    var myChart=echarts.init(document.getElementById('chartmain'))
                    myChart.setOption(option)

                }else{
                    Toast('数据获取失败')
                }
            }).catch(error=>{
                console.log(error)
            })
        },

        haveCharts2(){
            var username=localStorage.username
            var data8=(new Date).getTime()
            var time8=new Date(data8)
            time8=time8.getFullYear()+'-'+((time8.getMonth()+1)>9?(time8.getMonth()+1):"0"+(time8.getMonth()+1))+'-'+(time8.getDate()>9?time8.getDate():"0"+time8.getDate())
            axios({
                url:url.getSomeRecord,
                method:'post',
                data:{
                    username:username,
                    recordDate:time8
                }
            }).then(response=>{
                if(response.data.code==200){
                    for(var i=0;i<response.data.message.length;i++){
                        var foodname=response.data.message[i].recordname
                        var recordSum=response.data.message[i].recordSum
                        this.eatName.push(foodname)
                        this.eatSum.push(recordSum)
                    }
                }else{
                    Toast('数据获取失败')
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        haveCharts3(){
            let sum1=0//碳水化合物
            let sum2=0//脂肪
            let sum3=0//蛋白质
            let sum4=0//膳食纤维
            let sum5=0//维生素A
            let sum6=0//维生素C
            let sum7=0//维生素E
            let sum8=0//钠
            let sum9=0//钙
            let sum10=0//磷
            let sum11=0//钾
            let sum12=0//镁
            let sum13=0//铁
            let sum14=0//锌
            let sum15=0//铜
            let sum16=0//硒
            axios({
                url:url.getIngres,
                method:'get',
            }).then(response=>{
                var eatName=this.eatName
                var eatSum=this.eatSum
                if(response.data.code==200){
                    for(var i=0;i<eatName.length;i++) {
                        var a=eatName[i]
                        var b=eatSum[i]
                        // const elem = {
                        //     foodname: 0,
                        //     Carbohydrate: 0
                        // }
                        for(var j=0;j<response.data.message.length;j++){
                            // for (const key in elem) {
                            //     if (elem.hasOwnProperty(key)) {
                            //         const element = elem[key];
                            //         elem[key] = response.data.message[krey]
                            //     }
                            // }
                            var foodname=response.data.message[j].foodname
                            var Carbohydrate=response.data.message[j].Carbohydrate//碳水化合物
                            var fat=response.data.message[j].fat//脂肪
                            var VitaminA=response.data.message[j].VitaminA//蛋白质
                            var protein=response.data.message[j].protein//维生素
                            var DietaryFiber=response.data.message[j].DietaryFiber//膳食纤维
                            var VitaminC=response.data.message[j].VitaminC
                            var VitaminE=response.data.message[j].VitaminE
                            var sodium=response.data.message[j].sodium
                            var calcium=response.data.message[j].calcium
                            var phosphorus=response.data.message[j].phosphorus
                            var Potassium=response.data.message[j].Potassium
                            var magnesium=response.data.message[j].magnesium
                            var iron=response.data.message[j].iron
                            var Zinc=response.data.message[j].Zinc
                            var copper=response.data.message[j].copper
                            var selenium=response.data.message[j].selenium
                            if(a==foodname){
                                sum1+=Math.round(b/100*Carbohydrate)
                                sum2+=Math.round(b/100*fat)
                                sum3+=Math.round(b/100*protein)
                                sum4+=Math.round(b/100*DietaryFiber)
                                sum5+=Math.round(b/100*VitaminA)
                                sum6+=Math.round(b/100*VitaminC)
                                sum7+=Math.round(b/100*VitaminE)
                                sum8+=Math.round(b/100*sodium)
                                sum9+=Math.round(b/100*calcium)
                                sum10+=Math.round(b/100*phosphorus)
                                sum11+=Math.round(b/100*Potassium)
                                sum12+=Math.round(b/100*magnesium)
                                sum13+=Math.round(b/100*iron)
                                sum14+=Math.round(b/100*Zinc)
                                sum15+=Math.round(b/100*copper)
                                sum16+=Math.round(b/100*selenium)
                                
                            }
                        }
                    }
                    var suma=(sum5+sum6+sum7)
                    var option = {
                        title : {
                            text: '今天饮食营养摄入量',
                            subtext: '人每天需要摄入约450g碳水化合物、75g脂肪、\n75g蛋白质、123mg维生素、10-30g膳食纤维',
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            x : 'center',
                            y : 'bottom',
                            data: ['碳水化合物','脂肪','蛋白质','维生素','膳食纤维']
                        },
                        series : [
                            {
                                name: '今天摄入',
                                type: 'pie',
                                radius : '45%',
                                // center: ['50%', '60%'],
                                data:[
                                    {value:sum1, name:'碳水化合物'},
                                    {value:sum2, name:'脂肪'},
                                    {value:sum3, name:'蛋白质'},
                                    {value:suma, name:'维生素'},
                                    {value:sum4, name:'膳食纤维'}
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    };
                    var myChart=echarts.init(document.getElementById('chartmain2'))
                    myChart.setOption(option)

                    this.data1[0].already=sum5+"mg"
                    this.data1[1].already=sum6+"mg"
                    this.data1[2].already=sum7+"mg"
                    this.data1[3].already=sum8+"mg"
                    this.data1[4].already=sum9+"mg"
                    this.data1[5].already=sum10+"mg"
                    this.data1[6].already=sum11+"mg"
                    this.data1[7].already=sum12+"mg"
                    this.data1[8].already=sum13+"mg"
                    this.data1[9].already=sum14+"mg"
                    this.data1[10].already=sum15+"mg"
                    this.data1[11].already=sum16+"ug"
                    
                }else{
                    Toast('数据获取失败')
                    }
                }).catch(error=>{
                    console.log(error)
            })
        },
        onClickLeft(){
            this.$router.go(-1)
        },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#chartmain{
    width: 310px;
    height: 280px;
    padding-left: 10px;
}
.stChart{
    width: 320px;
    height: 360px;
}
#chartmain2{
    width: 310px;
    height: 330px;
    padding-left: 8px;
}
</style>
