<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="全部">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="约会聚餐">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人SPA">丽人SPA</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="品质出游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.name">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="require('../../assets/img/artistic/'+item.img)"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.name }}</li>
            <li class="pos"><span v-for="title in item.info.split(',')" :key="title">{{ title }}</span></li>
            <li class="price" v-if="item.price">￥<em>{{ item.price }}</em><span>/起</span></li>
            <li class="add" v-if="item.add">{{ item.add }}</li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [],
        part: [],
        spa: [],
        travel: []
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    },
  },
  async mounted(){
    let self=this;
    let {status, data:{results}} =await this.$axios.get('/search/resultsByKeywords')
    if(status===200){
      this.list.part = results.filter(item => item.mod === '约会聚餐')
      this.list.spa = results.filter(item => item.mod === '丽人SPA')
      this.list.travel = results.filter(item => item.mod === '品质出游')
      this.list.all = [this.list.part[0],this.list.part[1],this.list.spa[0],this.list.spa[1],this.list.travel[0],this.list.travel[1]]
      console.log(this.list)
    }else{
      this.list = {}
    }
  },
  methods: {
    over: async function (e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      let self = this
      let attr = {food:'约会聚餐',spa:'丽人SPA',travel:'品质出游'}
      if (tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        let keyword = dom.getAttribute('keyword')
        let {status,data:{results}}=await self.$axios.get('/search/resultsByKeywords',{
          params:{
            mod:keyword
          }
        })
        if(status===200){
          this.list.part = results.filter(item => item.mod === '约会聚餐')
          this.list.spa = results.filter(item => item.mod === '丽人SPA')
          this.list.travel = results.filter(item => item.mod === '品质出游')
          this.list.all = [this.list.part[0],this.list.part[1],this.list.spa[0],this.list.spa[1],this.list.travel[0],this.list.travel[1]]
          console.log(this.list[this.kind])
        }else{
          return results=[]
        }
      }
    }
  },

}
</script>
<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
