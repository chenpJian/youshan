<template>
    <div class="ManageFood">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="manageFood" @on-select="routeTo" theme="dark" width="auto" :open-names="['1']">
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
                    <div id="food">
                        <table border="1">
                            <tr>
                                <th>食物名称</th>
                                <th>食物分类</th>
                                <th>食物属性</th>
                                <th>食物简介</th>
                                <th>食物营养价值</th>
                                <th>饮食注意</th>
                                <th>每100克食物能量</th>
                                <th>图片</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item, index) in foodMsg" :key="index">
                                <td class="cls1">{{item.foodname}}</td>
                                <td class="cls1">{{item.foodCls}}</td>
                                <td class="cls1">{{item.foodAtb}}</td>
                                <td class="cls2">{{item.foodIntro}}</td>
                                <td class="cls2">{{item.foodValue}}</td>
                                <td class="cls2">{{item.tabooCrowd}}</td>
                                <td class="cls1">{{item.foodEnergy}}</td>
                                <td class="cls1"><img :src="item.foodPicture" alt="" width="100px" height="60px"></td>
                                <td class="cls1"><button @click="removFood()">删除</button></td>
                            </tr>
                        </table>
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
    name: 'ManageFood',
    data () {
        return {
            foodMsg:[],
            foodname:''
        }
    },
    created() {
        this.getFoods()
    },
    methods: {
        routeTo(e) {
            this.$router.push(e);
        },
        getFoods(){
            axios({
                url:url.getFood2,
                method:'get',
            }).then(response=>{
                console.log(response)
                console.log(response.data.message)
                if(response.data.code==200){
                    this.foodMsg=response.data.message
                }else{
                    this.$Message.error('服务器错误，数据获取失败')
                }
            }).catch(error=>{
                console.log(error)
            })
        },
        removFood(){
            axios({
                url:url.removeFood,
                method:'post',
                // data:{
                //     foodname:this.foodname,
                // }
            }).then(response=>{
                console.log(response)
            }).catch((error)=>{
                console.log(error)
            })
        }
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
    height: 700px;

}
.operate1{
    /* float: left; */
    width: 70%;
    margin-top: 20px;
}
#add{
    text-align: center;
    width: 100px;
    margin-top: 20px;
}
#food{
    height: 700px;
}
th{
    background-color: #ccc;
}
.cls1{
    width: 80px;
}
.cls2{
    width: 250px;
}
span{
    font-size: 40px;
    font-weight:bold;
}
</style>
