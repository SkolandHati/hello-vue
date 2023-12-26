<template>
  <section class="container">
    <main class="main"
          style="width: 100%">
      <div class="header" v-if="userAuth">
        <q-banner class="banner-one">Регистрация прошла успешна!</q-banner>
        <q-banner class="banner-two">Пользователь создан</q-banner>
        <div class="buttn">
          <q-btn @click="goHome" color="amber">Завершить и вернуться к главной странице</q-btn>
        </div>
        <div class="buttn">
          <q-btn @click="goSetting" color="primary">Перейти к настройкам и закончить регистрацию</q-btn>
        </div>
      </div>
      <div class="wdanger" v-else>
        <q-banner>Не удалось успешно пройти регистрацию</q-banner>
      </div>
    </main>
  </section>
</template>

<script>
  import {mapGetters, mapActions} from "vuex";
  import {supabase} from "@/services/API_supabase";
  export default {
    name: "checkregisteration",
    computed:{
      ...mapGetters({
        userAuth: 'user/AUTH'
      })
    },
    mounted() {
      this.loadData()
      this.loadUserData()
    },
    methods:{
      ...mapActions({
        thenUser:'user/getUser'
      }),
      async loadUserData(){
        try {
          await this.thenUser()
        }catch (e){
          console.log(e)
        }
      },
      async loadData(){
        try{
          const data = await supabase.auth.getUser()
          if (data){
            return data.data.user
          }else{
            return false
          }
        }catch (e){
          console.log(e)
        }
      },
      goHome(){
        return this.$router.push({name: 'v-HomePage'})
      },
      goSetting(){
        return this.$router.push({name: 'v-UserSetting'})
      }
    },
  }

</script>

<style scoped>
  .header{
    margin:80px;
  }
  .banner-one{
    border-radius: 7px 7px 0 0;
  }
  .banner-two{
    border-radius: 0 0 7px 7px;
  }
  .banner-one,.banner-two{
    text-align: center;
    background-color: #3b899a;
    color: #f5f3f3;
  }
  .buttn {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
</style>