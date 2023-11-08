<template>
    <div class="user_panel">
      <v-main-panel/>
    </div>
  <div class="container_all">
    <div class="item">
      <div class="item_favorite_product" v-if="getterFavoriteProd" v-for="(item, i) in getterFavoriteProd">
        <div class="block_image" @click="$router.push({name: 'v-cart-item-page', params: {id: item.product_id}})">
          <img :src="require('../assets/images/Kenzo/'+ item.image_product)" alt="images">
        </div>
        <div class="info_product">
          <h1 class="name">{{ item.name_products }}</h1>
          <h2 class="price">$ {{item.price_product}}</h2>
          <p class="brend">{{item.name_brend}}</p>
          <div class="block_buttons">
            <button class="order">Оформить доставку</button>
            <button class="in_busket" @click="addInBusketProduct(item)">В корзину</button>
          </div>
        </div>
      </div>
    </div>
    <div class="brend_random_product" v-if="getRandom">
      <p class="info_brend">"Prada (произносится как Прада) — итальянская публичная компания, специализирующаяся на производстве модной одежды, обуви и аксессуаров, которой принадлежат одноимённые дом моды и торговая марка. Штаб-квартира расположена в Милане."</p>
      <h1 class="head">Возможно вам понравится продукт, того же бренда:</h1>
      <div class="block_random">
        <img :src="require('../assets/images/Kenzo/'+ getRandom.image)" alt="images">
        <div class="information_product">
          <h1 class="name">{{getRandom.name}}</h1>
          <h2 class="price">{{getRandom.price}}</h2>
          <p class="brend">{{getRandom.brend}}</p>
          <div class="random_button_block">
            <button class="in_buskets" @click="addInBusketProduct(getRandom)">В корзину</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import vMainPanel from "@/components/User/v-main-panel-user.vue"
import {mapGetters, mapActions} from "vuex";

export default {
    name: "vFavoritePage",
    components:{
      vMainPanel
    },
    methods:{
      ...mapActions({
        getFavorites: 'favoriteProducts/getFavoriteP',
        getRandomProduct: 'products/getRandomProduct',
        addInBusket: 'busketProducts/appendBusket'
      }),
      async loadData(){
       try {
         await this.getFavorites()
       } catch (e){
         Promise.reject(e)
       }
      },
      async loadRandomProduct(){
        try {
          await this.getRandomProduct()
        }catch (e){
          Promise.reject(e)
        }
      },
      addInBusketProduct(data){
        const object = {
            'image': data.image_product,
            'name': data.name_products,
            'id': data.product_id,
            'price':data.price_product,
            'quantity': 1,
            'brend': data.name_brend
        }
        this.addInBusket(object)
      }
    },
    computed:{
      ...mapGetters({
        getterFavoriteProd:'favoriteProducts/GET_FAVORITE_PROD',
        getRandom: 'products/GETRANDOMPRODUCT',
      })
    },
    mounted() {
      this.loadData()
      this.loadRandomProduct()
    }

}

</script>

<style scoped>

.user_panel{
  display: flex;
  background-color: rgb(57, 73, 82);
  width: 100%;
  height: 50px;
}

.container_all{
  display: flex;
}
.container_all>.item{
  display: block;
}

.item_favorite_product{
  display: flex;
  width: 100%;
  height: 500px;
}
.item_favorite_product>.block_image{
  margin: 20px;
  height: 450px;
  border: 1px solid #444141;
  border-radius: 6px;
}
.item_favorite_product>.block_image:hover{
  cursor: pointer;
  background-color: #a2a1a1;
  transition:all 0.4s;
  border: 1px solid #f6eded;
}
.item_favorite_product>.block_image>img{
  padding-top: 50px;
  padding-left: 10px;
  padding-right: 10px;
  height: 350px;
  width: 330px;
}
.item_favorite_product>.info_product{
  display: block;
  margin-top: 20px;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 26px;
  border: 2px solid #444141;
  border-radius: 6px;
}
.item_favorite_product>.info_product>.block_buttons{
  margin-top: 60px;
  margin-left: 17px;
  width: 75%;
  height: 30%;
  padding: 15px;
  border: 2px solid #1a6c80;
  border-radius: 6%;
}
.item_favorite_product>.info_product>.block_buttons>button{
  display: block;
  width: 140px;
  height:40px;
  margin: 15px;
  margin-right: 50px;
  margin-left: 35px;
  margin-top: 20px;
  border-radius: 1%;
}

.item_favorite_product>.info_product>.block_buttons>.order{
  background-color: #a4c9a4;
  border: 0;
  border-radius: 4%;
}
.item_favorite_product>.info_product>.block_buttons>.order:hover{
  background-color: #7fda7f;
  cursor: pointer;
}

.item_favorite_product>.info_product>.block_buttons>.in_busket{
  background-color: #6e6d6d;
  border: 0;
  border-radius: 4%;
}

.item_favorite_product>.info_product>.block_buttons>.in_busket:hover{
  background-color: #d7d7d7;
  cursor: pointer;
}

.item_favorite_product>.info_product>.name,.price,.brend{
  text-align: center;
  margin: 15px;
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 40px;
  border: 0 ;
}

.brend_random_product{
  text-align: center;
  max-height: 500px;
  margin: 20px;
  margin-left: 0px;
  padding: 15px;
  padding-left: 5px;
  padding-right: 5px;
  border: 2px solid #c6ecaf;
  border-radius: 15px;
}

.brend_random_product>.info_brend{
  text-align: center;

}
.brend_random_product>.head{
  font-size: 20px;
  text-align: center;
}

.brend_random_product>.block_random{
  display: flex;
  border: 2px solid #8f8f8f;
  border-radius: 2%;
  height: 296px;
}

.brend_random_product>.block_random>img{
  width: 240px;
  height: 270px;
  margin: 18px;
  margin-right: 0px;
  margin-left: 3px;
}

.brend_random_product>.block_random>.information_product{
  width: 100%;
}

.brend_random_product>.block_random>.information_product>.random_button_block>button{
  width: 69px;
  height:30px;
  margin: 10px;
  margin-top: 18px;
}



</style>