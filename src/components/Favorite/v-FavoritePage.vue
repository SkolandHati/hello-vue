<template>
  <div class="user_panel">
    <v-main-panel/>
  </div>
  <div class="favorite-block" style="display: flex">
    <div class="container-favorite" style="width: 70%; " v-if="getterFavoriteProd">
      <q-banner class="banner" style="text-align: center;">Товары добавленные в избранное</q-banner>
      <div class="container">
        <div class="item" v-for="(item, i) in getterFavoriteProd" :key="i">
          <vCartItems :products="item"></vCartItems>
        </div>
      </div>
    </div>
    <div class="random-product">
      <q-banner class="banner" style="text-align: center;">Товары добавленные в избранное</q-banner>
      <vCarusel style="float: right"></vCarusel>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import vMainPanel from "@/components/User/v-MainPanelUser.vue"
import Button from "@/components/kit/v-Button.vue"
import vCartItems from "@/components/Card-Product/v-cart-items.vue"
import vCarusel from "@/components/CaruselProduct/vCarusel.vue"
export default {
    name: "vFavoritePage",
    components:{
      vMainPanel,
      Button,
      vCartItems,
      vCarusel
    },
    data(){
      return {
        brend: null,
        active_first: false,
      }
    },
    computed:{
      ...mapGetters({
        getterFavoriteProd:'favoriteProducts/GET_FAVORITE_PROD',
        getRandom: 'products/GETRANDOMPRODUCT',
        getBrends: 'products/BRENDSINFO'
      })
    },
    mounted() {
      this.loadData()
      // this.loadBrendForProduct()
    },
    methods:{
      ...mapActions({
        getFavorites: 'favoriteProducts/getFavoriteP',
        getterBrends: 'products/loadBrendsInfo',
        getRandomProduct: 'products/getRandomProduct',
        addInBusket: 'busketProducts/appendBusket',
        delitFavoriteProduct: 'favoriteProducts/delitFavoriteProduct'
      }),
      async loadData(){
       try {
         await this.getFavorites()
       } catch (e){
         console.log(e)
       }
      },
      // async loadBrendForProduct(){
      //   try {
      //     await this.getRandomProduct()
      //     await this.getterBrends()
      //     if (this.getBrends && this.getRandom){
      //        return this.brend = await this.getBrends?.find(item => item.brend_Name === this.getRandom.product_brend)
      //     }
      //   }catch (e){
      //     console.log(e)
      //   }
      // },
      goCartItem(id){
        this.$router.push({name: 'v-cart-item-page', params: {id: id}})
      },
      goOrderPage(data){
        if (data){
        this.addInBusket(data)
      }
        this.$router.push({name: 'v-OrderPage'})
      }
    },
}

</script>

<style scoped>
  :deep(.button-favorite){
    display: none;
  }
  :deep(.button-delite){
    display: block;
  }
  .container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  :deep(.q-banner__content){
    font-size: 18px;
    color: #ffffff;
    background-color: #6f8f9f;
    padding: 10px;
    margin-left: 25%;
    margin-right: 25%;
    border-radius: 20px;
  }
  :deep(.items){
    margin-top: 5px;
  }
  :deep(.carousel__pagination){
    padding: 0px;
  }
</style>