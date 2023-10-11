<template>
    <div class="v-catalog-products">
        <vCartItems v-if="PRODUCTS"
        v-for="products in PRODUCTS"
        :key="products.id"
        :allproducts="products"/>
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
        ...mapActions([
              'loadProducts'
          ]),
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
          ...mapGetters([
              'PRODUCTS'
          ])
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