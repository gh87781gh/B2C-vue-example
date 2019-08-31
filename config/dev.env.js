'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

const webUrl = '';
const apiAccount = 'jennyshih';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  Get_products: '"https://vue-course-api.hexschool.io/api/jennyshih/products"',
})