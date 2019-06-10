import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'
import Menu from '../dbs/models/menu'
import City from '../dbs/models/city'
import Maps from '../dbs/models/map'
 
let router = new Router({
  prefix: '/geo'
})

let ak = 'UGLjifN71hm2d4VC3qgqcdz2HY0PXOb8'

router.get('/getPosition', async (ctx) => {
  let { data } = await axios.get(`http://api.map.baidu.com/location/ip?ak=${ak}`)
  let [ province, city ] = [ data.content.address_detail.province , data.content.address_detail.city ]
  if ( data.status === 0 ) {
    ctx.body = {
      province,
      city,
      status : 0
    }
  }else{
    ctx.body = {
      province : '',
      city : '',
      status : -1
    }
  }
})

router.get('/province', async (ctx) => {
  let province = await Province.find()
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})
router.get('/province/:id', async (ctx) => {
  let city = await Maps.findOne({id: ctx.params.id})
  ctx.body = {
    code: 0,
    city
  }
})
router.get('/allCity',async (ctx) => {
  let city = []
  let result = await City.find()
  result.forEach(item => {
    city = city.concat(item.value.filter(item => item.name === '市辖区'))
  })
  city.unshift({city:'重庆市',name:'市辖区',id:"500101"})
  city.unshift({city:'上海市',name:'市辖区',id:"310101"})
  city.unshift({city:'天津市',name:'市辖区',id:"120101"})
  city.unshift({city:'北京市',name:'市辖区',id:"110101"}) 
  ctx.body = {
    city
  }
})

router.get('/city', async (ctx) => {
  let city = []
  let result = await City.find()
  result.forEach(item => {
    city = city.concat(item.value)
  })
  ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name
      }
    })
  }
})

router.get('/hotCity', async (ctx) => {
  let list = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '天津市',
    '西安市',
    '杭州市',
    '南京市',
    '武汉市',
    '成都市'
  ]
  let result = await City.find()
  console.log(result)
  let nList = []
  result.forEach(item => {
    nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.city)))
  })
  ctx.body = {
    hots: nList
  }
})

router.get('/menu', async (ctx) => {
  const result = await Menu.findOne()
  ctx.body = {
    menu: result.menu
   }
})

export default router