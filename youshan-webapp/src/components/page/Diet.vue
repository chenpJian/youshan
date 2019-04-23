<template>
  <div class="Diet">

    <van-nav-bar title="饮食记录" left-text="返回" right-text="饮食分析" left-arrow fixed @click-left="onClickLeft" @click-right="onClickRight"></van-nav-bar>
    
    <div style="margin-top:45px;">
        <div class="shuiqiu">
            <div class="dNeedIntake">
                <div>建议摄入：{{needIntake}}千卡</div>
                <div>已经摄入：<span style="color:red;">{{todyIntake}}</span>千卡</div>
                <div style="font-size: 14px; margin-top:15px;">
                    <div style=" color:red;" @click="bodyData()">身体数据</div>

                    <van-popup v-model="show" style="width:290px;height:180px;">
                        <div class="s-age">
                            年龄段：
                            <Select v-model="age" style="width:180px;">
                                <Option v-for="item in ageList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div class="s-motion">
                            运动量：
                            <Select v-model="motion" style="width:180px;">
                                <Option v-for="item in motionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                        <Button id="add" type="success" @click="newBodyData()">确定</Button>
                    </van-popup>
                </div>
            </div>
            <div id="chartmain3"></div>
        </div>

        <div class="dEat">
            <div class="dietmsg">
                <van-panel style="text-align: left;" title="早餐">
                    <div class="breakfast" v-for="(item, index) in recordInfo1" :key="index">{{item.recordname}}：{{item.recordSum}}克</div>
                    <div class="breakfast">摄入量：{{intake1}}千卡</div>
                    <div style="font-size: 14px;color:red;" slot="footer" @click="addBreakfast()">添加</div>
                </van-panel>
            </div>
            <div class="dietmsg">
                <van-panel style="text-align: left;" title="午餐">
                    <div class="breakfast" v-for="(item, index) in recordInfo2" :key="index">{{item.recordname}}：{{item.recordSum}}克</div>
                    <div class="breakfast">摄入量：{{intake2}}千卡</div>
                    <div style="font-size: 14px;color:red;" slot="footer" @click="addLunch()">添加</div>
                </van-panel>
            </div>
            <div class="dietmsg">
                <van-panel style="text-align: left;" title="晚餐">
                    <div class="breakfast" v-for="(item, index) in recordInfo3" :key="index">{{item.recordname}}：{{item.recordSum}}克</div>
                    <div class="breakfast">摄入量：{{intake3}}千卡</div>
                    <div style="font-size: 14px;color:red;" slot="footer" @click="addDinner()">添加</div>
                </van-panel>
            </div>
            <div class="dietmsg2">
                <van-panel style="text-align: left;" title="宵夜">
                    <div class="breakfast" v-for="(item, index) in recordInfo4" :key="index">{{item.recordname}}：{{item.recordSum}}克</div>
                    <div class="breakfast">摄入量：{{intake4}}千卡</div>
                    <div style="font-size: 14px;color:red;" slot="footer" @click="addLate()">添加</div>
                </van-panel>
            </div>
        </div>
    </div>
    <!-- 日历 -->
    <div class="time">
        <div id="time1">
     <!-- 年份 月份 -->
      <div class="month">
        <div @click="weekPre()" style="float:left; margin-right:10px; font-size:15px;"><</div>
        <div style="float:left;">{{ currentYear }}年{{ currentMonth }}月</div>
        <div @click="weekNext()" style="float:left; margin-left:10px; font-size:15px;">></div>
      </div>
      <!-- 星期 -->
      <ul class="weekdays">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
        <li>日</li>
      </ul>
      <!-- 日期 -->
      <ul class="days" id="theDays">
        <li @click="pick(day);getRecords()" v-for="(day, index) in days" :key="index">
        <!--本月-->
          <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
          <span v-else>
          <!--今天-->
          <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
          <span id="s1" v-else>{{ day.getDate() }}</span>
          </span>
        </li>
      </ul>
    </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import liquidfill from 'echarts-liquidfill'
