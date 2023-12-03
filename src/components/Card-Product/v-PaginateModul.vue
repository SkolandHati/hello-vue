<template>
  <div class="container__paginate">
    <button class="pagination" v-for="(item, i) in pages" :key="i" :class="{active: current_page === item}" @click.prevent="navigate(item)">
      {{item}}
    </button>
  </div>
</template>

<script>
import {createLogger} from "vuex";

export default {
    name: 'v-PaginateModul',
    emits: 'pagechanged',
    props:{
      current_page:{
        type: Number,
        require: true
      },
      total_pages:{
        type: Number,
        require: true
      }
    },
    data(){
      return {
        numb: null,
        Active: false
      }
    },
    computed: {
      pages() {
        const pagesArray = [];
        for (let page = 1; page <= this.total_pages; page++) {
          const pageDiff = Math.abs(page - this.current_page);
          const showPage = (pageDiff < 3 || page === 1 || page === this.total_pages);
          if (showPage) {
            pagesArray.push(page);
          }
        }
        return pagesArray;
      }
    },
    methods:{
      navigate(page) {
        if (this.currentPage !== page) {
          this.$emit('pagechanged', page);
        }
      }
    },
}





</script>

<style scoped>

  .container__paginate {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    margin-left: 10px;
    margin-bottom: 15px;
    padding-bottom: 20px;
    width: 98%;
    height: 35px;
    border: 1px solid #989898;
    border-radius: 5px;
  }
  .pagination{
    display: flex;
    margin: 15px;
    width: 30px;
    height: 30px;
    padding-top: 4px;
    justify-content: center;
    border: 2px solid skyblue;
    border-radius: 50%;
  }

  .pagination:hover{
    cursor: pointer;
    background-color: skyblue;
  }
  .container__paginate>.active{
    background-color: skyblue;
  }
</style>

