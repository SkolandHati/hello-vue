<template>
    <div class="panel-user">
      <link rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
                  integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
                  crossorigin="anonymous">
      <div class="userbuttons">
        <div class="button" id="button-busket">
          <button class="busket-btn" @click="$router.push({name:'v-BusketPage'})">
            <i class="fas fa-solid fa-cart-plus"></i>
            <span class="circle" v-if="count !== 0 && is_auth">{{count}}</span>
          </button>
        </div>
        <div class="button" id="button-heart">
          <button @click="$router.push({name:'vFavoritePage'})"> <i class="fas fa-solid fa-heart"></i></button>
        </div>
        <div class="button" id="button-user">
          <button class="fas fa-solid fa-user" :style="styleCheck"></button>
          <div class="btn-auth-regist" v-if="is_auth">
            <a @click=""> Настройки </a>
            <a @click="signOut"> Выйти </a>
          </div>
          <div class="btn-auth-regist" v-else>
            <a @click="$router.push({name: 'v-SignUp'})"> Регистрация </a>
            <a @click="$router.push({name: 'v-SignIn'})"> Войти </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import router from "@/router";
    import {mapGetters, mapActions} from "vuex";
    import {supabase} from "@/services/APIauthorization";
    export default {
        name: "v-btn-user-basket-love",
        data(){
          return {
            isActive: false,
            count: 0
          }
        },
        methods: {
          router() {
            return router
          },
          ...mapActions({
            getUser: 'user/getUser',
            outUser: 'user/outUser',
            loadDatafromDataBase: 'busketProducts/loadProductsData',
          }),
          async loadData() {
            try {
              await this.getUser()
            }
            catch (e) {
              Promise.reject(e)
            }
          },
          async calculateCountProducts(){
            try {
              await this.loadDatafromDataBase()
              let data = await this.busketproducts
              if (data){
                const listPrice = []
                for (const key in this.busketproducts){
                  listPrice.push(this.busketproducts[key].quantity)
                }
                return this.count = listPrice.reduce((sum, current) => sum + current, 0)}
              else {
                return  this.count  = 0
              }
            }catch (e){
              Promise.reject(e)
            }
          },
          async checkUser(){
            try {
              const data = supabase.auth.getSession()
              if ((await data).data.session){
                this.isActive = true
              }else {
                this.isActive = false
              }
            }catch (e){
              Promise.reject(e)
            }
          },
        },
        computed:{
          ...mapGetters({
            userinsystem: 'user/USERINSYSTEM',
            is_auth: 'user/AUTH',
            busketproducts: 'busketProducts/BUSKETPRODUCTS',
          }),
          styleCheck(){
            if (this.isActive){
              return {
                border: '2px solid #53D31DFF'
              }
            }else {
              return {
                border: '2px solid #7BA7AB'
              }
            }
          },
        },
        // watch:{
        //   busketproducts(){
        //     this.calculateCountProducts()
        //   }
        // },
        setup(){
          const signOut = async () => {
            try {
              const {error} = await supabase.auth.signOut().then()
              window.location.reload()
              if (error) throw error;
            }
            catch (error){
              alert(error.error_description || error.message)
            }
          }
          const isCurrentUser = async () => {
            try {
              const {error} = await supabase.auth.getSession()
            }catch (e){
              Promise.reject(e)
            }
          }
          return {
            signOut,
            isCurrentUser
          }
        },
        mounted() {
            this.checkUser()
            this.loadData()
            this.calculateCountProducts()
        }
    }
</script>

<style>
    .panel-user {
      width: 100%;
      display: block;
    }
    .panel-user>.userbuttons{
      display: flex;
      float: right;
      width: 200px;
      height: 50px;
    }
    .panel-user>.userbuttons>.button{
      display: block;
    }
    .panel-user>.userbuttons>#button-busket{
      display: flex;
      width: 60px;
    }
    .panel-user>.userbuttons>.button>.busket-btn{
      margin-right: 0px;
      display: flex;
      padding: 8px;
      padding-top: 10px;
    }
    .panel-user>.userbuttons>.button>.busket-btn>.circle{
      width: 20px;
      height: 20px;
      background-color: rgb(83, 211, 29);
      border-radius: 50%;
      margin-top: 10px;
      padding-left: 7px;
      padding-right: 6px;
      font-size: 14px;
      color: #1a6c80;
      text-align: center;
    }
    .panel-user>.userbuttons>.button>button{
      position: relative;
      width: 40px;
      height: 40px;
      margin-right: 20px;
      margin-top: 4px;
    //padding: 0px;
      color: #e5e5e5;
      background-color: rgb(57, 73, 82);
      border-radius: 50%;
      border: 2px solid #7BA7AB;
      cursor: pointer;
      font-size: 16px
    }
    .panel-user>.userbuttons>.button>.btn-auth-regist{
      width: 150px;
      height: 100px;
      color: #e5e5e5;
      background-color: rgb(57, 73, 82);
      top: 3.0em;
      display: none;
      z-index: 1;
      position: absolute;
    }
    .panel-user>.userbuttons>.button>.fas.fa-solid.fa-user:hover  ~.btn-auth-regist{
      width: 190px;
      display: block;
      height: 100px;
      right: 0px;
    }
    .panel-user>.userbuttons>.button>.btn-auth-regist:hover{
      display: block;
      width: 190px;
      height: 100px;
      right: 0px;
    }
    .panel-user>.userbuttons>.button>.btn-auth-regist>a{
      text-align: center;
      display: block;
      width: 160px;
      height: 40px;
      padding: 15px;
      padding-bottom: 0px;
      padding-top: 10px;
      border: none;
    }
    .panel-user>.userbuttons>.button>.btn-auth-regist>a:hover{
      color: #ffffff;
      background-color: dimgrey;
      cursor: pointer;
      right: 0px;
    }
    /// Циркуль
    .panel-user>.userbuttons>.button>.cont-circle{
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }
    .panel-user>.userbuttons>.button>.circle{
      width: 15px;
      height: 15px;
      display: inline-block;
      background-color: rgb(83, 211, 29);
      border-radius: 50%;
      margin-top: 27px;
      padding-left: 5px;
    }

</style>