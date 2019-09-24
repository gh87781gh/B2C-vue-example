
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict:true,
  state:{
    isLoading:false,
  },
  actions:{ // 操作行為，不會操作到資料狀態
    updateLoading(context,status){
      context.commit('LOADING',status)
    },
  },
  mutations:{ // 實際操作狀態
    LOADING(state,status){
      state.isLoading = status;
    }
  },
});