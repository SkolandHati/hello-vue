<template>
  <div class="user-panel">
    <vMainPanelUser/>
  </div>
  <div class="container" v-if="data_brend && getProductsCatalog">
    <div class="brend-info" v-if="data_brend">
      <h1 class="header">{{data_brend.brend_Name}}</h1>
      <p class="info">{{data_brend.info_Brend}}</p>
    </div>
    <div class="catalog">
      <vCartItems
          v-if="getProductsCatalog"
          v-for="prodoos in getProductsCatalog"
          :key="prodoos.id"
          :allproducts="prodoos"/>
    </div>
  </div>
  <div class="none" v-else>
    <h1>Результаты поиска не увенчались успехом</h1>
    <div class="item_brends" v-if="getBrendInfo">
      <h2>Возможно вы искали...</h2>
      <ul class="brend_name" v-for="(item, i) in getBrendInfo">
        <li @click="reloadSearch(item.brend_Name)">{{item.brend_Name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>

import vMainPanelUser from "@/components/User/v-main-panel-user.vue";
import vCatalogProducts from "@/components/Card-Product/v-catalog-products.vue"
import {mapGetters, mapActions} from "vuex";
import vCartItems from "@/components/Card-Product/v-cart-items.vue";
import router from "@/router";
export default {
    name: 'v-BrendsPageProducts',
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
          Promise.reject(e)
        }
      },
      async loadInfo(){
        try {
          await this.loadBrendsInfo()
        }catch (e){
          Promise.reject(e)
        }
      },
      async getBrend(){
        try {
          if (this.$route.params.brend){
            await this.loadInfo()
            let data = await this.getBrendInfo
            if (data){
              let brend =  data.find(item => item.brend_Name === this.$route.params.brend)
              return this.data_brend = brend
            }
          }
        }catch (e){
          Promise.reject(e)
        }
      },
      reloadSearch(data){
        router.push({name:'v-BrendsPageProducts', params: {brend: data}})
        setTimeout(() => {window.location.reload()}, 1000)
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
  .none{
    width: 95%;
    height: 60px;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 20px;
    text-align: center;
    border: 2px solid black;
    border-radius: 10px;
  }
  .none>h1{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .none>.item_brends{
    display: block;
    margin-top: 25px;
  }

  .none>.item_brends>.brend_name>li{
    height: 30px;
    list-style-type: none;
    border: 2px solid black;
    border-radius: 10px;
    margin-left: 35%;
    margin-right: 40%;
    padding-top: 15px;
  }
  .none>.item_brends>.brend_name>li:hover{
    cursor: pointer;
    background-color: #6e6d6d;
  }
</style>
