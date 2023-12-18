<template>
  <div class="prime-container" v-if="getOrder">
    <q-banner class="banner">Ваши заказы</q-banner>
    <div class="order" v-for="(items, i) in getOrder" :key="i">
      <Carousel class="carousel" :autoplay="4000" :wrap-around="false">
        <slide class="carousel_page" v-for="(item, i) in items.products" :key="i">
          <div class="carousel__item">
            <q-banner class="banner">{{item.name}}</q-banner>
            <img :src="require(`@/components/assets/images/${item.brend}/${item.image}`)" alt="images">
            <p>{{item.price}}</p>
          </div>
        </slide>
        <template #addons>
          <Navigation/>
          <Pagination class="pagination"/>
        </template>
      </Carousel>
      <div class="delivery">
        <q-banner class="banner">Информация заказа</q-banner>
        <div class="info-delivery" style="display: flex">
          <q-card flat bordered style="width: 30%">
            <q-card-section>
              <div class="text-h6">Список товаров</div>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section v-for="(item, i) in items.products" :key="i">
              <h1 class="list-product">{{item.name}}</h1>
            </q-card-section>

          </q-card>
          <q-card flat bordered style="width: 70%">
            <q-card-section>
              <div class="text-h6">Дата и время доставки</div>
            </q-card-section>
            <q-separator inset></q-separator>
            <q-card-section>
              <div class="data-time">
                <h1 class="time">Время заказа товара: {{items.data_time}}</h1>
                <h1 class="time">Время доставки товара: {{items.time_zone}}</h1>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  import {mapGetters, mapActions} from "vuex";

  export default {
    name: 'v-Order',
    components:{
      Carousel,
      Slide,
      Pagination,
      Navigation
    },
    computed:{
      ...mapGetters({
        getOrder: 'order/ORDER'
      })
    },
    mounted() {
      this.loadData()
    },
    methods:{
      ...mapActions({
        getterOrderData: 'order/getOrder'
      }),
      async loadData(){
        try {
          await this.getterOrderData()
        }catch (e){
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>
  .banner{
    text-align: center;
    background-color: #3b899a;
    border-radius: 7px 7px 0px 0px;
    color: #f5f3f3;
  }
  .prime-container{
    border: 1px solid #4f4a4a;
    border-radius: 7px 7px 7px 7px;
  }
  .order{
    display: flex;
    margin: 15px;
    margin-top: 0px;
    border-radius: 7px 7px 7px 7px;
  }
  .delivery{
    margin: 27px;
    width: 100%;
  }
  .carousel{
    margin: 15px;
    width: 270px;
  }
  .carousel__item{
    height: 100%;
  }

  .list-product{
    position: relative;
    padding-bottom: 20px;
    height: 20px;
    font-size: 14px;
  }
  .time{
    position: relative;
    font-size: 14px;
    margin-top: 40px;
  }
  :deep(.q-card__section){
    padding: 10px;
    margin-left: 30px;
  }
  .pagination{
    padding: 0px;
    margin: 0px;
    margin-left: 25px;
    margin-right: 25px;
    background-color: #3b899a;
    border-radius: 0 0 7px 7px;
  }
  img{
    margin: 5px;
    margin-top: 25px;
    margin-bottom: 0;
    width: 200px;
    height: 150px;
  }
</style>