<template>
    <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <amap
        :width="230"
        :height="290"
        :point="point"/>
    </el-col>
  </el-row>
</template>
<script>
import Crumbs from '@/components/products/crumbs'
import Categroy from '@/components/products/categroy'
import List from '@/components/products/list'
import Amap from '@/components/public/map'
 export default {
   data () {
     return {
       List: [],
       types: [],
       areas: [],
       point: []
     }
   },
   components: {
     Crumbs,
     Categroy,
     List,
     Amap
   },
   async asyncData (ctx) {
     let keyword = ctx.query.keyword

     let city = encodeURIComponent(ctx.store.state.geo.position.city)
     let {status,data:{pois}} = await ctx.$axios.get('/search/ilist', {
       params: {
         keyword
       }
     })
     let {status:status2,data:{areas,types}} = await ctx.$axios.get('/categroy/crumbs')
     if (status === 200 && status2 === 200){
       return {
         list: pois.map(item => {
           return {
             name: item.name,
             type: item.type,
             img: item.img,
             comment: item.commet,
             rate: item.rate,
             scene: item.name,
             tel: item.tel,
             status: '可定明日',
             location: item.add,
             module: item.module,
             price: item.price
           }
         }),
         keyword,
         areas,
         types,
         point: [106.27,38.47]
       }
     }
   }
 }
</script>
<style lang='scss'>
  @import "@/assets/css/products/index.scss"
</style>
