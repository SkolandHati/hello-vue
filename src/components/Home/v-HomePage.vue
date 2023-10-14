<template>
    <div class="user-panel">
      <vMainPanelUser/>
    </div>
    <div class="contaner-homepage">
      <vCaruselProduct v-if="oneproduct"
         :oneproduct="oneproduct"/>
      <div class="cards">
          <div class="head">
            <h1 class="header-product">Catalog Brend's</h1>
          </div>
         <vCatalogProducts/>
      </div>
    </div>
</template>
<script>
    import vMainPanelUser from "@/components/User/v-main-panel-user.vue"
    import vCaruselProduct from "../CaruselProduct/vCarusel"
    import vCatalogProducts from "../Card-Product/v-catalog-products.vue"
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "v-HomePage",
        components: {
            vCaruselProduct,
            vCatalogProducts,
            vMainPanelUser
        },
      methods: {
        ...mapActions({
          loadsProducts: 'products/loadProducts',
          loadsProduct: 'products/loadsProduct'
        }),
        async loadData() {
          try {
            await this.loadsProduct()
          } catch (e) {
            console.error(e)
          }
        },
      },
      computed:{
            ...mapGetters({
                oneproduct: 'products/ONEPRODUCT'}),
        },
      mounted() {
          this.loadData()
      }
}

</script>
<style>
    .user-panel{
      display: flex;
      background-color: rgb(57, 73, 82);
      width: 100%;
      height: 50px;
    }
    .contaner-homepage{
        display: flex;
    }
    .cards{
      display: block;
      width: 100%;
      margin-left: 10px;
    }
    .cards>.head{
        //padding-left: 0px;
        /* width: 309%; */
    }
    .cards>.head>h1{
        //padding-left: 0px;
        color: black;
        text-align: center;
    }
</style>