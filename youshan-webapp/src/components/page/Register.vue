<template>
  <div>
      <van-nav-bar title="注册" left-text="返回" left-arrow fixed @click-left="onClickLeft"></van-nav-bar>

    <div class="R-assembly">
        <div><img :src="logo" alt=""></div>
        <div class="rgName"><div class="username1">账号:</div><input v-model="username" type="text" name="username" class="username2"></div>
        <div class="username5"><div class="username1">密码:</div><input @blur="testPass()" id="pass1" v-model="password" type="password" name="password" class="username2"></div>
        <div class="username5"><div class="word1">确认密码:</div><input @blur="testPass2()" id="pass2" type="password" name="password2" class="word2"></div>
        <div class="username5">
            <div class="auth1">验证码:</div>
            <input type="text" value="" id="a" class="auth2">
            <input type = "button" id="code"/> 
        </div>
        <button class="register" @click="registerUser()">注册</button>

    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serverAPI.config.js'
  import {Toast} from 'vant'
  import { error } from 'util';
  
  export default {
    components: {
      Toast
    },
    data(){
        return{
            logo:require('../../assets/images/logo.png'),
            username:'',
            password:'',
            authCode:''
        }
    },
    mounted(){
        this.createCode()
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        testPass(){
            let pass1=document.getElementById('pass1').value
            if(this.password.length<6){
                Toast('密码不能少于6位')
            }
        },
        testPass2(){
            let pass2=document.getElementById('pass2').value
            if(pass2 != this.password){
                Toast('密码两次输入不相同')
            }
        },
        //加载验证码
        createCode(){
            var authCode='';
            var codeLength=4;
            var codeV=document.getElementById('code');
            var random=new Array(0,1,2,3,4,5,6,7,8,9);
            for(var i=0;i<codeLength;i++){
                var index=Math.floor(Math.random()*10);
                authCode+=random[index];
            }
            codeV.value=authCode;
            this.authCode = authCode
        },
        registerUser(){
            this.checkForm()&&this.checkUser()
        },
        // 表单验证
        checkForm(){
            let isOk = true
            let pass=document.getElementById('pass2').value
            if(this.username.length<6){
                Toast('账号不能少于6位')
                isOk=false
            }
            if(this.password.length<6){
                Toast('密码不能少于6位')
                isOk = false
            }
            if(this.password!=pass){
                Toast('两次输入密码不相同')
                isOk = false
            }
            return isOk
        } ,
        //注册和验证验证码
        checkUser(){
            var authCode=this.authCode
            var oValue = document.getElementById('a').value.toUpperCase();
            if(oValue ==0){
                Toast('请输入验证码')
            }else if(oValue != authCode){
                Toast('验证码错误')
                oValue = ' ';
                createCode();
            }else{
                axios({
                url:url.registerUser,
                method:'post',
                data:{
                    username:this.username,
                    password:this.password
                }
            }).then(response=>{
                if(response.data.code==200){
                    Toast('注册成功')
                    this.$router.push('/Login')
                }else{
                    Toast('注册失败')
                }
                // console.log(response.data.code)
            }).catch((error)=>{
                console.log(error)
                Toast('注册失败2')
            })
            } 
            
        }
    }
  }
</script>

<style>
input{
    background-color: #f0f0f0;
}
.R-assembly{
    width: 100%;
    height: 350px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.username5{
    width: 300px;
    height: 25px;
    float: left;
    margin-top: 20px;
    margin-left: 5px;
}
.rgName{
    width: 300px;
    height: 25px;
    float: left;
    margin-top: 10px;
    margin-left: 5px;
}
.username1{
    width: 40px;
    height: 25px;
    color: #8E8E8E;
    background-color: #FFFFFF;
    float: left;
    margin-left: 20px;
    text-align: center;
    line-height: 23px;
    background-color: #f0f0f0;
}
.username2{
    height: 25px;
    width: 230px;
    float: left;
    border-width: 0;
    outline: none;
}
.word1{
    width: 70px;
    height: 25px;
    color: #8E8E8E;
    background-color: #FFFFFF;
    float: left;
    margin-left: 20px;
    text-align: center;
    line-height: 23px;
    background-color: #f0f0f0;
}
.word2{
    height: 25px;
    width: 200px;
    float: left;
    border-width: 0;
    outline: none;
}
.auth1{
    width: 55px;
    height: 25px;
    color: #8E8E8E;
    background-color: #FFFFFF;
    float: left;
    margin-left: 20px;
    text-align: center;
    line-height: 23px;
    background-color: #f0f0f0;
}
.auth2{
    height: 25px;
    width: 150px;
    float: left;
    border-width: 0;
    outline: none;
}
.register{
    margin-top: 20px;
    width: 270px;
    height: 30px;
    background-color: red;
    border-width: 0;
}
#code{
    height: 25px;
    width: 65px;
    float: left;  
    font-family:Arial;  
    font-style:italic;  
    font-weight:bold;  
    border:0;  
    letter-spacing:2px;  
    color:blue;  
}
</style>

