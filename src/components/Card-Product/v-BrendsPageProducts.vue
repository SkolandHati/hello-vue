<template>
  <div class="user-panel">
    <vMainPanelUser/>
  </div>
  <div class="catalog">
      <vCartItems
          v-if="getProductsCatalog"
          v-for="prodoos in getProductsCatalog"
          :key="prodoos.id"
          :allproducts="prodoos"/>
  </div>
</template>

<script>

import vMainPanelUser from "@/components/User/v-main-panel-user.vue";
import vCatalogProducts from "@/components/Card-Product/v-catalog-products.vue"
import {mapGetters, mapActions} from "vuex";
import vCartItems from "@/components/Card-Product/v-cart-items.vue";
export default {
    name: 'v-BrendsPageProducts',
    components: {
      vCartItems,
      vMainPanelUser,
      vCatalogProducts
    },
    methods:{
      ...mapActions({
        loadProducts: 'products/loadProdcutsCatalog'
      }),
      async loadDataForCatalog(){
        try {
          await this.loadProducts("Lacoste")
        }catch (e){
          Promise.reject(e)
        }
      }
    },
    computed:{
      ...mapGetters({
        getProductsCatalog:'products/PRODUCTSFORCATALOG'
      })
    },
    mounted() {
      this.loadDataForCatalog()
      console.log(this.getProductsCatalog)
    }
}

</script>

<style scoped>
  .user-panel{
    display: flex;
    background-color: rgb(57, 73, 82);
    width: 100%;
    height: 50px;
  }
  .catalog{
      justify-content: center;
      margin: 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
  }
  .catalog>.items{
    padding: 50px;
    padding-top: 25px;
  }
  .catalog>.items>.container-item{
    border-radius: 4px;
  }
  .catalog>.items>.container-item>.image>img{
    height: 300px;
  }
</style>
