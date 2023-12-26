<template>
  <div class="v-catalog-products" v-if="products">
        <vCartItems
          v-for="prodcs in visibleProducts"
          :key="prodcs.id_product as number"
          :products="prodcs"/>
    </div>
  <PaginateModul v-if="allProductus"
                 :modelValue="currentPage"
                 :total_pages="totalPages"
                 @pagechanged="pageChanged"></PaginateModul>
</template>

<script lang="ts">
    import {mapActions, mapGetters} from "vuex";
    import {defineComponent} from 'vue'
    import type {PropType} from "vue";
    import Product from "@/interfaces/Product";
    import vCartItems from "./v-cart-items.vue";
    import PaginateModul from '@/components/Card-Product/v-PaginateModul.vue'
    export default defineComponent({
      name: "v-catalog-products",
      components:{
        vCartItems,
        PaginateModul
      },
      data(){
        return {
          products: [] as PropType<Product>,
          currentPage: 1 ,
          pageSize: 6
        };
      },
      computed:<any>{
        ...mapGetters({
          allProductus:'products/PRODUCTS',
          brends: 'products/BRENDSINFO'
        }),
        visibleProducts(){
          const start: number = (this.currentPage - 1) * this.pageSize;
          const end: number = start + this.pageSize;
          this.products.forEach((item: object, index: number) => {
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
            const data: any = await this.allProductus
            let listProd = []
            if (data){
              data?.forEach((item: object, index:string,) => {
                localStorage.setItem(index, JSON.stringify(item))
              })
              for (let i = 0; localStorage.length > i; i++){
                listProd.push(JSON.parse(localStorage.getItem(i as any) as string))
              }
              return this.products = listProd
            }
          }catch (e){
            console.log(e)
          }
        },
        pageChanged(pageNumber: number) {
          this.currentPage = pageNumber;
        }
      },
      inheritAttrs: false,
    })
</script>
<style scoped>
    .v-catalog-products {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
</style>