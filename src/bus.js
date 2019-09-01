import Vue from 'vue';
Vue.prototype.$bus = new Vue();


/*
組建備註：

獲得購物車資料
1. 外層元件名稱： Cart.vue
2. 外層自定義註冊事件名稱： 'GetCartList'
3. 內層觸發指令： this.$bus.$emit('GetCartList');
4. 參數說明： 無參數


1. 外層元件名稱：
2. 外層自定義註冊事件名稱：
3. 內層觸發指令：
4. 參數說明：

*/