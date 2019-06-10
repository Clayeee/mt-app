<template>
  <div class=""></div>
</template>
<script>
 export default {
   layout: 'blank',
   middleware: async (ctx) => {
     let {status, data} = await ctx.$axios.get('/users/exit')
     console.log(status,data)
     if (status === 200 && data && data.code === 0) {
       window.location.href = '/'
     }
   }
 }
</script>
<style lang='css'>

</style>
