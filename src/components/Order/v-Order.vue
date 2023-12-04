<template>
  <div class="prime-container">
    <h1 class="header">Заказы</h1>
    <div class="last-container" v-if="!!getOrder">
      <div class="order" v-for="(items, i) in getOrder" :key="i">
        <Carousel class="carousel" :autoplay="4000" :wrap-around="false">
          <slide class="carousel_page" v-for="(item, i) in items.products" :key="i">
            <div class="carousel__item">
              <h1>{{item.name}}</h1>
              <img :src="require('@/components/assets/images/'+ item.brend + '/' + item.image)" alt="images">
              <p>{{item.price}}</p>
            </div>
          </slide>
          <template #addons>
            <Navigation/>
            <Pagination class="pagination"/>
          </template>
        </Carousel>
        <div class="delivery">
          <h1>Время заказа товара: {{items.data_time}}</h1>
          <h1>Время доставки товара: {{items.time_zone}}</h1>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Нет активных заказов</h1>
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

  .prime-container{
    margin: 15px;
    width: 900px;
    height: 95%;
    border: 1px solid black;
    border-radius: 7px;
  }
  .header{
    margin: 15px;
    text-align: center;
    border-bottom: 1px solid black;
  }
  .order{
    margin: 15px;
    display: flex;
    border: 2px solid black;
    border-radius: 7px;
  }
  .carousel{
   width: 270px;
  }
  .pagination{
    padding: 0px;
    margin: 0px;
  }
  .delivery{
    margin: 20px;
    margin-top: 100px;
    margin-bottom: 100px;
    display: flex;
    border: 1px solid dimgray;
    border-radius: 8px;
  }
  .delivery>h1{
    margin-top: 35px;
    height: 25px;
    text-align: center;
    font-size: 18px;
  }
  img{
    width: 200px;
    height: 150px;
  }
</style>