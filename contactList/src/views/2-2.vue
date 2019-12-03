<template>
<div class="home"></div>
</template>

<script>
/*
    axios请求方法:get, post, put, patch, delete

    get:获取数据
    post：提交数据（表单提交，文件上传）
    put:更新数据(所有数据推送到服务端)
    patch:更新数据（只将修改的数据推送到服务端）
    delete:删除数据
*/
// 引入axios
import axios from 'axios'

export default {
  name: 'axios2-2',
  components: {
  },
  created() {
    //   get两种写法
    //   http://localhost:8080/data.json?id=12
    // 参数  url,config
    axios.get('/data.json',{
        params:{
            id:12
        }
    }).then((res)=>{
      console.log(res);
    })
    axios({
        method:'get',
        url:'/data.json',
        params:{
            id:12
        }
    }).then(res=>{
        console.log(res);
    })

    // post
    // form-data  表单提交 （文件上传）
    // applicition/json(常用)
    // 参数   url  data  config
    var data = {
        id:12
    }
    axios.post('/post',data).then(res=>{
        console.log(res);
    })
    axios({
        method:'post',
        url:'/post',
        data:data
    }).then(res=>{
        console.log(res)
    })

    // form-data
    let formData = new FormData();
    for(let key in data){
        formData.append(key, data[key])
    }
    axios.post('/post', formData).then(res=>{
        console.log(res)
    })


    // put
    // 参数   url  data  config
    axios.put('/put',data).then(res=>{
        console.log(res);
    })
    // patch
    axios.patch('/patch',data).then(res=>{
        console.log(res);
    })

    // delete,两个参数，url，config
    axios.delete('/delete', {
        params:12
    }).then(res=>{
        console.log(res);
    })
    axios.delete('/delete', {
        data:12
    }).then(res=>{
        console.log(res);
    })
  },
}
</script>
