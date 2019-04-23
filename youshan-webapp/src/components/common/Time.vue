<template>
 <div class="Time">
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
      <ul class="days">
        <li @click="pick(day)" v-for="(day, index) in days" :key="index">
        <!--本月-->
          <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
          <span v-else>
          <!--今天-->
          <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
          <span id="s1" @click="Select()" v-else>{{ day.getDate() }}</span>
          </span>
        </li>
      </ul>
    </div>
 </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState,mapActions } from 'vuex'
 export default {
  name: 'Time',
  components: {

    },
  data () {
    return {
      currentYear: 1970,  // 年份
      currentMonth: 1, // 月份
      currentDay: 1,  // 日期
      currentWeek: 1,  // 星期
      days: [],
    }
  },
  computed:{
    ...mapState(['count'])
  },
  created () {
   this.initData(null)
  },

  methods: {
    ...mapActions(['setCount','getCount']),
    Select(){
      var s=document.getElementById('s1')
      // s.style.backgroundColor='#ccc';
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
      this.setCount(str)//传值到vuex

      // console.log(this.$store.state.count+'222')
      //显示一周
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
      this.getCount(tody)//传值到vuex
      // console.log(tody)
      // console.log(this.$store.state.count+'333')
    }
  },
  store
}
</script>

<style>
#time1{
  height: 120px;
  color: #333;
  background-color: #00FA9A;
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
</style>