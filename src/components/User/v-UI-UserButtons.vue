<template>
    <div class="panel-user">
      <link rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
                  integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
                  crossorigin="anonymous">
      <div class="userbuttons">
        <div class="button" id="button-busket">
          <button class="busket-btn" @click="goBusketPage">
            <i class="fas fa-solid fa-cart-plus"></i>
            <span class="circle" v-if="count !== 0 && is_auth">{{count}}</span>
          </button>
        </div>
        <div class="button" id="button-heart">
          <button class="fas fa-solid fa-heart"
                  :class="{active: getFavoriteProducts.length !== 0}"
                  @click="goFavoritePage">
          </button>
        </div>
        <div class="button" id="button-user">
          <button class="fas fa-solid fa-user"
                  :style="styleCheck"
                  v-on:mouseover="active_buttns = true"
                  v-on:mouseout="outMouse"></button>
          <div class="btn-auth-regist"
               :class="{active_buttns}"
               v-on:mouseover="active_panel = true"
               v-on:mouseout="outMouse_two"
               v-if="is_auth">
            <a @click="goSettingPage"> Настройки </a>
            <a @click="signOut"> Выйти </a>
          </div>
          <div class="btn-auth-regist"
               :class="{active_buttns}"
               v-on:mouseover="active_panel = true"
               v-on:mouseout="outMouse_two"
               v-else>
            <a @click="goSignUpPage"> Регистрация </a>
            <a @click="goSignInPage"> Войти </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";
  import {supabase} from "@/services/APIauthorization";
  export default {
    name: "v-UI-UserButtons",
    data(){
      return {
        isActive: false,
        active_buttns: false,
        active_panel: false,
        count: 0
      }
    },
    computed:{
      ...mapGetters({
        userinsystem: 'user/USERINSYSTEM',
        is_auth: 'user/AUTH',
        busketproducts: 'busketProducts/BUSKETPRODUCTS',
        getFavoriteProducts: 'favoriteProducts/GET_FAVORITE_PROD'
      }),
      styleCheck(){
        if (this.isActive){
          return {
            border: '2px solid #53D31DFF',
            color: '#b0f19d'
          }
        }else {
          return {
            border: '2px solid #7BA7AB'
          }
        }
      },
    },
    setup(){
      const signOut = async () => {
        try {
          const {error} = await supabase.auth.signOut().then()
          window.location.reload()
          if (error) throw error;
        }
        catch (error){
          console.log(error.error_description || error.message)
        }
      }
      const isCurrentUser = async () => {
        try {
          const {error} = await supabase.auth.getSession()
          if (error) throw error
        }catch (e){
          console.log(e)
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
    },
    methods: {
      ...mapActions({
        getUser: 'user/getUser',
        outUser: 'user/outUser',
        loadDatafromDataBase: 'busketProducts/loadProductsData',
        FavoriteProducts: 'favoriteProducts/getFavoriteP'
      }),
      outMouse(){
        setTimeout(() => {
          if (this.active_panel){
            return this.active_buttns = true
          }
          this.active_buttns = false
        }, 1000)
      },
      outMouse_two(){
        setTimeout(() => {
          this.active_buttns = false
        }, 1000)
      },
      loadData() {
        Promise.all([
          this.getUser(),
          this.FavoriteProducts()
        ])
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
          console.log(e)
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
          console.log(e)
        }
      },
      goBusketPage(){
        return this.$router.push({name:'v-BusketPage'})
      },
      goFavoritePage(){
        return this.$router.push({name:'vFavoritePage'})
      },
      goSettingPage(){
        return this.$router.push({name:'v-UserSetting'})
      },
      goSignUpPage(){
        return this.$router.push({name:'v-SignUp'})
      },
      goSignInPage(){
        return this.$router.push({name:'v-SignIn'})
      }
    },
  }
</script>

<style scoped>
    .panel-user {
      width: 100%;
      display: block;
    }
    .userbuttons{
      display: flex;
      float: right;
      width: 200px;
      height: 50px;
    }
    .userbuttons>.button{
      display: block;
    }
    .userbuttons>#button-busket{
      display: flex;
      width: 60px;
    }
    .busket-btn{
      margin-right: 0px;
      display: flex;
      padding: 8px;
      padding-top: 10px;
    }
    .circle{
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
    .button>button{
      position: relative;
      width: 40px;
      height: 40px;
      margin-right: 20px;
      margin-top: 4px;
      color: #e5e5e5;
      background-color: rgb(57, 73, 82);
      border-radius: 50%;
      border: 2px solid #7BA7AB;
      cursor: pointer;
      font-size: 16px
    }
    .btn-auth-regist{
      width: 150px;
      height: 100px;
      color: #e5e5e5;
      background-color: rgb(57, 73, 82);
      top: 3.0em;
      display: none;
      z-index: 1;
      position: absolute;
    }

    .btn-auth-regist.active_buttns{
      width: 190px;
      display: block;
      height: 100px;
      right: 0px;
    }
    .btn-auth-regist.active_buttns:hover{
      display: block;
      width: 190px;
      height: 100px;
      right: 0px;
    }
    .btn-auth-regist.active_buttns>a{
      text-align: center;
      display: block;
      width: 160px;
      height: 40px;
      padding: 15px;
      padding-bottom: 0px;
      padding-top: 10px;
      border: none;
    }
    .btn-auth-regist.active_buttns>a:hover{
      color: #ffffff;
      background-color: dimgrey;
      cursor: pointer;
      right: 0px;
    }
    .button>.circle{
      width: 15px;
      height: 15px;
      display: inline-block;
      background-color: rgb(83, 211, 29);
      border-radius: 50%;
      margin-top: 27px;
      padding-left: 5px;
    }
    .fas.fa-solid.fa-heart.active{
      color: red;
    }
</style>