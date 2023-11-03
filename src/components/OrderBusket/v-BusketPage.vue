<template>
  <div class="user-panel">
    <v-main-panel-user/>
  </div>
  <div id="busketContainer">
    <div class="busket">
      <div class="productInBusket" v-if=busketproducts>
        <h1 id="header">Корзина Избранных Продуктов</h1>
        <div class="productItem" v-for="(item, i) in busketproducts">
          <img :src="require('../assets/images/Kenzo/'+ item.image_product)" alt="images">
          <div class="navig-btn">
            <button id="prod-button" class="plus" @click="plusCountProd(i)">+</button>
            <button id="prod-button" class="minus" @click="minusCountProd(i)">-</button>
            <button id="prod-button" class="delite" @click="deliteProductBusket(item.id_product)">delit</button>
          </div>
          <div class="productInfo">
              <h1 id="product">{{item.name_product}}</h1>
              <h1 id="product">{{item.product_price * item.quantity}}</h1>
              <h1 id="product">Количество товаров в корзине {{item.quantity}}</h1>
          </div>
        </div>
      </div>
    <div class="infoAllBusket">
      <h1 id="infoPrice" >Стоимость всех товаров в корзине: {{calculateThePrice}}</h1>
      <button id="button">Оформить заказ</button>
      <button id="button" class="clearBusket" @click="clearBusket">Очистить корзину</button>
    </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import vMainPanelUser from "@/components/User/v-main-panel-user.vue"
export default {
    name: 'v-BusketPage',
    components:{
      vMainPanelUser
    },
    data(){
      return {
        dataBusket: null,
        fullPrice: 0,
      }
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
          this.dataBusket = this.busketproducts
        }catch (e){
          Promise.reject(e)
        }
      },
      async plusCountProd(index){
        try {
          await this.plusProdBusket(index)
        }catch (e){
          Promise.reject(e)
        }
      },
      async minusCountProd(index){
        try {
          await this.minusProdBusket(index)
        }catch (e){
          Promise.reject(e)
        }
      },
      async deliteProductBusket(id){
        try {
          await this.deliteDataProduct(id)
        }catch (e){
          console.log(e)
        }
      },
      // async calculateCountProducts(){
      //   try {
      //     let data = await this.busketproducts
      //     if (data){
      //       const listPrice = []
      //       for (const key in this.busketproducts){
      //         listPrice.push(this.busketproducts[key].quantity)
      //       }
      //       return this.allCountProd = listPrice.reduce((sum, current) => sum + current, 0)}
      //     else {
      //       return  this.allCountProd  = 0
      //     }
      //   }catch (e){
      //     Promise.reject(e)
      //   }
      // },
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
              listPrice.push(this.busketproducts[key].product_price * this.busketproducts[key].quantity)
            }
            return this.fullPrice = listPrice.reduce((sum, current) => sum + current, 0)}
          else {
            return  this.fullPrice = 0
          }
        }catch (e){
          Promise.reject(e)
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

#busketContainer{
  display: flex;
}
#busketContainer>.busket{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 650px;
  height: 100%;
  margin-left: 25%;
  margin-top: 2%;
  border: 2px solid #6e6d6d;
  border-radius: 5px;
}
#busketContainer>.busket>.productInBusket{
  display: block;
  margin: 25px;
}
#busketContainer>.busket>.productInBusket>.productItem{
  display: flex;
  margin-top: 10px;

}
#busketContainer>.busket>.productInBusket>.productItem>img{
  width: 225px;
  height: 200px;
  padding: 5px;
  padding-right: 0px;
  padding-left: 0px;
  border: 2px solid #3B5983;
  border-radius: 1px;
}
#busketContainer>.busket>.productInBusket>.productItem>.navig-btn{
  width: 50px;
  height: 50px;
}
#busketContainer>.busket>.productInBusket>.productItem>.navig-btn>#prod-button{
  width: 50px;
  height: 50px;
  margin-left: 20px;
  margin-top: 15px;
  border-radius: 5px;
}
#busketContainer>.busket>.productInBusket>.productItem>.navig-btn>.plus{
  background-color: green;
  font-size: 25px;
}
#busketContainer>.busket>.productInBusket>.productItem>.navig-btn>.minus{
  background-color: red;
  font-size: 25px;
}
#busketContainer>.busket>.productInBusket>.productItem>.navig-btn>.delite{
  background-color: #6e6d6d;
  font-size: 20px;
}
#busketContainer>.busket>.productInBusket>.productItem>.productInfo{
  display: block;
  margin-left: 35px;
}
#busketContainer>.busket>.productInBusket>.productItem>.productInfo>#product{
  color: black;
  border-top: 2px solid #c2b0b0;
  text-align: center;
  margin-top: 20px;
  font-size: 25px;
}
#busketContainer>.busket>.productInBusket>h1{
  color: black;

}
#busketContainer>.busket>.productInBusket>#header{
  text-align: center;
  margin-top: 0px;
  width: 600px;
}

#busketContainer>.busket>.infoAllBusket{
  margin: 15px;
  width: 330px;
  height: 100%;
}

#busketContainer>.busket>.infoAllBusket>#infoPrice{
  color: black;
  text-align: center;
}
#busketContainer>.busket>.infoAllBusket>#button{
  display: block;
  text-align: center;
  margin: 25px;
  margin-left: 90px;
  width: 140px;
  height: 37px;
}

</style>