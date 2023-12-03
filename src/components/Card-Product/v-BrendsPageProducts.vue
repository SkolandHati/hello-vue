<template>
  <div class="user-panel">
    <vMainPanelUser/>
  </div>
  <div class="container" v-if="data_brend && getProductsCatalog">
    <div class="brend-info" v-if="data_brend">
      <h1 class="header">{{data_brend.brend_Name}}</h1>
      <p class="info">{{data_brend.info_Brend}}</p>
    </div>
    <div class="catalog" v-if="getProductsCatalog">
      <vCartItems
          v-for="prodoos in getProductsCatalog"
          :key="prodoos.id"
          :allproducts="prodoos"/>
    </div>
  </div>
  <div class="none" v-else>
    <h1>Результаты поиска не увенчались упсехом</h1>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import vMainPanelUser from "@/components/User/v-main-panel-user.vue";
import vCatalogProducts from "@/components/Card-Product/v-catalog-products.vue"
import vCartItems from "@/components/Card-Product/v-cart-items.vue";
export default {
  name: 'BrendsPageProducts',
  components: {
    vCartItems,
    vMainPanelUser,
    vCatalogProducts
  },
  data(){
    return {
      data_brend: null
    }
  },
  computed:{
    ...mapGetters({
      getProductsCatalog:'products/PRODUCTSFORCATALOG',
      getBrendInfo: 'products/BRENDSINFO'
    })
  },
  mounted() {
    this.loadDataForCatalog()
    this.getBrend()
  },
  methods:{
    ...mapActions({
      loadProducts: 'products/loadProdcutsCatalog',
      loadBrendsInfo: 'products/loadBrendsInfo'
    }),
    async loadDataForCatalog(){
      try {
        if (this.$route.params.brend){
          await this.loadProducts(this.$route.params.brend)
        }
      }catch (e){
        console.log(e)
      }
    },
    async loadInfo(){
      try {
        await this.loadBrendsInfo()
      }catch (e){
        console.log(e)
      }
    },
    async getBrend(){
      try {
        if (this.$route.params.brend){
          await this.loadInfo()
          let data = await this.getBrendInfo
          if (data){
            this.data_brend =  data?.find(item => item.brend_Name === this.$route.params.brend)
            return this.data_brend
          }
        }
      }catch (e){
        console.log(e)
      }
    }
  },
}

</script>

<style scoped>
  .user-panel{
    display: flex;
    background-color: rgb(57, 73, 82);
    width: 100%;
    height: 50px;
  }
  .brend-info{
    width: 91.6%;
    height: 100%;
    margin-top: 15px;
    margin-left: 55px;
    border-radius: 5px;
    border: 2px solid black;
  }
  .brend-info>.header{
    text-align: center;
    margin-top: 15px;
  }
  .brend-info>.info{
    text-align: center;
  }
  .catalog{
      justify-content: center;
      margin: 20px;
      margin-left: 45px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
  }
  .items{
    padding: 50px;
    padding-top: 25px;
  }
  .container-item{
    border-radius: 4px;
  }
  .catalog>.items>.container-item>.image>img{
    height: 300px;
  }
</style>
