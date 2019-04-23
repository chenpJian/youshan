<template>
    <div class="AddInfor">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="addInfor" @on-select="routeTo" theme="dark" width="auto" :open-names="['1']">
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
                    <div id="operate2">
                        <div class="operate3">标题:<br><Input v-model="inforTitle" style="width: 600px" /></div>
                        <div class="operate3">
                                标签:<br>
                                <Select v-model="inforLabel" style="width:600px">
                                    <Option v-for="item in inforList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                        <!-- <div class="operate3">标签:<br><Input v-model="inforLabel" style="width: 600px" /></div> -->
                        <div class="operate3">内容:<br><Input v-model="inforDetail" type="textarea" :autosize="{minRows: 10}" style="width: 600px;" /></div>
                        <Button id="add2" type="success" @click="addArticle()">添加</Button>
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
    name: 'AddInfor',
    data () {
        return {
            inforList:[
                {value:'养生之道',label:'养生之道'},
                {value:'做菜小知识',label:'做菜小知识'},
                {value:'健康小知识',label:'健康小知识'},
                {value:'百家名菜',label:'百家名菜'},
            ],
            inforTitle:'',
            inforLabel:'',
            inforDetail:''
        }
    },
    methods: {
        routeTo(e) {
            this.$router.push(e);
        },
        addArticle(){
            axios({
                url:url.addInfor,
                method:'post',
                data:{
                    inforTitle:this.inforTitle,
                    inforLabel:this.inforLabel,
                    inforDetail:this.inforDetail,
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
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.AddInfor{
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

#operate2{
    /* background-color: rgb(243, 243, 243); */
    font-size: 20px;
    text-align: left;
    height: 700px;
}
.operate3{
    /* float: left; */
    width: 70%;
    margin-top: 20px;
}
#add2{
    text-align: center;
    width: 100px;
    margin-top: 20px;
}
span{
    font-size: 40px;
    font-weight:bold;
}
</style>
