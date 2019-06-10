import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    geo,
    home
  },
  actions: {
    async nuxtServerInit({
      commit
    }, {req, app}) {
      const { data } = await app.$axios.get('/geo/getPosition')
      commit(
        'geo/setPosition', data.status === 0
        ? {
          city: data.city,
          province: data.province
        }
        : {
          city: '',
          province: ''
        })
      const{ data:{menu} }  = await app.$axios.get('/geo/menu')
      commit('home/setMenu', menu)
      const {status,data:{result}} = await app.$axios.get('/search/hotPlace', {
        params:{
          city: '银川'
        }
      })
      commit('home/setHotPlace', status === 200? result : [])
    }
  }
})

export default store