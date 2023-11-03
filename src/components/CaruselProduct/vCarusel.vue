<template>
  <carousel class="carousel" :autoplay="4000" :wrap-around="false">
    <slide class="carousel_page"  v-for="item in getProducts" :key="item.id">
      <div class="carousel__item" @click="$router.push({name: 'v-cart-item-page', params: {id: item.id}})">
        <h1>{{item.name}}</h1>
        <img :src="require('@/components/assets/images/'+ item.brend + '/' + item.image)" alt="images">
        <p>{{item.price}}</p>
      </div>
    </slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </carousel>
</template>

<script>

import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'vCarusel-v2',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  methods:{
    ...mapActions({
      loadProducts: 'products/loadCaruselProd'
    }),
    async loadData(){
      try {
        await this.loadProducts()
      }catch (e){
        Promise.reject(e)
      }
    }
  },
  computed:{
    ...mapGetters({
      getProducts: 'products/CAROSELPRODUCTS'
    })
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>

.carousel {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  touch-action: pan-y;
  overscroll-behavior: none;
  width: 430px;
  margin-top: 33px;
}
.carousel__item {
  height: 500px;
  width: 82%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: block;
  justify-content: center;
  align-items: center;
}
.carousel__item:hover{
  background-color: #3b3a3a;
  cursor: pointer;
}
.carousel__item>h1{
  text-align: center;
  padding-left: 0;
  margin-bottom: 25px;
}
.carousel__item>p{
  text-align: center;
}
.carousel__item>img{
  width: 300px;
  height: 330px;
}
html body div#app div#app div#app div.contaner-homepage section.carousel ol.carousel__pagination{
  padding-left: 0;
}
</style>