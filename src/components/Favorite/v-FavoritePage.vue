<template>
  <div class="user_panel">
    <v-main-panel/>
  </div>
  <div class="favorite-block" style="display: flex">
    <div class="container-favorite" style="width: 70%; " v-if="getterFavoriteProd">
      <q-banner class="banner" style="text-align: center;">Товары добавленные в избранное</q-banner>
      <div class="container">
        <div class="item" v-for="(item, i) in getterFavoriteProd" :key="i">
          <vCartItems :products="item" :label="label"></vCartItems>
        </div>
      </div>
    </div>
    <div class="random-product">
      <q-banner class="banner-carusel" style="text-align: center;">Возможно вам понравиться:</q-banner>
      <vCarusel style="float: right"></vCarusel>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import vMainPanel from "@/components/User/v-MainPanelUser.vue"
import vCartItems from "@/components/Card-Product/v-cart-items.vue"
import vCarusel from "@/components/CaruselProduct/vCarusel.vue"
export default {
    name: "vFavoritePage",
    components:{
      vMainPanel,
      vCartItems,
      vCarusel
    },
    computed:{
      ...mapGetters({
        getterFavoriteProd:'favoriteProducts/GET_FAVORITE_PROD',
      })
    },
    data(){
      return {
        label: "Удалить из избранного"
      }
    },
    mounted() {
      this.loadData()
    },
    methods:{
      ...mapActions({
        getFavorites: 'favoriteProducts/getFavoriteP',
        addInBusket: 'busketProducts/appendBusket',
      }),
      async loadData(){
       try {
         await this.getFavorites()
       } catch (e){
         console.log(e)
       }
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
  :deep(.q-banner.row.items-center.banner-carusel>.q-banner__content){
    width: 100%;
    padding: 8px 16px;
    margin: 0px;
    margin-left: 5%;
    margin-right: 6%;
  }
  :deep(.carousel){
    margin-top: 5px;
  }
</style>