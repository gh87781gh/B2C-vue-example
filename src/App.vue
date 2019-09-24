<template>
  <div id="app">
    <Loading :active.sync="isLoading"></Loading>

    <Nav />
    <!-- 第 1 層頁面元件 -->
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/lib/Nav";
import Footer from "./components/lib/Footer";

export default {
  components: {
    Nav,
    Footer
  },
  name: "App",
  // created() {
  //   console.log(process.env.Get_products);
  //   const api = process.env.Get_products;
  //   this.$http.get(api).then(response => {
  //     console.log(response.data);
  //   });
  // }
  computed:{
    isLoading(){
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all.scss";
</style>
