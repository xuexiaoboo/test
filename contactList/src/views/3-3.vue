<template>
  <div class="home">
  </div>
</template>

<script>
/*
拦截器：在请求或响应被处理前拦截他们
请求拦截器， 响应拦截器
*/
// 引入axios
import axios from 'axios'

export default {
  name: 'axios3-3',
  components: {
  },
  created() {
    //   请求拦截器
      axios.interceptors.request.use(config=>{
        //   在发送前执行
        return config;
      },err=>{
        //   请求失败时执行
        return Promise.reject(err);
      })

    //   响应拦截器
    axios.interceptors.response.use(res=>{
        // 请求成功对响应数据做处理
        // 返回给then
        return res;
    },err=>{
        // 响应错误
        // 返回给catch
        return Promise.reject(err);
    })
  },
}
</script>
