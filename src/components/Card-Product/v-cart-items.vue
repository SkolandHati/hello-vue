<template>
    <div class="items" v-if="allproducts">
      <div class="container-item" @click="$router.push({name: 'v-cart-item-page', params: {id: allproducts.id}})">
        <div class="image">
          <img :src="require('@/components/assets/images/'+ allproducts.brend + '/' + allproducts.image)" alt="images">
        </div>
        <div class="nameds">
          <p>{{allproducts.name}}</p>
        </div>
      </div>
        <div class="pricesed">
            <h2>{{allproducts.price}} $</h2>
            <button class="add-basket" @click="addToCartInBusket(allproducts)">Добавить в корзину</button>
            <button class="favorits"></button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import router from "@/router";
    export default {
      name: "v-cart-item",
      props:{
        allproducts: {
          type: Object,
          require:true
        }
      },
      methods: {
        ...mapActions({
          loadUser: 'user/getUsers',
          addInBusket: 'busketProducts/appendBusket'
        }),
        async loadData(){
          try {
            await this.loadUser()
          }catch (e){
            Promise.reject(e)
          }
        },
        async addToCartInBusket(object) {
          try {
            if (!this.getUser){
              return router.push({name :'v-SignIn'})
            }
            if (object) {
              const obj = {
                'image': object.image,
                'name': object.name,
                'id': object.id,
                'price':object.price,
                'quantity': 1,
                'brend': object.brend
              }
              await this.addInBusket(obj)
            }
            }catch (e){
              Promise.reject(e)
            }
          },
      },
      computed:{
        ...mapGetters({
          getUser: 'user/AUTH'
        })
      },
      mounted() {
        this.loadData()
      }
    }

</script>

<style scoped>
    .items{
        display: block;
        margin-top: 10px;
        margin-left: 12px;
        margin-bottom: 40px;
        width: 280px;
        height: 300px;
        box-shadow: 0 0 4px 0;
        border-radius: 5px;

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
      border-radius: 5px;
    }
</style>
