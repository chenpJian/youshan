<template>
    <div class="AddFood">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="addFood" @on-select="routeTo" theme="dark" width="auto" :open-names="['1']">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="md-contacts"></Icon>
                        用户
                    </template>
                    <MenuItem name="manageUser">管理用户</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-create"></Icon>
                        食物
                    </template>
                    <MenuItem name="addFood">添加食物</MenuItem>
                    <MenuItem name="manageFood">管理食物</MenuItem>
                    <MenuItem name="AddIngre">食物成分</MenuItem>
                    <MenuItem name="AddRecipe">食膳搭配</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="md-compass"></Icon>
                        推送
                    </template>
                    <MenuItem name="addInfor">添加推送</MenuItem>
                    <MenuItem name="manageInfor">管理推送</MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="md-color-palette" />
                        其他
                    </template>
                    <MenuItem name="addknow">添加小知识</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"><span>优膳-后台管理系统</span></Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Card>
                    <div id="operate">
                            <div class="operate1">食物名称:<br><Input v-model="foodname" style="width: 600px" /></div>
                            <div class="operate1">
                                食物分类：<br>
                                <Select v-model="foodCls" style="width:600px">
                                    <Option v-for="item in foodClsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                            <div class="operate1">
                                食物属性：<br>
                                <Select v-model="foodAtb" style="width:600px">
                                    <Option v-for="item in foodAtbList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                            <div class="operate2">食物图片：<br><Input v-model="foodPicture" style="width: 600px;" /></div>
                            <div class="operate1">食物简介:<br><Input v-model="foodIntro" style="width: 600px;" /></div>
                            <div class="operate1">食物详细信息：<br><Input v-model="foodDatails" type="textarea" :autosize="{minRows: 2}" style="width: 600px;" /></div>
                            <div class="operate1">食物功效<br><Input v-model="foodEfficacy" type="textarea" :autosize="{minRows: 2}" style="width: 600px;" /></div>
                            <div class="operate1">营养价值:<br><Input v-model="foodValue" type="textarea" :autosize="{minRows: 2}" style="width: 600px;" /></div>
                            <div class="operate1">饮食建议:<br><Input v-model="tabooCrowd" type="textarea" :autosize="{minRows: 2}" style="width: 600px;" /></div>
                            <div class="operate1">每百克食物热量:<br><Input v-model="foodEnergy" type="textarea" :autosize="{minRows: 2}" style="width: 600px;" /></div>
                            <Button id="add" type="success" @click="addFood()">添加</Button>
                        </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI2.config.js'
export default {
    name: 'AddFood',
    data () {
        return {
        foodClsList:[
            {value:'谷物类',label:'谷物类'},
            {value:'肉类',label:'肉类'},
            {value:'蔬菜',label:'蔬菜'},
            {value:'蛋类',label:'蛋类'},
            {value:'奶类',label:'奶类'},
            {value:'水果',label:'水果'},
            {value:'豆类',label:'豆类'},
            {value:'饮料',label:'饮料'},
            {value:'小吃',label:'小吃'},
            {value:'其他',label:'其他'},
        ],
        foodAtbList:[
            {value:'性平类',label:'性平类'},
            {value:'性温类',label:'性温类'},
            {value:'性热类',label:'性热类'},
            {value:'性凉类',label:'性凉类'},
            {value:'性寒类',label:'性寒类'},
        ],
        foodname:'',
        foodCls:'',
        foodAtb:'',
        foodPicture:'',
        foodIntro:'',
        foodDatails:'',
        foodEfficacy:'',
        foodValue:'',
        tabooCrowd:'',
        foodEnergy:'',
        }
    },
    methods: {
        routeTo(e) {
            this.$router.push(e);
        },
        addFood(){
            axios({
                url:url.addFood,
                method:'post',
                data:{
                    foodname:this.foodname,
                    foodCls:this.foodCls,
                    foodAtb:this.foodAtb,
                    foodPicture:this.foodPicture,
                    foodIntro:this.foodIntro,
                    foodDatails:this.foodDatails,
                    foodEfficacy:this.foodEfficacy,
                    foodValue:this.foodValue,
                    tabooCrowd:this.tabooCrowd,
                    foodEnergy:this.foodEnergy,
                }
            }).then(response=>{
                console.log(response)
                if(response.data.code==200){
                    this.$Message.success('添加成功')
                }else{
                    console.log(response.data.message)
                    this.$Message.error('添加失败')
                }
                console.log(response.data.code)
            }).catch((error)=>{
                console.log(error)
                this.$Message.error('添加失败2')
            })
        }, 
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.AddFood{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
#operate{
    /* background-color: rgb(243, 243, 243); */
    font-size: 20px;
    text-align: left;
    height: 1500px;

}
.operate1{
    /* float: left; */
    width: 70%;
    margin-top: 20px;
}
.operate2{
    /* float: left; */
    /* width: 70%; */
    margin-top: 20px;
}
#add{
    text-align: center;
    width: 100px;
    margin-top: 20px;
}
span{
    font-size: 40px;
    font-weight:bold;
}
</style>
