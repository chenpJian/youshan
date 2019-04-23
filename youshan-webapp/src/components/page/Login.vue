<template>
  <div>
      <van-nav-bar
        title="登录"
        left-text="首页"
        right-text="注册"
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />

    <div class="assembly">
        <div><img :src="logo" alt=""></div>
        <div class="lgName"><div class="name1">账号:</div><input v-model="username" type="text" name="username" class="login-name2"></div>
        <div class="lgpass"><div class="name1">密码:</div><input v-model="password" type="password" name="password" class="login-name2"></div>

        <button class="login" @click="axiosLoginUser()">登录</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import url from '@/serverAPI.config.js'
  import {Toast} from 'vant'
  import { error } from 'util';
import { setTimeout } from 'timers';

  export default {
    components: { 
      Toast     
    },
    data(){
        return{
            logo:require('../../assets/images/logo.png'),
            username:'',
            password:'',
        }
    },
    methods:{
        onClickLeft() {
            this.$router.push('/')
        },
        onClickRight() {
            this.$router.push('/Register')
        },
        axiosLoginUser(){
            axios({
                url:url.login,
                method:'post',
                data:{
                    username:this.username,
                    password:this.password
                }
            }).then(response=>{
                if(response.data.code==200){
                    let username=response.data.message
                    localStorage.setItem('username',username)
                    localStorage.setItem('YSname','用户'+username)
                    // let user = localStorage.user?JSON.parse(localStorage.user):[]
                    // let oneUser = user.find(collect=>collect.username==username)
                    // if(!oneUser){
                    //     let newuser={
                    //     username:username,
                    //     YSname:"用户"+username,
                    //     count:1
                    //     }
                    //     user.push(newuser)
                    //     localStorage.user=JSON.stringify(user)
                    // }
                    Toast('登录成功')
                    this.$router.push('/')
                }else{
                    Toast('账号或密码错误')
                }
            }).catch((error)=>{
                console.log(error)
                Toast('账号或密码错误')
            })
        },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
input{
    background-color: #f0f0f0;
}
.assembly{
    width: 250px;
    height: 280px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.lgName{
    width: 240px;
    height: 25px;
    float: left;
    margin-top: 10px;
}
.lgpass{
    width: 240px;
    height: 25px;
    float: left;
    margin-top: 25px;
}
.name1{
    width: 40px;
    height: 27px;
    color: #8E8E8E;
    background-color: white;
    float: left;
    margin-left: 20px;
    text-align: center;
    line-height: 25px;
    background-color: #f0f0f0;
}
.login-name2{
    height: 27px;
    width: 175px;
    float: left;
    border-width: 0;
    outline: none;
}
.login{
    margin-top: 25px;
    width: 215px;
    height: 30px;
    background-color: red;
    border-width: 0;
}

</style>

