<template>
  <div class="user-panel">
    <v-main-panel-user/>
  </div>
  <div class="busket-container">
    <div class="item-container" style="width: 80%;" v-if="busketproducts">
      <q-banner class="bg-primary text-white" style="border-radius: 0 7px 7px 0">Корзина Избранных Продуктов</q-banner>
      <div class="container">
        <div class="cart-container" v-for="(item, i) in busketproducts" :key="i">
        <vCartItems class="cart-item" :products="item" ></vCartItems>
        <q-btn-group style="width: 300px; margin-left: 23.5%; margin-bottom: 20px">
          <q-btn color="green"
                 icon="plus_one"
                 style="width: 33.3%;"
                 @click="countProduct(i, 'plus')"></q-btn>
          <q-btn color="dark"
                 icon="remove"
                 style="width: 33.3%;"
                 @click="countProduct(i, 'minus')"></q-btn>
          <q-btn color="red"
                 icon="remove_shopping_cart"
                 style="width: 33.3%;"
                 @click="countProduct(item.id, 'delite')"></q-btn>
        </q-btn-group>
        </div>
       </div>
      </div>
    <div class="info-all-busket" style="width: 18%; height: 400px;">
      <q-banner class="info-banner bg-primary text-white">Стоимость всех товаров в корзине: {{calculateThePrice}}</q-banner>
        <q-btn class="buttns"
               style="display: block"
               unelevated rounded color="green"
               label="Оформить заказ"
               @click="goOrderPage"></q-btn>
        <q-btn class="buttns"
               style="display: block"
               unelevated rounded color="red"
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
  watch:{
    busketproducts(){
      this.loadsInBusketData()
    },
  },
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
   top: 100px;
   position: sticky;
   margin: 15px;
   margin-top: 80px;
   border: 2px solid dimgrey;
   border-radius: 7px;
   text-align:center;

 }
 .item-container{
   text-align: center;
 }
 :deep(.items){
   margin-bottom: 0px;
   padding-left: 12%;
   color: dimgray;
 }
 :deep(.card-actions){
   display: none;
 }
 .container{
   display: grid;
   grid-template-columns: repeat(2, 1fr)
 }
 :deep(.q-btn-group.row.no-wrap.inline){
   display: block;
   margin-left: 60px;
 }
 :deep(.info-banner.q-banner.row.items-center.bg-primary.text-white){
   margin-top: 70px;
 }
 .buttns{
   margin: 0 auto;
   margin-top: 50px;
 }
</style>