import Router from 'koa-router'
import axios from './utils/axios'
import Poi from '../dbs/models/poi'
import Show from '../dbs/models/show'
import Detail from '../dbs/models/detail'

let router = new Router({
  prefix: '/search'
})

router.get('/top', async (ctx) => {
  try {
    let top = await Poi.find({
      'name': new RegExp(ctx.query.input),
      city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
})

router.get('/hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  try {
    let result = await Poi.find({
      city,
      type: ctx.query.type || '美食'
    }).limit(10)
  
    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  try{
    let results = await Show.find()
    ctx.body = {
      code: 0,
      results
    }
  } catch(e) {
    ctx.body = {
      code: -1,
      results: []
    }
  }
})
router.get('/ilist', async (ctx) => {
  try {
    let ilist = await Poi.find({
      'name': new RegExp(ctx.query.keyword)
    })
    ctx.body = {
      pois:ilist
    }
  } catch (e) {
    ctx.body = {
      pois: []
    }
  }
})

router.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword
  let product = await Poi.find({
    'name': new RegExp(keyword)
  })
  let more = await Detail.find()
  ctx.body = {
    product: product[0],
    more: ctx.isAuthenticated() ? more : [],
    login: ctx.isAuthenticated()
  }
})

export default router