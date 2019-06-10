<template>
  <dl class="m-sum-card">
    <dt>
      <h1>{{ meta.name }}</h1>
      <el-rate
        v-model="rate"
        disabled />
      <span>{{ Number(meta.rate)||rate }}分</span>
      <span>人均￥{{ Number(meta.price) }}</span>
      <ul>
        <li @click="openMap([meta.latitude, meta.longtide])">地址：{{ meta.add }}</li>
        <li>电话：{{ meta.tel }}</li>
      </ul>
    </dt>
    <dd>
      <el-carousel
        height="214px"
        indicator-position="none">
        <el-carousel-item
          v-for="(item,idx) in photos"
          :key="idx">
          <h3><img
            :src="require('../../assets/img/poi/'+item)"
            alt="idx"
            width="100%"
            height="100%"></h3>
        </el-carousel-item>
      </el-carousel>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    meta: {
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  data() {
    return {
      sale: 70 + Math.floor(Math.random() * 300),
      photos: []
    }
  },
  computed: {
    rate: function () {
      return Number(this.meta.rate) || Math.floor(Math.random() * 5)
    }
  },
  methods: {
    openMap: function (location) {

    }
  },
  mounted: function() {
    this.photos = [this.meta.img, '2add1a0c48ba538b76d33a12869b176a129882.jpg', '7a46b76014fa2e2394ada29adb112b5875703.jpg']
  }
}
</script>
