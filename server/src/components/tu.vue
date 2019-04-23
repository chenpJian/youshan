<template>
    <div class="tu">
        <div class="operate2">
            食物图片：<br>
            <Upload action="http://localhost:3000/" :before-upload="handleBeforeUpload" ref="file" v-model="foodPicture"> 
                <Button icon="ios-cloud-upload-outline">Upload files</Button>
            </Upload>
        </div>
    <Button id="add" type="success" @click="addFood()">添加</Button>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serverAPI2.config.js'
export default {
    name: 'tu',
    data () {
        return {
        foodPicture:'',
        }
    },
    methods: {
        handleBeforeUpload (file) {
                this.file = file;
                return false;
        } ,
        addFood(){
            this.$refs.file.post(this.file);
            // this.$refs.file.post(this.file);
            axios({
                url:url.addFood,
                method:'post',
                data:{
                    foodPicture:this.file,
                }
            }).then(response=>{
                
                console.log(response)
                if(response.data.code==200){
                    console.log(foodPicture+'aa')
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
</style>
