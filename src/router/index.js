import Vue from 'vue'
import Router from 'vue-router'

// 頁面元件
import Index from '@/components/Index'
import ProductDetail from '@/components/ProductDetail'
import CheckOut from '@/components/CheckOut'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/product/:id', //動態路由：每個產品的 id 不同
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/checkout', 
      name: 'CheckOut',
      component: CheckOut
    },
    // {
    //   path: '/test',
    //   name: 'index',
    //   component: Index
    // },
  ]
})
