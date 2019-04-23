<template>
  <div class="AdminLogin">
    <div id="admin">
      <Input v-model="adminName" placeholder="管理员账号" size="large" style="width: 260px">
            <Icon type="ios-contact" size="24" slot="prefix" />
        </Input>
    </div>
    <div id="pass">
      <Input v-model="adminPass" type="password" placeholder="管理员密码" size="large" style="width: 260px">
            <Icon type="md-eye-off" size="24" slot="prefix" />
        </Input>
    </div>
    <div id="btn">
      <Button type="success" style="width:260px" @click="adminLogin">登录</Button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI2.config.js'

export default {
  name: 'AdminLogin',
  data () {
    return {
      adminName:'',
      adminPass:'',
    }
  },
  methods: {
    adminLogin(){
      axios({
        url:url.adminLogin,
        method:'post',
        data:{
          adminName:this.adminName,
          adminPass:this.adminPass
        }
      }).then(response=>{
        console.log(response)
        if(response.data.code==200){
              this.$Message.success('登录成功')
              this.$router.push('ManageUser')
            }else{
            this.$Message.error('账号或密码错误')
        }
      }).catch((error)=>{
          console.log(error)
          this.$Message.error('账号或密码错误')
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.AdminLogin{
  width: 400px;
  height: 300px;
  background-color: #2d8cf0;
  box-shadow: 0px 0px 1px black;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
#admin{
  margin-top: 65px;
}
#pass{
  margin-top: 30px;
}
#btn{
  margin-top: 30px;
}
</style>
