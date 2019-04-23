<template>
    <div class="Share">
        <van-nav-bar title="饮食分享" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

        <div style="margin-top:50px;">
            <van-cell-group>
                <van-field
                    v-model="shareRecipe"
                    label="菜单："
                    placeholder="请输入菜单名称"
                />
                <van-field
                    v-model="shareIngre"
                    label="食材："
                    type="textarea"
                    placeholder="请输入食材"
                    rows="2"
                    autosize
                />
                <van-field
                    v-model="shareStep"
                    label="步骤："
                    type="textarea"
                    placeholder="请输入步骤"
                    rows="2"
                    autosize
                />
                <div class="image">图片：<br>
                    <van-uploader :after-read="onRead">
                        <img src="../../assets/images/上传图片.jpg" width="150px" height="80px" ref="goodsImg" style="padding-left: 40px;">
                    </van-uploader>
                </div>
            </van-cell-group>
        </div>

        <van-button @click="addShare()"  class="btn" round type="danger">分享</van-button>
    </div>
</template>

<script>
  import {Toast} from 'vant'
import axios from 'axios'
import url from '@/serverAPI.config.js'
export default {
    name:'Share',
    components: {
      Toast,
    },
    data(){
        return{
            loginUser:'',
            shareRecipe:'',
            shareIngre:'',
            shareStep:'',
            file:''
        }
    },
    created() {
        this.getUserName()
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        getUserName(){
            this.loginUser=localStorage.YSname
        },
        onRead(file) {
		    //    console.log(file);
            //将原图片显示为选择的图片
            this.$refs.goodsImg.src = file.content;
            this.file=file.content
        },
        addShare() {
            axios({
                url:url.addShare,
                method:'post',
                data:{
                    sharePeople:this.loginUser,
                    shareRecipe:this.shareRecipe,
                    shareIngre:this.shareIngre,
                    shareStep:this.shareStep,
                    file:this.file,
                }
            }).then(response=>{
                // console.log(response)
                if(response.data.code==200){
                    Toast('分享成功')
                }else{
                    Toast('分享失败')
                }
            }).catch((error)=>{
                console.log(error)
                Toast('分享失败2')
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image{
    font-size: 14px;
    text-align: left;
    padding-left: 38px;
}
.btn{
    position: fixed;
    bottom: 20px;
    left: 100px;
    width: 120px;
}
</style>
