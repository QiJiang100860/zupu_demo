import Vue from 'vue'
import Router from 'vue-router'
import Prdigree from '@/views/prdigree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'prdigree',
    },
    {
      path:"/prdigree",
      name:"prdigree",
      component: Prdigree
    }
  ]
})
