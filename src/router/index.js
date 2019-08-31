import Vue from 'vue'
import Router from 'vue-router'

// 頁面元件
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    }
  ]
})
