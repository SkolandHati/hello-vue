<template>
    <div class="panel-user">
      <q-toolbar class="float-right">
        <div class="block-btn-1">
          <q-btn class="quasar-btn"
                 flat round dense icon="shopping_cart"
                 @click="goBusketPage"></q-btn>
          <q-badge class="count"
                   rounded color="green"
                   :label='busketproducts.length'
                   v-if="!!busketproducts && is_auth"></q-badge>
        </div>
        <div class="block-btn-2">
        <q-btn class="quasar-btn"
               flat round dense icon="favorite"
               :class="{active: getFavoriteProducts.length !== 0}"
               @click="goFavoritePage"></q-btn>
          <q-badge class="count"
                   rounded color="green"
                   v-if="!!getFavoriteProducts.length && is_auth"
                   :label='getFavoriteProducts.length'></q-badge>
        </div>
        <div class="block-btn-3">
        <q-btn class="quasar-btn"
               flat round dense icon="person"
               :style="styleCheck"
               @click="goSettingPage"></q-btn>
          <div class="dropdown-container">
            <q-btn-dropdown class="btn-dropdown" color="white-gray">
              <q-list class="list" v-if="is_auth">
                <q-item clickable v-close-popup
                        @click="goSettingPage">
                  <q-item-section>
                    <q-item-label>Настройки</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup
                        @click="signOut">
                  <q-item-section>
                    <q-item-label>Выйти</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-list class="list" v-else>
                <q-item clickable v-close-popup
                        @click="goSignUpPage">
                  <q-item-section>
                    <q-item-label>Регистрация</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup
                        @click="goSignInPage">
                  <q-item-section>
                    <q-item-label>Войти</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
        </div>
      </q-toolbar>
    </div>
</template>

<script lang="ts">
  import {defineComponent} from "vue"
  import {mapGetters, mapActions} from "vuex";
  import {supabase} from "@/services/API_supabase";
  export default defineComponent({
    name: "v-UI-UserButtons",
    data(){
      return {
        isActive: false,
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
        catch (error: any){
          console.log(error.message)
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
    },
    methods: {
      ...mapActions({
        getUser: 'user/getUser',
        outUser: 'user/outUser',
        loadDatafromDataBase: 'busketProducts/loadProductsData',
        FavoriteProducts: 'favoriteProducts/getFavoriteP'
      }),
      loadData() {
        Promise.all([
          this.getUser(),
          this.FavoriteProducts(),
          this.loadDatafromDataBase()
        ])
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
  })
</script>

<style scoped>
    .panel-user {
      margin-top: 5px;
      width: 100%;
      display: flex;
    }
    .quasar-btn{
      margin-right: 20px;
      display: flex;
    }
    .block-btn-1,.block-btn-2,.block-btn-3{
      display: flex;
    }
    .count{
      width: 19px;
      height: 19px;
      margin-top: 15px;
      position: absolute;
      margin-left: 21px;
    }
    .btn-dropdown{
      width: 25px;
      height: 10px;
      border-radius: 50%;
      position: relative;
      margin-top: 12px;
    }
    .dropdown-container{
      display: none;
    }
    .block-btn-3>.quasar-btn:hover ~.dropdown-container{
      display: block;
      position: absolute;
      margin-left: 1px;
      margin-top: 5px;
    }
    .dropdown-container:hover{
      display: block;
      width: 20px;
      height: 5px;
      position: absolute;
      margin-left: 1px;
      margin-top: 5px;
    }
    .list{
      position: relative;
    }
    .q-btn {
      display: inline-flex;
      flex-direction: column;
      align-items: stretch;
      position: relative;
      outline: 0;
      border: 0;
      vertical-align: middle;
      font-size: 14px;
      line-height: 1.715em;
      text-decoration: none;
      color: inherit;
      background: transparent;
      font-weight: 500;
      text-transform: uppercase;
      text-align: center;
    }
    .block-btn-2>.quasar-btn.active{
      color: red;
    }
</style>