<template>
  <div class="home">
  </div>
</template>

<script>
/*
错误处理：请求错误是进行的处理
*/ 
// 引入axios
import axios from 'axios'

export default {
  name: 'axios3-4',
  components: {
  },
  created() {
      axios.get('/data.json').then(res=>{
          console.log(res);
      }).catch(err=>{
        //   请求错误、响应错误都会进到catch中
        console.log(err);
      })
  },
}
</script>
