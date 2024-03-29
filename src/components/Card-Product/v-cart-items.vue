<template>
  <div class="items" v-if="products">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <div @click="goCartItem">
          <q-img :src="require(`@/components/assets/images/${products.product_brend}/${products.image_product}`)"
                 alt="images"></q-img>
        </div>
        <q-card-section>
          <div class="text-overline text-orange-9" v-if="brend">Бренд {{this.brend}}
            <q-btn color="grey" round flat dense
                :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                @click="expanded = !expanded"
            ></q-btn>
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            {{products.name_product}},
            $ {{products.price_product}}
            <h3 class="text-h5 q-mt-sm q-mb-xs"
                style="font-size: 24px"
                v-if="active"
            >Количество: {{products.quantity}}</h3>
          </div>
        </q-card-section>
        <q-card-actions class="card-actions">
          <q-btn class="delite-product"
                 flat color="red"
                 label="Удалить продукт"
                 @click="addButtons(products, 'delite_product')"></q-btn>
          <q-btn class="button-delite"
                 flat color="red"
                 label="Удалить из избранного"
                 @click="addButtons(products, 'favorite_delite')"></q-btn>
          <q-btn class="button-favorite"
                 flat color="primary"
                 label="В избранное"
                 @click="addButtons(products, 'in_favorite')"></q-btn>
          <q-btn class="button-busket"
                 flat color="secondary"
                 label="В корзину"
                 @click="addButtons(products, 'in_busket')"></q-btn>
          <q-space></q-space>
        </q-card-actions>
        <q-slide-transition>
          <div v-show="expanded" v-if="brendInfo">
            <q-separator></q-separator>
            <q-card-section class="text-subtitle2">
              {{brendInfo}}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
  import {mapActions, mapGetters} from "vuex";
  import {defineComponent} from "vue";
  import Product from "@/interfaces/Product";
  import Brend from "@/interfaces/Brend";
  import Enum from "@/enum/const";
  import type {PropType} from "vue";
  export default defineComponent({
    name: "v-cart-item",
    props:{
      products: {
        type: Object as PropType<Product>,
        require: true
      },
      active:{
        type: Boolean,
        default: false
      },
    },
    data(){
      return {
        expanded: false,
        brend: null,
        brendInfo: null,
        imageSrc: "@/components/assets/images/"
      }
    },
    computed:{
      ...mapGetters({
        getUser: 'user/AUTH',
        brends: 'products/BRENDSINFO'
      })
    },
    watch:{
      brends(){
        this.getBrendsInfo(this.products?.product_brend as string)
      }
    },
    mounted() {
      this.loadData()
      this.getBrendsInfo(this.products?.product_brend as string)
    },
    methods: {
      ...mapActions({
        loadUser: 'user/getUsers',
        addInBusket: 'busketProducts/appendBusket',
        deliteProduct: 'busketProducts/deliteProduct',
        addInFavorite: 'favoriteProducts/setFavoriteProduct',
        delitFavoriteProduct: 'favoriteProducts/delitFavoriteProduct',
        loadBrendsInfo: 'products/loadBrendsInfo'
      }),
     loadData(){
        Promise.all([
            this.loadUser(),
            this.loadBrendsInfo()
        ])
      },
      async addButtons(product: Product, x: string){
        try {
          if (!this.getUser){
            return this.$router.push({name :'v-SignIn'})
          }
          if (product) {
            switch (x) {
              case Enum.InBasket:
                product.quantity = 1
                await this.addInBusket(product)
                break;
              case Enum.InFavorite:
                product.quantity = 1
                await this.addInFavorite(product)
                break;
              case Enum.FavoriteDelited:
                await this.delitFavoriteProduct(product.id_product)
                break;
              case Enum.DelitedProduct:
                await this.deliteProduct(product.id_product)
                break;
              default:
                break
            }
          }
        } catch (e){
          console.error(e)
        }
      },
      async getBrendsInfo(brend_Name: string){
        try {
          let data = await this.brends
          if (data){
            let brnd = data.find((item: Brend) => item.brend_Name === brend_Name)
            this.brend = brnd.brend_Name
            this.brendInfo = brnd.info_Brend
          }
        } catch (e){
          console.error(e)
        }
      },
      goCartItem(){
        if (this.products){
          this.$router.push({name: 'v-cart-item-page', params: {id_product: this.products.id_product}})
        }
      }
    }
  })
</script>
<style scoped>
  .items{
    margin: 20px;
  }
  .my-card{
    width: 100%;
    justify-content: center;
    max-width: 350px;
  }
  .my-card:hover{
    cursor: pointer;
    border: 2px #3b3a3a;
  }
  :deep(.q-card__actions){
    display: ruby-base-container;
  }
  :deep(.button-delite){
    display: none;
  }
  :deep(.delite-product){
    display: none;
  }
</style>
