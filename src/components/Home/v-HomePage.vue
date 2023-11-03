<template>
    <div class="user-panel">
      <vMainPanelUser/>
    </div>
    <div class="contaner-homepage">
      <vCarusel/>
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
    import vCarusel from "../CaruselProduct/vCarusel"
    import vCatalogProducts from "../Card-Product/v-catalog-products.vue"
    export default {
        name: "v-HomePage",
        components: {
            vCarusel,
            vCatalogProducts,
            vMainPanelUser
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
    .contaner-homepage{
        display: flex;
    }
    .cards{
      display: block;
      width: 100%;
      margin-left: 10px;
    }

    .cards>.head>h1{
        //padding-left: 0px;
        color: black;
        text-align: center;
        margin: 0;
        margin-top: 2px;
    }
</style>