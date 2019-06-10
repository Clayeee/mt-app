<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col 
        :span="3"
        class="left">
         <img src="@/assets/img/header/mlogo.png" title="美团" alt="美团" width=100>
      </el-col>
      <el-col
        :span="15"
        class="center">
        <div class="wrapper">
          <el-input v-model="search" placeholder="搜索商家或地点" @focus="focus" @blur="blur" @input="input"/>
          <button class="el-button el-button--primary" @click="isearch"><i class="el-icon-search"></i></button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in $store.state.home.hotPlace.slice(0,5)" :key="index">
              <a :href="'/products?keyword='+encodeURIComponent(item.name.split('（')[0])">{{ item.name.split("（")[0] }}</a>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, index) in searchList.slice(0,8)" :key="index">
              <a :href="'/products?keyword='+encodeURIComponent(item.name)">{{ item.name }}</a>
            </dd>
          </dl>
        </div>
        <p class="suggset">
          <a :href="'/products?keyword='+encodeURIComponent(item.name.split('（')[0])" v-for="(item, index) in $store.state.home.hotPlace.slice(0,5)" :key="index">{{ item.name.split("（")[0] }}&nbsp;&nbsp;</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class='takeout'>美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class='movie'>猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class='hotel'>美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class='apartment'>民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class='business'>商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li><i class="refund"><p class="txt">随时退</p></i></li>
          <li><i class="single"><p class="txt">不满意免单</p></i></li>
          <li><i class="overdue"><p class="txt">过期退</p></i></li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
 import _ from 'lodash'
 export default {
   data () {
     return {
        search:'',
        isFocus:false,
        hotPlace:['火锅','日本料理','肉蟹煲'],
        searchList:[]
     }
   },
  computed:{
    isHotPlace:function(){
      return this.isFocus&&!this.search
    },
    isSearchList:function(){
      return this.isFocus&&this.search
    }
  },
  methods:{
    focus:function(){
      this.isFocus=true
    },
    blur:function(){
      let self = this;
      setTimeout(function(){
        self.isFocus=false
      },200)
    },
    input:_.debounce(async function() {
      let self = this
      let city = '银川'
      self.searchList = []
      let { code, data: { top } } = await self.$axios.get('/search/top', {
        params:{
          input: self.search,
          city
        }
      })
      self.searchList = top
    },300),
    isearch: function () {
      window.location= '/products?keyword='+this.search
    }
  }
}
</script>
<style lang='scss'>
</style>
