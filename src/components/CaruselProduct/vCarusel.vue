<template>
  <carousel class="carousel"
            :autoplay="10000"
            :wrap-around="false"
            v-if="getCaruselProd">
    <slide class="carousel_page"
           v-for="item in getCaruselProd"
           :key="item.id_product">
      <div class="carousel__item" @click="goProductsPage(item.id_product)">
        <h1>{{item.name_product}}</h1>
        <img :src="require(`@/components/assets/images/${item.product_brend}/${item.image_product}`)" alt="images">
        <p>$ {{item.price_product}}</p>
      </div>
    </slide>
    <template #addons>
      <Navigation class="navigate"/>
      <Pagination />
    </template>
  </carousel>
</template>

<script lang="ts">
  import {mapActions, mapGetters} from "vuex";
  import {defineComponent} from "vue"
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  import 'vue3-carousel/dist/carousel.css'
  export default defineComponent({
    name: 'vCarusel',
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
    },
    computed:{
      ...mapGetters({
        getCaruselProd: 'products/CAROSELPRODUCTS',
      })
    },
    mounted() {
      this.getCaruselProducts()
    },
    methods:{
      ...mapActions({
        loadProductsCarusel: 'products/loadCaruselProd',
      }),
      async getCaruselProducts(){
        try {
          await this.loadProductsCarusel()
        } catch (e) {
          console.error(e)
        }
      },
      goProductsPage(id: number){
        if (id) this.$router.push({name: 'v-cart-item-page', params: {id_product: id}})
      }
    },
  })
</script>
<style scoped>
.carousel {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  touch-action: pan-y;
  overscroll-behavior: none;
  width: 430px;
  height: 600px;
  margin-top: 24px;
}
.carousel__item {
  height: 500px;
  width: 82%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 12px;
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
  height: 60px;
  font-size: 18px;
  text-align: center;
  padding-left: 0;
}
.carousel__item>p{
  text-align: center;
}
.carousel__item>img{
  width: 300px;
  height: 330px;
  border-radius: 7px;
}
html body div#app div#app div#app div.contaner-homepage section.carousel ol.carousel__pagination{
  padding-left: 0;
}
</style>