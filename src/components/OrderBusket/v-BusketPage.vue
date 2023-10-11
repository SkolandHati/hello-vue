<template>
  <div id="busketContainer">
    <div class="busket">
      <div class="productInBusket">
        <h1 id="header">Корзина Избранных Продуктов</h1>
        <div class="productItem" v-if="BUSKETPRODUCTS" v-for="(item, i) in BUSKETPRODUCTS">
          <img :src="require('../assets/images/Kenzo/'+ item.image)" alt="images">
          <div class="navig-btn">
            <button id="prod-button" class="plus" @click="plusCountProd(i, item.name)">+</button>
            <button id="prod-button" class="minus" @click="minusCountProd(i, item.name)">-</button>
            <button id="prod-button" class="delite" @click="deliteProdisBusket(item.name)">delit</button>
          </div>
          <div class="productInfo">
              <h1 id="product">{{item.name}}</h1>
              <h1 id="product">{{item.price * item.quantity}}</h1>
              <h1 id="product">Количество товаров в корзине {{item.quantity}}</h1>
          </div>
        </div>
        <div v-else>
          <h1>В КОРЗИНЕ ОТСУТСТВУЮТ ТОВАРЫ</h1>
        </div>
      </div>
    <div class="infoAllBusket">
      <h1 id="infoPrice" >Стоимость всех товаров в корзине: {{calculateThePrice}}</h1>
      <button id="button">ewgwegdsgsdg</button>
      <button id="button" class="clearBusket" @click="clearBuskets">Очистить корзину</button>
    </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
// import vMainPanelUser from "@/components/User/v-main-panel-user.vue"
export default {
    name: 'v-BusketPage',
    components:{
      // vMainPanelUser
    },
    data(){
      return {
        dataBusket: [],
        statPrice: 0,
        fullPrice: 0,
      }
    },
    methods:{
      ...mapActions([
         'clearBusket',
         'appendBusket',
         'plusProdBusket',
         'minusProdBusket',
         'deliteProduct'
      ]),
      clearBuskets(){
        try {
          this.clearBusket()
          localStorage.clear()
        }catch (e){
          Promise.reject(e)
        }
      },
      async loadBusketProducts(){
        try {
            for (let i = 0; localStorage.length > i; i++){
              let dataLocalstorage = await JSON.parse(localStorage.getItem(localStorage.key(i)))
              this.dataBusket.push(dataLocalstorage)
            }
          this.appendBusket(this.dataBusket)
        }catch (e){
          Promise.reject(e)
        }
      },
      async updateBusket(){
        try {
          await this.BUSKETPRODUCTS
        }catch (e){
          Promise.reject(e)
        }
      },
      plusCountProd(index, name){
        try {
            this.plusProdBusket(index)
            localStorage.removeItem(name)
            localStorage.setItem(name, JSON.stringify(this.dataBusket[index]))
        }catch (e){
          Promise.reject(e)
        }
      },
      minusCountProd(index, name){
        try {
            this.minusProdBusket(index, name)
            localStorage.removeItem(name)
            localStorage.setItem(name, JSON.stringify(this.dataBusket[index]))
        }catch (e){
          Promise.reject(e)
        }
      },
      deliteProdisBusket(name){
        try {
          localStorage.removeItem(name)
          this.deliteProduct(name)
        }catch (e){
          Promise.reject(e)
        }
      }

    },
    computed:{
      ...mapGetters([
        'BUSKETPRODUCTS',
      ]),
      calculateThePrice(){
        try {
          if (this.dataBusket){
            const listPrice = []
            for (const key in this.dataBusket){
              listPrice.push(this.dataBusket[key].price * this.dataBusket[key].quantity)
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
    mounted() {
      this.loadBusketProducts()
      this.updateBusket()
    }
}

</script>

<style>

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
  //border: 2px solid #008888;
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
  //margin: 20px;
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