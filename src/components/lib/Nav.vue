<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <router-link class="navbar-brand" to="/index">YouSelect 優物選</router-link>
      <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      <Cart v-if="this.$route.name != 'Carts' && this.$route.name != 'Pay' && this.$route.name != 'Done'"/>
    </nav>
  </div>
</template>

<script>
import Cart from './Cart';

export default {
  components:{
    Cart,
  },
  data(){
    return{
      showStep:'',
    }
  },
}
</script>