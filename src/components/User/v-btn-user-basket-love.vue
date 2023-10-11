<template>
    <div class="panel-user">
      <link rel="stylesheet"
                  href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
                  integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
                  crossorigin="anonymous">
      <div class="userbuttons">
        <div class="button" id="button-busket">
          <button @click="$router.push({name: 'v-BusketPage'})"> <i class="fas fa-solid fa-cart-plus"></i></button>
        </div>
        <div class="button" id="button-heart">
          <button> <i class="fas fa-solid fa-heart"></i></button>
        </div>
        <div class="button" id="button-user">
          <button class="fas fa-solid fa-user" :style="styleCheck"></button>
          <div class="btn-auth-regist" v-if="USERINSYSTEM">
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
        name: "v-button-user",
        data(){
          return {
            isActive: false,
          }
        },
        methods: {
          router() {
            return router
          },
          ...mapActions([
              'getUsers',
              'outUser',
          ]),
          async loadData() {
            try {
              await this.getUsers()
            }
            catch (e) {
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
          }
        },
        computed:{
          ...mapGetters([
              'USERINSYSTEM'
          ]),
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

</style>