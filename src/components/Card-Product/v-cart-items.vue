<template>
    <div class="items">
      <div class="container-item" @click="$router.push({name: 'v-cart-item-page', params: {id: allproducts.id}})">
        <div class="image">
          <img :src="require('../assets/images/Kenzo/'+ allproducts.image)" alt="images">
        </div>
        <div class="nameds">
          <p>{{allproducts.name}}</p>
        </div>
      </div>
        <div class="pricesed">
            <h2>{{allproducts.price}} $</h2>
            <button class="add-basket">Добавить в корзину</button>
            <button class="favorits"></button>
        </div>
    </div>
</template>

<script>
    import router from "@/router";
    export default {
      name: "cart-item",
      methods: {
        router() {
          return router
        }
      },
      props:{
        allproducts: {
          type: Object,
          require:true
        }
      },
    }

</script>

<style>
    .items{
        display: block;
        margin-top: 10px;
        margin-left: 12px;
        margin-bottom: 40px;
        width: 280px;
        height: 300px;
        box-shadow: 0 0 4px 0;

    }
    .items>.container-item>.nameds{
        display: flex;
        justify-content: center;
    }
    .items>.container-item>.nameds>p{
        font-size: 27px;
        color: black;
        
    }
    .items>.pricesed {
        /* margin-top: 10px; */
        margin-left: 10px;
        margin-right: 10px;

        display: flex;
        justify-content: center;
    }
    .items>.pricesed>.add-basket{
        margin-top: 10px;
        width: 90px;
        height: 30px;
        font-size: 10px;
    }
    .items>.pricesed>.favorits{
        margin-top: 5px;
        margin-left: 20px;
        width: 40px;
        height: 40px;
    }
    .items>.pricesed>h2{
        margin: 0;
        padding-right: 10px;
        padding-top: 10px;
        font-size: 20px;
        color: black;
    }
    .items>.container-item>.image{
        padding-top: 15px;
        display: flex;
        justify-content: center;
    }
    .items>.container-item>.image>img{
        width: 200px;
        height: 200px;
    }
    .items>.container-item:hover{
      background-color: aliceblue;
      color: #7BA7AB;
      cursor: pointer;
    }
</style>