import { Toast,Dialog} from 'vant';
import axios from 'axios'
import url from '@/serverAPI.config.js'
  export default {
    name:'Diet',
    components: {
      Toast,
      Dialog
    },
    data(){
        return{
            show: false,
            
            ageList:[
                {value:'1-4岁',label:'1-4岁'},
                {value:'5-10岁',label:'5-10岁'},
                {value:'10-17岁',label:'10-17岁'},
                {value:'18-49岁',label:'18-49岁'},
                {value:'50-64岁',label:'50-64岁'},
                {value:'65岁以上',label:'65岁以上'},
            ],
            motionList:[
                {value:'较轻',label:'较轻'},
                {value:'一般',label:'一般'},
                {value:'较重',label:'较重'},
            ],
            age:'',  //年龄段
            motion:'',  //运动量
            needIntake:'',  //建议摄入
            todyIntake:'0',//当日总摄入量
            intake1:0,
            intake2:0,
            intake3:0,
            intake4:0,
            dateTime:'',
            recordInfo1:[],
            recordInfo2:[],
            recordInfo3:[],
            recordInfo4:[],
            loginUser:'',
            currentYear: 1970,  // 年份
            currentMonth: 1, // 月份
            currentDay: 1,  // 日期
            currentWeek: 1,  // 星期
            days: [],
            loginName:''
        }
    },
    created() {
        this.initData(null)
        this.getUserName()
        this.getRecords()
        this.getBodyMsg()
    },

    methods:{
        onClickLeft(){
            this.$router.push('/MyYoushan')
        },
        onClickRight() {
            this.$router.push('/Statistical')
        },
        getBodyMsg(){
            this.loginName=localStorage.username
            let localBodyMsg=JSON.parse(localStorage.bodymsg)
            let bodyuser=localBodyMsg[0].username
            this.age=localBodyMsg[0].age
            this.motion=localBodyMsg[0].motion
            this.haveBodyData()
            if(this.loginName!=bodyuser || localBodyMsg==[]) {
                Dialog.confirm({
                    title: '是否完善身体数据',
                    message: '您还没有完善身体数据，是否完善身体数据，以便我们能够更好地为您服务。'
                }).then(() => {
                    this.show=true
                }).catch(()=>{
                    this.$router.push('/MyYoushan')
                })
            }
            
        },
        bodyData(){
            this.show=true
        },
        newBodyData(){
            localStorage.removeItem('bodymsg')
            this.haveBodyData()
            let bodymsg=localStorage.bodymsg?JSON.parse(localStorage.bodymsg):[]
            let newbodymsg={
                username:this.loginName,
                age:this.age,
                motion:this.motion,
                count:1
            }
            bodymsg.push(newbodymsg)
            localStorage.bodymsg=JSON.stringify(bodymsg)
            this.show=false
            this.getRecords()
        },
        haveBodyData(){
            let age=this.age
            let motion=this.motion
            if(age=='1-4岁'){
                if(motion=='较轻'){
                    this.needIntake='1600'
                }else if(motion=='一般'){
                    this.needIntake='1800'
                }else if(motion=='较重'){
                    this.needIntake='2050'
                }
            }else if(age=='5-10岁'){
                if(motion=='较轻'){
                    this.needIntake='1700'
                }else if(motion=='一般'){
                    this.needIntake='1900'
                }else if(motion=='较重'){
                    this.needIntake='2100'
                }
            }else if(age=='10-17岁'){
                if(motion=='较轻'){
                    this.needIntake='2300'
                }else if(motion=='一般'){
                    this.needIntake='2600'
                }else if(motion=='较重'){
                    this.needIntake='2900'
                }
            }else if(age=='18-49岁'){
                if(motion=='较轻'){
                    this.needIntake='2250'
                }else if(motion=='一般'){
                    this.needIntake='2600'
                }else if(motion=='较重'){
                    this.needIntake='3200'
                }
            }else if(age=='50-64岁'){
                if(motion=='较轻'){
                    this.needIntake='2100'
                }else if(motion=='一般'){
                    this.needIntake='2500'
                }else if(motion=='较重'){
                    this.needIntake='2800'
                }
            }else if(age=='65岁以上'){
                if(motion=='较轻'){
                    this.needIntake='2000'
                }else if(motion=='一般'){
                    this.needIntake='2200'
                }else if(motion=='较重'){
                    this.needIntake='2300'
                }
            }
        },
        getUserName(){
            this.loginUser=localStorage.username
        },
        formatDate (year, month, day) {
            const y = year
            let m = month
            if (m < 10) m = `0${m}`
            let d = day
            if (d < 10) d = `0${d}`
            return `${y}-${m}-${d}`
        },
        initData (cur) {
            let date = ''
            if (cur) {
                date = new Date(cur)
            } else {
                date = new Date()
            }
            this.currentDay = date.getDate()     //几号
            this.currentYear = date.getFullYear()    // 当前年份
            this.currentMonth = date.getMonth() + 1  // 当前月份
            this.currentWeek = date.getDay() // 1...6,0  //星期几
            if (this.currentWeek === 0) {
                this.currentWeek = 7
            }
            const str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)// 今日日期 年-月-日
            this.days.length = 0
            this.dateTime=str   //获取今天日期
            for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
                const d = new Date(str)
                d.setDate(d.getDate() - i)
                this.days.push(d)
            }
            for (let i = 1; i <= 7 - this.currentWeek; i += 1) {
                const d = new Date(str)
                d.setDate(d.getDate() + i)
                this.days.push(d)
            }
        },
        // 上周
        weekPre(){
            const d = this.days[0]  // 如果当期日期是7号或者小于7号
            d.setDate(d.getDate() - 7)
            this.initData(d)
        },
        // 下周
        weekNext(){
            const d = this.days[6]  // 如果当期日期是7号或者小于7号
            d.setDate(d.getDate() + 7)
            this.initData(d)
        },
        //点击日期
        pick (date) {
            var tody=this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
            // console.log(tody)
            this.dateTime=tody
            // this.$options.methods.getRecords()
        },
        // 获取饮食记录
        getRecords(){
            this.intake1=0
            this.intake2=0
            this.intake3=0
            this.intake4=0
            this.todyIntake=0
            var havetime=this.dateTime
            var intake1=this.intake1
            var intake2=this.intake2
            var intake3=this.intake3
            var intake4=this.intake4
            var username=this.loginUser
            // console.log(username+'username')
            
            this.recordInfo1=[]
            this.recordInfo2=[]
            this.recordInfo3=[]
            this.recordInfo4=[]
            
            // console.log(havetime+'-recordDate')
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
                        var recordMeal=response.data.message[i].recordMeal
                        var recordEnergy=response.data.message[i].recordEnergy
                        if(havetime==recordDate){
                            if(recordMeal=='breakfast'){
                                this.recordInfo1.push(response.data.message[i])
                                intake1=Math.round(intake1+=recordEnergy)
                                this.intake1=intake1
                            }else if(recordMeal=='lunch'){
                                this.recordInfo2.push(response.data.message[i])
                                intake2=Math.round(intake2+=recordEnergy)
                                this.intake2=intake2
                            }else if(recordMeal=='dinner'){
                                this.recordInfo3.push(response.data.message[i])
                                intake3=Math.round(intake3+=recordEnergy)
                                this.intake3=intake3
                            }else if(recordMeal=='late'){
                                this.recordInfo4.push(response.data.message[i])
                                intake4=Math.round(intake4+=recordEnergy)
                                this.intake4=intake4
                            }
                            // console.log(this.intake1)
                            this.todyIntake=Math.round(this.intake1+this.intake2+this.intake3+this.intake4)
                        }
                    }
                    var theData=0
                    theData=this.todyIntake/this.needIntake
                    var option = {
                        series: [{
                            type: 'liquidFill',
                            data: [theData],
                            outline:{
                                borderDistance:0,
                                itemStyle:{
                                    borderColor:'#ccc',
                                    borderWidth:1,
                                }
                            },
                            label: {
                                fontSize: 20,
                            },
                            color:'green',
                            center: ['80','48'],
                            radius: '80%',
                        }],
                    };
                    var myChart=echarts.init(document.getElementById('chartmain3'))
                    myChart.setOption(option)
                }else{
                    Toast('数据获取失败')
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        addBreakfast(){
            var meal='breakfast'
            this.$router.push({name:'Foods',params:{meal:meal}})
        },
        addLunch(){
            var meal='lunch'
            this.$router.push({name:'Foods',params:{meal:meal}})
        },
        addDinner(){
            var meal='dinner'
            this.$router.push({name:'Foods',params:{meal:meal}})
        },
        addLate(){
            var meal='late'
            this.$router.push({name:'Foods',params:{meal:meal}})
        },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.record{
    margin-top: 45px;
}
.dietmsg{
    margin-top: 5px;
}
.dietmsg2{
    margin-top: 5px;
    margin-bottom: 125px;
}
.Diet{
    background-color: rgb(211, 211, 211);
}
.breakfast{
    padding-left: 15px;
    font-size: 12px;
    color: rgb(150, 150, 150);
}
.aaaaa{
    width: 100px;
    height: 100px;
    background-color: black;
}
/* 时间 */
.time{
    width: 100%;
    position:fixed;
    left:0;
    bottom: 0;
    z-index:997;
}
#time1{
    height: 120px;
    color: #333;
    background-color: rgb(243, 243, 243);
    /* margin-top: 10px; */
}
.month {
    font-size: 16px;
    text-align: center;
    margin-top: 15px;
    margin-left: 100px;
    width: 100%;
    float: left;
}
.weekdays {
    display: flex;
    font-size: 16px;
    margin-top: 10px;
    float: left;
    width: 100%;
}
.weekdays li {
    flex: 1;
    text-align: center;
}
.days {
    display: flex;
    float: left;
    width: 100%;
}
.days li {
    flex: 1;
    font-size: 16px;
    text-align: center;
    margin-top: 10px;
    line-height: 30px;
}
.active {
    display: inline-block;
    width: 30px;
    height: 30px;
    color: #fff;
    border-radius: 50%;
    background-color: #fa6854;
}
.other-month {
    color: #e4393c;
}
/* 弹出框 */
.s-age{
    margin-left: 20px;
    margin-top: 30px;
}
.s-motion{
    margin-left: 20px;
    margin-top: 15px;
}
#add{
    width: 240px;
    margin-left: 20px;
    margin-top: 15px;
}
.shuiqiu{
    width: 100%;
    float: left;
    background-color:#fff;
}
.dNeedIntake{
    float: left;
    text-align: left;
    padding-left: 10px;
    padding-top: 15px;
    width: 120px;
    /* height: 100px; */
}
#chartmain3{
    float: right;
    height: 100px;
    width: 180px;
}
.dEat{
    float: left;
    width: 100%;
    background: #ccc;
}
</style>
