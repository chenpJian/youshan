<template>
    <div class="ManageInfor">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="manageInfor" @on-select="routeTo" theme="dark" width="auto" :open-names="['1']">
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
                    <div id="infor">
                        <table border="1">
                            <tr>
                                <th>推送标题</th>
                                <th>推送标题</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item, index) in inforMsg" :key="index">
                                <td class="cls1">{{item.inforTitle}}</td>
                                <td class="cls2">{{item.inforDetail}}</td>
                                <td class="cls1"><button>删除</button></td>
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
    name: 'ManageInfor',
    data () {
        return {
            inforMsg:[]
        }
    },
    created() {
        this.getInfors()
    },
    methods: {
        routeTo(e) {
            this.$router.push(e);
        },
        getInfors(){
            axios({
            url:url.getInfor,
            method:'get',
        }).then(response=>{
            console.log(response)
            console.log(response.data.message)
            if(response.data.code==200){
                this.inforMsg=response.data.message
            }else{
                this.$Message.error('服务器错误，数据获取失败')
            }
        }).catch(error=>{
            console.log(error)
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
    font-size: 20px;
    text-align: left;
    height: 700px;
}
.operate3{
    width: 70%;
    margin-top: 20px;
}
#add2{
    text-align: center;
    width: 100px;
    margin-top: 20px;
}
#infor{
    height: 700px;
}
th{
    background-color: #ccc;
}
.cls1{
    width: 100px;
}
.cls2{
    width: 800px;
}
span{
    font-size: 40px;
    font-weight:bold;
}
</style>
