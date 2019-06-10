<template>
  <div class="m-order">
    <ul>
      <li v-if="cur.length">
        <el-row v-for="(item, index) in cur" :key="index">
          <el-col :span="4">
            <img :src="require('../../assets/img/detail/'+item.img[0].url)" :alt="item.img[0].url">
          </el-col>
          <el-col :span="10">
            <h4>{{ item.name }}</h4>
            <p>数量: {{ item.count }}</p>
          </el-col>
          <el-col :span="4">
            总价: ￥ {{ item.total }}
          </el-col>
          <el-col :span="6">
            {{ item.statusText }}
          </el-col>
        </el-row>
      </li>
      <li v-else class="empty">没有订单</li>
    </ul>
  </div>
</template>
<script>
 export default {
   props: {
     cur: {
       type: Array,
       default: () => {
         return []
       }
     }
   }
 }
</script>
