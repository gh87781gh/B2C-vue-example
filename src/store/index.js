
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  strict:true,
  state:{
    isLoading:false,
    productsAll:[],




  },
  actions:{ // 操作行為，不會操作到資料狀態
    updateLoading(context,status){
      context.commit('LOADING',status)
    },
    GetProducts(context,payload) {
      const api = `${process.env.Get_products}/all`;
      context.commit('LOADING',true)
      axios.get(api).then(response => {
        if (response.data.success) {
          context.commit('PRODUCTSAll',response.data.products)
          context.commit('LOADING',false);
        }
      });
    },
    // FilterProductsCategory(category = "全部") {
    //   const vm = this;
    //   vm.productsCategoryShow = category;
    //   if (category === "全部") {
    //     vm.productsShow = vm.productsAll;
    //   } else {
    //     vm.productsShow = vm.productsAll.filter(item => {
    //       return item.category === category;
    //     });
    //   }
    //   // for pagination：將要呈現的產品分頁
    //   vm.pagination.total_pages = Math.ceil(
    //     vm.productsShow.length / vm.productsShowLengthPerPage
    //   );
    //   if (vm.pagination.total_pages > 1) {
    //     let totalAry = [],
    //       count = 0,
    //       pageAry = [];
    //     vm.productsShow.forEach((item, index) => {
    //       pageAry.push(item);
    //       count += 1;
    //       if (
    //         count === vm.productsShowLengthPerPage ||
    //         index + 1 === vm.productsShow.length
    //       ) {
    //         totalAry.push(pageAry);
    //         pageAry = [];
    //         count = 0;
    //       }
    //     });
    //     vm.productsShowPaginated = totalAry;
    //   }
    //   vm.TriggerPagination();
    // },
  },
  mutations:{ // 實際操作狀態
    LOADING(state,status){
      state.isLoading = status;
    },
    PRODUCTSAll(state,payload){
      state.productsAll = payload;
    }
  },
});