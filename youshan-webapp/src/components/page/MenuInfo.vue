<template>
  <div class="MenuInfo">
    <van-nav-bar :title="ingre.foodname" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div id="chart"></div>
    <div class="menu-msg">
      <div class="menuName">{{ingre.foodname}}</div>
      <div class="menuEnergy">每100克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">食物热量</div>
      <div class="menuEnergy2">{{ingre.foodEnergy}}千卡</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">蛋白质</div>
      <div class="menuEnergy2">{{ingre.protein}}克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">脂肪</div>
      <div class="menuEnergy2">{{ingre.fat}}克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">碳水化合物</div>
      <div class="menuEnergy2">{{ingre.Carbohydrate}}克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">膳食纤维</div>
      <div class="menuEnergy2">{{ingre.DietaryFiber}}克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">维生素A</div>
      <div class="menuEnergy2">{{ingre.VitaminA}}微克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">胡罗卜素</div>
      <div class="menuEnergy2">{{ingre.Carotene}}微克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">视黄醇当量</div>
      <div class="menuEnergy2">{{ingre.Retinol}}微克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">硫胺素</div>
      <div class="menuEnergy2">{{ingre.Thiamine}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">核黄素</div>
      <div class="menuEnergy2">{{ingre.Riboflavin}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">烟酸</div>
      <div class="menuEnergy2">{{ingre.niacin}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">维生素C</div>
      <div class="menuEnergy2">{{ingre.VitaminC}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">维生素E</div>
      <div class="menuEnergy2">{{ingre.VitaminE}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">胆固醇</div>
      <div class="menuEnergy2">{{ingre.cholesterol}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">钾</div>
      <div class="menuEnergy2">{{ingre.Potassium}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">钠</div>
      <div class="menuEnergy2">{{ingre.sodium}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">钙</div>
      <div class="menuEnergy2">{{ingre.calcium}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">镁</div>
      <div class="menuEnergy2">{{ingre.magnesium}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">铁</div>
      <div class="menuEnergy2">{{ingre.iron}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">锰</div>
      <div class="menuEnergy2">{{ingre.manganese}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">锌</div>
      <div class="menuEnergy2">{{ingre.Zinc}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">铜</div>
      <div class="menuEnergy2">{{ingre.copper}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">磷</div>
      <div class="menuEnergy2">{{ingre.phosphorus}}毫克</div>
    </div>
    <div class="menu-msg">
      <div class="menuName">硒</div>
      <div class="menuEnergy2">{{ingre.selenium}}微克</div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
import url from '@/serverAPI.config.js'
import { Toast } from 'vant';
  export default {
    name:'MenuInfo',
    components: {
      Toast
    },
    data(){
        return{
          foodname:'',
          ingre:{}
        }
    },
    created() {
      this.foodname= this.$route.query.foodname ?this.$route.query.foodname : this.$route.params.foodname
      // console.log(this.foodname)
      this.getMenuInfo()

    },
    mounted(){
      // this.haveChart()
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      },
      // 画图
      haveChart(){
        var data = genData(50);

        var option = {
            title : {
                text: '同名数量统计',
                subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: data.legendData,

                selected: data.selected
            },
            series : [
                {
                    name: '姓名',
                    type: 'pie',
                    radius : '55%',
                    center: ['40%', '50%'],
                    data: data.seriesData,
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




        function genData(count) {
            var nameList = [
                '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
            ];
            var legendData = [];
            var seriesData = [];
            var selected = {};
            for (var i = 0; i < 50; i++) {
                name = Math.random() > 0.65
                    ? makeWord(4, 1) + '·' + makeWord(3, 0)
                    : makeWord(2, 1);
                legendData.push(name);
                seriesData.push({
                    name: name,
                    value: Math.round(Math.random() * 100000)
                });
                selected[name] = i < 6;
            }

            return {
                legendData: legendData,
                seriesData: seriesData,
                selected: selected
            };

            function makeWord(max, min) {
                var nameLen = Math.ceil(Math.random() * max + min);
                var name = [];
                for (var i = 0; i < nameLen; i++) {
                    name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
                }
                return name.join('');
            }
        }
        var myChart=echarts.init(document.getElementById('chartmain2'))
        myChart.setOption(option)
      },

      getMenuInfo(){
        axios({
          url:url.getIngreInfo,
          method:'post',
          data:{
            foodname:this.foodname
          }
        }).then(response=>{
          // console.log(response)
          // console.log(response.data.message)
          if(response.data.code==200){
            this.ingre=response.data.message
          }else{
            Toast('数据获取失败')
          }
        }).catch(error=>{
          console.log(error)
        })
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chart{
  /* width: 310px;
  height: 300px; */
  padding-left: 10px;
  margin-top: 45px;
}
.menu-msg{
  width: 100%;
  box-shadow: 0 1px 0.5px rgb(212, 212, 212);
  height: 30px;
}
.menuName{
  float: left;
  width: 50%;
  padding-top: 5px;
  text-align: left;
  padding-left: 25px;
  font-size: 14px;
}
.menuEnergy{
  float: left;
  width: 30%;
  padding-top: 5px;
  text-align: left;
  font-size: 14px;
}
.menuEnergy2{
  float: left;
  width: 30%;
  padding-top: 5px;
  color: rgb(126, 126, 126);
  text-align: left;
  font-size: 14px;
}
</style>
