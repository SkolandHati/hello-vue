<template>
  <div class="prime-container">
    <h1 class="header">Таблица заказов</h1>
    <div class="order" v-if="!!getOrder">
      <Carousel class="carousel" :autoplay="4000" :wrap-around="false">
        <slide class="carousel_page" v-if="getOrder" v-for="(item, i) in getOrder.products" :key="i">
          <div class="carousel__item" @click="$router.push({name: 'v-cart-item-page', params: {id: item.id}})">
            <h1>{{item.name}}</h1>
            <img :src="require('@/components/assets/images/'+ item.brend + '/' + item.image)" alt="images">
            <p>{{item.price}}</p>
          </div>
        </slide>
        <template #addons>
          <Navigation/>
          <Pagination/>
        </template>
      </Carousel>
    </div>
    <div v-else>
      <h1>Нет активных заказов</h1>
    </div>
  </div>

</template>

<script>
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
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
    display: flex;
  }
</style>