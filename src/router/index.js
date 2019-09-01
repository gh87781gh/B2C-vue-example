import Vue from 'vue'
import Router from 'vue-router'

// 頁面元件
import Index from '@/components/Index'
import ProductDetail from '@/components/ProductDetail'
import CheckOut from '@/components/CheckOut'
import Carts from '@/components/Carts'
import Pay from '@/components/Pay'
import Done from '@/components/Done'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/product/:id', //動態路由：每個產品的 id 不同
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/checkout', 
      name: '',
      component: CheckOut,
      children:[
        {
          path: '',
          name: 'Carts',
          component: Carts
        },
        {
          path: 'pay/:id',
          name: 'Pay',
          component: Pay
        },
        {
          path: 'done',
          name: 'Done',
          component: Done
        },
      ]
    },
    // {
    //   path: '/test',
    //   name: 'index',
    //   component: Index
    // },
  ]
})
