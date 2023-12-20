<template>
    <div class="v-catalog-products" v-if="products">
        <vCartItems
          v-for="prodcs in visibleProducts"
          :key="prodcs.id_product"
          :products="prodcs"/>
    </div>
  <PaginateModul v-if="productus"
                 :modelValue="currentPage"
                 :total_pages="totalPages"
                 @pagechanged="pageChanged"></PaginateModul>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import vCartItems from "./v-cart-items.vue"
    import PaginateModul from '@/components/Card-Product/v-PaginateModul.vue'
    export default {
      name: "v-catalog-products",
      components:{
        vCartItems,
        PaginateModul
      },
      data(){
        return {
          products: [],
          currentPage: 1,
          pageSize: 6
        };
      },
      computed:{
        ...mapGetters({
          productus:'products/PRODUCTS',
          brends: 'products/BRENDSINFO'
        }),
        visibleProducts() {
          const start = (this.currentPage - 1) * this.pageSize;
          const end = start + this.pageSize;
          this.products.forEach((item, index) => {
            if (!item){
              this.products.splice(index,1)
            }
          })
          return this.products.slice(start, end)
        },
        totalPages() {
          return Math.ceil(this.products.length / this.pageSize);
        },
      },
      mounted() {
        this.loadCountProducts()
        this.loadData()
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
            console.log(e)
          }
        },
        async loadCountProducts(){
          try {
            let data = await this.productus
            let listProd = []
            if (data){
              data?.forEach((item, index, arrey) => {
                localStorage.setItem(index, JSON.stringify(item))
              })
              for (let i = 0; localStorage.length > i; i++){
                listProd.push(JSON.parse(localStorage.getItem(i)))
              }
              return this.products = listProd
            }
          }catch (e){
            console.log(e)
          }
        },
        pageChanged(pageNumber) {
          this.currentPage = pageNumber;
        }
      },
      inheritAttrs: false,
    }
</script>
<style scoped>
    .v-catalog-products {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
</style>