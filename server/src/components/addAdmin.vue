<template>
    <div class="addAdmin">
        管理员:<Input v-model="adminName"  style="width: 600px" />
        密码:<Input v-model="adminPass"  style="width: 600px;" />
        <Button type="success" @click="addAdmin()">添加</Button>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI2.config.js'

export default {
    name: 'addAdmin',
    data () {
        return {
            adminName:'',
            adminPass:''
        }
    },
    methods: {
        addAdmin(){
            axios({
                url:url.addAdmin,
                method:'post',
                data:{
                    adminName:this.adminName,
                    adminPass:this.adminPass,
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