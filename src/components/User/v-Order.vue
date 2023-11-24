<template>
  <div class="prime-container">
    <h1 class="header">Таблица заказов</h1>
    <div class="order">
      <Carousel class="carousel" :autoplay="4000" :wrap-around="false">
        <slide class="carousel_page" v-if="getCaruselProd" v-for="(item, i) in getCaruselProd" :key="item.id">
          <div class="carousel__item" @click="$router.push({name: 'v-cart-item-page', params: {id: item.id}})">
            <h1>{{item.name}}</h1>
            <img :src="require('@/components/assets/images/'+ item.brend + '/' + item.image)" alt="images">
            <p>{{item.price}}</p>
          </div>
        </slide>
      </Carousel>
    </div>
  </div>

</template>

<script>
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  export default {
    name: 'v-Order',
    components:{
      Carousel,
      Slide
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