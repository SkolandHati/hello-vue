<template>
  <div class="user-panel">
    <v-main-panel-user/>
  </div>
  <div class="container">
    <div class="container-products">
      <div class="info-busket">
        <h1 id="info-price" >Стоимость всех товаров в корзине: 53252352</h1>
      </div>
      <div class="mordor">
        <div class="item" v-for="item in getBusketProducts">
            <div class="product-image">
              <img :src="require(`../assets/images/${item.product_brend}/${item.image_product}`)" alt="images">
            </div>
            <div class="product-info">
              <h1 id="product">Цена: {{2300}}</h1>
              <h1 id="product">Наименование: {{item.name_product}}</h1>
              <h1 id="product">Количество товаров: {{item.quantity}}</h1>
            </div>
        </div>
     </div>
    </div>
    <div class="block-us-data">
      <div class="head">
        <h1>Для оформления заказа все поля должны быть заполнены</h1>
      </div>
      <div class="container-order-data">
        <user-date :defaultSetting="activiti"/>
        <div class="buttons">
          <button class="order"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapActions, mapGetters} from "vuex";
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
        activiti: true,
        fullPrice: 0,
      }
    },
    computed:{
      ...mapGetters({
        getBusketProducts: 'busketProducts/BUSKETPRODUCTS'
      })

    },
    mounted() {
      console.log(this.getBusketProducts)
    },
    methods:{
      ...mapActions({
        getDataBusket: 'busketProducts/loadProductsData'
      }),
      async loadData(){
        try {
          await this.getDataBusket()
        }catch (e){
          console.log(e)
        }
      }
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
    margin-top: 10px;
  }
  #info-price{
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .mordor{
    border: 2px solid #313030;
    border-radius: 8px;
  }
  .item{
    margin: 10px;
    display: flex;
    width: 95%;
    height: 95%;
    border: 2px solid dimgray;
    border-radius: 8px;
  }
  img{
    width: 250px;
    height: 250px;
    margin: 15px;
    margin-right: 0px;
  }
  .product-info{
    margin-top: 40px;
  }
  #product{
    text-align: center;
    font-size: 18px;
    margin-top: 30px;
  }
  .container-order-data {
    margin-top: 15px;
    position: sticky;
    top: 80px;
  }
  .head{
    width: 600px;
    text-align: center;
    font-size: 10px;
    margin-left: 60px;
    position: sticky;
    top: 40px;
  }
</style>