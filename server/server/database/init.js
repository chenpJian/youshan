//数据库的连接和一些初始化

const mongoose = require('mongoose')
const glob = require('glob')
const {resolve} = require('path')

mongoose.connect('mongodb://localhost/youshan',{useNewUrlParser: true})
const db = mongoose.connection

mongoose.Promise = global.Promise

exports.initSchemas=()=>{   //一次性引入所有的Schema文件
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}

// exports.connect=()=>{
//     return new Promise((resolve,reject)=>{
//     db.on('error',()=>{
//         reject()
//         console.log('error')
        
//     })
//     db.once('open',()=>{
//         console.log('连接成功')
//         resolve()
//     })
// })
// }


exports.connect=()=>{
    // mongoose.connect(db)     //连接数据库
    // const db = mongoose.connection
    let maxConnectTimes = 0
    return new Promise((resolve,reject)=>{
        mongoose.connection.on('disconnected',()=>{   //监听
            console.log('数据库断开')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db)  //重连
            }else{
                reject()
                throw new Error('无法连接数据库')
            }   
        })
    
        mongoose.connection.on('error',(err)=>{  //连接错误时
            console.log('数据库错误')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db)  //重连
            }else{
                reject(err)
                throw new Error('无法连接数据库')
            }  
        })
    
        mongoose.connection.once('open',()=>{   //链接打开时
            console.log('已连接数据库!')
            resolve()
        })
    })
}
