<template>
  <div class="user-panel">
    <v-main-panel-user/>
  </div>
  <div class="container">
    <div class="container-products">
      <div class="info-busket">
        <h1 id="info-price" >Стоимость всех товаров в корзине: {{calculateThePrice}}</h1>
      </div>
      <div class="mordor" v-if="getBusketProducts">
        <div class="item" v-for="(item, i) in getBusketProducts" :key="i">
            <div class="product-image">
              <img :src="require(`../assets/images/${item.product_brend}/${item.image_product}`)" alt="images">
            </div>
            <div class="product-info">
              <h1 id="product">Цена: {{item.product_price}}</h1>
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
        <UserData :userDatas="userData"
                  :defaultSetting="activiti"
                  @sendDataUser="addOrderUser"/>
      </div>
    </div>
  </div>
</template>

<script>

  import {mapActions, mapGetters} from "vuex";
  import vMainPanelUser from "@/components/User/v-main-panel-user.vue"
  import UserData from "@/components/User/v-UserData.vue"
  export default {
    name: 'v-OrderPage',
    components:{
      vMainPanelUser,
      UserData
    },
    data(){
      return {
        activiti: true,
        fullPrice: 0,
      }
    },
    computed:{
      ...mapGetters({
        getBusketProducts: 'busketProducts/BUSKETPRODUCTS',
        userData:'user/USERINSYSTEM'
      }),
      calculateThePrice(){
        if (this.getBusketProducts){
          const listPrice = []
          for (const key in this.getBusketProducts){
            listPrice.push(this.getBusketProducts[key].product_price * this.getBusketProducts[key].quantity)
          }
          return this.fullPrice = listPrice?.reduce((sum, current) => sum + current, 0)}
        else {
          return  this.fullPrice = 0
        }
      },
    },
    mounted() {
      this.loadData()
    },
    methods:{
      ...mapActions({
        getDataBusket: 'busketProducts/loadProductsData',
        getUserData: 'user/getUser',
        setOrder: 'order/setOrder'
      }),
      async loadData(){
        Promise.all([
            await this.getUserData(),
            await this.getDataBusket()]
        )
      },
      dataTime(){
        let data = new Date()
        let dataDel = new Date()
        dataDel.setDate(5); dataDel.setMonth(data.getMonth()+1); dataDel.setHours(data.getHours()+3)
        const obj = {
          day_time: String(`${data.getDate()}.${data.getMonth()}.${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`),
          day_time_delivery: String(`${dataDel.getDate()}.${dataDel.getMonth()}.${dataDel.getFullYear()} ${dataDel.getHours()}:${dataDel.getMinutes()}`),
        }
        return obj
      },
      async sortingFunc(){
        try {
          await this.getDataBusket()
          if (!!this.getBusketProducts){
            let list = []
            this.getBusketProducts?.forEach(item => {
              list.push({
                image: item.image_product,
                brend: item.product_brend,
                name: item.name_product,
                price: item.product_price,
                quantity: item.quantity
              })
            })
            return list
          }
        }catch (e){
          console.log(e)
        }
      },
      async addOrderUser(data){
        try {
          if (data && !!this.getBusketProducts){
            let dataProducts = await this.sortingFunc()
            let dataTime = this.dataTime()
            const object = {
              user_id: data.id,
              products: dataProducts,
              data_time: dataTime.day_time,
              time_zone: dataTime.day_time_delivery
            }
            await this.setOrder(object)
          }
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
    margin-top: 20px;
    margin-bottom: 20px;
    position: sticky;
    top: 40px;
  }
</style>