<template>
  <vMainPanelUser/>
  <div class="container" style="display: flex;">
    <div class="item" v-if="oneproduct">
      <q-card class="my-card" flat bordered>
        <q-img style="width: 300px; height: 300px" :src="require(`@/components/assets/images/${oneproduct.brend}/${oneproduct.image}`)"
               alt="images"></q-img>
        <q-card-section>
          <div class="text-overline text-orange-9" v-if="brend">Бренд {{this.brend}}
            <q-btn color="grey" round flat dense
                   :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                   @click="expanded = !expanded"
            ></q-btn>
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{oneproduct.name}}</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="q-pa-md column q-gutter-sm">
      <q-btn unelevated rounded color="green" label="Купить"></q-btn>
      <q-btn unelevated rounded color="primary" label="В избранное"></q-btn>
      <q-btn unelevated rounded color="red" label="В корзину"></q-btn>
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
          addProductInfavorite: 'favoriteProducts/setFavoriteProduct'
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
              await this.loadsProduct(this.$route.params.id)
            }
          }
          catch (e){
              console.log(e)}
        },
        async addToCartInBusket(product) {
          try {
            if (!this.auth){
              return this.$router.push({name :'v-SignIn'})
            }
            const prod = await this.oneproduct;
            if (prod) {
              await this.addBusket(product)
            }
          }catch (e){
            console.log(e)
          }
        },
        async addToFavoriteProduct(product){
          try {
            if (!this.auth){
              return this.$router.push({name :'v-SignIn'})
            }
            const prod = await this.oneproduct;
            if (prod){
                await this.addProductInfavorite(product)
            }
          }catch (e){
            console.log(e)
          }
        }
      },
    }
</script>

<style scoped>
  .q-pa-md{
    margin: 20px;
    padding-top: 80px;
    float: right;
    width: 200px;
    height: 500px;
    border: 1px solid #568fe3;
    border-radius: 7px;
  }
  .q-btn{
    margin-top: 50px;
  }
</style>