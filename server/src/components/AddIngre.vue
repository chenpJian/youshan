<template>
    <div class="AddIngre">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="AddIngre" @on-select="routeTo" theme="dark" width="auto" :open-names="['1']">
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
                            <div class="operate1">每百克食物热量:<br><Input v-model="foodEnergy" style="width: 600px" /></div>
                            <div class="operate1">蛋白质:<br><Input v-model="protein" style="width: 600px" /></div>
                            <div class="operate1">脂肪:<br><Input v-model="fat" style="width: 600px" /></div>
                            <div class="operate1">碳水化合物:<br><Input v-model="Carbohydrate" style="width: 600px" /></div>
                            <div class="operate1">膳食纤维:<br><Input v-model="DietaryFiber" style="width: 600px" /></div>
                            <div class="operate1">维生素A:<br><Input v-model="VitaminA" style="width: 600px" /></div>
                            <div class="operate1">胡罗卜素:<br><Input v-model="Carotene" style="width: 600px" /></div>
                            <div class="operate1">视黄醇当量:<br><Input v-model="Retinol" style="width: 600px" /></div>
                            <div class="operate1">硫胺素:<br><Input v-model="Thiamine" style="width: 600px" /></div>
                            <div class="operate1">核黄素:<br><Input v-model="Riboflavin" style="width: 600px" /></div>
                            <div class="operate1">烟酸:<br><Input v-model="niacin" style="width: 600px" /></div>
                            <div class="operate1">维生素C:<br><Input v-model="VitaminC" style="width: 600px" /></div>
                            <div class="operate1">维生素E:<br><Input v-model="VitaminE" style="width: 600px" /></div>
                            <div class="operate1">胆固醇:<br><Input v-model="cholesterol" style="width: 600px" /></div>
                            <div class="operate1">钾:<br><Input v-model="Potassium" style="width: 600px" /></div>
                            <div class="operate1">钠:<br><Input v-model="sodium" style="width: 600px" /></div>
                            <div class="operate1">钙:<br><Input v-model="calcium" style="width: 600px" /></div>
                            <div class="operate1">镁:<br><Input v-model="magnesium" style="width: 600px" /></div>
                            <div class="operate1">铁:<br><Input v-model="iron" style="width: 600px" /></div>
                            <div class="operate1">锰:<br><Input v-model="manganese" style="width: 600px" /></div>
                            <div class="operate1">锌:<br><Input v-model="Zinc" style="width: 600px" /></div>
                            <div class="operate1">铜:<br><Input v-model="copper" style="width: 600px" /></div>
                            <div class="operate1">磷:<br><Input v-model="phosphorus" style="width: 600px" /></div>
                            <div class="operate1">硒:<br><Input v-model="selenium" style="width: 600px" /></div>
                            
                            <Button id="add" type="success" @click="addIngreInfo()">添加</Button>
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
    name: 'AddIngre',
    data () {
        return {
            foodname:'',
            foodEnergy:'',
            protein:'',
            fat:'',
            Carbohydrate:'',
            DietaryFiber:'',
            VitaminA:'',
            Carotene:'',
            Retinol:'',
            Thiamine:'',
            Riboflavin:'',
            niacin:'',
            VitaminC:'',
            VitaminE:'',
            cholesterol:'',
            Potassium:'',
            sodium:'',
            calcium:'',
            magnesium:'',
            iron:'',
            manganese:'',
            Zinc:'',
            copper:'',
            phosphorus:'',
            selenium:'',
        }
    },
    methods: {
        routeTo(e) {
            this.$router.push(e);
        },
        addIngreInfo(){
            axios({
                url:url.addIngre,
                method:'post',
                data:{
                    foodname:this.foodname,
                    foodEnergy:this.foodEnergy,
                    protein:this.protein,
                    fat:this.fat,
                    Carbohydrate:this.Carbohydrate,
                    DietaryFiber:this.DietaryFiber,
                    VitaminA:this.VitaminA,
                    Carotene:this.Carotene,
                    Retinol:this.Retinol,
                    Thiamine:this.Thiamine,
                    Riboflavin:this.Riboflavin,
                    niacin:this.niacin,
                    VitaminC:this.VitaminC,
                    VitaminE:this.VitaminE,
                    cholesterol:this.cholesterol,
                    Potassium:this.Potassium,
                    sodium:this.sodium,
                    calcium:this.calcium,
                    magnesium:this.magnesium,
                    iron:this.iron,
                    manganese:this.manganese,
                    Zinc:this.Zinc,
                    copper:this.copper,
                    phosphorus:this.phosphorus,
                    selenium:this.selenium,
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
        // 图片上传
        // handleView (name) {
        //     this.imgName = name;
        //     this.visible = true;
        // },
        // handleRemove (file) {
        //     const fileList = this.$refs.upload.fileList;
        //     this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        // },
        // 成功后
        // handleSuccess (res, file) {
        //     console.log(res)
        //     console.log(file)
        //     // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        //     // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        // },
        // // 文件格式验证失败时
        // handleFormatError (file) {
        //     this.$Notice.warning({
        //         title: '上传失败',
        //         desc: '图片 ' + file.name + ' 必须为jpg 或 png.'
        //     });
        // },
        // // 文件超出指定大小限制时
        // handleMaxSize (file) {
        //     this.$Notice.warning({
        //         title: '文件过大',
        //         desc: '图片  ' + file.name + ' 大小不能超过2M.'
        //     });
        // },
        // 上传文件之前
        // handleBeforeUpload () {
        //         this.file = file;
        //         return false;
        // }   
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
    height: 2300px;

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
