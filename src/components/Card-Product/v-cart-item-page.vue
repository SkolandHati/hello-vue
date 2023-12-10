<template>
  <vMainPanelUser/>
  <div class="container-product" style="display: flex;">
    <div class="blog">
      <q-banner class="bg-primary text-white">Оставьте комментарий о товаре!</q-banner>
      <vBlog :product-data="oneproduct"></vBlog>
    </div>
    <div class="item" v-if="oneproduct">
      <q-card class="my-card" flat bordered>
        <q-img style="width: 350px; height: 450px"
               :src="require(`@/components/assets/images/${oneproduct.product_brend}/${oneproduct.image_product}`)"
               alt="images"></q-img>
        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{oneproduct.name_product}}</div>
          <h2 class="text-h5 q-mt-sm q-mb-xs"> $ {{oneproduct.price_product}}</h2>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md column q-gutter-sm">
      <q-btn unelevated rounded color="green"
             label="Купить"
             @click="addButtons(oneproduct, 'order')"></q-btn>
      <q-btn unelevated rounded color="secondary"
             label="В избранное"
             @click="addButtons(oneproduct, 'in_favorite')"></q-btn>
      <q-btn unelevated rounded color="red"
             label="В корзину"
             @click="addButtons(oneproduct, 'in_busket')"></q-btn>
    </div>
  </div>
</template>

<script>
    import vMainPanelUser from "@/components/User/v-MainPanelUser.vue"
    import vBlog from "@/components/BlogWithComments/v-Blog.vue"
    import {mapActions, mapGetters} from "vuex";
    export default {
      name: "v-cart-item-page",
      components:{
          vMainPanelUser,
          vBlog
      },
      computed:{
        ...mapGetters({
          oneproduct: 'products/ONEPRODUCT',
          busketProducts: 'busketProducts/BUSKETPRODUCTS',
          getInfobrends: 'products/BRENDSINFO',
          auth: 'user/AUTH',
        }),
      },
      mounted() {
        this.loadData()
        this.getData()
      },
      methods:{
        ...mapActions({
          loadsProduct: 'products/loadsProduct',
          loadInfoBrend: 'products/loadBrendsInfo',
          addBusket: 'busketProducts/appendBusket',
          getUser: 'user/getUser',
          addFavorite: 'favoriteProducts/setFavoriteProduct'
        }),
        loadData(){
          try {
            Promise.all([
              this.getUser(),
              this.loadInfoBrend()
            ])
          }catch (e){
            console.log(e)
          }
        },
        async getData(){
          try {
            if (this.$route.params.id){
              await this.loadsProduct(this.$route.params.id_product)
            }
          }
          catch (e){
           console.log(e)}
        },
        async addButtons(object, x){
          try {
            if (!this.auth){
              return this.$router.push({name :'v-SignIn'})
            }
            const landmark = ['in_busket', 'in_favorite', 'order']
            if (object) {
              switch (x) {
                case landmark[0]:
                  object.quantity = 1
                  await this.addBusket(object)
                  break;
                case landmark[1]:
                  object.quantity = 1
                  await this.addFavorite(object)
                  break;
                case landmark[2]:
                  object.quantity = 1
                  await this.addBusket(object)
                  this.$router.push({name: 'v-OrderPage'})
                  break;
                default:
                  break
              }
            }
          }catch (e){
            console.log(e)
          }
        },
      },
    }
</script>

<style scoped>
  .container-product{
    float: right;
  }
  .q-pa-md{
    margin: 40px;
    padding-top: 80px;
    float: right;
    width: 200px;
    height: 500px;
    border: 1px solid #568fe3;
    border-radius: 7px;
  }
  .item{
    margin: 15px;
  }
  .blog{
    width: 600px;
    height: 600px;
    margin-top: 15px;
    margin-right: 35px;
  }
  .bg-primary.text-white{
    border-radius: 7px 7px 0 0;
  }
  .q-btn{
    margin-top: 50px;
  }
</style>