<template>
  <div id="app">
    <!-- 第 1 層頁面元件 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    console.log(process.env.Get_products)
    const api = process.env.Get_products;
    this.$http.get(api).then(response => {
      console.log(response.data);
    });
  }
};
</script>

<style lang="scss">
@import './assets/scss/all.scss';
</style>
