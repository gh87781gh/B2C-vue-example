'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  Get_products: '"https://vue-course-api.hexschool.io/api/jennyshih/products"',
  Get_product: '"https://vue-course-api.hexschool.io/api/jennyshih/product"',
  Post_cart: '"https://vue-course-api.hexschool.io/api/jennyshih/cart"',
  Get_cart: '"https://vue-course-api.hexschool.io/api/jennyshih/cart"',
  Delete_cart: '"https://vue-course-api.hexschool.io/api/jennyshih/cart"',
  Post_coupon: '"https://vue-course-api.hexschool.io/api/jennyshih/coupon"',
  Post_order: '"https://vue-course-api.hexschool.io/api/jennyshih/order"',
  Get_order: '"https://vue-course-api.hexschool.io/api/jennyshih/order"',
  Post_pay: '"https://vue-course-api.hexschool.io/api/jennyshih/pay"',
})