<template>
  <div class="v-catalog-products" v-if="products">
        <vCartItems
          v-for="prodcs in visibleProducts"
          :key="prodcs.id_product"
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
    import Product from "@/interfaces/Product";
    import {listObjectKeys, Nullable} from "@/interfaces/Type/Types";
    import vCartItems from "@/components/Card-Product/v-cart-items.vue";
    import PaginateModul from '@/components/Card-Product/v-PaginateModul.vue'
    export default defineComponent({
      name: "v-catalog-products",
      components:{
        vCartItems,
        PaginateModul
      },
      data(){
        return {
          products: [] as Product[],
          currentPage: 1,
          pageSize: 6
        };
      },
      computed:{
        ...mapGetters({
          allProductus: 'products/PRODUCTS',
          brends: 'products/BRENDSINFO'
        }),
        visibleProducts(): Nullable<Product[]>{
          const start: number = (this.currentPage - 1) * this.pageSize;
          const end: number = start + this.pageSize;
          listObjectKeys(this.products).forEach((item, index: number):void => {
            if (!item){
              listObjectKeys(this.products).splice(index, 1)
            }
          })
          return this.products?.slice(start, end)
        },
        totalPages(): number {
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
          } catch (e){
            console.error(e)
          }
        },
        async loadCountProducts(){
          try {
            const data: Nullable<Product[]> = await this.allProductus
            let listProd = []
            if (data){
              data?.forEach((item: Product, index:number,) => {
                localStorage.setItem(index as Nullable<any>, JSON.stringify(item))
              })
              for (let i: number = 0; localStorage.length > i; i++){
                listProd.push(JSON.parse(localStorage.getItem(i as Nullable<any>) as string))
              }
              return this.products = listProd
            }
          } catch (e){
            console.error(e)
          }
        },
        pageChanged(pageNumber: number) {
          this.currentPage = pageNumber;
        },
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