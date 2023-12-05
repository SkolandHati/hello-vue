<template>
  <div class="user-panel">
    <v-main-panel-user/>
  </div>
  <div id="busketContainer">
    <div class="busket">
      <div class="productInBusket" v-if=busketproducts>
        <h1 id="header">Корзина Избранных Продуктов</h1>
        <div class="productItem" v-for="(item, i) in busketproducts">
          <imageComponent :productBrend="item.product_brend"
                          :imageProduct="item.image_product"
                          :settingBusketPage="true"></imageComponent>
          <div class="navig-btn">
            <button id="prod-button" class="plus" @click="countProduct(i, 'plus')">+</button>
            <button id="prod-button" class="minus" @click="countProduct(i, 'minus')">-</button>
            <button id="prod-button" class="delite" @click="countProduct(item.id_product)">delit</button>
          </div>
          <div class="productInfo">
              <h1 id="product">{{item.name_product}}</h1>
              <h1 id="product">{{item.price_product * item.quantity}}</h1>
              <h1 id="product">Количество товаров в корзине {{item.quantity}}</h1>
          </div>
        </div>
      </div>
      <div class="infoAllBusket">
        <h1 id="infoPrice" >Стоимость всех товаров в корзине: {{calculateThePrice}}</h1>
        <button id="button" @click="goOrderPage">Оформить заказ</button>
        <button id="button" class="clearBusket" @click="clearBusket">Очистить корзину</button>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import vMainPanelUser from "@/components/User/v-main-panel-user.vue"
import imageComponent from "@/components/kit/ImageComponent.vue";
export default {
    name: 'v-BusketPage',
    components:{
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

      async deliteProductBusket(id){
        try {
          await this.deliteDataProduct(id)
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

  .user-panel{
    display: flex;
    background-color: rgb(57, 73, 82);
    width: 100%;
    height: 50px;
  }

  #busketContainer{
    display: flex;
  }
  .busket{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 650px;
    height: 100%;
    margin-left: 25%;
    margin-top: 2%;
    border: 2px solid #6e6d6d;
    border-radius: 5px;
  }
  .productInBusket{
    display: block;
    margin: 25px;
  }
  .productItem{
    display: flex;
    margin-top: 10px;

  }
  img{
    width: 225px;
    height: 200px;
    padding: 5px;
    padding-right: 0px;
    padding-left: 0px;
    border: 2px solid #3B5983;
    border-radius: 1px;
  }
  .navig-btn{
    width: 50px;
    height: 50px;
  }
  #prod-button{
    width: 50px;
    height: 50px;
    margin-left: 20px;
    margin-top: 15px;
    border-radius: 5px;
  }
  .plus{
    background-color: green;
    font-size: 25px;
  }
  .minus{
    background-color: red;
    font-size: 25px;
  }
  .delite{
    background-color: #6e6d6d;
    font-size: 20px;
  }
  .productInfo{
    display: block;
    margin-left: 35px;
  }
  #product{
    color: black;
    border-top: 2px solid #c2b0b0;
    text-align: center;
    margin-top: 20px;
    font-size: 25px;
  }
  h1{
    color: black;

  }
  #header{
    text-align: center;
    margin-top: 0px;
    width: 600px;
  }

  .infoAllBusket{
    margin: 15px;
    width: 330px;
    height: 100%;
  }

  #infoPrice{
    color: black;
    text-align: center;
  }
  #button{
    display: block;
    text-align: center;
    margin: 25px;
    margin-left: 90px;
    width: 140px;
    height: 37px;
  }

</style>