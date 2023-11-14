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
          <div class="user-block">
            <div class="productInfo">
              <h1 id="product">{{item.name_product}}</h1>
              <h1 id="product">{{item.product_price * item.quantity}}</h1>
              <h1 id="product">Количество товаров в корзине {{item.quantity}}</h1>
            </div>
            <div class="navig-btn">
              <button id="prod-button" class="plus" @click="plusCountProd(i)">+</button>
              <button id="prod-button" class="minus" @click="minusCountProd(i)">-</button>
              <button id="prod-button" class="delite" @click="deliteProductBusket(item.id_product)">delit</button>
            </div>
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
  width: 750px;
  height: 100%;
  margin-left: 15%;
  margin-top: 2%;
  margin-bottom: 20px;
  border: 1px solid #6e6d6d;
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
  width: 300px;
  height: 300px;
  padding: 5px;
  padding-right: 0px;
  padding-left: 0px;
  border: 2px solid #3B5983;
  border-radius: 5px;
}
#busketContainer>.busket>.productInBusket>.productItem>.user-block{
  margin-left: 30px;
}
#busketContainer>.busket>.productInBusket>.productItem>.user-block>.navig-btn{
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 5px;
  justify-content: center;
}
#busketContainer>.busket>.productInBusket>.productItem>.user-block>.navig-btn>#prod-button{
  width: 50px;
  height: 50px;
  margin-left: 20px;
  margin-top: 15px;
  border-radius: 5px;

}
#busketContainer>.busket>.productInBusket>.productItem>.user-block>.navig-btn>.plus{
  background-color: green;
  font-size: 25px;
}
#busketContainer>.busket>.productInBusket>.productItem>.user-block>.navig-btn>.minus{
  background-color: red;
  font-size: 25px;
}
#busketContainer>.busket>.productInBusket>.productItem>.user-block>.navig-btn>.delite{
  background-color: #6e6d6d;
  font-size: 20px;
}
#busketContainer>.busket>.productInBusket>.productItem>.user-block>.productInfo{
  display: block;
  width: 300px;
  margin-left: 35px;
}
#busketContainer>.busket>.productInBusket>.productItem>.user-block>.productInfo>#product{
  color: black;
  border: 2px solid #c2b0b0;
  border-radius: 5px;
  text-align: center;
  margin-top: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 25px;
}
#busketContainer>.busket>.productInBusket>h1{
  color: black;
  margin-left: 60px;
  margin-bottom: 30px;
}
#busketContainer>.busket>.productInBusket>#header{
  text-align: center;
  margin-top: 0px;
  width: 600px;
}

#busketContainer>.busket>.infoAllBusket{
  position: sticky;
  top: 160px;
  margin: 15px;
  margin-left: 80px;
  margin-top: 0px;
  width: 330px;
  max-width: 330px;
  max-height: 30%;
  border-radius: 5px;
  border: 1px solid black;
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