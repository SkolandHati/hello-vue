<template>
  <div class="user-panel">
    <v-main-panel-user/>
  </div>
  <div class="order" style="display: flex">
    <div class="container" style="width: 40%">
      <q-banner class="banner">Стоимость всех товаров в корзине: $ {{calculateThePrice}}</q-banner>
      <div class="container-products" v-if="getBusketProducts"
           v-for="(item, i) in getBusketProducts" :key="i">
        <vCartItems :products="item"></vCartItems>
      </div>
    </div>
    <div class="container-data"
         style="width: 60%;">
      <UserData :defaultSetting="active_order" @orderPush="addOrderUser"></UserData>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from "vue";
  import Order from "@/interfaces/Order"
  import {mapActions, mapGetters} from "vuex";
  import vMainPanelUser from "@/components/User/v-MainPanelUser.vue"
  import UserData from "@/components/User/v-UserData.vue"
  import vCartItems from "@/components/Card-Product/v-cart-items.vue"
  export default defineComponent({
    name: 'v-OrderPage',
    components:{
      vMainPanelUser,
      UserData,
      vCartItems
    },
    data(){
      return {
        active_order: true,
        fullPrice: 0,
      }
    },
    computed:<any>{
      ...mapGetters({
        getBusketProducts: 'busketProducts/BUSKETPRODUCTS',
        userData:'user/USERINSYSTEM'
      }),
      calculateThePrice(){
        if (this.getBusketProducts){
          const listPrice = []
          for (const key in this.getBusketProducts){
            listPrice.push(this.getBusketProducts[key].price_product * this.getBusketProducts[key].quantity)
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
      loadData(){
        Promise.all([
            this.getUserData(),
            this.getDataBusket()]
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
      async addOrderUser(data: string){
        try {
          let dataProducts = await this.getBusketProducts
          if (data && !!dataProducts){
            let dataTime = this.dataTime()
            const object = {
              user_id: data,
              products: dataProducts,
              data_time: dataTime.day_time,
              time_zone: dataTime.day_time_delivery
            } as Order
            await this.setOrder(object as Order)
          }
        }catch (e){
          console.log(e)
        }
      }
    }
  })

</script>

<style scoped>
  .container{
    display: block;
    height: 550px;
    margin-right: 25px;
    padding-top: 0px;
    position: relative;
    overflow-y: auto;
  }
  .container-products{
    margin: 20px;
    display: block;
  }
  .container-data{
    margin-right: 25px;
  }
  :deep(.q-card){
    margin-left: 50px;
  }
  :deep(.q-pa-md){
    padding-top: 0px;
    display: block;
  }
  :deep(.button-favorite){
    display: none;
  }
  :deep(.button-busket){
    display: none;
  }
  :deep(.delite-product){
    display: block;
    margin-left: 10px;
    margin-bottom: 15px;
  }
  :deep(.button-delite){
    display: none;
  }
  .banner{
    margin-top: 10px;
    margin-left: 25px;
    text-align: center;
    background-color: #3b899a;
    border-radius: 7px 7px 0px 0px;
    color: #f5f3f3;
  }
</style>