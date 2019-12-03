<template>
  <div class="home">
  </div>
</template>

<script>
/*

*/
// 引入axios
import axios from 'axios'

export default {
  name: 'axios3-2',
  components: {
  },
  created() {
      axios.create({
          baseURL:'http://localhost:8080',  //请求的域名，基本地址
          timeout:1000,  //请求的超时时长，单位ms
          url:'/data.json', //请求的路径
          method:'get',  //get, post, put, patch, delete
          headers:{
              token:''
          },   //设置请求头 
          params:{},  //请求参数拼接到url上
          data:{}   //请求参数放到请求体里
      })

    //   哪些地方可配置
    // 1.全局配置
    axios.defaults.baseURL=''
    // 2.axios实例配置
    let instance = axios.create({})
    // 3.axios请求配置
    instance.get('/data.json', {
        // 这里修改，覆盖默认配置
        timeout:5000
    })
  },
}
</script>
