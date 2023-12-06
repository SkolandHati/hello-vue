<template>
    <div class="items" v-if="products">
      <div class="container-item" @click="goCartItem">
        <div class="image">
          <img :src="require(`@/components/assets/images/${products.brend}/${products.image}`)" alt="images">
        </div>
        <div class="nameds">
          <p>{{products.name}}</p>
        </div>
      </div>
        <div class="pricesed">
            <h2>{{products.price}} $</h2>
            <button class="add-basket" @click="addToCartInBusket(products)">Добавить в корзину</button>
            <button class="favorits" @click="addToCartInFavorite(products)"></button>
        </div>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from "vuex";
  export default {
    name: "v-cart-item",
    props:{
      products: {
        type: Object,
        require:true
      }
    },
    computed:{
      ...mapGetters({
        getUser: 'user/AUTH'
      })
    },
    mounted() {
      this.loadData()
    },
    methods: {
      ...mapActions({
        loadUser: 'user/getUsers',
        addInBusket: 'busketProducts/appendBusket'
      }),
      async loadData(){
        try {
          await this.loadUser()
        }catch (e){
          console.log(e)
        }
      },
      async addToCartInBusket(object) {
        try {
          if (!this.getUser){
            return this.$router.push({name :'v-SignIn'})
          }
          if (object) {
            object.quantity = 1
            await this.addInBusket(object)
          }
        }catch (e){
          console.log(e)
        }
      },
      async addToCartInFavorite(object) {
        try {
          if (!this.getUser){
            return this.$router.push({name :'v-SignIn'})
          }
          if (object) {
            object.quantity = 1
            await this.addInBusket(object)
          }
        }catch (e){
          console.log(e)
        }
      },
      goCartItem(){
        if (this.products){
          this.$router.push({name: 'v-cart-item-page', params: {id: this.products.id}})
        }
      }
    }
  }

</script>

<style scoped>
    .items{
        display: block;
        margin-top: 10px;
        margin-left: 12px;
        margin-bottom: 40px;
        width: 280px;
        height: 300px;
        box-shadow: 0 0 4px 0;
        border-radius: 5px;
    }
    .nameds{
        display: flex;
        justify-content: center;
    }
    p{
        font-size: 27px;
        color: black;
    }
    .pricesed {
        margin-left: 10px;
        margin-right: 10px;

        display: flex;
        justify-content: center;
    }
    .add-basket{
        margin-top: 10px;
        width: 90px;
        height: 30px;
        font-size: 10px;
    }
    .favorits{
        margin-top: 5px;
        margin-left: 20px;
        width: 40px;
        height: 40px;
    }
    h2{
        margin: 0;
        padding-right: 10px;
        padding-top: 10px;
        font-size: 20px;
        color: black;
    }
    .image{
        padding-top: 15px;
        display: flex;
        justify-content: center;
    }
    img{
        width: 200px;
        height: 200px;
    }
    .container-item:hover{
      background-color: aliceblue;
      color: #7BA7AB;
      cursor: pointer;
      border-radius: 5px;
    }
</style>
