<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>

    <div class="jumbotron jumbotron-fluid jumbotron-bg d-flex align-items-end p-bg-indexBG">
      <div class="container">
        <div class="p-3 bg-lighter text-light text-shadow">
          <h1 class="display-3 font-weight-bold">你的腦叫你一直買</h1>
          <p class="lead">This is a website that gives you the best selector.</p>
        </div>
      </div>
    </div>

    <div class="container main-contant mb-1">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group sticky-top">
            <a
              v-for="(item,index) in productsCategory"
              :key="index"
              @click.prevent="FilterProductsCategory(item)"
              :class="{'active':item === productsCategoryShow}"
              class="list-group-item list-group-item-action"
            >{{item}}</a>
          </div>
        </div>
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input class="form-control" type="text" placeholder="Search" aria-label="Search" />
                <div class="input-group-append">
                  <button class="btn btn-outline-warning" type="submit">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- 主要商品列表 (Card) -->
          <div class="tab-content">
            <div class="tab-pane active" id="list-gold">
              <div class="row">
                <!-- cards -->
                <div v-for="item in productsShow" :key="item.id" class="col-md-4 mb-4">
                  <div class="card border-0 box-shadow text-center h-100">
                    <img class="card-img-top" :src="item.imageUrl" alt="Card image cap" />
                    <div class="card-body">
                      <h4 class="card-title">{{item.title}}</h4>
                      <p class="card-text">{{item.description}}</p>
                    </div>
                    <div class="card-footer border-top-0 bg-white">
                      <a href="#" class="btn btn-outline-secondary btn-block btn-sm">
                        <i class="fa fa-cart-plus" aria-hidden="true"></i> 搶購去
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <Pagination v-if="pagination.total_pages > 1" :paging="pagination" @trigger="TriggerPagination"/>
            </div>

            <!-- <div class="tab-pane" id="list-gift">
              <div class="row align-items-stretch">

              </div>
            </div>-->
          </div>
          <!-- tab-content end -->
        </div>
      </div>
    </div>

    <!-- <div
      class="modal fade"
      id="removeModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">刪除商品</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>是否確認刪除商品</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">否</button>
            <button type="button" class="btn btn-outline-danger px-5">是</button>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import Pagination from "./lib/Pagination";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      isLoading: false,
      productsAll: [],
      productsShow: [],
      productsShowLengthPerPage: 9,
      productsShowPaginated:[],
      productsCategory: ["全部", "居家品味", "風格文具"],
      productsCategoryShow: "",
      pagination: {
        total_pages: 0,
        current_page: 1
      }
    };
  },
  created() {
    this.GetProducts();
  },
  methods: {
    GetProducts() {
      const vm = this;
      const api = `${process.env.Get_products}/all`;
      vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.productsAll = response.data.products;
          this.FilterProductsCategory();
          vm.isLoading = false;
        }
      });
    },
    FilterProductsCategory(category = "全部") {
      const vm = this;
      vm.productsCategoryShow = category;
      if (category === "全部") {
        vm.productsShow = vm.productsAll;
      } else {
        vm.productsShow = vm.productsAll.filter(item => {
          return item.category === category;
        });
      };
      // for pagination：將要呈現的產品分頁
      vm.pagination.total_pages = Math.ceil(vm.productsShow.length / vm.productsShowLengthPerPage);
      if(vm.pagination.total_pages > 1){
        let totalAry = [], count = 0, pageAry = [];
        vm.productsShow.forEach((item,index)=>{
          pageAry.push(item);
          count += 1;
          if(count === vm.productsShowLengthPerPage || (index+1)===vm.productsShow.length){
            totalAry.push(pageAry);
            pageAry = [];
            count = 0;
          }
        });
        vm.productsShowPaginated = totalAry;
      }
      vm.TriggerPagination();
    },
    TriggerPagination(current_page = 1){
      const vm = this;
      // console.log('翻頁，到第幾頁：',current_page,'總頁數',vm.pagination.total_pages);
      if(vm.pagination.total_pages == 1){return};
      vm.productsShow = vm.productsShowPaginated[current_page-1];
    },
  }
};
</script>

<style scope lang="scss">
.p-bg-indexBG {
  background-image: url(~@/assets/images/index/index-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 60%;
}

.text-shadow {
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
}

.list-group-item {
  cursor: pointer;

  &.active {
    color: #fff !important;
  }
}
</style>