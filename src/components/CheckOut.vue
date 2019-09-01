<template>
  <div>
    <!-- page start -->


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

      <router-view/>

    </div>

    <!-- page end -->
  </div>
</template>

