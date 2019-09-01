<template>
  <div>
    <!-- page start -->
    <h3 class="text-center text-success mt-5">
      <div class="text-lg">
        <i class="far fa-check-circle"></i>
      </div>付款完成，感謝您！
    </h3>
    <p class="text-center">如未離開，系統將自動挑轉至首頁...{{countTimeSec}}</p>
    <!-- page end -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      countTimeSec: 5
    };
  },
  mounted() {
    const vm = this;
    function countTime() {
      vm.countTimeSec = vm.countTimeSec - 1;
      // console.log(vm.countTimeSec)
      if(vm.countTimeSec == 0){
        vm.$router.push('/index');
        clearInterval(counting);
      }
    }
    let counting = setInterval(countTime, 1000);
  }
};
</script>

<style scoped>
.text-lg {
  font-size: 60px;
  margin-bottom: 20px;
}
</style>