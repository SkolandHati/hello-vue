<template>
  <div class="wrapper-container">
    <div class="user-panel">
      <vMainPanelUser/>
    </div>
    <div class="itemproduct" v-if="ONEPRODUCT">
      <div class="info-product">
        <div class="image-container">
            <img :src="require('../assets/images/Kenzo/'+ $route.params.id + '.jpeg')" alt="images">
            <h1 class="nameProducts">{{ONEPRODUCT.name}}</h1>
            <h2 class="price">{{ONEPRODUCT.price}}</h2>
        </div>
      </div>
      <div class="block-button">
        <button id="buy">Купить</button>
        <button id="favorite">В избранное</button>
        <button id="in-busket" @click="addToCartInBusket">В корзину</button>
      </div>
    </div>
    <div>
      <span>wqfewqfwewegwegewgwegweg</span>
    </div>
  </div>
</template>

<script>
    import vMainPanelUser from "@/components/User/v-main-panel-user.vue"
    import {mapActions, mapGetters} from "vuex";

    export default {
      name: "v-cart-item-page",
      components:{
          vMainPanelUser
      },
      methods:{
        ...mapActions([
           'loadsProduct',
           'appendBusket',
        ]),
        async getData(){
          try {
            await this.loadsProduct(this.$route.params.id)
          }
          catch (e){
              console.log(e)}
        },
        async addToCartInBusket() {
          try {
            const prod = await this.ONEPRODUCT;
            if (prod) {
              prod['quantity'] = 1
              localStorage.setItem(prod.name, JSON.stringify(prod))
              console.log(localStorage)
            }
          }catch (e){
            Promise.reject(e)
          }
        },
      },
      computed:{
        ...mapGetters([
            'ONEPRODUCT',
            'BUSKETPRODUCTS',
        ])
      },
      mounted() {
        this.getData()
        console.log(localStorage)
      }
    }
</script>
<style>
  .wrapper-container>.user-panel{
      display: flex;
      background-color: rgb(57, 73, 82);
      width: 100%;
      height: 50px;
  }
  .wrapper-container>.itemproduct{
    justify-content: center;
    display: flex;
  }
  .wrapper-container>.itemproduct>.info-product{
    width: 35%;
    display: block;
    margin: 50px;
  }
  .wrapper-container>.itemproduct>.info-product>.image-container{
    text-align: center;
  }
  .wrapper-container>.itemproduct>.info-product>.image-container>img{
    width: 350px;
    height: 350px;
  }
  .wrapper-container>.itemproduct>.block-button>button{
    margin: 50px;
    display: block;
    padding-left: 100px;
  }
  .wrapper-container>.itemproduct>.block-button>#buy{
    background: #b2b1b1;
    color:#088;
    text-decoration:none;
    display:block;
    width:90px;
    text-align:center;
    margin:20px auto;
    padding:12px 100px;
    padding-left:70px;
    transition:all 0.3s;
  }
  .wrapper-container>.itemproduct>.block-button>#buy:hover{
      cursor: pointer;
      box-shadow:0px -5px 0 #088 inset;
  }
  .wrapper-container>.itemproduct>.block-button>#favorite{
    background: #b2b1b1;
    color:#088;
    text-decoration:none;
    display:block;
    width:90px;
    text-align:center;
    margin:20px auto;
    padding:12px 100px;
    padding-left:70px;
    transition:all 0.3s;
  }
  .wrapper-container>.itemproduct>.block-button>#favorite:hover{
    cursor: pointer;
    box-shadow:0px -5px 0 #088 inset;
  }
  .wrapper-container>.itemproduct>.block-button>#in-busket{
    background: #b2b1b1;
    color:#088;
    text-decoration:none;
    display:block;
    width:90px;
    text-align:center;
    margin:20px auto;
    padding:12px 100px;
    padding-left:70px;
    transition:all 0.3s;
  }
  .wrapper-container>.itemproduct>.block-button>#in-busket:hover{
    cursor: pointer;
    box-shadow:0px -5px 0 #088 inset;
  }
</style>