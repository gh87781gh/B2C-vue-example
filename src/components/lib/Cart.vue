<template>
  <div>
    <!-- page start -->
    <div class="dropdown ml-auto">
      <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
        <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
        <span class="badge badge-pill badge-danger">{{carts.length}}</span>
      </button>
      <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 320px" data-offset="400">
        <h6>已選擇商品</h6>
        <table class="table table-sm">
          <tbody>
            <tr v-for="item in carts" :key="item.id" style="font-size:14px;">
              <td class="align-middle text-center">
                <a @click.prevent="CallModal(item)" href="#" class="text-muted" data-toggle="modal">
                  <i class="far fa-trash-alt"></i>
                </a>
              </td>
              <td width="170px" class="align-middle">{{item.product.title}}</td>
              <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
              <td class="align-middle text-right">{{item.final_total | CurrencyFilter}}</td>
            </tr>
          </tbody>
        </table>
        <a @click.prevent="CheckOut" href="#" class="btn btn-primary btn-block">
          <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
        </a>
      </div>
    </div>

    <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">刪除商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>是否確認刪除商品：{{removeText}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
            <button @click.prevent="DelCart" type="button" class="btn btn-outline-danger px-5">是</button>
          </div>
        </div>
      </div>
    </div>
    <!-- page end -->
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data(){
    return{
      carts:[],
      removeText:'',
      delCartId:'',
    }
  },
  created(){
    const vm = this;
    vm.GetCart();
    vm.$bus.$on('GetCartList', () => {
      vm.GetCart();
    });
  },
  methods:{
    GetCart(){
      const vm = this;
      const api = process.env.Get_cart;
      this.$http.get(api).then(response => {
        // console.log('取得購物車列表',response.data);
        if (response.data.success) {
          vm.carts = response.data.data.carts;
        }
      });
    },
    CallModal(item){
      // console.log('自購物車刪除商品',item);
      $('#removeModal').modal('show');
      const vm = this;
      vm.removeText = item.product.title;
      vm.delCartId = item.id;
    },
    DelCart(){
      const vm = this;
      // console.log('確認刪除商品',vm.delCartId);
      const api = `${process.env.Delete_cart}/${vm.delCartId}`;
      this.$http.delete(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.GetCart();
          $('#removeModal').modal('hide');
        }
      });
    },
    CheckOut(){
      
    },
  },
}
</script>