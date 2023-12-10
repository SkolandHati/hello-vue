<template>
  <div class="user-panel">
    <v-main-panel-user/>
  </div>
  <div class="busket-container">
    <div class="item-container" style="width: 50%;" v-if="busketproducts">
      <q-banner class="bg-primary text-white">Корзина Избранных Продуктов</q-banner>
      <div class="cart-container" v-for="(item, i) in busketproducts" :key="i">
        <vCartItems :products="item" ></vCartItems>
      </div>
    </div>
    <div class="info-all-busket" style="width: 50%; height: 100%">
      <q-banner class="bg-primary text-white">Стоимость всех товаров в корзине: {{calculateThePrice}}</q-banner>
        <q-btn style="display: block" unelevated rounded color="green"
               label="Оформить заказ"
               @click="goOrderPage"></q-btn>
        <q-btn style="display: block"  unelevated rounded color="red"
               label="Очистить корзину"
               @click="clearBusket"></q-btn>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import vMainPanelUser from "@/components/User/v-MainPanelUser.vue"
import imageComponent from "@/components/kit/ImageComponent.vue";
import vCartItems from "@/components/Card-Product/v-cart-items.vue"
export default {
    name: 'v-BusketPage',
    components:{
      vCartItems,
      vMainPanelUser,
      imageComponent
    },
    data(){
      return {
        fullPrice: 0,
      }
    },
  computed:{
    ...mapGetters({
      busketproducts: 'busketProducts/BUSKETPRODUCTS',
    }),
    calculateThePrice(){
      try {
        if (this.busketproducts){
          const listPrice = []
          for (const key in this.busketproducts){
            listPrice.push(this.busketproducts[key].price_product * this.busketproducts[key].quantity)
          }
          return this.fullPrice = listPrice?.reduce((sum, current) => sum + current, 0)}
        else {
          return  this.fullPrice = 0
        }
      }catch (e){
        console.log(e)
      }
    },
  },
  // watch:{
  //   busketproducts(){
  //     this.loadsInBusketData()
  //   },
  // },
  mounted() {
    this.loadsInBusketData()
    console.log(this.busketproducts)
  },
    methods:{
      ...mapActions({
        loadDatafromDataBase: 'busketProducts/loadProductsData',
        plusProdBusket: 'busketProducts/plusProdBusket',
        minusProdBusket: 'busketProducts/minusProdBusket',
        deliteDataProduct: 'busketProducts/deliteProduct',
        clearBusket: 'busketProducts/clearBusket',
      }),
      async loadsInBusketData(){
        try {
          await this.loadDatafromDataBase()
        }catch (e){
          console.log(e)
        }
      },
      async countProduct(index, smbl){
        try {
          let symbol = ['plus','minus','delite']
          switch (smbl) {
            case symbol[0]:
              await this.plusProdBusket(index);
              break;
            case symbol[1]:
              await this.minusProdBusket(index);
              break;
            case symbol[2]:
              await this.deliteDataProduct(index);
              break;
          }
        }catch (e){
          console.log(e)
        }
      },
      goOrderPage(){
        if (this.busketproducts){
          this.$router.push({name: 'v-OrderPage'})
        }
      }
    },
}

</script>

<style scoped>
 .busket-container{
   display: flex;
 }
 .info-all-busket{
   border: 2px solid red;
   border-radius: 7px;
   text-align:center;
 }
 .block-buttons{
   display: block;
 }
</style>