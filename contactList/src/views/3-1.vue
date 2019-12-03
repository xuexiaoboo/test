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
  name: 'axios3-1',
  components: {
  },
  created() {
    //   创建axios实例
    // 参数为axios实例的配置
    let instance = axios.create({
        baseURL:'http://localhost:8080',
        timeout:1000
    });
    // 使用
    instance.get('/data.json').then(res=>{
        console.log(res);
    })
    
  },
}
</script>
