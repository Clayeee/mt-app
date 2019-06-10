<template lang="html">
  <li
    class="m-detail-item">
    <dl class="section">
      <dd>
        <img
          :src="require('../../assets/img/detail/'+meta.photo.url)"
          :alt="meta.photo.title">
      </dd>
      <dd>
        <h4>{{ meta.name }}</h4>
        <p>
          <span v-if="meta.last">剩余：{{ Number(meta.last) }}</span>
          <span v-if="meta.deadline">截止日期：{{ meta.deadline }}</span>
        </p>
        <p>
          <span class="price">{{ Number(meta.price) }}</span>
          <sub>门店价{{ Number(meta.oldprice) }}</sub>
        </p>
      </dd>
      <dd>
        <el-button
          type="warning"
          round
          @click="createCart">立即抢购</el-button>
      </dd>
    </dl>
  </li>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    createCart: async function () {
      let self = this;
      let {
        status,
        data: {
          code,
          id
        }
      } = await this.$axios.post('/cart/create', {
        params: {
          id: Math.random().toString().slice(3, 9),
          detail: {
            name: self.meta.name,
            price: self.meta.price,
            imgs: self.meta.photo
          }
        }
      })
      if(status===200&&code===0){
        window.location.href=`/cart/?id=${id}`
      }else{
        console.log('error')
      }
    }
  }
}
</script>

<style lang="scss">


</style>
