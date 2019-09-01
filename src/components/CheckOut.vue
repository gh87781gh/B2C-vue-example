<template>
  <div>
    <div class="container main-contant py-5">
      <h1 class="text-center mb-3 text-secondary">YouSelect 優物選 結帳</h1>
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert alert-success alert-rounded mb-0" role="alert">1.輸入訂單資料</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">2.金流付款</div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">3.完成</div>
        </div>
      </section>

      <section class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h6 class="mb-0 d-flex align-items-center">
                <a data-toggle="collapse" href="#collapseOne">
                  顯示購物車細節
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <span class="h3 ml-auto mb-0">{{priceTotalFinal | CurrencyFilter}}</span>
              </h6>
            </div>
          </div>
          <div id="collapseOne" class="collapse mt-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th width="30"></th>
                  <th width="100"></th>
                  <th>商品名稱</th>
                  <th width="100">數量</th>
                  <th width="80">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in carts" :key="item.id">
                  <td class="align-middle text-center">
                    <a @click.prevent="CallModal(item)" href="#" class="text-muted" data-toggle="modal">
                      <i class="far fa-trash-alt"></i>
                    </a>
                  </td>
                  <td class="align-middle">
                    <img :src="item.product.imageUrl" class="img-fluid img-thumbnail" alt/>
                  </td>
                  <td class="align-middle">
                    {{item.product.title}}
                    <small class="text-success" v-if="item.coupon">
                      <br>已套用優惠券
                    </small>
                  </td>
                  <td class="align-middle">{{item.qty}} {{item.product.unit}}</td>
                  <td class="align-middle text-right">{{item.final_total | CurrencyFilter}}</td>
                </tr>
                <!-- <tr>
                  <td colspan="4" class="text-right">運費</td>
                  <td class="text-right">
                    <strong>$60</strong>
                  </td>
                </tr> -->
                <tr>
                  <td colspan="4" class="text-right">合計</td>
                  <td class="text-right">
                    <strong>{{priceTotal | CurrencyFilter}}</strong>
                  </td>
                </tr>
                <tr v-if="priceTotal !== priceTotalFinal">
                  <td colspan="4" class="text-right">優惠價格</td>
                  <td class="text-right text-success">
                    <strong>{{priceTotalFinal | CurrencyFilter}}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h5 class="py-3 mt-5 mb-2 text-center bg-light">優惠折抵</h5>
          <small>限時優惠券推薦：歡慶中秋！輸入「0913」獲得中秋超值全面八折！</small>
          <div class="input-group mb-3 input-group-sm my-4">
            <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼">
            <div class="input-group-append">
              <button @click.prevent="UseCoupon" class="btn btn-outline-secondary" type="button">
                套用優惠碼
              </button>
            </div>
          </div>
          <p class="text-success">{{usedCouponCodeMsg}}</p>

          <h5 class="py-3 mt-5 mb-2 text-center bg-light">訂購人資訊</h5>
          <form id="needs-validation" novalidate>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="username">姓名</label>
                <input type="text" class="form-control" id="username" placeholder="姓名" required />
                <div class="invalid-feedback">請輸入姓名</div>
              </div>
              <div class="form-group col-md-6">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Email" required />
                <div class="invalid-feedback">請輸入正確的 Email</div>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="state">國家</label>
                <select id="state" class="form-control" required>
                  <option selected>台灣</option>
                  <option>...</option>
                </select>
              </div>
              <div class="form-group col-md">
                <label for="city">城市</label>
                <select name id="city" class="form-control" required>
                  <option value="台北市">台北市</option>
                  <option value="台南市">台南市</option>
                  <option value="高雄市">高雄市</option>
                </select>
              </div>
              <div class="form-group col-md">
                <label for="inputZip">郵遞區號</label>
                <input type="text" class="form-control" id="inputZip" />
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">地址</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="重慶南路一段122號"
                required
              />
              <div class="invalid-feedback">請輸入地址</div>
            </div>
            <div class="text-right">
              <a href="shoppingCart.html" class="btn btn-secondary">繼續選購</a>
              <button type="submit" class="btn btn-primary">確認付款</button>
              <a href="shoppingCart-purchase.html" class="btn btn-primary">確認付款</a>
            </div>
          </form>
          <!-- <script>
          // Example starter JavaScript for disabling form submissions if there are invalid fields
          (function () {
            'use strict';

            window.addEventListener('load', function () {
              var form = document.getElementById('needs-validation');
              form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add('was-validated');
              }, false);
            }, false);
          })();
          </script>-->
        </div>
      </section>
    </div>

    <!-- NOTE modal -->
    <div class="modal fade" id="removeModal" tabindex="-1" role="dialog" aria-labelledby="removeModal" aria-hidden="true">
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
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      carts: [],
      priceTotal:0,
      priceTotalFinal:0,
      removeText: "",
      couponCode:'',
      usedCouponCodeMsg:'',
    };
  },
  created() {
    this.GetCart();
  },
  methods: {
    GetCart() {
      const vm = this;
      const api = process.env.Get_cart;
      this.$http.get(api).then(response => {
        console.log('取得購物車列表',response.data);
        if (response.data.success) {
          vm.carts = response.data.data.carts;
          vm.priceTotal = response.data.data.total;
          vm.priceTotalFinal = response.data.data.final_total;
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
        // console.log(response.data);
        if (response.data.success) {
          vm.GetCart();
          $('#removeModal').modal('hide');
        }
      });
    },
    UseCoupon(){
      console.log('套用優惠券'); 
      const api = process.env.Post_cart;
      const vm = this;
      const coupon = {
        code:vm.couponCode
      }
      this.$http.post(api,{data:coupon}).then(response => {
        console.log(response.data);
        if(response.data.success){
          vm.priceTotalFinal = response.data.data.final_total;
          vm.usedCouponCodeMsg = response.data.message;
        }
      });
    },
  }
};
</script>