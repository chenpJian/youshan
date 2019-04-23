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
                        <div class="operate3">体质:<br><Input v-model="phyName" style="width: 600px" /></div>
                        <div class="operate3">体质介绍:<br><Input v-model="phyDetail" type="textarea" :autosize="{minRows: 5}" style="width: 600px" /></div>
                        <div class="operate3">形成原因:<br><Input v-model="phyReason" type="textarea" :autosize="{minRows: 5}" style="width: 600px" /></div>
                        <div class="operate3">饮食推荐:<br><Input v-model="phyAdjust" type="textarea" :autosize="{minRows: 5}" style="width: 600px;" /></div>
                        <Button id="add2" type="success" @click="addPhy()">添加</Button>
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
            phyName:'',
            phyDetail:'',
            phyReason:'',
            phyAdjust:'',
        }
    },
    methods: {
        routeTo(e) {
            this.$router.push(e);
        },
        addPhy(){
            axios({
                url:url.addPhysique,
                method:'post',
                data:{
                    phyName:this.phyName,
                    phyDetail:this.phyDetail,
                    phyReason:this.phyReason,
                    phyAdjust:this.phyAdjust,
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
    height: 1000px;
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
