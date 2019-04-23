<template>
    <div class="ManageUser">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="manageUser" @on-select="routeTo" theme="dark" width="auto" :open-names="['1']">
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
                    <div id="user">
                        <table border="1">
                            <tr>
                                <th>用户ID</th>
                                <th>用户名</th>
                                <th>操作</th>
                            </tr>
                            <tr v-for="(item, index) in userMsg" :key="index">
                                <td class="userid">{{item._id}}</td>
                                <td class="usermsg">{{item.username}}</td>
                                <td class="usermsg">
                                    <button>删除</button>
                                </td>
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
  name: 'ManageUser',
  data () {
    return {
      // isCollapsed: false
        userMsg:[]
    }
  },
  created() {
      this.getUsers()
  },
  methods: {
    routeTo(e) {
            this.$router.push(e);
        },
    getUsers(){
        axios({
            url:url.getUser,
            method:'get',
        }).then(response=>{
            console.log(response)
            console.log(response.data.message)
            if(response.data.code==200){
                this.userMsg=response.data.message
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
.ManageUser{
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
    
#user{
    height: 700px;
}
#user ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}
/* 用户列表 */
th{
    background-color: #ccc;
}
.userid{
    width: 300px;
}
.usermsg{
    width: 100px;
}
span{
    font-size: 40px;
    font-weight:bold;
}
</style>
