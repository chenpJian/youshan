<template>
  <div class="Change">
    <van-nav-bar title="个人资料" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>
    <div class="cgCard">
        <div class="cgAvatar">头像
            <van-uploader :after-read="onRead" style="float: right; margin-right:21px; margin-top:10px;">
                <img :src="Avatar" width="60px" height="60px" ref="userImg" style="border-radius:50%;">
            </van-uploader>
        </div>
        <div class="cgName">
            <van-cell-group>
                <van-field v-model="value" label="昵称" input-align="right" :placeholder="placeholder" />
            </van-cell-group>
        </div>
    </div>
    <van-button type="primary" @click="changeMsg()" style="width:100%; height:40px; position:fixed; left:0; bottom: 0;">确认</van-button>
  </div>
</template>

<script>
import {Toast} from 'vant'
  export default {
    name:'Change',
    components: {
        Toast
    },
    data(){
        return{
            Avatar:'',
            value:'',
            placeholder:'',
            file:''
        }
    },
    created() {
        this.getAvatar()
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        getAvatar(){
            this.Avatar=localStorage.imgSrc
            this.placeholder=localStorage.YSname
        },
        onRead(file) {
            //将原图片显示为选择的图片
            this.$refs.userImg.src = file.content;
            this.file=file.content
        },
        changeMsg(){
            if(this.value==''){
                let newName=localStorage.YSname
                localStorage.setItem('YSname',newName)
            }else{
                let newName=this.value
                localStorage.setItem('YSname',newName)
            }
            if(this.file==''){
                let newImg=localStorage.imgSrc
                localStorage.setItem('imgSrc',newImg)
            }else{
                let newImg=this.file
                localStorage.setItem('imgSrc',newImg)
            }
            Toast('修改成功')
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.cgCard{
    display: flex;
    margin-top: 45px;
    flex-wrap:wrap;
}
.cgAvatar{
    flex: 0 0 85.3%;
    height: 80px;
    text-align: left;
    font-size: 15px;
    line-height: 80px;
    padding-left: 47px;
    box-shadow: 0 0 1px #ccc;
}
.cgName{
    flex: 0 0 95%;
}

</style>
