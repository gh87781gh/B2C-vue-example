<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <router-link class="navbar-brand" to="/index">YouSelect 優物選</router-link>
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <Cart v-if="this.$route.name !== 'carts'"/>
    </nav>
  </div>
</template>

<script>
import Cart from './Cart';

export default {
  components:{
    Cart,
  },
  // created(){
  //   console.log(this.$route.name)
  // }
}
</script>