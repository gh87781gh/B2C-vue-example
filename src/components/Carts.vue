<template>
  <div>
    <!-- page start -->
    <Loading :active.sync="isLoading"></Loading>

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
                  <img :src="item.product.imageUrl" class="img-fluid img-thumbnail" alt />
                </td>
                <td class="align-middle">
                  {{item.product.title}}
                  <small class="text-success" v-if="item.coupon">
                    <br />已套用優惠券
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
              </tr>-->
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
        <div class="input-group my-4">
          <input type="text" class="form-control" v-model="couponCode" placeholder="請輸入優惠碼" />
          <div class="input-group-append">
            <button @click.prevent="UseCoupon" class="btn btn-outline-warning" type="button">套用優惠碼</button>
          </div>
        </div>
        <p class="text-success">{{usedCouponCodeMsg}}</p>

        <h5 class="py-3 mt-5 mb-2 text-center bg-light">訂購人資訊</h5>
        <ValidationObserver v-slot="{ invalid, passes }">
          <form @submit.prevent="passes(CreatOrder)">
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="username">姓名</label>
                <ValidationProvider rules="required" v-slot="{ errors }" name="姓名">
                  <input
                    v-model="form.user.name"
                    :class="{'is-invalid':errors.length > 0}"
                    class="form-control"
                    type="text"
                    placeholder="姓名"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-4">
                <label for="email">Email</label>
                <ValidationProvider rules="required|email" v-slot="{ errors }" name="email">
                  <input
                    v-model="form.user.email"
                    :class="{'is-invalid':errors.length > 0}"
                    class="form-control"
                    type="text"
                    placeholder="Email"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-4">
                <label for="phone">電話</label>
                <ValidationProvider rules="required|numeric" v-slot="{ errors }" name="電話">
                  <input
                    v-model="form.user.tel"
                    :class="{'is-invalid':errors.length > 0}"
                    class="form-control"
                    type="text"
                    placeholder="電話"
                  />
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="state">縣市</label>
                <ValidationProvider rules="required" v-slot="{ errors }" name="縣市">
                  <select @change="GetTwzipcodeCitys" v-model="address.county" class="form-control">
                    <option v-for="item in twzipcode.counties" :key="item" :value="item">{{item}}</option>
                  </select>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md">
                <label for="city">區/鄉/鎮</label>
                <ValidationProvider rules="required" v-slot="{ errors }" name="區/鄉/鎮">
                  <select @change="GetAddressId" v-model="address.city" class="form-control">
                    <option v-for="item in twzipcode.citys" :key="item" :value="item">{{item}}</option>
                  </select>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md">
                <label for="inputZip">郵遞區號</label>
                <input v-model="address.id" type="text" class="form-control" id="inputZip" />
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">地址</label>
              <ValidationProvider rules="required" v-slot="{ errors }" name="地址">
                <input
                  v-model="address.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入詳細地址"
                />
                <span class="text-danger">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label for="comment">留言</label>
              <textarea
                name
                id="comment"
                class="form-control"
                cols="30"
                rows="3"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-right">
              <router-link to="/index" class="btn btn-secondary">繼續選購</router-link>
              <button :disabled="invalid" type="submit" class="btn btn-primary">確認付款</button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </section>

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
    <!-- page end -->
  </div>
</template>

<script>
import $ from 'jquery';
import twzipcode from 'twzipcode-data'

export default {
  data() {
    return {
      isLoading:false,
      carts: [],
      priceTotal:0,
      priceTotalFinal:0,
      removeText: '',
      couponCode:'',
      usedCouponCodeMsg:'',
      twzipcode:{
        all:[],
        searchAry:[],
        counties:[],
        citys:[]
      },
      form:{
        user:{
          name: '',
          email: '',
          tel: '',
          address:'' 
        },
        message: ''
      },
      address:{
        county:'',
        city:'',
        id:'',
        content:'',
      },
    };
  },
  created() {
    this.GetCart();
    this.GetTwZipCode();
  },
  updated(){
    // console.log('購物車清空就導回首頁');
    if(this.carts.length == 0){
      this.$router.push('/index');
    }
  },
  methods: {
    GetTwZipCode(){
      const vm = this;
      let data = twzipcode();
      let counties = data.counties;
      vm.twzipcode.counties = counties.map((item)=>{
        return item.name;
      });
      vm.twzipcode.all = data.zipcodes;
    },
    GetTwzipcodeCitys(){
      const vm = this;
      let counties = vm.twzipcode.all.filter((item)=>{
        return item.county == vm.address.county;
      });
      vm.twzipcode.searchAry = counties;
      vm.twzipcode.citys = counties.map((item)=>{
        return item.city;
      });
    },
    GetAddressId(){
      const vm = this;
      let data = vm.twzipcode.searchAry.find((item)=>{
        return item.city == vm.address.city;
      });
      vm.address.id = data.id;
    },
    GetCart() {
      const vm = this;
      const api = process.env.Get_cart;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log('取得購物車列表',response.data);
        if (response.data.success) {
          vm.carts = response.data.data.carts;
          vm.priceTotal = response.data.data.total;
          vm.priceTotalFinal = response.data.data.final_total;
          vm.isLoading = false;
        }
      });
    },
    CallModal(item){
      // console.log('自購物車刪除商品',item);
      const vm = this;
      vm.removeText = item.product.title;
      vm.delCartId = item.id;
      $('#removeModal').modal('show');
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
      // console.log('套用優惠券'); 
      const api = process.env.Post_coupon;
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
    CreatOrder() {
      console.log("建立訂單");
      const api = process.env.Post_order;
      const vm = this;
      vm.form.user.address = `${vm.address.id}${vm.address.county}${vm.address.city}${vm.address.content}`;
      this.$http.post(api,{data:vm.form}).then(response => {
        console.log(response.data);
        console.log(response.data.orderId);
        if(response.data.success){
          vm.$router.push(`/checkout/pay/${response.data.orderId}`);
        }
      });
    },
  }
};
</script>