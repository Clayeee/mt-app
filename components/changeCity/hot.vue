<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市</dt>
      <dd v-for="item in list" :key="item.id">{{ item.name }}</dd>
    </dl>
  </div>
</template>
<script>
 export default {
   data () {
     return {
       list: [
         {id: '101', name: '北京市'},
         {id: '102', name: '上海市'},
         {id: '103', name: '广州市'},
         {id: '104', name: '天津市'},
         {id: '105', name: '深圳市'},
         {id: '106', name: '重庆市'},
         {id: '107', name: '哈尔滨市'},
       ]
     }
   }
 }
</script>
<style lang='scss'>
  @import "@/assets/css/changeCity/hot.scss";
</style>
