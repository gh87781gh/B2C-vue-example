<template>
  <div>
    <nav aria-label="Page navigation" class="my-5">
      <ul class="pagination justify-content-center">
        <li :class="{'disabled':current_page == 1}" class="page-item">
          <a @click="ChangeCurrentPage(current_page - 1)" class="page-link" href="#" tabindex="-1">&laquo;</a>
        </li>
        <li v-for="(item,index) in total_pages" :key="index" :class="{'active':current_page == index + 1}" class="page-item">
          <a @click="ChangeCurrentPage(index + 1)" class="page-link" href="#">{{index + 1}}</a>
        </li>
        <li :class="{'disabled':current_page == total_pages}" class="page-item">
          <a @click="ChangeCurrentPage(current_page + 1)" class="page-link" href="#">&raquo;</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["paging"],
  data() {
    return {
      total_pages: this.paging.total_pages,
      current_page: this.paging.current_page
    };
  },
  methods: {
    ChangeCurrentPage(current_page) {
      this.current_page = current_page;
      this.$emit("trigger", current_page);
    }
  }
};
</script>