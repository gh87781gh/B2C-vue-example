<template>
  <div>
    <!-- page start -->
    <Loading :active.sync="isLoading"></Loading>

    <div class="container main-contant mb-1">
      <nav aria-label="breadcrumb" role="navigation">
        <ol class="breadcrumb bg-transparent pl-0">
          <li class="breadcrumb-item">
            <router-link to="/index">首頁</router-link>
          </li>
          <li class="breadcrumb-item">
            <a @click.prevent="BackToCategory(product.category)" href="#">{{product.category}}</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
        </ol>
      </nav>

      <div class="row">
        <div class="col-md-4 mb-5">
          <div class="sticky-top" style="top: 10px;">
            <h1 class="h2">{{product.title}}</h1>
            <div class="d-flex my-3 align-items-end justify-content-end">
              <del class="text-muted">售價 {{product.origin_price | CurrencyFilter}}</del>
              <div class="h3 mb-0 ml-auto text-danger">
                <small>網路價 NT$</small>
                <strong>{{product.price | CurrencyFilter}}</strong>
              </div>
            </div>

            <div class="input-group mt-3">
              <select v-model="qty" name class="form-control mr-1">
                <option v-for="item in 10" :key="item" :value="item" :selected="item == 1">
                  {{item}} {{product.unit}}
                </option>
              </select>
              <!-- TODO 加入購物車 -->
              <a @click.prevent="AddToCart" href="#" class="btn btn-primary">
                <i v-if="status.addingToCart" class="fas fa-circle-notch fa-spin"></i>
                <i v-else class="fa fa-cart-plus" aria-hidden="true"></i> 
                加入購物車
              </a>
            </div>

            <div class="mt-2 text-right text-muted">
              <i class="fab fa-cc-visa" aria-hidden="true"></i>
              <i class="fab fa-cc-jcb" aria-hidden="true"></i>
              <i class="fab fa-cc-paypal" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <h2>{{product.title}}</h2>
          <h4 class="my-4">{{product.description}}</h4>
          <p class="card-text">{{product.content}}</p>
          <img :src="product.imageUrl" class="w-100" alt/>
          <div class="alert alert-secondary mt-4" role="alert">
            <h2 class="text-center">購物說明</h2>
            <div>
              商品訂購
              <ul>
                <li>訂購完成將寄發訂購完成通知函。通知函僅通知接獲購買需求，非訂單確認。</li>
                <li>每商品每帳戶限購 3 件。超出購買件數或訂購收件資料不正確、無人收件、拒絕收件等情況，有.設計uDesign有權取消訂單。</li>
                <li>商品規格、圖片、說明、無庫存、價格或交易條件有誤及其他無法接受訂單情形，將通知您訂單不成立/取消訂單並辦理退款，敬請見諒。</li>
                <li>請詳閱商品連結之各活動說明頁，實際回饋或折扣以說明頁、購物結帳金額為準。</li>
              </ul>
              商品配送
              <ul>
                <li>一筆訂單只接受一種配送方式，如果您需要將商品配送至兩個以上的地址、或希望以不同方式配送請分批訂購。</li>
                <li>多筆相同收件地址的訂單可能會合併包裝配送。</li>
                <li>宅配人員在配送前可能會與您聯絡，敬請保持手機或市話暢通。</li>
                <li>超商取貨商品送達指定門市後，將發送簡訊及Email通知您。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- page end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading:false,
      product: {},
      qty: 1,
      status:{
        addingToCart:false,
      },
    };
  },
  created() {
    this.GetProduct();
  },
  methods: {
    GetProduct() {
      const vm = this;
      const id = vm.$route.params.id;
      const api = `${process.env.Get_product}/${id}`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.product = response.data.product;
          vm.isLoading = false;
        }
      });
    },
    BackToCategory(category){
      this.$router.push(`/index?category=${category}`);
    },
    AddToCart(){
      const vm = this;
      const api = process.env.Post_cart;
      const product = {
        product_id:vm.product.id,
        qty:vm.qty,
      }
      vm.status.addingToCart = true;
      this.$http.post(api,{data:product}).then(response => {
        console.log(response.data);
        this.$bus.$emit('GetCartList');
        vm.status.addingToCart = false;
      });
      
    },
  }
};
</script>