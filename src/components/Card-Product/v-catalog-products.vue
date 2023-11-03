<template>
    <div class="v-catalog-products">
        <vCartItems v-if="perProducts"
        v-for="prodoos in perProducts"
        :key="prodoos.id"
        :allproducts="prodoos"/>
    </div>
  <PaginateMod v-if="productus" :productsArr="productus" :pageNumb="pageNumber"></PaginateMod>
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
          perProducts: null,
          pageNumber: 1
        }
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
        async loadCountProducts(index = 0){
          try {
            let data = await this.productus
            let listProd = []
            let onTracking = {
              index: index,
            }
            if (data){
              data.forEach((item, index, arrey) => {
                localStorage.setItem(index, JSON.stringify(item))
              })
              let numd = localStorage.length / this.countesPage
              for (let i = 0; numd > i; i++){
                listProd.push(JSON.parse(localStorage.getItem(i)))
              }
              return this.perProducts = listProd
            }
          }catch (e){
            Promise.reject(e)
          }
        }
      },
      computed:{
        ...mapGetters({
          productus:'products/PRODUCTS'
        }),
        countesPage() {
          return Math.ceil(localStorage.length / 6)
        },
      },
      mounted() {
        this.loadData()
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