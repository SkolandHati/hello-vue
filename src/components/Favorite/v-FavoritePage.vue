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
          <button class="delite-product" @click="delitFavoriteProduct(item)">X</button>
          <h1 class="name">{{ item.name_products }}</h1>
          <h2 class="price">$ {{item.price_product}}</h2>
          <p class="brend">{{item.name_brend}}</p>
          <div class="block_buttons">
            <button class="order">Оформить доставку</button>
            <div class="block-button-inbusket">
              <button class="in_busket" @click="button_Submit_one($event);addInBusketProduct(item)">В корзину</button>
              <span class="confirm" :class="{is_Active: active_first}"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="brend_random_product" v-if="getRandom && brend">
      <h1 class="head">{{brend.brend_Name}}</h1>
      <p class="info_brend">{{brend.info_Brend}}</p>
      <h1 class="text">Возможно вам понравиться:</h1>
      <div class="block_random">
        <img :src="require('../assets/images/'+getRandom.brend +'/'+ getRandom.image)" alt="images">
        <div class="information_product">
          <h1 class="name">{{getRandom.name}}</h1>
          <h2 class="price">{{getRandom.price}}</h2>
          <p class="brend">{{getRandom.brend}}</p>
          <div class="random_button_block">
            <button class="in_buskets"  @click="button_Submit_two($event);addInBusketProduct(getRandom)">В корзину</button>
            <span class="confirm" :class="{is_Active: active}"></span>
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
    data(){
      return {
        brend: null,
        active_first: false,
        active: false,
      }
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
         Promise.reject(e)
       }
      },
      async loadBrendForProduct(){
        try {
          await this.getRandomProduct()
          await this.getterBrends()
          if (this.getBrends && this.getRandom){
             return this.brend = await this.getBrends.find(item => item.brend_Name === this.getRandom.brend)
          }
        }catch (e){
          Promise.reject(e)
        }
      },
      button_Submit_one(){
        this.active_first = true
      },
      button_Submit_two(){
        this.active = true
      },
      addInBusketProduct(data){
        if (data.image === undefined){
          const object_two = {
            'image': data.image_product,
            'name': data.name_products,
            'id': data.product_id,
            'price':data.price_product,
            'quantity': 1,
            'brend': data.name_brend
          }
          this.addInBusket(object_two)
        }else {
          const object = {
            'image': data.image,
            'name': data.name,
            'id': data.id,
            'price':data.price,
            'quantity': 1,
            'brend': data.brend
          }
          this.addInBusket(object)
        }
        setTimeout(() => {this.active = false;
                                  this.active_first = false}, 1500)
      }
    },
    computed:{
      ...mapGetters({
        getterFavoriteProd:'favoriteProducts/GET_FAVORITE_PROD',
        getRandom: 'products/GETRANDOMPRODUCT',
        getBrends: 'products/BRENDSINFO'
      })
    },
    created() {
      this.loadData()
    },
    mounted() {
        this.loadBrendForProduct()
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
.item_favorite_product>.info_product>.block_buttons>.block-button-inbusket{
  display: flex;
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

.item_favorite_product>.info_product>.block_buttons>.block-button-inbusket>.in_busket{
  display: block;
  width: 140px;
  height:40px;
  margin: 15px;
  margin-right: 0px;
  margin-left: 35px;
  margin-top: 20px;
  border-radius: 1%;
}

.item_favorite_product>.info_product>.block_buttons>.block-button-inbusket>.confirm{
  display: none;
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

.item_favorite_product>.info_product>.block_buttons>.block-button-inbusket>.in_busket{
  background-color: #6e6d6d;
  border: 0;
  border-radius: 4%;
}

.item_favorite_product>.info_product>.block_buttons>.block-button-inbusket>.in_busket:hover{
  background-color: #d7d7d7;
  cursor: pointer;
}

.item_favorite_product>.info_product>.delite-product{
  font-size:15px;
  width: 25px;
  height: 25px;
  margin-left: 230px;
  margin-top: 15px;
  border: 1px solid #ff0000;
  border-radius: 50%;
  padding-left: 4px;
  padding-top: 0px;
  text-align: center;
  background-color: #ff0e0e;
}

.item_favorite_product>.info_product>.delite-product:hover{
  cursor: pointer;
  background-color: #7e0000;
}

.item_favorite_product>.info_product>.name,.price,.brend{
  text-align: center;
  margin: 15px;
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 40px;
  border: 0 ;
}

.item_favorite_product>.info_product>.name{
  margin-top: 0px;
}

.brend_random_product{
  max-width: 568px;
  position: sticky;
  top: 5px;
  text-align: center;
  max-height: 515px;
  margin: 20px;
  margin-left: 0px;
  padding: 15px;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  border: 2px solid #c6ecaf;
  border-radius: 15px;
}

.brend_random_product>.info_brend{
  text-align: center;
  margin-top: 4px;
}
.brend_random_product>.head{
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 25px;
  text-align: center;
}
.brend_random_product>.text {
  font-size: 20px;
  text-align: center;
  margin-top: 0px;
  margin-bottom: 5px;
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
.brend_random_product>.block_random>.information_product>.random_button_block{
  display: flex;
}
.brend_random_product>.block_random>.information_product>.random_button_block>button{
  display: block;
  width: 120px;
  height:40px;
  margin: 15px;
  margin-left: 82px;
  margin-right: 2px;
  margin-top: 30px;
  border-radius: 1%;
  border: 2px solid #c6ecaf;
  background-color: #c6ecaf;
}

.brend_random_product>.block_random>.information_product>.random_button_block>button:hover{
  cursor: pointer;
  background-color: #9de879;
}

.brend_random_product>.block_random>.information_product>.random_button_block>.confirm{
  display: none;
}

.brend_random_product>.block_random>.information_product>.random_button_block>.confirm.is_Active{
  display: block;
  margin-top: 32px;
  width: 25px;
  height: 25px;
  border: 2px solid #258804;
  background-color: #258804;
  border-radius: 50%;
}

.item_favorite_product>.info_product>.block_buttons>.block-button-inbusket>.confirm.is_Active{
  display: block;
  width: 25px;
  height: 25px;
  margin-top: 25px;
  margin-left: 2px;
  border: 2px solid #258804;
  background-color: #258804;
  border-radius: 50%;
}

</style>