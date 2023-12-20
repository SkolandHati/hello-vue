<template>
  <div class="user-panel">
    <vMainPanelUser/>
  </div>
  <div class="container" v-if="data_brend && getProductsCatalog">
    <div class="brend-info" v-if="data_brend">
      <q-card dark bordered class="bg-grey-9 my-card">
        <q-card-section>
          <div class="text-h6" style="display: flex; justify-content: center">{{data_brend.brend_Name}}</div>
        </q-card-section>
        <q-separator dark inset></q-separator>
        <q-card-section>
          <div style="display: flex; justify-content: center; font-size: 15px; margin-left: 35px">
            {{data_brend.info_Brend}}</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="catalog" v-if="getProductsCatalog" style="width: 100%;">
      <vCartItems
          v-for="(prodoos,i) in getProductsCatalog"
          :key="i"
          :products="prodoos"/>
    </div>
  </div>
  <div class="none" v-else>
    <q-banner class="head-banner" style="width: 100%">Результаты поиска не увенчались успехом</q-banner>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import vMainPanelUser from "@/components/User/v-MainPanelUser.vue";
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
            this.data_brend = data?.find(item => item.brend_Name === this.$route.params.brend)
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
  .head-banner{
    margin-top: 40px;
    text-align: center;
    background-color: #3b899a;
    color: #f5f3f3;
  }
  .catalog{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
</style>
