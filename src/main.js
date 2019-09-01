// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 外部套件
import Vue from 'vue';
import App from './App';
import router from './router';
import 'bootstrap';
// vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios);
// vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.component('Loading',Loading);
// vee-validate
// vee-validate 必須引入
import { ValidationProvider,ValidationObserver } from 'vee-validate';
import { extend } from 'vee-validate';
// 引入所有 rules
import * as rules from 'vee-validate/dist/rules';
for (let rule in rules) {extend(rule, rules[rule])};
// 引入指定語言
import { localize } from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW.json';
localize('zh_TW', zh_TW);
// 啟用元件
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// 自定義
import CurrencyFilter from '@/components/filter/currencyFilter';
import TimeStampFilter from '@/components/filter/timestampFilter';
Vue.config.productionTip = false
Vue.filter('CurrencyFilter',CurrencyFilter);
Vue.filter('TimestampFilter',TimeStampFilter);
import './bus';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
