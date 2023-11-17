<template>
  <div class="user-panel">
    <v-main-panel-user/>
  </div>
  <div class="container">
    <div class="container-products">
      <div class="info-busket">
        <h1 id="info-price" >Стоимость всех товаров в корзине: 53252352</h1>
      </div>
      <div class="item">
        <div class="product-image">
          <img :src="require('../assets/images/Kenzo/'+ '1.jpeg')" alt="images">
        </div>
        <div class="product-info">
          <h1 id="product">Цена: {{2300}}</h1>
          <h1 id="product">Наименование: Thsirt</h1>
          <h1 id="product">Количество товаров в корзине: {{2}}</h1>
        </div>
      </div>
    </div>
    <div class="container-order-data">
      <user-date :defaultSetting="activiti"/>
    </div>
  </div>
</template>

<script>

  import vMainPanelUser from "@/components/User/v-main-panel-user.vue"
  import UserDate from "@/components/User/v-UserData.vue"
  export default {
    name: 'v-OrderPage',
    components:{
      vMainPanelUser,
      UserDate
    },
    data(){
      return {
        activiti: true
      }
    },
    methods:{

    },
    computed:{

    },
    mounted() {

    }
  }

</script>

<style scoped>

  .user-panel{
    display: flex;
    background-color: rgb(57, 73, 82);
    width: 100%;
    height: 50px;
  }

  .container{
    display: flex;
  }

  .container-products{
    display: block;
    width: 500px;
    height: 100%;
    margin: 50px;
    margin-top: 25px;
  }
  .container-products>.info-busket>#info-price{
    text-align: center;
    font-size: 20px;
    margin-bottom: 35px;
  }
  .container-products>.item{
    display: flex;
    border: 2px solid dimgray;
    border-radius: 8px;
  }
  .container-products>.item>.product-image>img{
    width: 250px;
    height: 250px;
    margin: 15px;
    margin-right: 0px;
  }
  .container-products>.item>.product-info{
    margin-top: 40px;
  }
  .container-products>.item>.product-info>#product{
    text-align: center;
    font-size: 18px;
    margin-top: 30px;
  }
  .container>.container-order-data {
    margin-top: 50px;
  }
</style>