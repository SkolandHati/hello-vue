<template>
    <div class="v-catalog-products">
        <vCartItems v-if="productus"
        v-for="prodoos in productus"
        :key="prodoos.id"
        :allproducts="prodoos"/>
    </div>
</template>

<script>
    import vCartItems from "./v-cart-items.vue"
    import {mapActions, mapGetters} from "vuex";
    export default {
      name: "v-catalog-products",
      components:{
        vCartItems
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
        }
      },
      computed:{
        ...mapGetters({
          productus:'products/PRODUCTS'
        }),
      },
      mounted() {
        this.loadData()
      }
    }

</script>

<style>
    .v-catalog-products{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }

</style>