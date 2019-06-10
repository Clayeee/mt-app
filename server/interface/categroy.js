import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'
import Menu from '../dbs/models/menu'

let router = new Router({
  prefix: '/categroy'
})

router.get('/crumbs', async (ctx) => {
  let {menu} =  await Menu.findOne()
  ctx.body = { types:menu, areas: ['西夏区','金凤区','兴庆区','贺兰县','永宁县']}
})

export default router