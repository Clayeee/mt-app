<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>
<script>
import _ from 'lodash'
 export default {
   data () {
     return {
       province: [],
       pvalue: '',
       city: [],
       cvalue: '',
       input: '',
       cities: []
     }
   },
   watch: {
     pvalue: async function (newPvalue) {
       let self = this
       let {status, data:{city}} = await self.$axios.get(`/geo/province/${newPvalue}`)
       if(status === 200) {
        city = city.value
        for (let i in city){
          self.city.push({value:i,label:city[i]})
        }
       }
     },
     cvalue:function (newCvalue) {
       if (newCvalue) {
         this.$store.state.geo.position.city = this.city.filter(item => item.value === newCvalue)[0].label
       }
     }
   },
   mounted: async function () {
     let self = this
     let {status, data:{province}} = await self.$axios.get('/geo/province')
     if (status === 200) {
       self.province = province.map(item => {
         return {
           value: item.id,
           label: item.name
         }
       })
     }
   },
   methods: {
     querySearchAsync: _.debounce(async function (query, callback) {
       let self = this
       if (self.cities.length) {
         callback(self.cities.filter(item => item.value.indexOf(query)>-1))
       }else{
         let {status, data:{city}} = await self.$axios.get('/geo/allCity')
         console.log(self.cities)
         if(status === 200) {
           self.cities = city.map(item => {
             return { value: item.city }
           })
           callback(self.cities.filter(item => item.value.indexOf(query)>-1))
         }else{
           callback([])
         }
       }
     },200),
     handleSelect: function (item) {
       this.$store.state.geo.position.city = item.value
     }
   }
 }
</script>
<style lang='scss'>
  @import "@/assets/css/changecity/iselect.scss"
</style>
