<template>
  <div class="wrapper-container">
    <div class="user-panel">
      <vMainPanelUser/>
    </div>
      <div class="prime-container" v-if="oneproduct">
        <div class="first-container">
          <div class="comments-block">
            <h1>Оставить комментарий о товаре : {{oneproduct.name}}</h1>
            <v-blog :productData="oneproduct"/>
          </div>
        </div>
        <div class="itemproduct">
          <div class="info-product">
            <div class="image-container">
                <img :src="require('../assets/images/' + oneproduct.brend + '/'+ $route.params.id + '.jpeg')" alt="images">
                <h1 class="nameProducts">'{{oneproduct.name}}' B: {{oneproduct.brend}}</h1>
                <h2 class="price"> $ {{oneproduct.price}}</h2>
            </div>
          </div>
          <div class="block-button">
            <button id="buy" class="button">Купить</button>
            <button id="favorite" class="button" @click="addToFavoriteProduct(oneproduct.image,
            oneproduct.name,
            oneproduct.price,
            oneproduct.brend,
            oneproduct.id)">В избранное</button>
            <button id="in-busket" class="button" @click="addToCartInBusket(oneproduct.image,
            oneproduct.name,
            oneproduct.id,
            oneproduct.price,
            oneproduct.brend)">В корзину</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
    import vMainPanelUser from "@/components/User/v-main-panel-user.vue"
    import vBlog from "@/components/BlogWithComments/v-Blog.vue"
    import {mapActions, mapGetters} from "vuex";
    import router from "@/router";
    export default {
      name: "v-cart-item-page",
      components:{
          vMainPanelUser,
          vBlog
      },
      methods:{
        ...mapActions({
          loadsProduct: 'products/loadsProduct',
          loadInfoBrend: 'products/loadBrendsInfo',
          addBusket: 'busketProducts/appendBusket',
          getUser: 'user/getUser',
          addProductInfavorite: 'favoriteProducts/setFavoriteProduct'
        }),
        async loadBrendInfo(){
          try {
            await this.loadInfoBrend()
          }catch (e){
            Promise.reject(e)
          }
        },
        async loadUserData(){
          try {
            await this.getUser()
          }catch (e){
            Promise.reject(e)
          }
        },
        async getData(){
          try {
            await this.loadsProduct(this.$route.params.id)
          }
          catch (e){
              console.log(e)}
        },
        async addToCartInBusket(image, name, id, price, brend) {
          try {
            if (!this.auth){
              return router.push({name :'v-SignIn'})
            }
            const prod = await this.oneproduct;
            if (prod) {
              const obj = {
                'image': image,
                'name': name,
                'id': id,
                'price':price,
                'quantity': 1,
                'brend': brend
              }
              await this.addBusket(obj)
            }
          }catch (e){
            Promise.reject(e)
          }
        },
        async addToFavoriteProduct(image, nameProd, price, brend, id){
          try {
            if (!this.auth){
              return router.push({name :'v-SignIn'})
            }
            const prod = await this.oneproduct;
            const obj = {
              "image": String(image),
              "name": String(nameProd),
              "price": Number(price),
              "brend": String(brend),
              "id": Number(id)
            }
            if (prod){
                await this.addProductInfavorite(obj)
            }
          }catch (e){
            Promise.reject(e)
          }
        }
      },
      computed:{
        ...mapGetters({
          oneproduct: 'products/ONEPRODUCT',
          busketProducts: 'busketProducts/BUSKETPRODUCTS',
          getInfobrends: 'products/BRENDSINFO',
          auth: 'user/AUTH',
        })
      },
      mounted() {
        this.getData()
        this.loadUserData()
        this.loadBrendInfo()
      }
    }
</script>

<style scoped>
  .wrapper-container>.user-panel{
      display: flex;
      background-color: rgb(57, 73, 82);
      width: 100%;
      height: 50px;
  }
  .wrapper-container>.prime-container{
    display: flex;
  }
  .wrapper-container>.prime-container>.first-container>.brend-container>.head{
    text-align: center;
    margin: 10px;
  }
  .wrapper-container>.prime-container>.first-container>.brend-container>h2{
    text-align: center;
    font-size: 15px;
    font-family: Padauk, sans-serif;
  }
  .wrapper-container>.prime-container>.first-container>.brend-container>p{
    margin-left: 5px;
    text-align: center;
  }
  .wrapper-container>.prime-container>.first-container>.comments-block{
    width: 100%;
    height: 90%;
  }
  .wrapper-container>.prime-container>.first-container>.comments-block>h1{
    padding-left: 25px;
    text-align: center;
    font-size: 17px;
  }
  .wrapper-container>.prime-container>.itemproduct{
    justify-content: right;
    display: flex;
  }
  .wrapper-container>.prime-container>.itemproduct>.info-product{
    width: 70%;
    display: block;
    margin: 50px;
    margin-top: 25px;
  }
  .wrapper-container>.prime-container>.itemproduct>.info-product>.image-container{
    text-align: center;
    border: 1px solid black;
    border-radius: 6px;
    padding-top: 10px;
  }
  .wrapper-container>.prime-container>.itemproduct>.info-product>.image-container>img{
    width: 350px;
    height: 350px;
  }
  .wrapper-container>.prime-container>.itemproduct>.block-button{
    margin: 25px;
    margin-top: 25px;
    margin-bottom: 50px;
    border: 2px solid dimgrey;
    border-radius: 6px;
  }
  .wrapper-container>.prime-container>.itemproduct>.block-button>.button{
    display: block;
    background: #c2c2c2;
    color:#088;
    text-decoration:none;
    width: 200px;
    height: 45px;
    margin-top: 20px;
    margin-bottom: 25px;
    text-align:center;
    transition:all 0.3s;
  }
  .wrapper-container>.prime-container>.itemproduct>.block-button>.button:hover{
      cursor: pointer;
      box-shadow:0px -5px 0 #088 inset;
  }

</style>