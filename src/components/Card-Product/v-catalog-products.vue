<template>
    <div class="v-catalog-products">
        <vCartItems v-if="products"
        v-for="prodoos in visibleProducts"
        :key="prodoos.id"
        :allproducts="prodoos"/>
    </div>
  <PaginateMod v-if="productus" :current_page="currentPage"
               :total_pages="totalPages"
               @pagechanged="pageChanged"></PaginateMod>
</template>

<script>
    import vCartItems from "./v-cart-items.vue"
    import {mapActions, mapGetters} from "vuex";
    import PaginateMod from '@/components/Card-Product/v-PaginateModul.vue'
    export default {
      name: "v-catalog-products",
      components:{
        vCartItems,
        PaginateMod
      },
      data(){
        return {
          products: [],
          currentPage: 1,
          pageSize: 6
        };
      },
      methods:{
        ...mapActions({
          loadProducts: 'products/loadProducts',
        }),
        async loadData(){
          try {
            await this.loadProducts()
          }
          catch (e){
            Promise.reject(e)
          }
        },
        async loadCountProducts(){
          try {
            let data = await this.productus
            let listProd = []
            if (data){
              data.forEach((item, index, arrey) => {
                localStorage.setItem(index, JSON.stringify(item))
              })
              for (let i = 0; localStorage.length > i; i++){
                listProd.push(JSON.parse(localStorage.getItem(i)))
              }
              return this.products = listProd
            }
          }catch (e){
            Promise.reject(e)
          }
        },
        pageChanged(pageNumber) {
          this.currentPage = pageNumber;
        }
      },
      computed:{
        ...mapGetters({
          productus:'products/PRODUCTS'
        }),
        visibleProducts() {
          const start = (this.currentPage - 1) * this.pageSize;
          const end = start + this.pageSize;
          return this.products.slice(start, end)
        },
        totalPages() {
          return Math.ceil(this.products.length / this.pageSize);
        },
      },
      created() {
        this.loadData()
      },
      mounted() {
        this.loadCountProducts()
      }
    }

</script>

<style scoped>
    .v-catalog-products {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

</style>